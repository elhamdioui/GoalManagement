using System.Collections.Generic;

namespace SothemaGoalManagement.API.Models
{
    public class Department
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Pole Pole { get; set; }

        public int PoleId { get; set; }

        public ICollection<User> Users { get; set; }
    }
}