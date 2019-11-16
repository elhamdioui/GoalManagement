using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class GoalEvaluationRepository : GMRepository<GoalEvaluation>, IGoalEvaluationRepository
    {
        public GoalEvaluationRepository(DataContext repositoryContext) : base(repositoryContext) { }

        public async Task<GoalEvaluation> GetGoalEvaluation(int id)
        {
            return await FindByCondition(p => p.Id == id).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<GoalEvaluation>> GetGoalEvaluationsByGoalId(int goalId)
        {
            return await FindByCondition(ge => ge.GoalId == goalId).Include(ge => ge.Evaluator).OrderByDescending(ge => ge.Created).ToListAsync();
        }

        public void AddGoalEvaluation(GoalEvaluation goalEvaluation)
        {
            Add(goalEvaluation);
        }

        public void UpdateGoalEvaluation(GoalEvaluation dbGoalEvaluation)
        {
            Update(dbGoalEvaluation);
        }

        public void DeleteGoalEvaluation(GoalEvaluation goalEvaluation)
        {
            Delete(goalEvaluation);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}