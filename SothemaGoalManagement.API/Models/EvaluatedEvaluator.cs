namespace SothemaGoalManagement.API.Models
{
    public class EvaluatedEvaluator
    {
        public int EvaluatedId { get; set; }
        public User Evaluated { get; set; }

        public int EvaluatorId { get; set; }
        public User Evaluator { get; set; }
    }
}