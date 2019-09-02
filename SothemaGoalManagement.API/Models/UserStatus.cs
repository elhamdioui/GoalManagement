using System.Collections.Generic;

namespace SothemaGoalManagement.API.Models
{
    public class UserStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<User> Users { get; set; }
    }
}