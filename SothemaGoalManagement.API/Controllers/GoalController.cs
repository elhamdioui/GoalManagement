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
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                var goalFromRepo = await _repo.Goal.GetGoal(id);

                if (goalFromRepo == null) return NotFound();
                var goalToReturn = _mapper.Map<GoalToReturnDto>(goalFromRepo);

                return Ok(goalToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetGoal endpoint: {ex.Message}");
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
                _logger.LogError($"Something went wrong inside GetGoalType endpoint: {ex.Message}");
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
                _logger.LogError($"Something went wrong inside GetGoals endpoint: {ex.Message}");
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
                var goalsGroupedByAxisInstanceList = await GetAxisInstancesWithGoals(axisInstanceIds);
                if (IsTotalWeightOfObjectivesOver100(goalsGroupedByAxisInstanceList, goalCreationDto.Weight))
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
                _logger.LogError($"Something went wrong inside CreateEvaluationFile endpoint: {ex.Message}");
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
                var goalsGroupedByAxisInstanceList = await GetAxisInstancesWithGoals(axisInstanceIds);
                if (IsTotalWeightOfObjectivesOver100(goalsGroupedByAxisInstanceList, goalForUpdateDto.Weight, id))
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
                _logger.LogError($"Something went wrong inside UpdateEvaluationFile endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("validateGoals")]
        public async Task<IActionResult> ValidateGoals(int userId, IEnumerable<GoalForUpdateDto> goalsToUpdateDto)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                // Validate the total weights of the objectives within an axis instance
                var axisInstanceIds = new List<int>();
                foreach (var goalToUpdateDto in goalsToUpdateDto)
                {
                    axisInstanceIds.Add(goalToUpdateDto.AxisInstanceId);
                }
                var goalsGroupedByAxisInstanceList = await GetAxisInstancesWithGoals(axisInstanceIds);
                foreach (var goalsGroupedByAxisInstance in goalsGroupedByAxisInstanceList)
                {
                    if (goalsGroupedByAxisInstance.TotalGoalWeight != 100)
                    {
                        return BadRequest("Le poids total de vos objectifs est différent de 100%!");
                    }
                }

                // Get main data
                var goalIds = new List<int>();
                foreach (var goalToUpdateDto in goalsToUpdateDto)
                {
                    goalIds.Add(goalToUpdateDto.Id);
                }

                var goalsStatus = "";
                var emailContent = "";
                var sheetTitle = "";
                var sheetOwnerId = 0;
                foreach (var goalToUpdateDto in goalsToUpdateDto)
                {
                    goalsStatus = goalToUpdateDto.Status;
                    emailContent = goalToUpdateDto.EmailContent;
                    sheetTitle = goalToUpdateDto.SheetTitle;
                    sheetOwnerId = goalToUpdateDto.SheetOwnerId;
                    break;
                }

                // Check if user has evaluator in the case of review
                if (Constants.REVIEW == goalsStatus && !await IsUserHasEvaluator(userId))
                {
                    return BadRequest("Vous n'avez pas d'évaluateur pour le moment!");
                }

                // Set Status of goals
                var goalsFromRepo = await _repo.Goal.GetGoalsByIds(goalIds);
                if (goalsFromRepo != null)
                {
                    foreach (var goal in goalsFromRepo)
                    {
                        goal.Status = goalsStatus;
                        _repo.Goal.UpdateGoal(goal);
                    }
                    await _repo.Goal.SaveAllAsync();

                    // Log objectifs have been submitted for validation
                    var efil = new EvaluationFileInstanceLog
                    {
                        Title = sheetTitle,
                        Created = DateTime.Now,
                        Log = $"Les objectives de la fiche: {sheetTitle} ont été mis au statut {goalsStatus}."
                    };
                    _repo.EvaluationFileInstanceLog.AddEvaluationFileInstanceLog(efil);
                    await _repo.EvaluationFileInstanceLog.SaveAllAsync();

                    // Send Notification
                    await SendNotifications(goalsStatus, userId, emailContent, sheetOwnerId);
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside ValidateGoals endpoint: {ex.Message}");
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
                _logger.LogError($"Something went wrong inside DeleteGoal endpoint: {ex.Message}");
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
                el.GoalsStatus = el.Goals.Count == 0 ? Constants.NOTSTARTED : el.Goals.First().Status;
                Decimal total = el.Goals.Select(g => g.Weight * g.LatestCompletionRate * el.UserWeight).Sum();
                Decimal percentTotal = total / 10000.00m;
                el.AxisGrade = percentTotal.ToString("N2");
            }

            return goalsGroupedByAxisInstanceList;
        }

        private bool IsTotalWeightOfObjectivesOver100(List<AxisInstanceWithGoalsToReturnDto> goalsGroupedByAxisInstanceList, int weight, int goalId = 0)
        {
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

        private async Task SendNotifications(string goalsStatus, int userId, string emailContent, int sheetOwnerId)
        {
            if (Constants.REVIEW == goalsStatus)
            {
                var evaluators = await _repo.User.LoadEvaluators(userId);
                foreach (var evaluator in evaluators)
                {
                    // Only first rank of evaluators
                    if (evaluator.Rank == 1)
                    {
                        var messageForCreationDto = new MessageForCreationDto()
                        {
                            RecipientId = evaluator.Id,
                            SenderId = userId,
                            Content = emailContent
                        };
                        var message = _mapper.Map<Message>(messageForCreationDto);
                        _repo.Message.AddMessage(message);
                    }
                }
            }
            else
            {
                var messageForCreationDto = new MessageForCreationDto()
                {
                    RecipientId = sheetOwnerId,
                    SenderId = userId,
                    Content = emailContent
                };
                var message = _mapper.Map<Message>(messageForCreationDto);
                _repo.Message.AddMessage(message);
            }

            await _repo.Message.SaveAllAsync();
        }

        private async Task<bool> IsUserHasEvaluator(int userId)
        {
            var evaluators = await _repo.User.LoadEvaluators(userId);
            if (evaluators == null || evaluators.Count() == 0) return false;
            return true;
        }
    }
}