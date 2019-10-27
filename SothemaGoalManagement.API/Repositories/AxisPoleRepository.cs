using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class AxisPoleRepository : GMRepository<AxisPole>, IAxisPoleRepository
    {
        public AxisPoleRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }

        public async Task<IEnumerable<AxisPole>> GetAxisPoleList(int axisId)
        {
            var axisPoleList = await RepositoryContext.AxisPoles
                                            .Include(ap => ap.Axis)
                                            .Include(ap => ap.Pole)
                                            .Where(ap => ap.AxisId == axisId)
                                            .ToListAsync();
            return axisPoleList;
        }

        public async Task<AxisPole> GetAxisPole(int axisId, int poleId)
        {
            return await FindByCondition(ap => ap.AxisId == axisId && ap.PoleId == poleId).SingleOrDefaultAsync();
        }

        public void AddAxisPole(AxisPole axisPole)
        {
            Add(axisPole);
        }

        public void UpdateAxisPole(AxisPole dbAxisPole)
        {
            Update(dbAxisPole);
        }

        public void DeleteAxisPole(AxisPole axisPole)
        {
            Delete(axisPole);

        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}