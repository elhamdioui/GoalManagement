using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SothemaGoalManagement.API.Dtos
{
    public class GoalWithChildrenToReturnDto
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public int Weight { get; set; }

        public string AxisInstanceTitle { get; set; }

        public string GoalTypeName { get; set; }

        public string ProjectName { get; set; }

        public string OwnerFullName { get; set; }
        public string OwnerPhotoUrl { get; set; }

        public ICollection<GoalWithChildrenToReturnDto> Children { get; set; }

        public GoalWithChildrenToReturnDto()
        {
            Children = new Collection<GoalWithChildrenToReturnDto>();
        }

    }
}