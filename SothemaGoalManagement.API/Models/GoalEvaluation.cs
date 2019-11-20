using System;

namespace SothemaGoalManagement.API.Models
{
    public class GoalEvaluation
    {
        public int Id { get; set; }

        public DateTime Created { get; set; }

        public int EvaluatorId { get; set; }

        public User Evaluator { get; set; }

        public int CompletionRate { get; set; }

        public string Comment { get; set; }

        public bool Sealed { get; set; }

        public Goal Goal { get; set; }

        public int GoalId { get; set; }

        public bool SelfEvaluation { get; set; }

    }
}