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
        public AdminController(DataContext context, IGMRepository repo, IMapper mapper, UserManager<User> userManager, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            _userManager = userManager;
            _context = context;

            Account acc = new Account(_cloudinaryConfig.Value.CloudName, _cloudinaryConfig.Value.ApiKey, _cloudinaryConfig.Value.ApiSecret);
            _cloudinary = new Cloudinary(acc);

        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var userToCreate = _mapper.Map<User>(userForRegisterDto);
            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailDto>(userToCreate);

            if (result.Succeeded)
            {
                return CreatedAtRoute("GetUser", new { controller = "Users", id = userToCreate.Id }, userToReturn);
            }
            return BadRequest(result.Errors);
        }

        [Authorize(Policy = "RequireAdminHRRoles")]
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await (from user in _context.Users
                                  orderby user.UserName
                                  select new
                                  {
                                      Id = user.Id,
                                      UserName = user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles on userRole.RoleId equals role.Id
                                               select role.Name).ToList()
                                  }).ToListAsync();

            return Ok(userList);
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
        [HttpPost("editRoles/{userName}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(userName);
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
    }
}