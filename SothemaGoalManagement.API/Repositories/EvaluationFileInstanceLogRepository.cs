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
    public class EvaluationFileInstanceLogRepository : GMRepository<EvaluationFileInstanceLog>, IEvaluationFileInstanceLogRepository
    {
        public EvaluationFileInstanceLogRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }

        public async Task<IEnumerable<EvaluationFileInstanceLog>> GetEvaluationFileInstanceLogs(string evaluationFileInstanceTitle = "")
        {
            return string.IsNullOrEmpty(evaluationFileInstanceTitle) ? await FindAll().OrderByDescending(l => l.Created).ToListAsync() :
                            await FindByCondition(efil => efil.Title.Contains(evaluationFileInstanceTitle)).OrderByDescending(l => l.Created).ToListAsync();
        }

        public void AddEvaluationFileInstanceLog(EvaluationFileInstanceLog evaluationFileInstanceLog)
        {
            Add(evaluationFileInstanceLog);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}