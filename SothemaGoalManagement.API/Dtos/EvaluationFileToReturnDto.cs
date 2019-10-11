using System;
using System.Collections.Generic;

namespace SothemaGoalManagement.API.Dtos
{
    public class EvaluationFileToReturnDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Year { get; set; }

        public StrategyToReturnDto Strategy { get; set; }

        public ICollection<BehavioralSkillToReturnDto> BehavioralSkills { get; set; }

        public int OwnerId { get; set; }

        public string Status { get; set; }

        public DateTime Created { get; set; }

        public string OwnerName { get; set; }

        public bool Sealed { get; set; }

        public DateTime SealedDate { get; set; }
    }
}