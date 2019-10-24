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

        Task<PagedList<object>> GetUsersWithRoles(UserParams userParams);

        Task<IEnumerable<User>> SerachForUsers(string userToSearch, int userStatusId);

        Task<IEnumerable<User>> LoadAllUsers();

        Task<User> GetUser(int id, bool isCurrentUser);

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);

        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);

        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);

        Task<IEnumerable<Pole>> GetPoles();

        Task<IEnumerable<Department>> GetDepartments();

        Task<IEnumerable<UserStatus>> GetUserStatus();

        Task<PagedList<Strategy>> GetStrategies(CommunParams strategyParams);

        Task<Strategy> GetStrategy(int id);

        Task<AxisInstance> GetAxisInstance(int id);

        Task<Axis> GetAxis(int id);

        Task<IEnumerable<Axis>> GetAxisList(int strategyId);

        Task<IEnumerable<Axis>> GetAxisListDetailed(int strategyId);

        Task<IEnumerable<AxisPole>> GetAxisPoleList(int axisId);

        Task<AxisPole> GetAxisPole(int axisId, int poleId);

        Task<bool> EmployeeNumberAlreadyExists(string employeNumber, int? employeeId = null);

        Task<IEnumerable<object>> LoadEvaluators(int evaluatedId);

        Task<IEnumerable<object>> LoadEvaluatees(int evaluatorId);

        Task<EvaluatedEvaluator> GetEvaluatedEvaluator(int evaluatedId, int evaluatorId);

        Task<IEnumerable<BehavioralSkill>> GetBehavioralSkillsByIds(IEnumerable<int> ids);

        Task<IEnumerable<BehavioralSkillInstance>> GetBehavioralSkillInstancesByBSIds(IEnumerable<int> bsIds);

        Task<IEnumerable<BehavioralSkill>> GetBehavioralSkills(CommunParams behavioralSkillParams);

        Task<BehavioralSkill> GetBehavioralSkill(int id);

        Task<IEnumerable<EvaluationViewModel>> GetEvaluationFiles(CommunParams evaluationFileParams);

        Task<EvaluationFile> GetEvaluationFile(int id);

        Task<IEnumerable<int>> GetEvaluationFileBehavioralSkillIds(int evaluationFileId);

        Task<EvaluationViewModel> GetEvaluationFileDetail(int id);

        Task<IEnumerable<EvaluationFileInstance>> GetEvaluationFileInstancesByEvaluationFileId(int evaluationFileId);

        Task<IEnumerable<User>> GetUsersWithInstanceFileEvaluation(int evaluationFileId, IEnumerable<int> userIds);

        Task<EvaluationFileInstance> GetEvaluationFileInstance(int id);

    }
}