using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace SothemaGoalManagement.API.Models
{
    public class User : IdentityUser<int>
    {
        public string EmployeeNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Title { get; set; }

        public DateTime Created { get; set; }

        public DateTime RecruitmentDate { get; set; }

        public UserStatus UserStatus { get; set; }

        public int UserStatusId { get; set; }

        public Department Department { get; set; }

        public int DepartmentId { get; set; }

        public DateTime LastActive { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public ICollection<Message> MessagesSent { get; set; }

        public ICollection<Message> MessagesReceived { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }

        public ICollection<EvaluatedEvaluator> EvaluatedEvaluators { get; set; }

        public ICollection<EvaluationFileInstance> EvaluationFileInstances { get; set; }


        public ICollection<GoalEvaluation> GoalEvaluations { get; set; }
        public ICollection<BehavioralSkillEvaluation> BehavioralSkillEvaluations { get; set; }
        public User()
        {
            Photos = new Collection<Photo>();
            MessagesSent = new Collection<Message>();
            MessagesReceived = new Collection<Message>();
            UserRoles = new Collection<UserRole>();
            EvaluatedEvaluators = new Collection<EvaluatedEvaluator>();
            EvaluationFileInstances = new Collection<EvaluationFileInstance>();
            GoalEvaluations = new Collection<GoalEvaluation>();
            BehavioralSkillEvaluations = new Collection<BehavioralSkillEvaluation>();
        }
    }
}