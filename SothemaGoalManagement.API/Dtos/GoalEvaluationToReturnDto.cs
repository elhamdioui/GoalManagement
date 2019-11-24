using System;

namespace SothemaGoalManagement.API.Dtos
{
    public class GoalEvaluationToReturnDto
    {
        public int Id { get; set; }

        public DateTime Created { get; set; }

        public string EvaluatorName { get; set; }

        public int CompletionRate { get; set; } = 0;

        public string Comment { get; set; }

        public bool Sealed { get; set; }

        public int GoalId { get; set; }

        public bool SelfEvaluation { get; set; }
    }
}