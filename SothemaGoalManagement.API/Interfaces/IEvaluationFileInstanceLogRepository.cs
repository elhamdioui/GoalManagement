using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IEvaluationFileInstanceLogRepository
    {
        Task<IEnumerable<EvaluationFileInstanceLog>> GetEvaluationFileInstanceLogs(string evaluationFileInstanceTitle = "");

        void AddEvaluationFileInstanceLog(EvaluationFileInstanceLog evaluationFileInstanceLog);

        Task SaveAllAsync();

    }
}