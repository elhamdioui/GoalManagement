using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Dtos
{
    public class GoalToReturnDto
    {
        public int Id { get; set; }
        public int ParentGoalId { get; set; }

        public string Description { get; set; }

        public int Weight { get; set; }

        public AxisInstanceToReturnDto AxisInstance { get; set; }

        public GoalType GoalType { get; set; }

        public string ProjectName { get; set; }

        public string Status { get; set; }

        public DateTime Created { get; set; }

        public string GoalGrade { get; set; }
        public string CascaderFullName { get; set; }

        public ICollection<GoalEvaluationToReturnDto> GoalEvaluations { get; set; }

        public GoalToReturnDto()
        {
            GoalEvaluations = new Collection<GoalEvaluationToReturnDto>();
        }

    }
}