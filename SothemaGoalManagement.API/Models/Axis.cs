using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SothemaGoalManagement.API.Models
{
    public class Axis
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public int StrategyId { get; set; }

        public Strategy Strategy { get; set; }

        public DateTime Created { get; set; }

        public ICollection<AxisPole> AxisPoles { get; set; }

        public Axis()
        {
            AxisPoles = new Collection<AxisPole>();
        }
    }
}