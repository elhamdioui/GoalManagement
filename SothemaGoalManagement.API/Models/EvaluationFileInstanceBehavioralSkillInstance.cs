namespace SothemaGoalManagement.API.Models
{
    public class EvaluationFileInstanceBehavioralSkillInstance
    {
        public int EvaluationFileInstanceId { get; set; }

        public EvaluationFileInstance EvaluationFileInstance { get; set; }

        public int BehavioralSkillInstanceId { get; set; }

        public BehavioralSkillInstance BehavioralSkillInstance { get; set; }
    }
}