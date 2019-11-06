using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Dtos
{
    public class EvaluateeToReturnDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Title { get; set; }
        public string DepartmentName { get; set; }
        public DateTime RecruitmentDate { get; set; }
        public int Rank { get; set; }

    }
}