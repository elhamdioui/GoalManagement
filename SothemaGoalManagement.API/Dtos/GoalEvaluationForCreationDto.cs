using System;
using System.ComponentModel.DataAnnotations;

namespace SothemaGoalManagement.API.Dtos
{
    public class GoalEvaluationForCreationDto
    {
        [Required]
        public DateTime Created { get; set; }

        [Required]
        public int EvaluatorId { get; set; }

        [Required]
        public int CompletionRate { get; set; }

        public string Comment { get; set; }

        public bool Sealed { get; set; }

        [Required]
        public int GoalId { get; set; }

        public GoalEvaluationForCreationDto()
        {
            Created = DateTime.Now;
        }
    }
}