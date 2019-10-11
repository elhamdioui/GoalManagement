using System;

namespace SothemaGoalManagement.API.Models
{
    public class AxisPole
    {
        public int AxisId { get; set; }

        public int PoleId { get; set; }
        public Axis Axis { get; set; }

        public Pole Pole { get; set; }

        public int Weight { get; set; }

        public bool Sealed { get; set; }

        public DateTime SealedDate { get; set; }

    }
}