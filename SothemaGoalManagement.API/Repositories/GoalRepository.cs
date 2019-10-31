using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class GoalRepository : GMRepository<Goal>, IGoalRepository
    {
        public GoalRepository(DataContext repositoryContext) : base(repositoryContext) { }

        public async Task<Goal> GetGoal(int id)
        {
            return await FindByCondition(p => p.Id == id).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Goal>> GetGoalsByAxisInstanceIds(IEnumerable<int> axisInstanceIds)
        {
            return await FindByCondition(u => axisInstanceIds.Contains(u.AxisInstanceId))
                                .Include(t => t.GoalType)
                                .Include(a => a.AxisInstance).ToListAsync();
        }

        public void AddGoal(Goal Goal)
        {
            Add(Goal);
        }

        public void UpdateGoal(Goal dbGoal)
        {
            Update(dbGoal);
        }

        public void DeleteGoal(Goal Goal)
        {
            Delete(Goal);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}