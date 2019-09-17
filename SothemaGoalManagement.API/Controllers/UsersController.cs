using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Dtos;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SothemaGoalManagement.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IGMRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IGMRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId, true);
            userParams.UserId = currentUserId;
            var users = await _repo.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;

            var user = await _repo.GetUser(id, isCurrentUser);

            var userToReturn = _mapper.Map<UserForDetailDto>(user);
            return Ok(userToReturn);
        }

        [HttpGet("searchApprovers")]
        public async Task<IActionResult> searchApprovers(string searchTerm)
        {
            var userFromRepo = await _repo.SerachForUsers(searchTerm);

            var userToReturn = _mapper.Map<IEnumerable<UserForSearchResultDto>>(userFromRepo);
            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfile(int id, ProfileForUpdateDto profileForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var userFromRepo = await _repo.GetUser(id, true);
            _mapper.Map(profileForUpdateDto, userFromRepo);

            if (await _repo.SaveAll()) return NoContent();

            throw new Exception("La mise à jour de l'utilisateur a échoué lors de la sauvegarde");
        }

        [HttpGet("publishedStrategies")]
        public async Task<IActionResult> GetPublishedStrategies()
        {
            StrategyParams strategyParams = new StrategyParams()
            {
                Status = Constants.PUBLISHED
            };

            var strategies = await _repo.GetStrategies(strategyParams);

            var publishedStrategiesToReturnList = _mapper.Map<IEnumerable<Strategy>, IEnumerable<PublishedStrategiesDto>>(strategies);
            foreach (var publishedStrategiesToReturn in publishedStrategiesToReturnList)
            {
                publishedStrategiesToReturn.AxisPoles = new List<AxisPoleToReturnDto>();
                var axisPoles = new List<AxisPoleToReturnDto>();
                var axisList = strategies.Find(s => s.Id == publishedStrategiesToReturn.Id).AxisList;
                foreach (var axis in axisList)
                {
                    _mapper.Map<IEnumerable<AxisPole>, IEnumerable<AxisPoleToReturnDto>>(axis.AxisPoles, publishedStrategiesToReturn.AxisPoles);
                    axisPoles.AddRange(publishedStrategiesToReturn.AxisPoles);
                }
                publishedStrategiesToReturn.AxisPoles = axisPoles;
            }

            return Ok(publishedStrategiesToReturnList);
        }
    }
}