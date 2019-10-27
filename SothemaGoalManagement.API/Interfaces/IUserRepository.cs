using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IUserRepository : IGMRepository<User>
    {
        Task<PagedList<User>> GetUsers(UserParams userParams);

        Task<PagedList<object>> GetUsersWithRoles(UserParams userParams);

        Task<IEnumerable<User>> SerachForUsers(string userToSearch, int userStatusId);

        Task<IEnumerable<User>> LoadAllUsers();

        Task<User> GetUser(int id, bool isCurrentUser);

        Task<bool> EmployeeNumberAlreadyExists(string employeNumber, int? employeeId = null);

        Task<IEnumerable<object>> LoadEvaluators(int evaluatedId);

        Task<IEnumerable<object>> LoadEvaluatees(int evaluatorId);

        Task<EvaluatedEvaluator> GetEvaluatedEvaluator(int evaluatedId, int evaluatorId);

        void UpdateUser(User dbUser);

        Task SaveAllAsync();
    }
}