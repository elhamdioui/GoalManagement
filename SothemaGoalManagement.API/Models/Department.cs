using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SothemaGoalManagement.API.Models
{
    public class Department
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Pole Pole { get; set; }

        public int PoleId { get; set; }

        public ICollection<User> Users { get; set; }

        public Department()
        {
            Users = new Collection<User>();
        }
    }
}