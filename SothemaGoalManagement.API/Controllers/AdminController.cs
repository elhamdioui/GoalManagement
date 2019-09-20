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
using Microsoft.Extensions.Configuration;

namespace SothemaGoalManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IMapper _mapper;
        private readonly IGMRepository _repo;
        private readonly IConfiguration _config;

        public AdminController(IConfiguration config, DataContext context, IGMRepository repo, IMapper mapper, UserManager<User> userManager, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _config = config;
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            _userManager = userManager;
            _context = context;

            Account acc = new Account(_cloudinaryConfig.Value.CloudName, _cloudinaryConfig.Value.ApiKey, _cloudinaryConfig.Value.ApiSecret);
            _cloudinary = new Cloudinary(acc);

        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpGet("emailAlreadyExists")]
        public async Task<IActionResult> EmailAlreadyExists(string email)
        {
            var result = await _userManager.FindByNameAsync(email) ?? await _userManager.FindByEmailAsync(email);

            return Ok(result != null);
        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpGet("employeeNumberAlreadyExists")]
        public async Task<IActionResult> EmployeeNumberAlreadyExists(string employeeNumber)
        {
            var result = await _repo.EmployeeNumberAlreadyExists(employeeNumber);

            return Ok(result);
        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpPost("register/{notifyUser}")]
        public async Task<IActionResult> Register(bool notifyUser, [FromBody]UserForRegisterDto userForRegisterDto)
        {
            // Make sure employee number and emails are unique
            var checkEmployeeNumber = await _repo.EmployeeNumberAlreadyExists(userForRegisterDto.EmployeeNumber);
            if (checkEmployeeNumber) return BadRequest("Matricule existe déjà.");

            var checkEmail = await _userManager.FindByNameAsync(userForRegisterDto.Email) ?? await _userManager.FindByEmailAsync(userForRegisterDto.Email);
            if (checkEmail != null) return BadRequest("Email existe déjà");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);
            userToCreate.UserName = userForRegisterDto.Email;
            userToCreate.EmployeeNumber = userForRegisterDto.EmployeeNumber.ToLower();
            IdentityResult result = null;
            result = _userManager.CreateAsync(userToCreate, "Password123").Result;
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(userToCreate, "Collaborator");
                var userToReturn = _mapper.Map<UserForDetailDto>(userToCreate);

                if (result.Succeeded)
                {
                    if (notifyUser)
                    {
                        // Notify user by email to change his default password
                        var generatedToken = await _userManager.GeneratePasswordResetTokenAsync(userToCreate);
                        generatedToken = System.Web.HttpUtility.UrlEncode(generatedToken);
                        var content = $"{userToCreate.FirstName},<br><p>Votre nouveau compte pour l'application Goal management a été créé.</p><p></p><p>Veuillez réinitialiser votre mot de passe, en suivant ce lien(ou bien collez - le dans votre navigateur) dans les 90 prochaines minutes:<br>http://localhost:4200/resetPassword?token={generatedToken}&email={userToCreate.Email}</p>";
                        await new Mailer(_config).SendEmail(userToCreate.Email, generatedToken, "Bienvenue à l'application Goal Management", content);
                    }
                    return CreatedAtRoute("GetUser", new { controller = "Users", id = userToCreate.Id }, userToReturn);
                }

            }

            return BadRequest(result.Errors);
        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles([FromQuery]UserParams userParams)
        {
            var users = await _repo.GetUsersWithRoles(userParams);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpGet("departments")]
        public async Task<IActionResult> GetDepartments()
        {
            var departmentList = await _repo.GetDepartments();
            var departmentsToReturn = _mapper.Map<IEnumerable<DepartmentToReturnDto>>(departmentList);

            return Ok(departmentsToReturn);
        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpGet("userStatus")]
        public async Task<IActionResult> GetUserStatus()
        {
            var userStatusList = await _repo.GetUserStatus();
            var userStatusToReturn = _mapper.Map<IEnumerable<UserStatusToReturnDto>>(userStatusList);

            return Ok(userStatusToReturn);
        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpPost("editRoles/{userId}")]
        public async Task<IActionResult> EditRoles(string userId, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;
            selectedRoles = selectedRoles ?? new string[] { };
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove the roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpGet("photosForModeration")]
        public async Task<IActionResult> GetPhotosForModeration()
        {
            var photos = await _context.Photos.Include(u => u.User).IgnoreQueryFilters().Where(p => p.IsApproved == false).Select(u => new
            {
                Id = u.Id,
                UserName = u.User.UserName,
                Url = u.Url,
                IsApproved = u.IsApproved
            }).ToListAsync();

            return Ok(photos);
        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpPost("approvePhoto/{photoId}")]
        public async Task<IActionResult> ApprovePhoto(int photoId)
        {
            var photo = await _context.Photos.IgnoreQueryFilters().FirstOrDefaultAsync(p => p.Id == photoId);
            photo.IsApproved = true;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpPost("rejectPhoto/{photoId}")]
        public async Task<IActionResult> RejectPhoto(int photoId)
        {
            var photo = await _context.Photos.IgnoreQueryFilters().FirstOrDefaultAsync(p => p.Id == photoId);

            if (photo.IsMain) return BadRequest("You cannot reject the main photo");

            if (photo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photo.PublicId);
                var result = _cloudinary.Destroy(deleteParams);
                if (result.Result == "ok") _context.Photos.Remove(photo);
            }

            if (photo.PublicId == null) _context.Photos.Remove(photo);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut()]
        public async Task<IActionResult> UpdateUser(UserForUpdateDto userForUpdateDto)
        {
            // Double check duplicate employee numbers
            var checkEmployeeNumber = await _repo.EmployeeNumberAlreadyExists(userForUpdateDto.EmployeeNumber, userForUpdateDto.Id);
            if (checkEmployeeNumber) return BadRequest("Matricule existe déjà.");

            // double check dupkicate emails
            var userFoundWithEmail = await _userManager.FindByNameAsync(userForUpdateDto.Email) ?? await _userManager.FindByEmailAsync(userForUpdateDto.Email);
            if (userFoundWithEmail != null && userFoundWithEmail.Id != userForUpdateDto.Id)
            {
                return BadRequest("Email existe déjà.");
            }

            // proceed with update
            var userFromRepo = await _repo.GetUser(userForUpdateDto.Id, true);
            userFromRepo.UserName = userForUpdateDto.Email;
            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll()) return NoContent();

            throw new Exception("La mise à jour de l'utilisateur a échoué lors de l'enregistrement.");
        }
    }
}