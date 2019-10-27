using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class EvaluationFileInstanceRepository : GMRepository<EvaluationFileInstance>, IEvaluationFileInstanceRepository
    {
        public EvaluationFileInstanceRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }
        public async Task<IEnumerable<EvaluationFileInstance>> GetEvaluationFileInstancesByEvaluationFileId(int evaluationFileId)
        {
            return await RepositoryContext.EvaluationFileInstances.Include(efi => efi.AxisInstances)
                                                        .Include(efi => efi.Owner)
                                                        .ThenInclude(u => u.Department)
                                                        .ThenInclude(d => d.Pole)
                                                        .Where(efi => efi.EvaluationFileId == evaluationFileId).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetUsersWithInstanceFileEvaluation(int evaluationFileId, IEnumerable<int> userIds)
        {
            return await RepositoryContext.EvaluationFileInstances.Include(efi => efi.Owner)
                                                         .Where(efi => efi.EvaluationFileId == evaluationFileId &&
                                                                        userIds.Contains(efi.OwnerId))
                                                         .Select(efi => efi.Owner)
                                                         .ToListAsync();
        }

        public async Task<EvaluationFileInstance> GetEvaluationFileInstance(int id)
        {
            return await FindByCondition(efi => efi.Id == id).SingleOrDefaultAsync();
        }

        public void AddEvaluationFileInstance(EvaluationFileInstance evaluationFileInstance)
        {
            Add(evaluationFileInstance);
        }

        public void UpdateEvaluationFileInstance(EvaluationFileInstance dbEvaluationFileInstance)
        {
            Update(dbEvaluationFileInstance);
        }

        public void DeleteEvaluationFileInstance(EvaluationFileInstance evaluationFileInstance)
        {
            Delete(evaluationFileInstance);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}