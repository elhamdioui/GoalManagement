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
                _logger.LogError($"Something went wrong inside GetGoalEvaluation enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("goalEvaluationTypes")]
        public async Task<IActionResult> GetGoalEvaluationTypes(int userId)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                var goalEvaluationTypeList = await _repo.GoalEvaluationType.GetGoalEvaluationType();
                var goalEvaluationTypeToReturn = _mapper.Map<IEnumerable<GoalEvaluationTypeToReturnDto>>(goalEvaluationTypeList);

                return Ok(goalEvaluationTypeToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetGoalEvaluationType enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost()]
        public async Task<IActionResult> GetGoalEvaluationsForAxis(int userId, IEnumerable<int> axisInstanceIds)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                var goalEvaluationsGroupedByAxisInstanceList = await GetAxisInstancesWithGoalEvaluations(axisInstanceIds);

                return Ok(goalEvaluationsGroupedByAxisInstanceList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetGoalEvaluations enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost("createGoalEvaluation")]
        public async Task<IActionResult> CreateGoalEvaluation(int userId, GoalEvaluationForCreationDto goalEvaluationCreationDto)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                // Validate the total weights of the objectives within an axis instance
                var axisInstanceIds = new List<int> { goalEvaluationCreationDto.AxisInstanceId };
                var goalEvaluationsGroupedByAxisInstanceList = await GetAxisInstancesWithGoalEvaluations(axisInstanceIds);
                if (IsTotalWeightOfObjectivesOver100(goalEvaluationsGroupedByAxisInstanceList, goalEvaluationCreationDto.Weight))
                {
                    return BadRequest("Le poids total de vos objectifs est supérieur à 100%!");
                }

                // Create a new goalEvaluation
                var goalEvaluation = _mapper.Map<GoalEvaluation>(goalEvaluationCreationDto);
                _repo.GoalEvaluation.AddGoalEvaluation(goalEvaluation);
                await _repo.GoalEvaluation.SaveAllAsync();

                return CreatedAtRoute("GetGoalEvaluation", new { id = goalEvaluation.Id }, goalEvaluation);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateEvaluationFile enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("editGoalEvaluation/{id}")]
        public async Task<IActionResult> UpdateEvaluationFile(int userId, int id, GoalEvaluationForUpdateDto goalEvaluationForUpdateDto)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                // Validate the total weights of the objectives within an axis instance
                var axisInstanceIds = new List<int> { goalEvaluationForUpdateDto.AxisInstanceId };
                var goalEvaluationsGroupedByAxisInstanceList = await GetAxisInstancesWithGoalEvaluations(axisInstanceIds);
                if (IsTotalWeightOfObjectivesOver100(goalEvaluationsGroupedByAxisInstanceList, goalEvaluationForUpdateDto.Weight, id))
                {
                    return BadRequest("Le poids total de vos objectifs est supérieur à 100%!");
                }

                var goalEvaluationFromRepo = await _repo.GoalEvaluation.GetGoalEvaluation(id);
                if (goalEvaluationFromRepo == null) return BadRequest("La fiche d'évaluation n'existe pas!");

                _mapper.Map(goalEvaluationForUpdateDto, goalEvaluationFromRepo);
                _repo.GoalEvaluation.UpdateGoalEvaluation(goalEvaluationFromRepo);

                await _repo.GoalEvaluation.SaveAllAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateEvaluationFile enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("validateGoalEvaluations")]
        public async Task<IActionResult> ValidateGoalEvaluations(int userId, IEnumerable<GoalEvaluationForUpdateDto> goalEvaluationsToUpdateDto)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                // Validate the total weights of the objectives within an axis instance
                var axisInstanceIds = new List<int>();
                foreach (var goalEvaluationToUpdateDto in goalEvaluationsToUpdateDto)
                {
                    axisInstanceIds.Add(goalEvaluationToUpdateDto.AxisInstanceId);
                }
                var goalEvaluationsGroupedByAxisInstanceList = await GetAxisInstancesWithGoalEvaluations(axisInstanceIds);
                foreach (var goalEvaluationsGroupedByAxisInstance in goalEvaluationsGroupedByAxisInstanceList)
                {
                    if (goalEvaluationsGroupedByAxisInstance.TotalGoalEvaluationWeight != 100)
                    {
                        return BadRequest("Le poids total de vos objectifs est différent de 100%!");
                    }
                }

                // Get main data
                var goalEvaluationIds = new List<int>();
                foreach (var goalEvaluationToUpdateDto in goalEvaluationsToUpdateDto)
                {
                    goalEvaluationIds.Add(goalEvaluationToUpdateDto.Id);
                }

                var goalEvaluationsStatus = "";
                var emailContent = "";
                var sheetTitle = "";
                var sheetOwnerId = 0;
                foreach (var goalEvaluationToUpdateDto in goalEvaluationsToUpdateDto)
                {
                    goalEvaluationsStatus = goalEvaluationToUpdateDto.Status;
                    emailContent = goalEvaluationToUpdateDto.EmailContent;
                    sheetTitle = goalEvaluationToUpdateDto.SheetTitle;
                    sheetOwnerId = goalEvaluationToUpdateDto.SheetOwnerId;
                    break;
                }

                // Check if user has evaluator in the case of review
                if (Constants.REVIEW == goalEvaluationsStatus && !await IsUserHasEvaluator(userId))
                {
                    return BadRequest("Vous n'avez pas d'évaluateur pour le moment!");
                }

                // Set Status of goalEvaluations
                var goalEvaluationsFromRepo = await _repo.GoalEvaluation.GetGoalEvaluationsByIds(goalEvaluationIds);
                if (goalEvaluationsFromRepo != null)
                {
                    foreach (var goalEvaluation in goalEvaluationsFromRepo)
                    {
                        goalEvaluation.Status = goalEvaluationsStatus;
                        _repo.GoalEvaluation.UpdateGoalEvaluation(goalEvaluation);
                    }
                    await _repo.GoalEvaluation.SaveAllAsync();

                    // Log objectifs have been submitted for validation
                    var efil = new EvaluationFileInstanceLog
                    {
                        Title = sheetTitle,
                        Created = DateTime.Now,
                        Log = $"Les objectives de la fiche: {sheetTitle} ont été mis au statut {goalEvaluationsStatus}."
                    };
                    _repo.EvaluationFileInstanceLog.AddEvaluationFileInstanceLog(efil);
                    await _repo.EvaluationFileInstanceLog.SaveAllAsync();

                    // Send Notification
                    await SendNotifications(goalEvaluationsStatus, userId, emailContent, sheetOwnerId);
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside ValidateGoalEvaluations enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("deleteGoalEvaluation/{id}")]
        public async Task<IActionResult> DeleteGoalEvaluation(int userId, int id)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                var goalEvaluationFromRepo = await _repo.GoalEvaluation.GetGoalEvaluation(id);
                if (goalEvaluationFromRepo == null) return NotFound();

                _repo.GoalEvaluation.DeleteGoalEvaluation(goalEvaluationFromRepo);
                await _repo.GoalEvaluation.SaveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteGoalEvaluation enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        private async Task<List<AxisInstanceWithGoalEvaluationsToReturnDto>> GetAxisInstancesWithGoalEvaluations(IEnumerable<int> axisInstanceIds)
        {
            var goalEvaluationsGroupedByAxisInstanceList = new List<AxisInstanceWithGoalEvaluationsToReturnDto>();
            // Add Axis Instances
            var axisInstanceList = await _repo.AxisInstance.GetAxisInstancesByIds(axisInstanceIds);
            foreach (var axisInstance in axisInstanceList)
            {
                var axisInstanceWithGoalEvaluationsToReturnDto = new AxisInstanceWithGoalEvaluationsToReturnDto()
                {
                    axisInstanceId = axisInstance.Id,
                    Title = axisInstance.Title,
                    Description = axisInstance.Description,
                    PoleName = axisInstance.PoleName,
                    PoleWeight = axisInstance.PoleWeight,
                    UserWeight = axisInstance.UserWeight
                };
                goalEvaluationsGroupedByAxisInstanceList.Add(axisInstanceWithGoalEvaluationsToReturnDto);
            }

            // Add goalEvaluations for each axis instance
            var goalEvaluationsFromRepo = await _repo.GoalEvaluation.GetGoalEvaluationsByAxisInstanceIds(axisInstanceIds);
            foreach (var goalEvaluation in goalEvaluationsFromRepo)
            {
                var goalEvaluationToReturn = _mapper.Map<GoalEvaluationToReturnDto>(goalEvaluation);
                if (goalEvaluationsGroupedByAxisInstanceList.Exists(a => a.axisInstanceId == goalEvaluation.AxisInstanceId))
                {
                    goalEvaluationsGroupedByAxisInstanceList.Find(a => a.axisInstanceId == goalEvaluation.AxisInstanceId).GoalEvaluations.Add(goalEvaluationToReturn);
                }
            }

            // Count and summup goalEvaluations
            foreach (var el in goalEvaluationsGroupedByAxisInstanceList)
            {
                el.TotalGoalEvaluations = el.GoalEvaluations.Count;
                el.TotalGoalEvaluationWeight = el.GoalEvaluations.Count == 0 ? 0 : el.GoalEvaluations.Sum(g => g.Weight);
                el.GoalEvaluationsStatus = el.GoalEvaluations.Count == 0 ? Constants.NOTSTARTED : el.GoalEvaluations.First().Status;
            }

            return goalEvaluationsGroupedByAxisInstanceList;
        }

        private bool IsTotalWeightOfObjectivesOver100(List<AxisInstanceWithGoalEvaluationsToReturnDto> goalEvaluationsGroupedByAxisInstanceList, int weight, int goalEvaluationId = 0)
        {
            // Creation case
            if (goalEvaluationId == 0)
            {
                if (goalEvaluationsGroupedByAxisInstanceList[0].TotalGoalEvaluationWeight + weight > 100)
                {
                    return true;
                }
            }
            else // update case
            {
                var totalWeight = weight;
                foreach (var goalEvaluation in goalEvaluationsGroupedByAxisInstanceList[0].GoalEvaluations)
                {
                    if (goalEvaluation.Id != goalEvaluationId)
                    {
                        totalWeight = totalWeight + goalEvaluation.Weight;
                    }
                }
                if (totalWeight > 100)
                {
                    return true;
                }
            }


            return false;
        }

        private async Task SendNotifications(string goalEvaluationsStatus, int userId, string emailContent, int sheetOwnerId)
        {
            if (Constants.REVIEW == goalEvaluationsStatus)
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