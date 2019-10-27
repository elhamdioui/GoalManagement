using System.Collections.Generic;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IPoleRepository
    {
        Task<IEnumerable<Pole>> GetPoles();
    }
}