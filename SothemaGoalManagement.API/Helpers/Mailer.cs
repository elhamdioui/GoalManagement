using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace SothemaGoalManagement.API.Helpers
{
    public class Mailer
    {
        private readonly IConfiguration _config;
        public Mailer(IConfiguration config)
        {
            _config = config;
        }
        public async Task SendEmail(string emailTo, string generatedToken, string subject, string content)
        {
            var sendGridApiKey = _config.GetSection("AppSettings:SendGridApiKey").Value;
            var sendGridClient = new SendGridClient(sendGridApiKey);
            var from = new EmailAddress("goal_management@sothema.ma");
            var to = new EmailAddress(emailTo);
            var plainTextContent = "";
            var htmlContent = content;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await sendGridClient.SendEmailAsync(msg);
        }
    }
}