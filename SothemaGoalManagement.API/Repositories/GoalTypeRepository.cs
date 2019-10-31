using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class GoalTypeRepository : GMRepository<GoalType>, IGoalTypeRepository
    {
        public GoalTypeRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }
        public async Task<IEnumerable<GoalType>> GetGoalType()
        {
            return await FindAll().ToListAsync();
        }
    }
}