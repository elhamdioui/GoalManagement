using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace SothemaGoalManagement.API.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }

        public Role()
        {
            UserRoles = new Collection<UserRole>();
        }
    }
}