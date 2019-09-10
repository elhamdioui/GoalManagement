using System;
using System.ComponentModel.DataAnnotations;

namespace SothemaGoalManagement.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string EmployeeNumber { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public int UserStatusId { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        [Required]
        public DateTime RecruitmentDate { get; set; }
        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}