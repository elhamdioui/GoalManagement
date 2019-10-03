using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Dtos;
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
        public async Task<IActionResult> GetBehavioralSkillList()
        {
            var behavioralSkillsFromRepo = await _repo.GetBehavioralSkills();
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
        [HttpPut("edit/{createdById}")]
        public async Task<IActionResult> UpdateBehavioralSkill(int createdById, BehavioralSkillForUpdateDto behavioralSkillForUpdateDto)
        {
            var owner = await _repo.GetUser(createdById, false);
            if (owner.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            behavioralSkillForUpdateDto.CreatedById = createdById;
            var behavioralSkillFromRepo = await _repo.GetBehavioralSkill(behavioralSkillForUpdateDto.Id);

            _mapper.Map(behavioralSkillForUpdateDto, behavioralSkillFromRepo);

            if (await _repo.SaveAll()) return NoContent();

            throw new Exception("La mise à jour de la compétence comportementale a échouée.");
        }
    }
}