using System;

namespace SothemaGoalManagement.API.Models
{
    public class AxisInstance
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int EvaluationFileInstanceId { get; set; }

        public EvaluationFileInstance EvaluationFileInstance { get; set; }

        public DateTime Created { get; set; }

        public int PoleId { get; set; }

        public Pole Pole { get; set; }

        public int PoleWeight { get; set; }

        public int UserWeight { get; set; }

    }
}