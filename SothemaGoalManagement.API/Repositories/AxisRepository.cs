using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class AxisRepository : GMRepository<Axis>, IAxisRepository
    {
        public AxisRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }

        public async Task<Axis> GetAxis(int id)
        {
            return await RepositoryContext.Axis.Include(a => a.Strategy).FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Axis>> GetAxisList(int strategyId)
        {
            var axisList = await FindByCondition(a => a.StrategyId == strategyId).Include(a => a.AxisPoles).ThenInclude(ap => ap.Pole)
                                            .OrderByDescending(a => a.Created)
                                            .ToListAsync();
            return axisList;
        }

        public async Task<IEnumerable<Axis>> GetAxisListDetailed(int strategyId)
        {
            var axisList = await RepositoryContext.Axis.Include(a => a.AxisPoles).ThenInclude(ap => ap.Pole)
                                                .Where(a => a.StrategyId == strategyId)
                                                .OrderByDescending(a => a.Created)
                                                .ToListAsync();
            return axisList;
        }

        public async Task<IEnumerable<AxisPole>> GetWeightsGroupedByPoles(int strategyId)
        {
            var axisList = await FindByCondition(a => a.StrategyId == strategyId)
                                .Include(a => a.AxisPoles).ToListAsync();

            var axisPoles = new List<AxisPole>();
            foreach (var axis in axisList)
            {
                axisPoles.AddRange(axis.AxisPoles);
            }
            var results = axisPoles.GroupBy(
                                    ap => ap.PoleId,
                                    ap => ap.Weight,
                                    (key, g) => new AxisPole { PoleId = key, Weight = g.Sum() });
            return results;
        }

        public void AddAxis(Axis axis)
        {
            Add(axis);
        }

        public void UpdateAxis(Axis dbAxis)
        {
            Update(dbAxis);
        }

        public void DeleteAxis(Axis axis)
        {
            Delete(axis);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}