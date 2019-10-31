using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IGoalRepository
    {
        Task<Goal> GetGoal(int id);

        Task<IEnumerable<Goal>> GetGoalsByAxisInstanceIds(IEnumerable<int> axisInstanceIds);

        void AddGoal(Goal goal);

        void UpdateGoal(Goal dbGoal);

        void DeleteGoal(Goal goal);

        Task SaveAllAsync();

    }
}