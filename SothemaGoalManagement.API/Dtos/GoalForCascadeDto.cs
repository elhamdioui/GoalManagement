using System;
using System.ComponentModel.DataAnnotations;
using SothemaGoalManagement.API.Helpers;

namespace SothemaGoalManagement.API.Dtos
{
    public class GoalForCascadeDto
    {
        [Required] public GoalForCreationDto GoalForCreationDto { get; set; }
        [Required] public int EvaluateeId { get; set; }
        [Required] public int ParentGoalId { get; set; }
        [Required] public string AxisInstanceTitle { get; set; }
    }
}