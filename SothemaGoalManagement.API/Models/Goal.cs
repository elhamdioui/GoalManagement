namespace SothemaGoalManagement.API.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public string Description { get; set; }

        public string Status { get; set; }

        public double Percentage { get; set; }

        public double Weight { get; set; }


    }
}