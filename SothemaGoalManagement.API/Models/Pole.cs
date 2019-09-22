using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SothemaGoalManagement.API.Models
{
    public class Pole
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Department> Departments { get; set; }

        public ICollection<AxisPole> AxisPoles { get; set; }

        public Pole()
        {
            Departments = new Collection<Department>();
            AxisPoles = new Collection<AxisPole>();
        }
    }
}