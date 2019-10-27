using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Helpers;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class MessageRepository : GMRepository<Message>, IMessageRepository
    {
        public MessageRepository(DataContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<Message> GetMessage(int id)
        {
            return await FindByCondition(m => m.Id == id).FirstOrDefaultAsync();
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = RepositoryContext.Messages.Include(u => u.Sender).ThenInclude(p => p.Photos).Include(u => u.Recipient).ThenInclude(p => p.Photos).AsQueryable();
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
            var messages = await RepositoryContext.Messages.Include(u => u.Sender).ThenInclude(p => p.Photos).Include(u => u.Recipient).ThenInclude(p => p.Photos)
                                            .Where(m => m.RecipientId == userId && m.SenderId == recipientId && m.RecipientDeleted == false
                                                    || m.RecipientId == recipientId && m.SenderId == userId && m.SenderDeleted == false)
                                            .OrderByDescending(m => m.MessageSent)
                                            .ToListAsync();
            return messages;
        }

        public void AddMessage(Message message)
        {
            Add(message);
        }

        public void UpdateMessage(Message dbMessage)
        {
            Update(dbMessage);
        }

        public void DeleteMessage(Message message)
        {
            Delete(message);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}