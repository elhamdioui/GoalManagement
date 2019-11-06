using System;

namespace SothemaGoalManagement.API.Models
{
    public class EvaluationFileInstanceLog
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime Created { get; set; }

        public string Log { get; set; }
    }
}