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
        public async Task<IActionResult> GetGoal(int userId, int id)
        {
            try
            {
                var goalFromRepo = await _repo.Goal.GetGoal(id);

                if (goalFromRepo == null) return NotFound();
                var goalToReturn = _mapper.Map<GoalToReturnDto>(goalFromRepo);

                return Ok(goalToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetGoal enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("mySheet/{id}")]
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
                var goalsGroupedByAxisInstanceList = GetAxisInstancesWithGoals(goalsFromRepo);

                return Ok(goalsGroupedByAxisInstanceList);
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

        [HttpPost("createGoal")]
        public async Task<IActionResult> CreateGoal(int userId, GoalForCreationDto goalCreationDto)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                // Validate the total weights of the objectives within an axis instance
                var axisInstanceIds = new List<int> { goalCreationDto.AxisInstanceId };
                if (await IsTotalWeoghtOfObjectivesOver100(axisInstanceIds, goalCreationDto.Weight))
                {
                    return BadRequest("Le poids total de vos objectifs est supérieur à 100%!");
                }

                // Create a new goal
                var goal = _mapper.Map<Goal>(goalCreationDto);
                _repo.Goal.AddGoal(goal);
                await _repo.Goal.SaveAllAsync();

                return CreatedAtRoute("GetGoal", new { id = goal.Id }, goal);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateEvaluationFile enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("editGoal/{id}")]
        public async Task<IActionResult> UpdateEvaluationFile(int userId, int id, GoalForUpdateDto goalForUpdateDto)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                // Validate the total weights of the objectives within an axis instance
                var axisInstanceIds = new List<int> { goalForUpdateDto.AxisInstanceId };
                if (await IsTotalWeoghtOfObjectivesOver100(axisInstanceIds, goalForUpdateDto.Weight, id))
                {
                    return BadRequest("Le poids total de vos objectifs est supérieur à 100%!");
                }

                var goalFromRepo = await _repo.Goal.GetGoal(id);
                if (goalFromRepo == null) return BadRequest("La fiche d'évaluation n'existe pas!");

                _mapper.Map(goalForUpdateDto, goalFromRepo);
                _repo.Goal.UpdateGoal(goalFromRepo);

                await _repo.Goal.SaveAllAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateEvaluationFile enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("deleteGoal/{id}")]
        public async Task<IActionResult> DeleteGoal(int userId, int id)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                var goalFromRepo = await _repo.Goal.GetGoal(id);
                if (goalFromRepo == null) return NotFound();

                _repo.Goal.DeleteGoal(goalFromRepo);
                await _repo.Goal.SaveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteGoal enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        private List<AxisInstanceWithGoalsToReturnDto> GetAxisInstancesWithGoals(IEnumerable<Goal> goalsFromRepo)
        {
            var goalsGroupedByAxisInstanceList = new List<AxisInstanceWithGoalsToReturnDto>();
            foreach (var goal in goalsFromRepo)
            {
                var goalToReturn = _mapper.Map<GoalToReturnDto>(goal);
                if (goalsGroupedByAxisInstanceList.Exists(a => a.axisInstanceId == goal.AxisInstanceId))
                {
                    goalsGroupedByAxisInstanceList.Find(a => a.axisInstanceId == goal.AxisInstanceId).Goals.Add(goalToReturn);
                }
                else
                {
                    var axisInstanceWithGoalsToReturnDto = new AxisInstanceWithGoalsToReturnDto()
                    {
                        axisInstanceId = goal.AxisInstanceId,
                        Title = goal.AxisInstance.Title,
                        Description = goal.AxisInstance.Description,
                        PoleName = goal.AxisInstance.PoleName,
                        PoleWeight = goal.AxisInstance.PoleWeight,
                        UserWeight = goal.AxisInstance.UserWeight
                    };

                    axisInstanceWithGoalsToReturnDto.Goals.Add(goalToReturn);
                    goalsGroupedByAxisInstanceList.Add(axisInstanceWithGoalsToReturnDto);
                }
            }

            foreach (var el in goalsGroupedByAxisInstanceList)
            {
                el.TotalGoals = el.Goals.Count;
                el.TotalGoalWeight = el.Goals.Sum(g => g.Weight);
            }

            return goalsGroupedByAxisInstanceList;
        }

        private async Task<bool> IsTotalWeoghtOfObjectivesOver100(IEnumerable<int> axisInstanceIds, int weight, int goalId = 0)
        {
            var goalsFromRepo = await _repo.Goal.GetGoalsByAxisInstanceIds(axisInstanceIds);
            var goalsToProcess = new List<Goal>();
            foreach (var goal in goalsFromRepo)
            {
                if (goal.Id != goalId)
                {
                    goalsToProcess.Add(goal);
                }
            }
            var goalsGroupedByAxisInstanceList = GetAxisInstancesWithGoals(goalsToProcess);
            if (goalsGroupedByAxisInstanceList.Count == 1 && (goalsGroupedByAxisInstanceList[0].TotalGoalWeight + weight > 100))
            {
                return true;
            }
            return false;
        }
    }
}