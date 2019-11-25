using System;
using System.ComponentModel.DataAnnotations;

namespace SothemaGoalManagement.API.Dtos
{
    public class BehavioralSkillEvaluationForCreationDto
    {
        [Required]
        public DateTime Created { get; set; }

        [Required]
        public int EvaluatorId { get; set; }

        [Required]
        public int Grade { get; set; }

        public string Comment { get; set; }

        public bool Sealed { get; set; }

        [Required]
        public int EvaluationInstanceId { get; set; }

        [Required]
        public int BehavioralSkillId { get; set; }

        public BehavioralSkillEvaluationForCreationDto()
        {
            Created = DateTime.Now;
        }
    }
}