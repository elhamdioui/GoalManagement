using System;

namespace SothemaGoalManagement.API.Dtos
{
    public class EvaluationFileToReturnDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Year { get; set; }

        public int CreatedById { get; set; }

        public string Status { get; set; }

        public DateTime Created { get; set; }

        public string CreatedByName { get; set; }
    }
}