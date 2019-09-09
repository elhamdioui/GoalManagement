using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Data
{
    public interface IGMRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);

        Task<IEnumerable<User>> SerachForUsers(string searchTerm);

        Task<User> GetUser(int id, bool isCurrentUser);

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);

        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);

        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);

        Task<IEnumerable<Pole>> GetPoles();

        Task<IEnumerable<Department>> GetDepartments();

        Task<IEnumerable<UserStatus>> GetUserStatus();

        Task<PagedList<Strategy>> GetStrategies(StrategyParams strategyParams);

        Task<Strategy> GetStrategy(int id);

        Task<bool> EmployeeNumberAlreadyExists(string employeNumber);

    }
}