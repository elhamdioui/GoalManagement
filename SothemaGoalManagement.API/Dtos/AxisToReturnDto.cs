using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SothemaGoalManagement.API.Dtos
{
    public class AxisToReturnDto
    {
        public int Id { get; set; }

        public int StrategyId { get; set; }

        public DateTime Created { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public ICollection<AxisPoleToReturnDto> AxisPoles { get; set; }

        public AxisToReturnDto()
        {
            AxisPoles = new Collection<AxisPoleToReturnDto>();
        }

    }
}