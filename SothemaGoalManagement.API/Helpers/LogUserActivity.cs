using System;
using System.Security.Claims;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using SothemaGoalManagement.API.Interfaces;

namespace SothemaGoalManagement.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();
            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IRepositoryWrapper>();
            var user = await repo.User.GetUser(userId, true);
            user.LastActive = DateTime.Now;
            repo.User.UpdateUser(user);
            await repo.User.SaveAllAsync();
        }

    }
}