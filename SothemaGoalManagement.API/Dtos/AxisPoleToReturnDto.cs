using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Dtos
{
    public class AxisPoleToReturnDto
    {
        public int AxisId { get; set; }

        public int PoleId { get; set; }
        public string AxisDescription { get; set; }

        public string PoleName { get; set; }

        public int Weight { get; set; }


    }
}