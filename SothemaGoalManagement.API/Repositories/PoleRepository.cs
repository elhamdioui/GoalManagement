using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class PoleRepository : GMRepository<Pole>, IPoleRepository
    {
        public PoleRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }

        public async Task<IEnumerable<Pole>> GetPoles()
        {
            return await RepositoryContext.Poles.Include(p => p.Departments).ToListAsync();
        }
    }
}