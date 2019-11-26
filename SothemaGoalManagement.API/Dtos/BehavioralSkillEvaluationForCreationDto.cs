using System;
using System.ComponentModel.DataAnnotations;

namespace SothemaGoalManagement.API.Dtos
{
    public class BehavioralSkillEvaluationForCreationDto
    {
        [Required] public DateTime Created { get; set; }
        public int EvaluatorId { get; set; }
        [Required] public int EvaluateeId { get; set; }
        [Required] public int Grade { get; set; }
        [Required] public string Level { get; set; }
        [Required] public int BehavioralSkillInstanceId { get; set; }
        [Required] public int EvaluationFileInstanceId { get; set; }
        public bool Sealed { get; set; }

        public BehavioralSkillEvaluationForCreationDto()
        {
            Created = DateTime.Now;
        }
    }
}