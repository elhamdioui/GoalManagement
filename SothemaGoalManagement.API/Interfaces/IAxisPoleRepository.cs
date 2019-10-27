using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IAxisPoleRepository
    {
        Task<IEnumerable<AxisPole>> GetAxisPoleList(int axisId);

        Task<AxisPole> GetAxisPole(int axisId, int poleId);

        void AddAxisPole(AxisPole axisPole);

        void UpdateAxisPole(AxisPole dbAxisPole);

        void DeleteAxisPole(AxisPole axisPole);

        Task SaveAllAsync();
    }
}