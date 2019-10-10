using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SothemaGoalManagement.API.Dtos
{
    public class EvaluationFileForUpdateDto
    {
        [Required]
        public int Id { get; set; }


        [Required]
        public string Title { get; set; }


        [Required]
        public int Year { get; set; }


        [Required]
        public int OwnerId { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public int StrategyId { get; set; }

        [Required]
        public ICollection<int> BehavioralSkillIds { get; set; }
    }
}