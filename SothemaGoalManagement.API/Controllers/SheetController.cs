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

namespace SothemaGoalManagement.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class SheetController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repo;
        private readonly IMapper _mapper;
        public SheetController(ILoggerManager logger, IRepositoryWrapper repo, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetMySheetsForUser(int userId, [FromQuery]CommunParams communParams)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                communParams.OwnerId = userId;
                var sheetsFromRepo = await _repo.EvaluationFileInstance.GetEvaluationFileInstancesForUser(communParams);
                var sheets = _mapper.Map<IEnumerable<EvaluationFileInstanceToReturnDto>>(sheetsFromRepo);

                Response.AddPagination(sheetsFromRepo.CurrentPage, sheetsFromRepo.PageSize, sheetsFromRepo.TotalCount, sheetsFromRepo.TotalPages);

                return Ok(sheets);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetMySheetsForUser endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("mySheet/{id}")]
        public async Task<IActionResult> GetMySheetDetailForUser(int userId, int id)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                var evaluationFileInstanceFromRepo = await _repo.EvaluationFileInstance.GetEvaluationFileInstance(id);
                var evaluationFileInstanceToReturn = _mapper.Map<EvaluationFileInstanceToReturnDto>(evaluationFileInstanceFromRepo);

                return Ok(evaluationFileInstanceToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetMySheetDetailForUser enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("myCollaboratorsSheets")]
        public async Task<IActionResult> GetMyCollaboratorsSheets(int userId)
        {
            try
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();
                var evaluatees = await _repo.User.LoadEvaluatees(userId);
                IList<int> evaluateeIds = new List<int>();
                foreach (var evaluatee in evaluatees)
                {
                    evaluateeIds.Add(evaluatee.Id);
                }
                var sheetsTovalidateFromRepo = await _repo.EvaluationFileInstance.GetEvaluationFileInstancesToValidate(evaluateeIds);
                var sheetsToValidate = _mapper.Map<IEnumerable<EvaluationFileInstanceToReturnDto>>(sheetsTovalidateFromRepo);

                return Ok(sheetsToValidate);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside GetMySheetsForUser endpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{axisInstanceId}/{userWeight}")]
        public async Task<IActionResult> UpdateAxisInstance(int userId, int axisInstanceId, int userWeight)
        {
            try
            {
                var userFromRepo = await _repo.User.GetUser(userId, false);
                if (userFromRepo.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

                var axisIntsnaceFromRepo = await _repo.AxisInstance.GetAxisInstance(axisInstanceId);
                if (axisIntsnaceFromRepo != null)
                {
                    var oldUserWeight = axisIntsnaceFromRepo.UserWeight;
                    axisIntsnaceFromRepo.UserWeight = userWeight;
                    _repo.AxisInstance.UpdateAxisInstance(axisIntsnaceFromRepo);
                    await _repo.AxisInstance.SaveAllAsync();

                    // Log the update of user's weight
                    var efil = new EvaluationFileInstanceLog
                    {
                        Title = axisIntsnaceFromRepo.EvaluationFileInstance.Title,
                        Created = DateTime.Now,
                        Log = $"La pondération de l\'employée est modifié de {oldUserWeight} à {userWeight} pour {axisIntsnaceFromRepo.EvaluationFileInstance.Title} par l'utilisateur avec l'identifiant: {userId}."
                    };
                    _repo.EvaluationFileInstanceLog.AddEvaluationFileInstanceLog(efil);
                    await _repo.EvaluationFileInstanceLog.SaveAllAsync();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong inside UpdateAxisInstance enfpoint: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}