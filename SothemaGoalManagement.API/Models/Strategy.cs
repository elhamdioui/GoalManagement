using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SothemaGoalManagement.API.Models
{
    public class Strategy
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Status { get; set; }

        public int OwnerId { get; set; }

        public User Owner { get; set; }

        public DateTime Created { get; set; }

        public string DocumentationUrl { get; set; }
        public string DocumentationPublicId { get; set; }

        public ICollection<Axis> AxisList { get; set; }

        public Strategy()
        {
            AxisList = new Collection<Axis>();
        }
    }
}