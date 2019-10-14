using System;

namespace SothemaGoalManagement.API.Dtos
{
    public class AxisInstanceToReturnDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string PoleName { get; set; }

        public int PoleWeight { get; set; }

        public int UserWeight { get; set; }

    }
}