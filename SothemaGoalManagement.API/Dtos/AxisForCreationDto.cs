using System;
using System.ComponentModel.DataAnnotations;

namespace SothemaGoalManagement.API.Dtos
{
    public class AxisForCreationDto
    {
        [Required] public int StrategyId { get; set; }
        [Required] public string Title { get; set; }
        [Required] public string Description { get; set; }
        public DateTime Created { get; set; }

        public AxisForCreationDto()
        {
            Created = DateTime.Now;
        }
    }
}