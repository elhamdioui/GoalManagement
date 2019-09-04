using System;

namespace SothemaGoalManagement.API.Models
{
    public class Strategy
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Year { get; set; }

        public string Status { get; set; }

        public int OwnerId { get; set; }

        public User Owner { get; set; }

        public DateTime Created { get; set; }
    }
}