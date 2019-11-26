using System;

namespace SothemaGoalManagement.API.Dtos
{
    public class BehavioralSkillEvaluationToReturnDto
    {
        public int Id { get; set; }

        public DateTime Created { get; set; }

        public string EvaluatorName { get; set; }

        public string Level { get; set; }
        public int Grade { get; set; }

        public bool Sealed { get; set; }

        public int EvaluationInstanceId { get; set; }

        public int BehavioralSkillId { get; set; }

    }
}