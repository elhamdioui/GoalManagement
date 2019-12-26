using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Dtos;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Controllers
{
    [Route("api/hr/[controller]")]
    [ApiController]
    public class EvaluationSheetController : ControllerBase
    {
        private readonly IRepositoryWrapper _repo;
        private ILoggerManager _logger;
        private readonly IMapper _mapper;
        public EvaluationSheetController(ILoggerManager logger, IRepositoryWrapper repo, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{evaluationFileId}")]
        public async Task<IActionResult> GetEvaluationSheetList(int evaluationFileId)
        {
            try
            {
                var evaluationFilesInstanceFromRepo = await _repo.EvaluationFileInstance.GetEvaluationFileInstancesByEvaluationFileId(evaluationFileId);
                var evaluationFileInstancesToReturn = _mapper.Map<IEnumerable<EvaluationFileInstanceToReturnDto>>(evaluationFilesInstanceFromRepo);

                return Ok(evaluationFileInstancesToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEvaluationSheetList endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("logs")]
        public async Task<IActionResult> GetEvaluationSheetlogs([FromQuery]string sheetTitle)
        {
            try
            {
                var logs = await _repo.EvaluationFileInstanceLog.GetEvaluationFileInstanceLogs(sheetTitle);

                return Ok(logs);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEvaluationSheetList endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpDelete("{id}/delete/{userId}")]
        public async Task<IActionResult> DeleteEvaluationSheet(int id, int userId)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                var evaluationFileInstanceFromRepo = await _repo.EvaluationFileInstance.GetEvaluationFileInstance(id);
                if (evaluationFileInstanceFromRepo == null) return NotFound();

                if (evaluationFileInstanceFromRepo.Status == Constants.PUBLISHED || evaluationFileInstanceFromRepo.Status == Constants.ARCHIVED)
                {
                    return BadRequest("Vous ne pouvez pas supprimer cette fiche d\'evaluation car elle est publiée ou bien archivée.");
                }

                _repo.EvaluationFileInstance.DeleteEvaluationFileInstance(evaluationFileInstanceFromRepo);
                await _repo.EvaluationFileInstance.SaveAllAsync();

                // Log deletion
                var efil = new EvaluationFileInstanceLog
                {
                    Title = evaluationFileInstanceFromRepo.Title,
                    Created = DateTime.Now,
                    Log = $"{evaluationFileInstanceFromRepo.Title} a été supprimé par l'utilisateur avec l'identifiant: ${userId}."
                };
                _repo.EvaluationFileInstanceLog.AddEvaluationFileInstanceLog(efil);
                await _repo.EvaluationFileInstanceLog.SaveAllAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteEvaluationSheet endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPost("generate/{evaluationFileId}")]
        public async Task<IActionResult> CreateEvaluationSheet(int evaluationFileId, IEnumerable<User> users)
        {
            try
            {
                // Escape users who already have an instance of file evaluation
                var usersWithoutInstance = new List<User>();
                var userIds = new List<int>();
                foreach (var user in users)
                {
                    userIds.Add(user.Id);
                }
                var usersWithInstance = await _repo.EvaluationFileInstance.GetUsersWithInstanceFileEvaluation(evaluationFileId, userIds);
                if (usersWithInstance == null || usersWithInstance.Count() == 0) { usersWithoutInstance = users.ToList(); }
                else
                {
                    foreach (var user in users)
                    {
                        var alreadyHasAnInstance = false;
                        foreach (var u in usersWithInstance)
                        {
                            if (user.Id == u.Id)
                            {
                                alreadyHasAnInstance = true;
                                break;
                            }
                        }
                        if (!alreadyHasAnInstance)
                        {
                            usersWithoutInstance.Add(user);
                        }
                    }
                }

                // Create behavioral skill instances if they don't exist
                var skillIds = await _repo.EvaluationFile.GetEvaluationFileBehavioralSkillIds(evaluationFileId);
                var behavioralSkillInstancesFromRepo = await _repo.BehavioralSkillInstance.GetBehavioralSkillInstancesByBSIds(skillIds);
                if (behavioralSkillInstancesFromRepo == null || behavioralSkillInstancesFromRepo.Count() == 0)
                {
                    var behavioralSkillListFromRepo = await _repo.BehavioralSkill.GetBehavioralSkillsByIds(skillIds);
                    foreach (var bs in behavioralSkillListFromRepo)
                    {
                        var newBehavioralSkillInstance = new BehavioralSkillInstance()
                        {
                            Skill = bs.Skill,
                            Definition = bs.Definition,
                            LevelOne = bs.LevelOne,
                            LevelOneDescription = bs.LevelOneDescription,
                            LevelOneGrade = bs.LevelOneGrade,
                            LevelTwo = bs.LevelTwo,
                            LevelTwoDescription = bs.LevelTwoDescription,
                            LevelTwoGrade = bs.LevelTwoGrade,
                            LevelThree = bs.LevelThree,
                            LevelThreeDescription = bs.LevelThreeDescription,
                            LevelThreeGrade = bs.LevelThreeGrade,
                            LevelFour = bs.LevelFour,
                            LevelFourDescription = bs.LevelFourDescription,
                            LevelFourGrade = bs.LevelFourGrade,
                            BehavioralSkillId = bs.Id
                        };
                        _repo.BehavioralSkillInstance.AddBehavioralSkillInstance(newBehavioralSkillInstance);
                    }
                    await _repo.BehavioralSkillInstance.SaveAllAsync();
                }

                // Create for them evaluation file instance foreach user
                var evaluationFileFromRepo = await _repo.EvaluationFile.GetEvaluationFile(evaluationFileId);
                foreach (var user in usersWithoutInstance)
                {
                    var evaluationFileInstance = new EvaluationFileInstance()
                    {
                        Title = evaluationFileFromRepo.Year + "-" + evaluationFileFromRepo.Title,
                        Year = evaluationFileFromRepo.Year,
                        Status = Constants.DRAFT,
                        Created = DateTime.Now,
                        OwnerId = user.Id,
                        StrategyTitle = evaluationFileFromRepo.Strategy.Title,
                        StrategyDescription = evaluationFileFromRepo.Strategy.Description,
                        EvaluationFileId = evaluationFileId
                    };

                    _repo.EvaluationFileInstance.AddEvaluationFileInstance(evaluationFileInstance);
                }

                await _repo.EvaluationFileInstance.SaveAllAsync();

                // Add Logs and axis instances to each evaluation file instance which doesn't have them yet
                var evaluationFileInstances = await _repo.EvaluationFileInstance.GetEvaluationFileInstancesByEvaluationFileId(evaluationFileId);
                foreach (var efi in evaluationFileInstances)
                {
                    var efil = new EvaluationFileInstanceLog
                    {
                        Title = efi.Title,
                        Created = DateTime.Now,
                        Log = $"{efi.Title} a été générée pour {efi.Owner.FirstName} {efi.Owner.LastName}."
                    };
                    _repo.EvaluationFileInstanceLog.AddEvaluationFileInstanceLog(efil);
                }
                await _repo.EvaluationFileInstanceLog.SaveAllAsync();

                var axisFromRepo = await _repo.Axis.GetAxisListDetailed(evaluationFileFromRepo.StrategyId);

                var evaluationFileInstancesToProcess = evaluationFileInstances.Where(efi => efi.AxisInstances.Count() == 0).ToList();
                foreach (var efi in evaluationFileInstancesToProcess)
                {
                    foreach (var axis in axisFromRepo)
                    {
                        foreach (var ap in axis.AxisPoles)
                        {
                            if (ap.PoleId == efi.Owner.Department.PoleId)
                            {
                                var newAxisInstance = new AxisInstance()
                                {
                                    Title = axis.Title,
                                    Description = axis.Description,
                                    EvaluationFileInstanceId = efi.Id,
                                    PoleName = ap.Pole.Name,
                                    PoleWeight = ap.Weight,
                                    UserWeight = ap.Weight,
                                    Created = DateTime.Now
                                };
                                efi.AxisInstances.Add(newAxisInstance);
                                _repo.AxisInstance.AddAxisInstance(newAxisInstance);
                            }
                        }
                    }
                }

                await _repo.AxisInstance.SaveAllAsync();

                // Add behavioral skill instances to each evaluation file instance which doesn't have them yet
                behavioralSkillInstancesFromRepo = await _repo.BehavioralSkillInstance.GetBehavioralSkillInstancesByBSIds(skillIds);
                foreach (var efi in evaluationFileInstancesToProcess)
                {
                    foreach (var bsi in behavioralSkillInstancesFromRepo)
                    {
                        efi.BehavioralSkillInstances.Add(new EvaluationFileInstanceBehavioralSkillInstance { BehavioralSkillInstance = bsi });
                        _repo.EvaluationFileInstance.UpdateEvaluationFileInstance(efi);
                    }
                }
                await _repo.EvaluationFileInstance.SaveAllAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateEvaluationSheet endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


    }
}