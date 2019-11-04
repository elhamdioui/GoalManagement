using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IAxisInstanceRepository
    {
        Task<AxisInstance> GetAxisInstance(int id);

        Task<IEnumerable<AxisInstance>> GetAxisInstancesByIds(IEnumerable<int> axisInstanceIds);

        void AddAxisInstance(AxisInstance axisInstance);

        void UpdateAxisInstance(AxisInstance dbAxisInstance);

        void DeleteAxisInstance(AxisInstance axisInstance);

        Task SaveAllAsync();
    }
}