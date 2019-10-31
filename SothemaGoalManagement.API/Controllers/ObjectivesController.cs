using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SothemaGoalManagement.API.Dtos;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Interfaces;

namespace SothemaGoalManagement.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class ObjectivesController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repo;
        private readonly IMapper _mapper;
        public ObjectivesController(ILoggerManager logger, IRepositoryWrapper repo, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetMySheetsForUser(int userId, [FromQuery]CommunParams communParams)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                communParams.OwnerId = userId;
                var sheetsFromRepo = await _repo.EvaluationFileInstance.GetEvaluationFileInstancesForUser(communParams);
                var sheets = _mapper.Map<IEnumerable<EvaluationFileInstanceHrToReturnDto>>(sheetsFromRepo);

                Response.AddPagination(sheetsFromRepo.CurrentPage, sheetsFromRepo.PageSize, sheetsFromRepo.TotalCount, sheetsFromRepo.TotalPages);

                return Ok(sheets);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetMySheetsForUser endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMySheetDetailForUser(int userId, int id)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                var evaluationFileInstanceFromRepo = await _repo.EvaluationFileInstance.GetEvaluationFileInstance(id);
                var evaluationFileInstanceToReturn = _mapper.Map<EvaluationFileInstanceHrToReturnDto>(evaluationFileInstanceFromRepo);

                return Ok(evaluationFileInstanceToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetMySheetDetailForUser enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost()]
        public async Task<IActionResult> GetGoalsForAxis(int userId, IEnumerable<int> axisInstanceIds)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                var goalsFromRepo = await _repo.Goal.GetGoalsByAxisInstanceIds(axisInstanceIds);
                var goalsToReturn = _mapper.Map<IEnumerable<GoalToReturnDto>>(goalsFromRepo);

                return Ok(goalsToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetGoals enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("goalTypes")]
        public async Task<IActionResult> GetGoalTypes(int userId)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                var goalTypeList = await _repo.GoalType.GetGoalType();
                var goalTypeToReturn = _mapper.Map<IEnumerable<GoalTypeToReturnDto>>(goalTypeList);

                return Ok(goalTypeToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetGoalType enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}