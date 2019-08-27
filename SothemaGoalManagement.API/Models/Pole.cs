using System.Collections.Generic;

namespace SothemaGoalManagement.API.Models
{
    public class Pole
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Department> Departments { get; set; }
    }
}