using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IStrategyRepository
    {
        Task<PagedList<Strategy>> GetStrategies(CommunParams strategyParams);

        Task<Strategy> GetStrategy(int id);

        void AddStrategy(Strategy strategy);

        void UpdateStrategy(Strategy dbStrategy);

        void DeleteStrategy(Strategy strategy);

        Task SaveAllAsync();

    }
}