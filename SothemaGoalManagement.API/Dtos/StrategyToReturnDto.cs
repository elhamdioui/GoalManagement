using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Dtos
{
    public class StrategyToReturnDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string OwnerName { get; set; }

        public string Status { get; set; }

        public DateTime Created { get; set; }

        public ICollection<AxisToReturnDto> AxisList { get; set; }

        public StrategyToReturnDto()
        {
            AxisList = new Collection<AxisToReturnDto>();
        }

    }
}