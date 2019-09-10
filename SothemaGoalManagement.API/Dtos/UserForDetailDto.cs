using System;
using System.Collections.Generic;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Dtos
{
    public class UserForDetailDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string EmployeeNumber { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserStatus UserStatus { get; set; }
        public string Title { get; set; }
        public Department Department { get; set; }
        public DateTime RecruitmentDate { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotosForDetailDto> Photos { get; set; }

    }
}