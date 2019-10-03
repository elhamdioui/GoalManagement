using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using SothemaGoalManagement.API.Helpers;

namespace SothemaGoalManagement.API.Dtos
{
    public class EvaluationFileForCreationDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public int Year { get; set; }

        [Required]
        public int CreatedById { get; set; }

        [Required]
        public int StrategyId { get; set; }

        [Required]
        public ICollection<int> BehavioralSkillIds { get; set; }

        public string Status { get; set; }

        public DateTime Created { get; set; }
        public EvaluationFileForCreationDto()
        {
            Created = DateTime.Now;
            Status = Constants.DRAFT;
            BehavioralSkillIds = new Collection<int>();
        }
    }
}