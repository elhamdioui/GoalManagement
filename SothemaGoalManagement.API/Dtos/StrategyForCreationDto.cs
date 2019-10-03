using System;
using SothemaGoalManagement.API.Helpers;

namespace SothemaGoalManagement.API.Dtos
{
    public class StrategyForCreationDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int OwnerId { get; set; }

        public string Status { get; set; }

        public DateTime Created { get; set; }

        public StrategyForCreationDto()
        {
            Created = DateTime.Now;
            Status = Constants.DRAFT;
        }
    }
}