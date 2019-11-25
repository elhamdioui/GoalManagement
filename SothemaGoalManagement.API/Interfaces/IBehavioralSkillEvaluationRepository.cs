using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IBehavioralSkillEvaluationRepository
    {
        Task<BehavioralSkillEvaluation> GetBehavioralSkillEvaluation(int id);

        Task<IEnumerable<BehavioralSkillEvaluation>> GetBehavioralSkillEvaluationsBySheetId(int sheetId);

        void AddBehavioralSkillEvaluation(BehavioralSkillEvaluation behavioralSkillEvaluation);

        void UpdateBehavioralSkillEvaluation(BehavioralSkillEvaluation dbBehavioralSkillEvaluation);

        void DeleteBehavioralSkillEvaluation(BehavioralSkillEvaluation goalEvaluation);

        Task SaveAllAsync();

    }
}