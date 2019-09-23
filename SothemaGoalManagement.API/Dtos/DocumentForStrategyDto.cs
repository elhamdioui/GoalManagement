using Microsoft.AspNetCore.Http;
namespace SothemaGoalManagement.API.Dtos
{
    public class DocumentForStrategyDto
    {
        public string DocumentationUrl { get; set; }

        public string DocumentationPublicId { get; set; }

        public IFormFile File { get; set; }

    }
}