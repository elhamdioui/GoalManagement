using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SothemaGoalManagement.API.Helpers
{
    public class NotificationsHub : Hub<INotificationsHub>, INotificationsHub
    {
        public async Task SendNotification(string message)
        {
            await Clients.Caller.SendNotification(message);
        }

        public override Task OnConnectedAsync()
        {
            Console.WriteLine("Who is connected: " + Context.ConnectionId);
            return base.OnConnectedAsync();
        }
    }

    public interface INotificationsHub
    {
        Task SendNotification(string message);
    }
}