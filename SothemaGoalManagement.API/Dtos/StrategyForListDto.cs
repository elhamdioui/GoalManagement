using System;

namespace SothemaGoalManagement.API.Dtos
{
    public class StrategyForListDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Year { get; set; }

        public string Status { get; set; }

        public string OwnerName { get; set; }

        public DateTime Created { get; set; }
    }
}