using System;
using System.Collections.Generic;
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
    public class BehavioralSkillController : ControllerBase
    {
        private readonly IGMRepository _repo;
        private readonly IMapper _mapper;
        public BehavioralSkillController(IGMRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet("{id}", Name = "GetBehavioralSkill")]
        public async Task<IActionResult> GetBehavioralSkill(int id)
        {
            var behavioralSkillFromRepo = await _repo.GetBehavioralSkill(id);

            if (behavioralSkillFromRepo == null) return NotFound();

            return Ok(behavioralSkillFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetBehavioralSkillList([FromQuery]CommunParams behavioralSkillParams)
        {
            var behavioralSkillsFromRepo = await _repo.GetBehavioralSkills(behavioralSkillParams);
            var behavioralSkillsToReturn = _mapper.Map<IEnumerable<BehavioralSkillToReturnDto>>(behavioralSkillsFromRepo);
            return Ok(behavioralSkillsToReturn);
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPost("new/{createdById}")]
        public async Task<IActionResult> CreateBehavioralSkill(int createdById, BehavioralSkillForCreationDto behavioralSkillForCreationDto)
        {
            var user = await _repo.GetUser(createdById, false);
            if (user.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            behavioralSkillForCreationDto.CreatedById = createdById;

            var behavioralSkill = _mapper.Map<BehavioralSkill>(behavioralSkillForCreationDto);

            _repo.Add(behavioralSkill);

            if (await _repo.SaveAll())
            {
                var behavioralSkillToReturn = _mapper.Map<BehavioralSkillToReturnDto>(behavioralSkill);
                return CreatedAtRoute("GetBehavioralSkill", new { id = behavioralSkill.Id }, behavioralSkillToReturn);
            }


            throw new Exception("La création du compétence comportementale a échouée lors de la sauvegarde..");
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPost("clone/{ownerId}/{BehavioralSkillId}")]
        public async Task<IActionResult> CloneBehavioralSkill(int ownerId, int BehavioralSkillId)
        {
            var owner = await _repo.GetUser(ownerId, false);
            if (owner.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var behavioralSkillFromRepo = await _repo.GetBehavioralSkill(BehavioralSkillId);
            var newBehavioralSkill = new BehavioralSkillForCreationDto()
            {
                Skill = behavioralSkillFromRepo.Skill + " - clone",
                CreatedById = ownerId,
                Definition = behavioralSkillFromRepo.Definition,
                LevelOne = behavioralSkillFromRepo.LevelOne,
                LevelOneGrade = behavioralSkillFromRepo.LevelOneGrade,
                LevelOneDescription = behavioralSkillFromRepo.LevelOneDescription,
                LevelTwo = behavioralSkillFromRepo.LevelTwo,
                LevelTwoGrade = behavioralSkillFromRepo.LevelTwoGrade,
                LevelTwoDescription = behavioralSkillFromRepo.LevelTwoDescription,
                LevelThree = behavioralSkillFromRepo.LevelThree,
                LevelThreeGrade = behavioralSkillFromRepo.LevelThreeGrade,
                LevelThreeDescription = behavioralSkillFromRepo.LevelThreeDescription,
                LevelFour = behavioralSkillFromRepo.LevelFour,
                LevelFourGrade = behavioralSkillFromRepo.LevelFourGrade,
                LevelFourDescription = behavioralSkillFromRepo.LevelFourDescription,
            };

            var behavioralSkill = _mapper.Map<BehavioralSkill>(newBehavioralSkill);

            _repo.Add(behavioralSkill);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception("Le clonage a échoué.");
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpDelete("delete/{BehavioralSkillId}")]
        public async Task<IActionResult> DeleteStrategy(int BehavioralSkillId)
        {
            var behavioralSkillFromRepo = await _repo.GetBehavioralSkill(BehavioralSkillId);

            if (behavioralSkillFromRepo == null) return NotFound();
            if (behavioralSkillFromRepo.Status == Constants.PUBLISHED || behavioralSkillFromRepo.Status == Constants.ARCHIVED) return BadRequest("Vous ne pouvez pas supprimer cette stratégie");

            _repo.Delete(behavioralSkillFromRepo);
            if (await _repo.SaveAll()) return Ok();
            return BadRequest("Échoué de supprimer la compétence");
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPut("edit/{createdById}")]
        public async Task<IActionResult> UpdateBehavioralSkill(int createdById, BehavioralSkillForUpdateDto behavioralSkillForUpdateDto)
        {
            var owner = await _repo.GetUser(createdById, false);
            if (owner.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            behavioralSkillForUpdateDto.CreatedById = createdById;
            var behavioralSkillFromRepo = await _repo.GetBehavioralSkill(behavioralSkillForUpdateDto.Id);
            if (behavioralSkillFromRepo.Sealed) return BadRequest("La compétence comportementale est scellée!");

            _mapper.Map(behavioralSkillForUpdateDto, behavioralSkillFromRepo);

            if (await _repo.SaveAll()) return NoContent();

            throw new Exception("La mise à jour de la compétence comportementale a échouée.");
        }
    }
}