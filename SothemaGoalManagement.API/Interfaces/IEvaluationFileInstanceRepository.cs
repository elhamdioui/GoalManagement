using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IEvaluationFileInstanceRepository
    {
        Task<IEnumerable<EvaluationFileInstance>> GetEvaluationFileInstancesByEvaluationFileId(int evaluationFileId);

        Task<IEnumerable<User>> GetUsersWithInstanceFileEvaluation(int evaluationFileId, IEnumerable<int> userIds);

        Task<EvaluationFileInstance> GetEvaluationFileInstance(int id);

        Task<PagedList<EvaluationFileInstance>> GetEvaluationFileInstancesForUser(CommunParams communParams);
        void AddEvaluationFileInstance(EvaluationFileInstance evaluationFileInstance);

        void UpdateEvaluationFileInstance(EvaluationFileInstance dbEvaluationFileInstance);

        void DeleteEvaluationFileInstance(EvaluationFileInstance evaluationFileInstance);

        Task SaveAllAsync();
    }
}