using System.Collections.Generic;
using System.Collections.ObjectModel;
using System;

namespace SothemaGoalManagement.API.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public int ParentGoalId { get; set; }

        public string Description { get; set; }

        public string Status { get; set; }

        public int Weight { get; set; }

        public GoalType GoalType { get; set; }

        public int GoalTypeId { get; set; }

        public string ProjectName { get; set; }

        public AxisInstance AxisInstance { get; set; }

        public int AxisInstanceId { get; set; }

        public DateTime Created { get; set; }

        public ICollection<GoalEvaluation> GoalEvaluations { get; set; }

        public Goal()
        {
            GoalEvaluations = new Collection<GoalEvaluation>();
        }

    }
}