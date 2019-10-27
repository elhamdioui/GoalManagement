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
    public class StrategyRepository : GMRepository<Strategy>, IStrategyRepository
    {
        public StrategyRepository(DataContext repositoryContext) : base(repositoryContext)
        {

        }

        public async Task<PagedList<Strategy>> GetStrategies(CommunParams strategyParams)
        {
            var strategies = RepositoryContext.Strategies
                                .Include(u => u.Owner)
                                .Include(s => s.AxisList)
                                .ThenInclude(a => a.AxisPoles)
                                .ThenInclude(p => p.Pole)
                                .OrderByDescending(s => s.Created)
                                .AsQueryable();

            switch (strategyParams.Status)
            {
                case Constants.PUBLISHED:
                    strategies = strategies.Where(s => s.Status == Constants.PUBLISHED);
                    break;
                case Constants.DRAFT:
                    strategies = strategies.Where(s => s.Status == Constants.DRAFT && s.OwnerId == strategyParams.OwnerId);
                    break;
                case Constants.REVIEW:
                    strategies = strategies.Where(s => s.Status == Constants.REVIEW);
                    break;
                case Constants.ARCHIVED:
                    strategies = strategies.Where(s => s.Status == Constants.ARCHIVED);
                    break;
                default:
                    strategies = strategies.Where(s => s.OwnerId == strategyParams.OwnerId);
                    break;
            }

            return await PagedList<Strategy>.CreateAsync(strategies, strategyParams.PageNumber, strategyParams.PageSize);
        }

        public async Task<Strategy> GetStrategy(int id)
        {
            return await RepositoryContext.Strategies.Include(s => s.Owner)
                                            .Include(s => s.AxisList)
                                            .ThenInclude(a => a.AxisPoles)
                                            .FirstOrDefaultAsync(s => s.Id == id);
        }

        public void AddStrategy(Strategy strategy)
        {
            Add(strategy);
        }

        public void UpdateStrategy(Strategy dbStrategy)
        {
            Update(dbStrategy);
        }

        public void DeleteStrategy(Strategy strategy)
        {
            Delete(strategy);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}