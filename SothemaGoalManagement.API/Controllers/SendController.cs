using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Dtos;
using SothemaGoalManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace SothemaGoalManagement.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class SendController : ControllerBase
    {
        private readonly IHubContext<NotificationsHub, INotificationsHub> _hubContext;

        public SendController(IHubContext<NotificationsHub, INotificationsHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet("signalr/{id}")]
        public string Signalr(string id)
        {
            _hubContext.Clients.Client(id).SendNotification("Hello world!");
            return "message send to: " + id;
        }
    }
}