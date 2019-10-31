using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Dtos
{
    public class GoalToReturnDto
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public int Weight { get; set; }

        public AxisInstanceToReturnDto AxisInstance { get; set; }

        public GoalType GoalType { get; set; }

        public string Status { get; set; }

        public DateTime Created { get; set; }

    }
}