using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SothemaGoalManagement.API.Models
{
    public class EvaluationCard
    {
        public Guid Id { get; set; }

        public string Title { get; set; }// Year + Pole + Department

        public int Year { get; set; }

        public ICollection<Goal> Goals { get; set; }

        public ICollection<BehavioralSkill> BehavioralSkills { get; set; }

        public int OwnerId { get; set; }

        public User Owner { get; set; }

        public ICollection<User> Evaluators { get; set; }

        public DateTime CardSubmitted { get; set; }

        public DateTime Created { get; set; }

        public bool Deleted { get; set; }

        public string DeletionReason { get; set; }

        public EvaluationCard()
        {
            Goals = new Collection<Goal>();
            BehavioralSkills = new Collection<BehavioralSkill>();
            Evaluators = new Collection<User>();
        }
    }
}