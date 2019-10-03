using System.ComponentModel.DataAnnotations;

namespace SothemaGoalManagement.API.Dtos
{
    public class EvaluationFileForUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]

        public int CreatedById { get; set; }

        [Required]

        public string Status { get; set; }
    }
}