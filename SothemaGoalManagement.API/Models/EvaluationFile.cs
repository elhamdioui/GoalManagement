using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using SothemaGoalManagement.API.Helpers;

namespace SothemaGoalManagement.API.Models
{
    public class EvaluationFile
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Year { get; set; }

        public string Status { get; set; }

        public DateTime Created { get; set; }

        public User CreatedBy { get; set; }

        public int CreatedById { get; set; }

        public ICollection<EvaluationFileBehavioralSkill> BehavioralSkills { get; set; }

        public int StrategyId { get; set; }

        public Strategy Strategy { get; set; }

        public EvaluationFile()
        {
            BehavioralSkills = new Collection<EvaluationFileBehavioralSkill>();
        }
    }
}