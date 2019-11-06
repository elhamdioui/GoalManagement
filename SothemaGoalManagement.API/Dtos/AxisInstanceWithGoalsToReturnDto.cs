using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Dtos
{
    public class AxisInstanceWithGoalsToReturnDto
    {
        public int axisInstanceId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string PoleName { get; set; }

        public int PoleWeight { get; set; }

        public int UserWeight { get; set; }

        public int TotalGoals { get; set; }

        public string GoalsStatus { get; set; }

        public int TotalGoalWeight { get; set; }

        public ICollection<GoalToReturnDto> Goals { get; set; }

        public AxisInstanceWithGoalsToReturnDto()
        {
            Goals = new Collection<GoalToReturnDto>();
        }
    }
}