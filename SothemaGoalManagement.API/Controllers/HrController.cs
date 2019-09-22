using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Dtos;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using System;
using System.Security.Claims;

namespace SothemaGoalManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class HrController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IGMRepository _repo;

        public HrController(IGMRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpGet("{id}", Name = "GetStrategy")]
        public async Task<IActionResult> GetStrategy(int ownerId, int id)
        {
            try
            {
                if (ownerId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                var strategyFromRepo = await _repo.GetStrategy(id);

                if (strategyFromRepo == null) return NotFound();

                var strategyToReturn = _mapper.Map<StrategyToReturnDto>(strategyFromRepo);
                return Ok(strategyToReturn);

            }
            catch (Exception ex)
            {
                return Unauthorized();
            }

        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpGet("strategies")]
        public async Task<IActionResult> GetStrategies([FromQuery]StrategyParams strategyParams)
        {
            var strategies = await _repo.GetStrategies(strategyParams);
            var strategiesToReturn = _mapper.Map<IEnumerable<StrategyForListDto>>(strategies);
            Response.AddPagination(strategies.CurrentPage, strategies.PageSize, strategies.TotalCount, strategies.TotalPages);

            return Ok(strategiesToReturn);
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPost("strategies/new/{ownerId}")]
        public async Task<IActionResult> CreateStrategy(int ownerId, StrategyForCreationDto strategyForCreationDto)
        {
            var owner = await _repo.GetUser(ownerId, false);
            if (owner.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            strategyForCreationDto.OwnerId = ownerId;
            strategyForCreationDto.Status = Constants.DRAFT;

            var strategy = _mapper.Map<Strategy>(strategyForCreationDto);

            _repo.Add(strategy);

            if (await _repo.SaveAll())
            {
                var strategyToReturn = _mapper.Map<StrategyToReturnDto>(strategy);
                return CreatedAtRoute("GetStrategy", new { id = strategy.Id }, strategyToReturn);
            }


            throw new Exception("La création du stratégie a échouée lors de la sauvegarde..");
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPut("strategies/edit/{ownerId}")]
        public async Task<IActionResult> UpdateStrategy(int ownerId, StrategyForUpdateDto strategyForUpdateDto)
        {
            var owner = await _repo.GetUser(ownerId, false);
            if (owner.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            strategyForUpdateDto.OwnerId = ownerId;
            var strategyFromRepo = await _repo.GetStrategy(strategyForUpdateDto.Id);

            _mapper.Map(strategyForUpdateDto, strategyFromRepo);

            if (await _repo.SaveAll()) return NoContent();

            throw new Exception("La mise à jour de la stratégie a échouée.");
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPost("addAxis")]
        public async Task<IActionResult> AddAxis(AxisForCreationDto axisForCreationDto)
        {
            var axis = _mapper.Map<Axis>(axisForCreationDto);

            _repo.Add(axis);
            try
            {
                if (await _repo.SaveAll())
                {
                    var axisToReturn = _mapper.Map<AxisToReturnDto>(axis);
                    // map added axis to poles
                    await mapNewAxisToPoles(axisToReturn.Id);
                    return CreatedAtRoute("GetAxis", new { id = axis.Id }, axisToReturn);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("La création de l'axe stratigique a échoué lors de la sauvegarde.");
            }



            throw new Exception("La création de l'axe stratigique a échoué lors de la sauvegarde.");
        }
        private async Task mapNewAxisToPoles(int axisId)
        {
            var poles = await _repo.GetPoles();
            foreach (var pole in poles)
            {
                var axisPole = new AxisPole()
                {
                    AxisId = axisId,
                    PoleId = pole.Id,
                    Weight = 0
                };
                _repo.Add(axisPole);
            }

            await _repo.SaveAll();
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpGet("axis/{id}", Name = "GetAxis")]
        public async Task<IActionResult> GetAxis(int id)
        {
            var axisFromRepo = await _repo.GetAxis(id);

            if (axisFromRepo == null) return NotFound();

            var axisToReturn = _mapper.Map<AxisToReturnDto>(axisFromRepo);
            return Ok(axisToReturn);
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpGet("axisList/{strategyId}", Name = "GetAxisList")]
        public async Task<IActionResult> GetAxisList(int strategyId)
        {
            var axisListFromRepo = await _repo.GetAxisList(strategyId);

            var axisListToReturn = _mapper.Map<IEnumerable<AxisToReturnDto>>(axisListFromRepo);
            return Ok(axisListToReturn);
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPut("updateAxis/{id}")]
        public async Task<IActionResult> UpdateAxis(int id, AxisForUpdateDto axisForUpdateDto)
        {
            var axisFromRepo = await _repo.GetAxis(id);
            _mapper.Map(axisForUpdateDto, axisFromRepo);

            if (await _repo.SaveAll()) return NoContent();

            throw new Exception("La mise à jour de l'axe a échoué lors de la sauvegarde");
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpDelete("axis/{id}/delete/{userId}")]
        public async Task<IActionResult> DeleteAxis(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var axisFromRepo = await _repo.GetAxis(id);

            if (axisFromRepo == null) return NotFound();

            _repo.Delete(axisFromRepo);

            if (await _repo.SaveAll()) return Ok();
            return BadRequest("Échoué de supprimer l'axe");
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpGet("axisPoleList/{axisId}", Name = "GetAxisPoleList")]
        public async Task<IActionResult> GetAxisPoleList(int axisId)
        {
            var axisListPoleFromRepo = await _repo.GetAxisPoleList(axisId);

            var axisPoleListToReturn = _mapper.Map<IEnumerable<AxisPoleToReturnDto>>(axisListPoleFromRepo);
            return Ok(axisPoleListToReturn);
        }

        [Authorize(Policy = "RequireHRHRDRoles")]
        [HttpPut("updateAxisPole/{axisId}/{poleId}/{weight}")]
        public async Task<IActionResult> updateAxisPole(int axisId, int poleId, int weight)
        {
            var axisPoleFromRepo = await _repo.GetAxisPole(axisId, poleId);
            if (axisPoleFromRepo != null)
            {
                axisPoleFromRepo.Weight = weight;

                if (await _repo.SaveAll()) return NoContent();
            }

            throw new Exception("La mise à jour de l'axe a échoué lors de la sauvegarde");
        }
    }
}