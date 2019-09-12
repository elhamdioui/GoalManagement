using System;

namespace SothemaGoalManagement.API.Dtos
{
    public class AxisToReturnDto
    {
        public int Id { get; set; }

        public int StrategyId { get; set; }

        public DateTime Created { get; set; }

        public string Description { get; set; }

    }
}