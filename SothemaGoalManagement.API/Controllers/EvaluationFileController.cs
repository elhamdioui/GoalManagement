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

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPost("new/{createdById}")]
        public async Task<IActionResult> CreateEvaluationFile(int createdById, EvaluationFileForCreationDto evaluationFileForCreationDto)
        {
            var user = await _repo.GetUser(createdById, false);
            if (user.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            evaluationFileForCreationDto.CreatedById = createdById;

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
        [HttpPut("edit/{createdById}")]
        public async Task<IActionResult> UpdateEvaluationFile(int createdById, EvaluationFileForUpdateDto evaluationFileForUpdateDto)
        {
            var owner = await _repo.GetUser(createdById, false);
            if (owner.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            evaluationFileForUpdateDto.CreatedById = createdById;
            var evaluationFileFromRepo = await _repo.GetEvaluationFile(evaluationFileForUpdateDto.Id);
            var generateEvaluationInstances = false;
            if (evaluationFileFromRepo.Status != Constants.PUBLISHED && evaluationFileForUpdateDto.Status == Constants.PUBLISHED)
            {
                generateEvaluationInstances = true;
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

                if(generateEvaluationInstances)
                {
                    
                }
                return Ok(evaluationFileFromRepo);
            }
            catch (Exception ex)
            {
                return BadRequest("Échec de la mise à jour dans le fichier d'évaluation: " + ex.Message);
            }


        }
    }
}