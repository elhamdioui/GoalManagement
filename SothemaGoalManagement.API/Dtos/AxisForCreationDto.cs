using System;
using System.ComponentModel.DataAnnotations;

namespace SothemaGoalManagement.API.Dtos
{
    public class AxisForCreationDto
    {
        [Required]

        public int StrategyId { get; set; }

        public DateTime Created { get; set; }

        [Required]

        public string Description { get; set; }

        public AxisForCreationDto()
        {
            Created = DateTime.Now;
        }
    }
}