using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class BehavioralSkillRepository : GMRepository<BehavioralSkill>, IBehavioralSkillRepository
    {
        public BehavioralSkillRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }

        public async Task<IEnumerable<BehavioralSkill>> GetBehavioralSkillsByIds(IEnumerable<int> ids)
        {
            return await FindByCondition(bs => ids.Contains(bs.Id)).ToListAsync();
        }
        public async Task<IEnumerable<BehavioralSkillInstance>> GetBehavioralSkillInstancesByBSIds(IEnumerable<int> bsIds)
        {
            return await RepositoryContext.BehavioralSkillInstances.Where(bsi => bsIds.Contains(bsi.BehavioralSkillId)).ToListAsync();
        }

        public async Task<IEnumerable<BehavioralSkill>> GetBehavioralSkills(CommunParams behavioralSkillParams)
        {
            var behavioralSkills = FindAll().Include(bs => bs.CreatedBy)
                                                            .OrderByDescending(s => s.Created)
                                                            .AsQueryable();

            switch (behavioralSkillParams.Status)
            {
                case Constants.PUBLISHED:
                    behavioralSkills = behavioralSkills.Where(s => s.Status == Constants.PUBLISHED);
                    break;
                case Constants.DRAFT:
                    behavioralSkills = behavioralSkills.Where(s => s.Status == Constants.DRAFT && s.CreatedById == behavioralSkillParams.OwnerId);
                    break;
                case Constants.REVIEW:
                    behavioralSkills = behavioralSkills.Where(s => s.Status == Constants.REVIEW);
                    break;
                case Constants.ARCHIVED:
                    behavioralSkills = behavioralSkills.Where(s => s.Status == Constants.ARCHIVED);
                    break;
                default:
                    behavioralSkills = behavioralSkills.Where(s => (s.Status == Constants.DRAFT && s.CreatedById == behavioralSkillParams.OwnerId)
                    || s.Status == Constants.REVIEW || s.Status == Constants.PUBLISHED || s.Status == Constants.ARCHIVED);
                    break;
            }

            return await behavioralSkills.ToListAsync();
        }
        public async Task<BehavioralSkill> GetBehavioralSkill(int id)
        {
            return await FindByCondition(bs => bs.Id.Equals(id)).SingleOrDefaultAsync();
        }

        public void AddBehavioralSkill(BehavioralSkill behavioralSkill)
        {
            Add(behavioralSkill);
        }

        public void UpdateBehavioralSkill(BehavioralSkill dbBehavioralSkill)
        {
            Update(dbBehavioralSkill);
        }

        public void DeleteBehavioralSkill(BehavioralSkill behavioralSkill)
        {
            Delete(behavioralSkill);

        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}