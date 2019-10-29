using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SothemaGoalManagement.API.Dtos
{
    public class EvaluationFileInstanceHrToReturnDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int Year { get; set; }

        public string StrategyTitle { get; set; }
        public string StrategyDescription { get; set; }

        public string OwnerName { get; set; }

        public DateTime Created { get; set; }

        public ICollection<AxisInstanceToReturnDto> AxisInstances { get; set; }

        public EvaluationFileInstanceHrToReturnDto()
        {
            AxisInstances = new Collection<AxisInstanceToReturnDto>();
        }

    }
}