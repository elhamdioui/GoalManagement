using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Dtos;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class UserRepository : GMRepository<User>, IUserRepository
    {
        public UserRepository(DataContext repositoryContext) : base(repositoryContext) { }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = RepositoryContext.Users
                                .Include(d => d.Department)
                                .ThenInclude(p => p.Pole)
                                .Include(p => p.Photos)
                                .Include(s => s.UserStatus)
                                .OrderByDescending(u => u.Created)
                                .AsQueryable();

            if (userParams.DepartmentId > 0)
            {
                users = users.Where(u => u.DepartmentId == userParams.DepartmentId);
            }

            if (userParams.UserStatusId > 0)
            {
                users = users.Where(u => u.UserStatusId == userParams.UserStatusId);
            }

            if (!string.IsNullOrEmpty(userParams.UserToSearch))
            {
                users = users.Where(u => u.FirstName.ToLower().Contains(userParams.UserToSearch.ToLower())
                                    || u.LastName.ToLower().Contains(userParams.UserToSearch.ToLower()));
            }

            // if (!string.IsNullOrEmpty(userParams.OrderBy))
            // {
            //     switch (userParams.OrderBy)
            //     {
            //         case "created":
            //             users = users.OrderByDescending(u => u.Created);
            //             break;
            //         default:
            //             users = users.OrderByDescending(u => u.LastActive);
            //             break;
            //     }
            // }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<PagedList<object>> GetUsersWithRoles(UserParams userParams)
        {
            var usersWithRoles = (from user in RepositoryContext.Users.Include(p => p.Photos).Include(d => d.Department).Include(s => s.UserStatus)
                                  select new
                                  {
                                      Id = user.Id,
                                      FirstName = user.FirstName,
                                      LastName = user.LastName,
                                      Email = user.Email,
                                      Title = user.Title,
                                      DepartmentId = user.DepartmentId,
                                      UserStatusId = user.UserStatusId,
                                      Roles = (from userRole in user.UserRoles
                                               join role in RepositoryContext.Roles on userRole.RoleId equals role.Id
                                               select role.Name).ToList(),
                                      Created = user.Created,
                                      LastActive = user.LastActive,
                                      PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url
                                  }).OrderByDescending(u => u.Created)
                                  .AsQueryable();

            if (userParams.DepartmentId > 0)
            {
                usersWithRoles = usersWithRoles.Where(u => u.DepartmentId == userParams.DepartmentId);
            }

            if (userParams.UserStatusId > 0)
            {
                usersWithRoles = usersWithRoles.Where(u => u.UserStatusId == userParams.UserStatusId);
            }

            if (!string.IsNullOrEmpty(userParams.UserToSearch))
            {
                usersWithRoles = usersWithRoles.Where(u => u.FirstName.ToLower().Contains(userParams.UserToSearch.ToLower())
                                    || u.LastName.ToLower().Contains(userParams.UserToSearch.ToLower()));
            }

            // if (!string.IsNullOrEmpty(userParams.OrderBy))
            // {
            //     switch (userParams.OrderBy)
            //     {
            //         case "created":
            //             usersWithRoles = usersWithRoles.OrderByDescending(u => u.Created);
            //             break;
            //         default:
            //             usersWithRoles = usersWithRoles.OrderByDescending(u => u.LastActive);
            //             break;
            //     }
            // }

            return await PagedList<object>.CreateAsync(usersWithRoles, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<IEnumerable<User>> SerachForUsers(string userToSearch, int userStatusId)
        {
            var query = RepositoryContext.Users.Include(u => u.Department).Include(u => u.UserStatus).Include(u => u.EvaluationFileInstances).AsQueryable();
            if (!string.IsNullOrEmpty(userToSearch))
            {
                query = query.Where(u => u.FirstName.ToLower().Contains(userToSearch.ToLower()) || u.LastName.ToLower().Contains(userToSearch.ToLower()));
            }

            if (userStatusId > 0)
            {
                query = query.Where(u => u.UserStatusId == userStatusId);
            }
            return await query.ToListAsync();
        }

        public async Task<IEnumerable<User>> LoadAllUsers()
        {
            return await RepositoryContext.Users.Include(u => u.Department).ThenInclude(p => p.Pole).ToListAsync();
        }

        public async Task<User> GetUser(int id, bool ignoreCurrentUser)
        {
            var query = RepositoryContext.Users
                                .Include(d => d.Department)
                                .ThenInclude(p => p.Pole)
                                .Include(p => p.Photos)
                                .Include(s => s.UserStatus)
                                .AsQueryable();

            if (ignoreCurrentUser) query = query.IgnoreQueryFilters();

            var user = await query.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<bool> EmployeeNumberAlreadyExists(string employeNumber, int? employeeId = null)
        {
            var query = RepositoryContext.Users.Where(u => u.EmployeeNumber == employeNumber.ToLower());
            if (employeeId != null)
            {
                query = query.Where(u => u.Id != employeeId);
            }
            var results = await query.ToListAsync();
            if (results == null || results.Count == 0) return false;

            return true;
        }

        public async Task<IEnumerable<EvaluateeToReturnDto>> LoadEvaluators(int evaluatedId)
        {
            var evaluators = await (from u in RepositoryContext.Users.Include(u => u.Department)
                                    join e in RepositoryContext.EvaluatedEvaluators
                                    on u.Id equals e.EvaluatorId
                                    where e.EvaluatedId == evaluatedId
                                    select new EvaluateeToReturnDto
                                    {
                                        Id = u.Id,
                                        FullName = u.FirstName + " " + u.LastName,
                                        Title = u.Title,
                                        DepartmentName = u.Department.Name,
                                        Rank = e.Rank
                                    }).ToListAsync();

            return evaluators;
        }

        public async Task<IEnumerable<EvaluateeToReturnDto>> LoadEvaluatees(int evaluatorId)
        {
            var evaluators = await (from u in RepositoryContext.Users.Include(u => u.Department)
                                    join e in RepositoryContext.EvaluatedEvaluators
                                    on u.Id equals e.EvaluatedId
                                    where e.EvaluatorId == evaluatorId
                                    select new EvaluateeToReturnDto
                                    {
                                        Id = u.Id,
                                        FullName = u.FirstName + " " + u.LastName,
                                        Title = u.Title,
                                        DepartmentName = u.Department.Name,
                                        Rank = e.Rank
                                    }).ToListAsync();

            return evaluators;
        }

        public async Task<EvaluatedEvaluator> GetEvaluatedEvaluator(int evaluatedId, int evaluatorId)
        {
            return await RepositoryContext.EvaluatedEvaluators.SingleOrDefaultAsync(ee => ee.EvaluatedId == evaluatedId && ee.EvaluatorId == evaluatorId);
        }

        public void UpdateUser(User dbUser)
        {
            Update(dbUser);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}