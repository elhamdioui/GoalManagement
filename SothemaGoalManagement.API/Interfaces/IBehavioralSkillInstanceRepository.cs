using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IBehavioralSkillInstanceRepository
    {
        Task<IEnumerable<BehavioralSkillInstance>> GetBehavioralSkillInstancesByBSIds(IEnumerable<int> bsIds);

        void AddBehavioralSkillInstance(BehavioralSkillInstance behavioralSkillInstance);

        void UpdateBehavioralSkillInstance(BehavioralSkillInstance dbBehavioralSkillInstance);

        void DeleteBehavioralSkillInstance(BehavioralSkillInstance behavioralSkillInstance);

        Task SaveAllAsync();

    }
}