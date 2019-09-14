using System;

namespace SothemaGoalManagement.API.Models
{
    public class Axis
    {
        public int Id { get; set; }
        public string Description { get; set; }

        public int StrategyId { get; set; }

        public Strategy Strategy { get; set; }

        public DateTime Created { get; set; }
    }
}