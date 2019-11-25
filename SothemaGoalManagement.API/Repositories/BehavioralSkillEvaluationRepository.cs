using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class BehavioralSkillEvaluationRepository : GMRepository<BehavioralSkillEvaluation>, IBehavioralSkillEvaluationRepository
    {
        public BehavioralSkillEvaluationRepository(DataContext repositoryContext) : base(repositoryContext) { }

        public async Task<BehavioralSkillEvaluation> GetBehavioralSkillEvaluation(int id)
        {
            return await FindByCondition(bse => bse.Id == id).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<BehavioralSkillEvaluation>> GetBehavioralSkillEvaluationsBySheetId(int sheetId)
        {
            return await FindByCondition(bse => bse.EvaluationFileInstanceId == sheetId).Include(bse => bse.Evaluator).OrderByDescending(bse => bse.Created).ToListAsync();
        }

        public void AddBehavioralSkillEvaluation(BehavioralSkillEvaluation BehavioralSkillEvaluation)
        {
            Add(BehavioralSkillEvaluation);
        }

        public void UpdateBehavioralSkillEvaluation(BehavioralSkillEvaluation dbBehavioralSkillEvaluation)
        {
            Update(dbBehavioralSkillEvaluation);
        }

        public void DeleteBehavioralSkillEvaluation(BehavioralSkillEvaluation BehavioralSkillEvaluation)
        {
            Delete(BehavioralSkillEvaluation);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}