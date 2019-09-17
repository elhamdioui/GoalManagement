using System.Collections.Generic;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Dtos
{
    public class PublishedStrategiesDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public ICollection<AxisPoleToReturnDto> AxisPoles { get; set; }
    }
}