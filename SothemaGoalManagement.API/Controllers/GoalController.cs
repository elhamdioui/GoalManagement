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
    public class GoalController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repo;
        private readonly IMapper _mapper;
        public GoalController(ILoggerManager logger, IRepositoryWrapper repo, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}", Name = "GetGoal")]
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

        [HttpPost()]
        public async Task<IActionResult> GetGoalsForAxis(int userId, IEnumerable<int> axisInstanceIds)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                var goalsGroupedByAxisInstanceList = await GetAxisInstancesWithGoals(axisInstanceIds);

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
                if (await IsTotalWeightOfObjectivesOver100(axisInstanceIds, goalCreationDto.Weight))
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
                if (await IsTotalWeightOfObjectivesOver100(axisInstanceIds, goalForUpdateDto.Weight, id))
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

        private async Task<List<AxisInstanceWithGoalsToReturnDto>> GetAxisInstancesWithGoals(IEnumerable<int> axisInstanceIds)
        {
            var goalsGroupedByAxisInstanceList = new List<AxisInstanceWithGoalsToReturnDto>();
            // Add Axis Instances
            var axisInstanceList = await _repo.AxisInstance.GetAxisInstancesByIds(axisInstanceIds);
            foreach (var axisInstance in axisInstanceList)
            {
                var axisInstanceWithGoalsToReturnDto = new AxisInstanceWithGoalsToReturnDto()
                {
                    axisInstanceId = axisInstance.Id,
                    Title = axisInstance.Title,
                    Description = axisInstance.Description,
                    PoleName = axisInstance.PoleName,
                    PoleWeight = axisInstance.PoleWeight,
                    UserWeight = axisInstance.UserWeight
                };
                goalsGroupedByAxisInstanceList.Add(axisInstanceWithGoalsToReturnDto);
            }

            // Add goals for each axis instance
            var goalsFromRepo = await _repo.Goal.GetGoalsByAxisInstanceIds(axisInstanceIds);
            foreach (var goal in goalsFromRepo)
            {
                var goalToReturn = _mapper.Map<GoalToReturnDto>(goal);
                if (goalsGroupedByAxisInstanceList.Exists(a => a.axisInstanceId == goal.AxisInstanceId))
                {
                    goalsGroupedByAxisInstanceList.Find(a => a.axisInstanceId == goal.AxisInstanceId).Goals.Add(goalToReturn);
                }
            }

            // Count and summup goals
            foreach (var el in goalsGroupedByAxisInstanceList)
            {
                el.TotalGoals = el.Goals.Count;
                el.TotalGoalWeight = el.Goals.Count == 0 ? 0 : el.Goals.Sum(g => g.Weight);
            }

            return goalsGroupedByAxisInstanceList;
        }

        private async Task<bool> IsTotalWeightOfObjectivesOver100(IEnumerable<int> axisInstanceIds, int weight, int goalId = 0)
        {
            var goalsGroupedByAxisInstanceList = await GetAxisInstancesWithGoals(axisInstanceIds);

            // Creation case
            if (goalId == 0)
            {
                if (goalsGroupedByAxisInstanceList[0].TotalGoalWeight + weight > 100)
                {
                    return true;
                }
            }
            else // update case
            {
                var totalWeight = weight;
                foreach (var goal in goalsGroupedByAxisInstanceList[0].Goals)
                {
                    if (goal.Id != goalId)
                    {
                        totalWeight = totalWeight + goal.Weight;
                    }
                }
                if (totalWeight > 100)
                {
                    return true;
                }
            }


            return false;
        }
    }
}