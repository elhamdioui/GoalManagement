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
        [HttpGet("strategies")]
        public async Task<IActionResult> GetStrategies([FromQuery]StrategyParams strategyParams)
        {
            var strategies = await _repo.GetStrategies(strategyParams);
            var strategiesToReturn = _mapper.Map<IEnumerable<StrategyForListDto>>(strategies);
            Response.AddPagination(strategies.CurrentPage, strategies.PageSize, strategies.TotalCount, strategies.TotalPages);

            return Ok(strategiesToReturn);
        }
    }
}