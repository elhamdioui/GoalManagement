using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Dtos;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Controllers
{
    [Route("api/hr/[controller]")]
    [ApiController]
    public class EvaluationFileController : ControllerBase
    {
        private readonly IGMRepository _repo;
        private readonly IMapper _mapper;
        public EvaluationFileController(IGMRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet("{id}", Name = "GetEvaluationFile")]
        public async Task<IActionResult> GetEvaluationFile(int id)
        {
            var evaluationFileFromRepo = await _repo.GetEvaluationFileDetail(id);

            if (evaluationFileFromRepo == null) return NotFound();

            return Ok(evaluationFileFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetEvaluationFileList([FromQuery]CommunParams evaluationFileParams)
        {
            var evaluationFilesWithBehaviorSkillsFromRepo = await _repo.GetEvaluationFiles(evaluationFileParams);

            return Ok(evaluationFilesWithBehaviorSkillsFromRepo);
        }

        [HttpGet("evaluationFileInstances/{evaluationFileId}", Name = "GetEvaluationFileInstanceList")]
        public async Task<IActionResult> GetEvaluationFileInstanceList(int evaluationFileId)
        {
            var evaluationFilesInstanceFromRepo = await _repo.GetEvaluationFileInstancesByEvaluationFileId(evaluationFileId);
            var evaluationFileInstancesToReturn = _mapper.Map<IEnumerable<EvaluationFileInstanceHrToReturnDto>>(evaluationFilesInstanceFromRepo);

            return Ok(evaluationFileInstancesToReturn);
            // return Ok(evaluationFilesInstanceFromRepo);
        }


        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPost("new/{ownerId}")]
        public async Task<IActionResult> CreateEvaluationFile(int ownerId, EvaluationFileForCreationDto evaluationFileForCreationDto)
        {
            var user = await _repo.GetUser(ownerId, false);
            if (user.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            evaluationFileForCreationDto.OwnerId = ownerId;

            var evaluationFile = _mapper.Map<EvaluationFile>(evaluationFileForCreationDto);

            _repo.Add(evaluationFile);

            if (await _repo.SaveAll())
            {

                foreach (var bsId in evaluationFileForCreationDto.BehavioralSkillIds)
                {
                    var bsFromRepo = _repo.GetBehavioralSkill(bsId).Result;
                    evaluationFile.BehavioralSkills.Add(new EvaluationFileBehavioralSkill { BehavioralSkill = bsFromRepo });
                }
                if (await _repo.SaveAll())
                {
                    // var evaluationFileToReturn = _mapper.Map<EvaluationFileToReturnDto>(evaluationFile);
                    return CreatedAtRoute("GetEvaluationFile", new { id = evaluationFile.Id }, evaluationFile);
                }
                else
                {
                    throw new Exception("La création de l'association entre l'évaluation et la compétence a échouée lors de la sauvegarde..");
                }
            }

            throw new Exception("La création de l'évaluation a échouée lors de la sauvegarde..");
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPut("edit/{ownerId}")]
        public async Task<IActionResult> UpdateEvaluationFile(int ownerId, EvaluationFileForUpdateDto evaluationFileForUpdateDto)
        {
            var owner = await _repo.GetUser(ownerId, false);
            if (owner.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            evaluationFileForUpdateDto.OwnerId = ownerId;
            var evaluationFileFromRepo = await _repo.GetEvaluationFile(evaluationFileForUpdateDto.Id);
            if (evaluationFileFromRepo == null) return BadRequest("La fiche d'évaluation n'existe pas!");
            if (evaluationFileFromRepo.Sealed && evaluationFileForUpdateDto.Status != Constants.ARCHIVED) return BadRequest("La fiche d'évaluation est scellée!");

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

            try
            {
                await _repo.SaveAll();
                var efbsFromRepo = await _repo.GetEvaluationFileBehavioralSkills(evaluationFileForUpdateDto.Id);
                var selectedBehavioralSkillIds = evaluationFileForUpdateDto.BehavioralSkillIds;
                selectedBehavioralSkillIds = selectedBehavioralSkillIds ?? new int[] { };
                foreach (var bsId in selectedBehavioralSkillIds.Except(efbsFromRepo))
                {
                    _repo.Add<EvaluationFileBehavioralSkill>(new EvaluationFileBehavioralSkill { BehavioralSkillId = bsId, EvaluationFileId = evaluationFileFromRepo.Id });
                }
                foreach (var bsId in efbsFromRepo.Except(selectedBehavioralSkillIds))
                {
                    _repo.Delete<EvaluationFileBehavioralSkill>(new EvaluationFileBehavioralSkill { BehavioralSkillId = bsId, EvaluationFileId = evaluationFileFromRepo.Id });
                }

                await _repo.SaveAll();

                if (publishEvaluation)
                {
                    await PublishEvaluationFile(evaluationFileForUpdateDto.Id);
                    await GenerateEvaluationFileInstances(evaluationFileForUpdateDto.Id);
                }

                if (archiveEvaluation)
                {
                    await ArchiveEvaluationComponents(evaluationFileForUpdateDto.Id);
                }
                return Ok(evaluationFileFromRepo);
            }
            catch (Exception ex)
            {
                return BadRequest("Échec de la mise à jour dans le fichier d'évaluation: " + ex.Message);
            }
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPut("axisInstance/edit/{userId}/{axisInstanceId}/{userWeight}")]
        public async Task<IActionResult> UpdateAxisInstance(int userId, int axisInstanceId, int userWeight)
        {
            var userFromRepo = await _repo.GetUser(userId, false);
            if (userFromRepo.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var axisIntsnaceFromRepo = await _repo.GetAxisInstance(axisInstanceId);
            if (axisIntsnaceFromRepo != null)
            {
                axisIntsnaceFromRepo.UserWeight = userWeight;
                await _repo.SaveAll();
                return NoContent();
            }
            throw new Exception("La mise à jour de pondération a échoué lors de la sauvegarde");
        }

        private async Task PublishEvaluationFile(int evaluationFileId)
        {
            var evaluationFileFromRepo = await _repo.GetEvaluationFile(evaluationFileId);
            evaluationFileFromRepo.Sealed = true;
            evaluationFileFromRepo.SealedDate = DateTime.Now;
            var strategyFromRepo = await _repo.GetStrategy(evaluationFileFromRepo.StrategyId);
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

            var skillIds = await _repo.GetEvaluationFileBehavioralSkills(evaluationFileId);
            var behavioralSkillListFromRepo = await _repo.GetBehavioralSkillsByIds(skillIds);
            foreach (var behavioralSkill in behavioralSkillListFromRepo)
            {
                behavioralSkill.Sealed = true;
                behavioralSkill.SealedDate = DateTime.Now;
            }

            await _repo.SaveAll();
        }

        private async Task ArchiveEvaluationComponents(int evaluationFileId)
        {
            var evaluationFileFromRepo = await _repo.GetEvaluationFile(evaluationFileId);
            var strategyFromRepo = await _repo.GetStrategy(evaluationFileFromRepo.StrategyId);
            strategyFromRepo.Status = Constants.ARCHIVED;

            var skillIds = await _repo.GetEvaluationFileBehavioralSkills(evaluationFileId);
            var behavioralSkillListFromRepo = await _repo.GetBehavioralSkillsByIds(skillIds);
            foreach (var behavioralSkill in behavioralSkillListFromRepo)
            {
                behavioralSkill.Status = Constants.ARCHIVED;
            }
            await _repo.SaveAll();
        }

        private async Task GenerateEvaluationFileInstances(int evaluationFileId)
        {
            var users = await _repo.LoadAllUsers();
            var evaluationFileFromRepo = await _repo.GetEvaluationFile(evaluationFileId);

            foreach (var user in users)
            {
                var evaluationFileInstance = new EvaluationFileInstance()
                {
                    Title = evaluationFileFromRepo.Title + "-" + user.FirstName + " " + user.LastName,
                    Year = evaluationFileFromRepo.Year,
                    Status = Constants.DRAFT,
                    Created = DateTime.Now,
                    OwnerId = user.Id,
                    StrategyTitle = evaluationFileFromRepo.Strategy.Title,
                    StrategyDescription = evaluationFileFromRepo.Strategy.Description,
                    EvaluationFileId = evaluationFileId
                };

                _repo.Add(evaluationFileInstance);
            }

            if (await _repo.SaveAll())
            {
                var evaluationFileInstances = await _repo.GetEvaluationFileInstancesByEvaluationFileId(evaluationFileId);
                var axisFromRepo = await _repo.GetAxisListDetailed(evaluationFileFromRepo.StrategyId);

                foreach (var efi in evaluationFileInstances)
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
                                    PoleId = ap.PoleId,
                                    PoleWeight = ap.Weight,
                                    UserWeight = ap.Weight,
                                    Created = DateTime.Now
                                };
                                efi.AxisInstances.Add(newAxisInstance);
                                _repo.Add(newAxisInstance);
                            }
                        }
                    }
                }

                if (await _repo.SaveAll())
                {
                    var skillIds = await _repo.GetEvaluationFileBehavioralSkills(evaluationFileId);
                    var behavioralSkillListFromRepo = await _repo.GetBehavioralSkillsByIds(skillIds);
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

                        _repo.Add(newBehavioralSkillInstance);
                    }
                    if (await _repo.SaveAll())
                    {
                        var behavioralSkillInstancesFromRepo = await _repo.GetBehavioralSkillInstancesByBSIds(skillIds);
                        foreach (var efi in evaluationFileInstances)
                        {
                            foreach (var bsi in behavioralSkillInstancesFromRepo)
                            {
                                efi.BehavioralSkillInstances.Add(new EvaluationFileInstanceBehavioralSkillInstance { BehavioralSkillInstance = bsi });
                            }
                        }
                        if (!await _repo.SaveAll())
                        {
                            throw new Exception("La création de l'association entre l'évaluation et la compétence a échouée lors de la sauvegarde..");
                        }
                    }
                }
            }
        }
    }
}