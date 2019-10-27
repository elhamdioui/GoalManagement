using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class AxisInstanceRepository : GMRepository<AxisInstance>, IAxisInstanceRepository
    {
        public AxisInstanceRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }

        public async Task<AxisInstance> GetAxisInstance(int id)
        {
            return await FindByCondition(a => a.Id == id).SingleOrDefaultAsync();
        }

        public void AddAxisInstance(AxisInstance axisInstance)
        {
            Add(axisInstance);
        }

        public void UpdateAxisInstance(AxisInstance dbAxisInstance)
        {
            Update(dbAxisInstance);
        }

        public void DeleteAxisInstance(AxisInstance axisInstance)
        {
            Delete(axisInstance);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}