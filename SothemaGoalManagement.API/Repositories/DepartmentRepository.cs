using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class DepartmentRepository : GMRepository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }
        public async Task<IEnumerable<Department>> GetDepartments()
        {
            return await RepositoryContext.Departments.Include(u => u.Users).Include(p => p.Pole).ToListAsync();
        }
    }
}