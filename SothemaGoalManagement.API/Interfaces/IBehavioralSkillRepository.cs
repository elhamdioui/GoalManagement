using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IBehavioralSkillRepository
    {
        Task<IEnumerable<BehavioralSkill>> GetBehavioralSkillsByIds(IEnumerable<int> ids);

        Task<IEnumerable<BehavioralSkill>> GetBehavioralSkills(CommunParams behavioralSkillParams);

        Task<BehavioralSkill> GetBehavioralSkill(int id);

        void AddBehavioralSkill(BehavioralSkill behavioralSkill);

        void UpdateBehavioralSkill(BehavioralSkill dbBehavioralSkill);

        void DeleteBehavioralSkill(BehavioralSkill behavioralSkill);

        Task SaveAllAsync();

    }
}