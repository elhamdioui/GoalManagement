namespace SothemaGoalManagement.API.Dtos
{
    public class UserForResetPasswordDto
    {
        public string Email { get; set; }

        public string NewPassword { get; set; }

        public string Token { get; set; }
    }
}