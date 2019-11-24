using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SothemaGoalManagement.API.Dtos;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalEvaluationManagement.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class GoalEvaluationController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repo;
        private readonly IMapper _mapper;
        public GoalEvaluationController(ILoggerManager logger, IRepositoryWrapper repo, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}", Name = "GetGoalEvaluation")]
        public async Task<IActionResult> GetGoalEvaluation(int userId, int id)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                var goalEvaluationFromRepo = await _repo.GoalEvaluation.GetGoalEvaluation(id);

                if (goalEvaluationFromRepo == null) return NotFound();
                var goalEvaluationToReturn = _mapper.Map<GoalEvaluationToReturnDto>(goalEvaluationFromRepo);

                return Ok(goalEvaluationToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetGoalEvaluation endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("goalEvaluations/{goalId}")]
        public async Task<IActionResult> GetGoalEvaluationsByGoalId(int userId, int goalId)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                var goalEvaluationList = await _repo.GoalEvaluation.GetGoalEvaluationsByGoalId(goalId);
                var goalEvaluationToReturn = _mapper.Map<IEnumerable<GoalEvaluationToReturnDto>>(goalEvaluationList);

                return Ok(goalEvaluationToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetGoalEvaluationsByGoalId endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("createGoalEvaluation")]
        public async Task<IActionResult> CreateGoalEvaluation(int userId, GoalEvaluationForCreationDto goalEvaluationCreationDto)
        {
            try
            {
                if (!await IsItAllowed(userId)) Unauthorized();

                // Create a new goalEvaluation
                var goalEvaluation = _mapper.Map<GoalEvaluation>(goalEvaluationCreationDto);
                if (userId != goalEvaluationCreationDto.EvaluateeId) goalEvaluation.SelfEvaluation = false;
                else goalEvaluation.SelfEvaluation = true;
                _repo.GoalEvaluation.AddGoalEvaluation(goalEvaluation);
                await _repo.GoalEvaluation.SaveAllAsync();

                return CreatedAtRoute("GetGoalEvaluation", new { id = goalEvaluation.Id }, goalEvaluation);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateEvaluationFile endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        private async Task<bool> IsUserHasEvaluator(int userId)
        {
            var evaluators = await _repo.User.LoadEvaluators(userId);
            if (evaluators == null || evaluators.Count() == 0) return false;
            return true;
        }

        private async Task<bool> IsItAllowed(int userId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (userId != currentUserId)
            {
                var evaluators = await _repo.User.LoadEvaluators(userId);
                var evaluator = evaluators.FirstOrDefault(e => e.Id == currentUserId);
                if (evaluator == null) return false;
            }
            return true;
        }
    }
}