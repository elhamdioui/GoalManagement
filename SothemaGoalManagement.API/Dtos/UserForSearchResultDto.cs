namespace SothemaGoalManagement.API.Dtos
{
    public class UserForSearchResultDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Title { get; set; }

        public DepartmentToReturnDto Department { get; set; }

        public UserStatusToReturnDto UserStatus { get; set; }
    }
}