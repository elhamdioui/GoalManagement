using System;
using System.ComponentModel.DataAnnotations;
using SothemaGoalManagement.API.Helpers;

namespace SothemaGoalManagement.API.Dtos
{
    public class GoalForCreationDto
    {
        [Required] public string Description { get; set; }
        [Required] public int Weight { get; set; }
        [Required] public int AxisInstanceId { get; set; }
        [Required] public int GoalTypeId { get; set; }
        public string ProjectName { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; }

        public GoalForCreationDto()
        {
            Created = DateTime.Now;
            Status = Constants.DRAFT;
        }
    }
}