using System;

namespace SothemaGoalManagement.API.Models
{
    public class BehavioralSkillEvaluation
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public int EvaluatorId { get; set; }
        public User Evaluator { get; set; }
        public int EvaluateeId { get; set; }
        public int Grade { get; set; }
        public string Level { get; set; }
        public bool Sealed { get; set; }
        public int BehavioralSkillInstanceId { get; set; }
        public BehavioralSkillInstance BehavioralSkillInstance { get; set; }
        public int EvaluationFileInstanceId { get; set; }

    }
}