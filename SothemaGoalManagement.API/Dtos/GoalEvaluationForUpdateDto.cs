using System.ComponentModel.DataAnnotations;

namespace SothemaGoalManagement.API.Dtos
{
    public class GoalEvaluationForUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int CompletionRate { get; set; }

        public string Comment { get; set; }

        public string SheetTitle { get; set; }

        public string EmailContent { get; set; }

        public int SheetOwnerId { get; set; }
    }
}