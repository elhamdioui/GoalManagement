using System.Collections.Generic;

namespace SothemaGoalManagement.API.Dtos
{
    public class PublishedStrategiesDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public ICollection<string> AxisDescriptions { get; set; }
    }
}