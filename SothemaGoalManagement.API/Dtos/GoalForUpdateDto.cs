using System.ComponentModel.DataAnnotations;


namespace SothemaGoalManagement.API.Dtos
{
    public class GoalForUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }


        [Required]

        public int GoalTypeId { get; set; }

        [Required]

        public int AxisInstanceId { get; set; }

        [Required]

        public string Status { get; set; }

        [Required]
        public int Weight { get; set; }
    }
}