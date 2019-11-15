using System;

namespace SothemaGoalManagement.API.Models
{
    public class GoalEvaluation
    {
        public int Id { get; set; }

        public DateTime Created { get; set; }

        public string EvaluatorName { get; set; }

        public int CompletionRate { get; set; }

        public string Comment { get; set; }

        public bool Sealed { get; set; }  

        public Goal Goal { get; set; }   

        public int GoalId { get; set; }   

    }
}