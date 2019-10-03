namespace SothemaGoalManagement.API.Models
{
    public class EvaluationFileBehavioralSkill
    {
        public int EvaluationFileId { get; set; }

        public EvaluationFile EvaluationFile { get; set; }

        public int BehavioralSkillId { get; set; }

        public BehavioralSkill BehavioralSkill { get; set; }
    }
}