using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SothemaGoalManagement.API.Models
{
    public class GoalType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Goal> Goals { get; set; }

        public GoalType()
        {
            Goals = new Collection<Goal>();
        }
    }
}