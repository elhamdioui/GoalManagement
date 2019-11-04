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
    public class EvaluationFileController : ControllerBase
    {
        private readonly IRepositoryWrapper _repo;
        private ILoggerManager _logger;
        private readonly IMapper _mapper;
        public EvaluationFileController(ILoggerManager logger, IRepositoryWrapper repo, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}", Name = "GetEvaluationFile")]
        public async Task<IActionResult> GetEvaluationFile(int id)
        {
            try
            {
                var evaluationFileFromRepo = await _repo.EvaluationFile.GetEvaluationFileDetail(id);

                if (evaluationFileFromRepo == null) return NotFound();

                return Ok(evaluationFileFromRepo);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEvaluationFile enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetEvaluationFileList([FromQuery]CommunParams evaluationFileParams)
        {
            try
            {
                var evaluationFilesWithBehaviorSkillsFromRepo = await _repo.EvaluationFile.GetEvaluationFiles(evaluationFileParams);

                return Ok(evaluationFilesWithBehaviorSkillsFromRepo);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEvaluationFileList enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("evaluationFileInstances/{evaluationFileId}")]
        public async Task<IActionResult> GetEvaluationFileInstanceList(int evaluationFileId)
        {
            try
            {
                var evaluationFilesInstanceFromRepo = await _repo.EvaluationFileInstance.GetEvaluationFileInstancesByEvaluationFileId(evaluationFileId);
                var evaluationFileInstancesToReturn = _mapper.Map<IEnumerable<EvaluationFileInstanceHrToReturnDto>>(evaluationFilesInstanceFromRepo);

                return Ok(evaluationFileInstancesToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetEvaluationFileInstanceList enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpDelete("evaluationFileInstance/{id}/delete/{userId}")]
        public async Task<IActionResult> DeleteEvaluationFileInstance(int id, int userId)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                var evaluationFileInstanceFromRepo = await _repo.EvaluationFileInstance.GetEvaluationFileInstance(id);
                if (evaluationFileInstanceFromRepo == null) return NotFound();

                _repo.EvaluationFileInstance.DeleteEvaluationFileInstance(evaluationFileInstanceFromRepo);
                await _repo.EvaluationFileInstance.SaveAllAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside DeleteEvaluationFileInstance enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPost("new/{ownerId}")]
        public async Task<IActionResult> CreateEvaluationFile(int ownerId, EvaluationFileForCreationDto evaluationFileForCreationDto)
        {
            try
            {
                var user = await _repo.User.GetUser(ownerId, false);
                if (user.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                evaluationFileForCreationDto.OwnerId = ownerId;

                var evaluationFile = _mapper.Map<EvaluationFile>(evaluationFileForCreationDto);

                _repo.EvaluationFile.AddEvaluationFile(evaluationFile);

                await _repo.EvaluationFile.SaveAllAsync();

                foreach (var bsId in evaluationFileForCreationDto.BehavioralSkillIds)
                {
                    var bsFromRepo = _repo.BehavioralSkill.GetBehavioralSkill(bsId).Result;
                    evaluationFile.BehavioralSkills.Add(new EvaluationFileBehavioralSkill { BehavioralSkill = bsFromRepo });
                    _repo.EvaluationFile.UpdateEvaluationFile(evaluationFile);
                }
                await _repo.EvaluationFile.SaveAllAsync();
                return CreatedAtRoute("GetEvaluationFile", new { id = evaluationFile.Id }, evaluationFile);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside CreateEvaluationFile enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPost("generate/{evaluationFileId}")]
        public async Task<IActionResult> CreateEvaluationFileInstance(int evaluationFileId, IEnumerable<User> users)
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
                        Title = evaluationFileFromRepo.Year + "-" + evaluationFileFromRepo.Title + "-" + user.FirstName + " " + user.LastName,
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

                // Add axis instances to each evaluation file instance which doesn't have them yet
                var evaluationFileInstances = await _repo.EvaluationFileInstance.GetEvaluationFileInstancesByEvaluationFileId(evaluationFileId);
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
                _logger.LogError($"Something went wrong inside CreateEvaluationFileInstance enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPut("edit/{ownerId}")]
        public async Task<IActionResult> UpdateEvaluationFile(int ownerId, EvaluationFileForUpdateDto evaluationFileForUpdateDto)
        {
            try
            {
                var owner = await _repo.User.GetUser(ownerId, false);
                if (owner.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                evaluationFileForUpdateDto.OwnerId = ownerId;
                var evaluationFileFromRepo = await _repo.EvaluationFile.GetEvaluationFile(evaluationFileForUpdateDto.Id);
                if (evaluationFileFromRepo == null) return BadRequest("La fiche d'évaluation n'existe pas!");
                if (evaluationFileFromRepo.Sealed && evaluationFileForUpdateDto.Status != Constants.ARCHIVED) return BadRequest("La fiche d'évaluation est scellée!");
                if (evaluationFileFromRepo.Status != Constants.PUBLISHED && evaluationFileForUpdateDto.Status == Constants.PUBLISHED &&
                    (evaluationFileFromRepo.Strategy.Sealed || await IsBehavioralSkillSealed(evaluationFileFromRepo.Id)))
                {
                    return BadRequest("Vous ne pouvez pas publier cette fiche d'évaluation car une stratégie ou bien une compétence est déjà associée à une autre fiche d'évaluation.");
                }

                var publishEvaluation = false;
                var archiveEvaluation = false;
                if (evaluationFileFromRepo.Status != Constants.PUBLISHED && evaluationFileForUpdateDto.Status == Constants.PUBLISHED)
                {
                    publishEvaluation = true;
                }
                if (evaluationFileFromRepo.Status != Constants.ARCHIVED && evaluationFileForUpdateDto.Status == Constants.ARCHIVED)
                {
                    archiveEvaluation = true;
                }

                _mapper.Map(evaluationFileForUpdateDto, evaluationFileFromRepo);
                _repo.EvaluationFile.UpdateEvaluationFile(evaluationFileFromRepo);

                await _repo.EvaluationFile.SaveAllAsync();

                var efbsIdListFromRepo = await _repo.EvaluationFile.GetEvaluationFileBehavioralSkillIds(evaluationFileForUpdateDto.Id);
                var selectedBehavioralSkillIds = evaluationFileForUpdateDto.BehavioralSkillIds;
                selectedBehavioralSkillIds = selectedBehavioralSkillIds ?? new int[] { };
                foreach (var bsId in selectedBehavioralSkillIds.Except(efbsIdListFromRepo))
                {
                    evaluationFileFromRepo.BehavioralSkills.Add(new EvaluationFileBehavioralSkill { BehavioralSkillId = bsId, EvaluationFileId = evaluationFileFromRepo.Id });
                    _repo.EvaluationFile.UpdateEvaluationFile(evaluationFileFromRepo);
                }

                foreach (var bsId in efbsIdListFromRepo.Except(selectedBehavioralSkillIds))
                {
                    evaluationFileFromRepo.BehavioralSkills.Remove(new EvaluationFileBehavioralSkill { BehavioralSkillId = bsId, EvaluationFileId = evaluationFileFromRepo.Id });
                    _repo.EvaluationFile.UpdateEvaluationFile(evaluationFileFromRepo);
                }

                await _repo.EvaluationFile.SaveAllAsync();

                if (publishEvaluation)
                {
                    await PublishEvaluationFile(evaluationFileForUpdateDto.Id);
                }

                if (archiveEvaluation)
                {
                    await ArchiveEvaluationComponents(evaluationFileForUpdateDto.Id);
                }
                return Ok(evaluationFileFromRepo);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateEvaluationFile enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPut("axisInstance/edit/{userId}/{axisInstanceId}/{userWeight}")]
        public async Task<IActionResult> UpdateAxisInstance(int userId, int axisInstanceId, int userWeight)
        {
            try
            {
                var userFromRepo = await _repo.User.GetUser(userId, false);
                if (userFromRepo.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                var axisIntsnaceFromRepo = await _repo.AxisInstance.GetAxisInstance(axisInstanceId);
                if (axisIntsnaceFromRepo != null)
                {
                    axisIntsnaceFromRepo.UserWeight = userWeight;
                    _repo.AxisInstance.UpdateAxisInstance(axisIntsnaceFromRepo);
                    await _repo.AxisInstance.SaveAllAsync();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateAxisInstance enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        private async Task<bool> IsBehavioralSkillSealed(int evaluationFileId)
        {
            var skillIds = await _repo.EvaluationFile.GetEvaluationFileBehavioralSkillIds(evaluationFileId);
            var behavioralSkillListFromRepo = await _repo.BehavioralSkill.GetBehavioralSkillsByIds(skillIds);
            foreach (var behavioralSkill in behavioralSkillListFromRepo)
            {
                if (behavioralSkill.Sealed)
                {
                    return true;
                }
            }
            return false;
        }
        private async Task PublishEvaluationFile(int evaluationFileId)
        {
            var evaluationFileFromRepo = await _repo.EvaluationFile.GetEvaluationFile(evaluationFileId);
            evaluationFileFromRepo.Sealed = true;
            evaluationFileFromRepo.SealedDate = DateTime.Now;
            var strategyFromRepo = await _repo.Strategy.GetStrategy(evaluationFileFromRepo.StrategyId);
            strategyFromRepo.Sealed = true;
            strategyFromRepo.SealedDate = DateTime.Now;
            foreach (var axis in strategyFromRepo.AxisList)
            {
                axis.Sealed = true;
                axis.SealedDate = DateTime.Now;
                foreach (var ap in axis.AxisPoles)
                {
                    ap.Sealed = true;
                    ap.SealedDate = DateTime.Now;
                }
            }

            var skillIds = await _repo.EvaluationFile.GetEvaluationFileBehavioralSkillIds(evaluationFileId);
            var behavioralSkillListFromRepo = await _repo.BehavioralSkill.GetBehavioralSkillsByIds(skillIds);
            foreach (var behavioralSkill in behavioralSkillListFromRepo)
            {
                behavioralSkill.Sealed = true;
                behavioralSkill.SealedDate = DateTime.Now;
                _repo.BehavioralSkill.UpdateBehavioralSkill(behavioralSkill);
            }

            await _repo.BehavioralSkill.SaveAllAsync();

        }
        private async Task ArchiveEvaluationComponents(int evaluationFileId)
        {
            var evaluationFileFromRepo = await _repo.EvaluationFile.GetEvaluationFile(evaluationFileId);
            var strategyFromRepo = await _repo.Strategy.GetStrategy(evaluationFileFromRepo.StrategyId);
            strategyFromRepo.Status = Constants.ARCHIVED;

            var skillIds = await _repo.EvaluationFile.GetEvaluationFileBehavioralSkillIds(evaluationFileId);
            var behavioralSkillListFromRepo = await _repo.BehavioralSkill.GetBehavioralSkillsByIds(skillIds);
            foreach (var behavioralSkill in behavioralSkillListFromRepo)
            {
                behavioralSkill.Status = Constants.ARCHIVED;
                _repo.BehavioralSkill.UpdateBehavioralSkill(behavioralSkill);
            }
            await _repo.BehavioralSkill.SaveAllAsync();
        }
    }
}