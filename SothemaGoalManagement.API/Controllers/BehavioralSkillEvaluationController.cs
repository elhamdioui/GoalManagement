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
    public class BehavioralSkillEvaluationController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repo;
        private readonly IMapper _mapper;
        public BehavioralSkillEvaluationController(ILoggerManager logger, IRepositoryWrapper repo, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}", Name = "GetBehavioralSkillEvaluation")]
        public async Task<IActionResult> GetBehavioralSkillEvaluation(int userId, int id)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                var behavioralSkillEvaluationFromRepo = await _repo.BehavioralSkillEvaluation.GetBehavioralSkillEvaluation(id);

                if (behavioralSkillEvaluationFromRepo == null) return NotFound();
                var behavioralSkillEvaluationToReturn = _mapper.Map<BehavioralSkillEvaluationToReturnDto>(behavioralSkillEvaluationFromRepo);

                return Ok(behavioralSkillEvaluationToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetBehavioralSkillEvaluation endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("behavioralSkillInstancesForSheet/{sheetId}")]
        public async Task<IActionResult> GetBehavioralSkillInstancesForSheet(int userId, int sheetId)
        {
            try
            {
                if (!await IsItAllowed(userId)) Unauthorized();

                var behavioralSkillInstancesFromRepo = await _repo.BehavioralSkillInstance.GetBehavioralSkillInstancesBySheetId(sheetId);
                var behavioralSkillInstancesToReturn = _mapper.Map<IEnumerable<BehavioralSkillToReturnDto>>(behavioralSkillInstancesFromRepo);
                foreach (var behavioralSkillInstanceToReturn in behavioralSkillInstancesToReturn)
                {
                    var latestEval = behavioralSkillInstanceToReturn.BehavioralSkillEvaluations.OrderByDescending(bsie => bsie.Created).FirstOrDefault();
                    behavioralSkillInstanceToReturn.BehavioralSkillGrade = latestEval != null ? latestEval.Grade : 0;
                    behavioralSkillInstanceToReturn.BehavioralSkillLevel = latestEval != null ? latestEval.Level : "";
                }

                return Ok(behavioralSkillInstancesToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetBehavioralSkillInstancesForSheet endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("createBehavioralSkillEvaluation")]
        public async Task<IActionResult> createBehavioralSkillEvaluation(int userId, IEnumerable<BehavioralSkillEvaluationForCreationDto> behavioralSkillEvaluationsCreationDto)
        {
            try
            {
                if (!await IsItAllowed(userId)) Unauthorized();

                // Create a new behavioralSkillEvaluation
                foreach (var behavioralSkillEvaluationCreationDto in behavioralSkillEvaluationsCreationDto)
                {
                    var behavioralSkillEvaluation = _mapper.Map<BehavioralSkillEvaluation>(behavioralSkillEvaluationCreationDto);
                    behavioralSkillEvaluation.EvaluatorId = userId;
                    _repo.BehavioralSkillEvaluation.AddBehavioralSkillEvaluation(behavioralSkillEvaluation);
                }

                await _repo.BehavioralSkillEvaluation.SaveAllAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside createBehavioralSkillEvaluation endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
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