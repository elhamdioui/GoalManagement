using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IUserStatusRepository
    {
        Task<IEnumerable<UserStatus>> GetUserStatus();
    }
}