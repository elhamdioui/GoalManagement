using System.Collections.Generic;
using System.Linq;
using SothemaGoalManagement.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace SothemaGoalManagement.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager, DataContext context)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public void SeedData()
        {
            if (!_context.Departments.Any())
            {
                var poleDptData = System.IO.File.ReadAllText("Data/PoleDptSeedData.json");
                var polesDepartments = JsonConvert.DeserializeObject<List<Pole>>(poleDptData);

                foreach (var pd in polesDepartments)
                {
                    _context.Poles.Add(pd);
                }
                _context.SaveChangesAsync().Wait();

            }

            if (!_userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role>
                {
                    new Role{Name = "Collaborator"},
                    new Role{Name = "Admin"},
                    new Role{Name = "HR"},
                    new Role{Name = "HRD"}
                };

                foreach (var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                    user.Photos.SingleOrDefault().IsApproved = true;
                    user.DepartmentId = _context.Departments.Single(d => d.Name == "DSI").Id;
                    _userManager.CreateAsync(user, "password").Wait();
                    _userManager.AddToRoleAsync(user, "Collaborator").Wait();
                }

                var adminUser = new User
                {
                    UserName = "Admin",
                    DepartmentId = _context.Departments.Single(d => d.Name == "DSI").Id
                };

                IdentityResult result = _userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin = _userManager.FindByNameAsync("Admin").Result;
                    _userManager.AddToRolesAsync(admin, new[] { "Admin", "HR", "HRD" }).Wait();
                }
            }
        }
    }
}