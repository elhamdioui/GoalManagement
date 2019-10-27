using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class UserStatusRepository : GMRepository<UserStatus>, IUserStatusRepository
    {
        public UserStatusRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }
        public async Task<IEnumerable<UserStatus>> GetUserStatus()
        {
            return await RepositoryContext.UserStatus.Include(u => u.Users).ToListAsync();
        }
    }
}