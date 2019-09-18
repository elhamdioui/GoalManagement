using System;

namespace SothemaGoalManagement.API.Models
{
    public class Evaluation
    {
        public EvaluationCard EvaluationCard { get; set; }

        public User Evaluator { get; set; }

        public DateTime EvaluationDateByEvaluator { get; set; }

        public DateTime EvaluationDateByOwner { get; set; }

        public string Type { get; set; }

        public string OwnerCommentForGoals { get; set; }
        public string EvaluatorCommentForGoals { get; set; }

        public string OwnerCommentForBehavioralSkills { get; set; }
        public string EvaluatorCommentForBehavioralSkills { get; set; }


    }
}