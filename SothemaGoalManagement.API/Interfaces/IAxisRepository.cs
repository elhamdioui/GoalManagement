using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IAxisRepository
    {
        Task<Axis> GetAxis(int id);

        Task<IEnumerable<Axis>> GetAxisList(int strategyId);

        Task<IEnumerable<Axis>> GetAxisListDetailed(int strategyId);

        Task<IEnumerable<AxisPole>> GetWeightsGroupedByPoles(int strategyId);

        void AddAxis(Axis axis);

        void UpdateAxis(Axis dbAxis);

        void DeleteAxis(Axis axis);

        Task SaveAllAsync();
    }
}