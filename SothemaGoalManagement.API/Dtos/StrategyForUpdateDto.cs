using System.ComponentModel.DataAnnotations;


namespace SothemaGoalManagement.API.Dtos
{
    public class StrategyForUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]

        public string Description { get; set; }

        [Required]

        public int OwnerId { get; set; }

        [Required]

        public string Status { get; set; }
    }
}