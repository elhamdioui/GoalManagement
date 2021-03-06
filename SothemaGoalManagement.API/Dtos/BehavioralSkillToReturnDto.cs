using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SothemaGoalManagement.API.Dtos
{
    public class BehavioralSkillToReturnDto
    {
        public int Id { get; set; }
        public string Skill { get; set; }
        public string Definition { get; set; }
        public string LevelOne { get; set; }
        public string LevelTwo { get; set; }
        public string LevelThree { get; set; }
        public string LevelFour { get; set; }
        public string LevelOneGrade { get; set; }
        public string LevelTwoGrade { get; set; }
        public string LevelThreeGrade { get; set; }
        public string LevelFourGrade { get; set; }
        public string LevelOneDescription { get; set; }
        public string LevelTwoDescription { get; set; }
        public string LevelThreeDescription { get; set; }
        public string LevelFourDescription { get; set; }
        public int CreatedById { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; }
        public string CreatedByName { get; set; }
        public bool Sealed { get; set; }
        public DateTime SealedDate { get; set; }
        public ICollection<BehavioralSkillEvaluationToReturnDto> BehavioralSkillEvaluations { get; set; }
        public int BehavioralSkillGrade { get; set; }
        public int BehavioralSkillTotalGrade { get; set; }
        public string BehavioralSkillLevel { get; set; }

        public BehavioralSkillToReturnDto()
        {
            BehavioralSkillEvaluations = new Collection<BehavioralSkillEvaluationToReturnDto>();
        }
    }
}