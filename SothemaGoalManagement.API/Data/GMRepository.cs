using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace SothemaGoalManagement.API.Data
{
    public class GMRepository : IGMRepository
    {
        private readonly DataContext _context;
        public GMRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.IgnoreQueryFilters().FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<User> GetUser(int id, bool isCurrentUser)
        {
            var query = _context.Users
                                .Include(d => d.Department)
                                .ThenInclude(p => p.Pole)
                                .Include(p => p.Photos)
                                .Include(s => s.UserStatus)
                                .AsQueryable();

            if (isCurrentUser) query = query.IgnoreQueryFilters();

            var user = await query.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users
                                .Include(d => d.Department)
                                .ThenInclude(p => p.Pole)
                                .Include(p => p.Photos)
                                .Include(s => s.UserStatus)
                                .OrderByDescending(u => u.LastActive)
                                .AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);
            if (userParams.DepartmentId > 0)
            {
                users = users.Where(u => u.DepartmentId == userParams.DepartmentId);
            }

            if (userParams.UserStatusId > 0)
            {
                users = users.Where(u => u.UserStatusId == userParams.UserStatusId);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<PagedList<object>> GetUsersWithRoles(UserParams userParams)
        {
            var usersWithRoles = (from user in _context.Users
                                  select new
                                  {
                                      Id = user.Id,
                                      FirstName = user.FirstName,
                                      LastName = user.LastName,
                                      Email = user.Email,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles on userRole.RoleId equals role.Id
                                               select role.Name).ToList(),
                                      Created = user.Created
                                  }).OrderByDescending(u => u.Created)
                                  .AsQueryable();

            return await PagedList<object>.CreateAsync(usersWithRoles, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages.Include(u => u.Sender).ThenInclude(p => p.Photos).Include(u => u.Recipient).ThenInclude(p => p.Photos).AsQueryable();
            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId && u.SenderDeleted == false);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.IsRead == false && u.RecipientDeleted == false);
                    break;
            }

            messages = messages.OrderByDescending(d => d.MessageSent);
            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.Messages.Include(u => u.Sender).ThenInclude(p => p.Photos).Include(u => u.Recipient).ThenInclude(p => p.Photos)
                                            .Where(m => m.RecipientId == userId && m.SenderId == recipientId && m.RecipientDeleted == false
                                                    || m.RecipientId == recipientId && m.SenderId == userId && m.SenderDeleted == false)
                                            .OrderByDescending(m => m.MessageSent)
                                            .ToListAsync();
            return messages;
        }

        public async Task<IEnumerable<Pole>> GetPoles()
        {
            return await _context.Poles.Include(p => p.Departments).ToListAsync();
        }

        public async Task<IEnumerable<Department>> GetDepartments()
        {
            return await _context.Departments.Include(u => u.Users).Include(p => p.Pole).ToListAsync();
        }

        public async Task<IEnumerable<UserStatus>> GetUserStatus()
        {
            return await _context.UserStatus.Include(u => u.Users).ToListAsync();
        }

        public async Task<PagedList<Strategy>> GetStrategies(StrategyParams strategyParams)
        {
            var strategies = _context.Strategies
                                .Include(u => u.Owner)
                                .OrderByDescending(s => s.Created)
                                .AsQueryable();

            switch (strategyParams.Status)
            {
                case Constants.PUBLISHED:
                    strategies = strategies.Where(s => s.Status == Constants.PUBLISHED);
                    break;
                case Constants.DRAFT:
                    strategies = strategies.Where(s => s.Status == Constants.DRAFT && s.OwnerId == strategyParams.OwnerId);
                    break;
                case Constants.REVIEW:
                    strategies = strategies.Where(s => s.Status == Constants.REVIEW && s.OwnerId == strategyParams.OwnerId);
                    break;
            }

            strategies = strategies.OrderByDescending(u => u.Created);
            return await PagedList<Strategy>.CreateAsync(strategies, strategyParams.PageNumber, strategyParams.PageSize);
        }

        public async Task<Strategy> GetStrategy(int id)
        {
            return await _context.Strategies.Include(s => s.Owner).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IEnumerable<User>> SerachForUsers(string searchTerm)
        {
            return await _context.Users.Include(u => u.Department)
                                .Where(u => u.FirstName.ToLower().Contains(searchTerm.ToLower()) || u.LastName.ToLower().Contains(searchTerm.ToLower()))
                                .ToListAsync();
        }

        public async Task<bool> EmployeeNumberAlreadyExists(string employeNumber, int? employeeId = null)
        {
            var query = _context.Users.Where(u => u.EmployeeNumber == employeNumber.ToLower());
            if (employeeId != null)
            {
                query = query.Where(u => u.Id != employeeId);
            }
            var results = await query.ToListAsync();
            if (results == null || results.Count == 0) return false;

            return true;
        }
    }
}