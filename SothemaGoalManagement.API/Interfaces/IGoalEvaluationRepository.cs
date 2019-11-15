using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IGoalEvaluationRepository
    {
        Task<GoalEvaluation> GetGoalEvaluation(int id);

        Task<IEnumerable<GoalEvaluation>> GetGoalEvaluationsByGoalId(int goalId);

        void AddGoalEvaluation(GoalEvaluation goalEvaluation);

        void UpdateGoalEvaluation(GoalEvaluation dbGoalEvaluation);

        void DeleteGoalEvaluation(GoalEvaluation goalEvaluation);

        Task SaveAllAsync();

    }
}