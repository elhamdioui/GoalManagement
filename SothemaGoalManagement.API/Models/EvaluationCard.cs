using System;
using System.Collections;
using System.Collections.Generic;

namespace SothemaGoalManagement.API.Models
{
    public class EvaluationCard
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Year { get; set; }

        public ICollection<Goal> Goals { get; set; }

        public ICollection<BehavioralSkill> BehavioralSkills { get; set; }

        public int OwnerId { get; set; }

        public User Owner { get; set; }

        public ICollection<User> Evaluators { get; set; }

        public DateTime CardSubmitted { get; set; }

        public DateTime Created { get; set; }

        public bool Deleted { get; set; }

        public string DeletionReson { get; set; }


    }
}