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

        public async Task<User> GetUser(int id, bool ignoreCurrentUser)
        {
            var query = _context.Users
                                .Include(d => d.Department)
                                .ThenInclude(p => p.Pole)
                                .Include(p => p.Photos)
                                .Include(s => s.UserStatus)
                                .AsQueryable();

            if (ignoreCurrentUser) query = query.IgnoreQueryFilters();

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

            if (userParams.DepartmentId > 0)
            {
                users = users.Where(u => u.DepartmentId == userParams.DepartmentId);
            }

            if (userParams.UserStatusId > 0)
            {
                users = users.Where(u => u.UserStatusId == userParams.UserStatusId);
            }

            if (!string.IsNullOrEmpty(userParams.UserToSearch))
            {
                users = users.Where(u => u.FirstName.ToLower().Contains(userParams.UserToSearch.ToLower())
                                    || u.LastName.ToLower().Contains(userParams.UserToSearch.ToLower()));
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

        public async Task<IEnumerable<User>> LoadAllUsers()
        {
            return await _context.Users.Include(u => u.Department).ThenInclude(p => p.Pole).ToListAsync();
        }

        public async Task<PagedList<object>> GetUsersWithRoles(UserParams userParams)
        {
            var usersWithRoles = (from user in _context.Users.Include(p => p.Photos).Include(d => d.Department).Include(s => s.UserStatus)
                                  select new
                                  {
                                      Id = user.Id,
                                      FirstName = user.FirstName,
                                      LastName = user.LastName,
                                      Email = user.Email,
                                      Title = user.Title,
                                      DepartmentId = user.DepartmentId,
                                      UserStatusId = user.UserStatusId,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles on userRole.RoleId equals role.Id
                                               select role.Name).ToList(),
                                      Created = user.Created,
                                      LastActive = user.LastActive,
                                      PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url
                                  }).OrderByDescending(u => u.Created)
                                  .AsQueryable();

            if (userParams.DepartmentId > 0)
            {
                usersWithRoles = usersWithRoles.Where(u => u.DepartmentId == userParams.DepartmentId);
            }

            if (userParams.UserStatusId > 0)
            {
                usersWithRoles = usersWithRoles.Where(u => u.UserStatusId == userParams.UserStatusId);
            }

            if (!string.IsNullOrEmpty(userParams.UserToSearch))
            {
                usersWithRoles = usersWithRoles.Where(u => u.FirstName.ToLower().Contains(userParams.UserToSearch.ToLower())
                                    || u.LastName.ToLower().Contains(userParams.UserToSearch.ToLower()));
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        usersWithRoles = usersWithRoles.OrderByDescending(u => u.Created);
                        break;
                    default:
                        usersWithRoles = usersWithRoles.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

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

        public async Task<PagedList<Strategy>> GetStrategies(CommunParams strategyParams)
        {
            var strategies = _context.Strategies
                                .Include(u => u.Owner)
                                .Include(s => s.AxisList)
                                .ThenInclude(a => a.AxisPoles)
                                .ThenInclude(p => p.Pole)
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
                    strategies = strategies.Where(s => s.Status == Constants.REVIEW);
                    break;
                case Constants.ARCHIVED:
                    strategies = strategies.Where(s => s.Status == Constants.ARCHIVED);
                    break;
                default:
                    strategies = strategies.Where(s => s.OwnerId == strategyParams.OwnerId);
                    break;
            }

            return await PagedList<Strategy>.CreateAsync(strategies, strategyParams.PageNumber, strategyParams.PageSize);
        }

        public async Task<Strategy> GetStrategy(int id)
        {
            return await _context.Strategies.Include(s => s.Owner)
                                            .Include(s => s.AxisList)
                                            .ThenInclude(a => a.AxisPoles)
                                            .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<AxisInstance> GetAxisInstance(int id)
        {
            return await _context.AxisInstances.FirstOrDefaultAsync(a => a.Id == id);
        }
        public async Task<Axis> GetAxis(int id)
        {
            return await _context.Axis.Include(a => a.Strategy).FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Axis>> GetAxisList(int strategyId)
        {
            var axisList = await _context.Axis.Where(a => a.StrategyId == strategyId)
                                            .OrderByDescending(a => a.Created)
                                            .ToListAsync();
            return axisList;
        }

        public async Task<IEnumerable<Axis>> GetAxisListDetailed(int strategyId)
        {
            var axisList = await _context.Axis.Include(a => a.AxisPoles).ThenInclude(ap => ap.Pole)
                                                .Where(a => a.StrategyId == strategyId)
                                                .OrderByDescending(a => a.Created)
                                                .ToListAsync();
            return axisList;
        }

        public async Task<IEnumerable<AxisPole>> GetAxisPoleList(int axisId)
        {
            var axisPoleList = await _context.AxisPoles
                                            .Include(ap => ap.Axis)
                                            .Include(ap => ap.Pole)
                                            .Where(ap => ap.AxisId == axisId)
                                            .ToListAsync();
            return axisPoleList;
        }

        public async Task<AxisPole> GetAxisPole(int axisId, int poleId)
        {
            return await _context.AxisPoles.SingleOrDefaultAsync(ap => ap.AxisId == axisId && ap.PoleId == poleId);
        }

        public async Task<IEnumerable<User>> SerachForUsers(string userToSearch, int userStatusId)
        {
            var query = _context.Users.Include(u => u.Department).Include(u => u.UserStatus).Include(u => u.EvaluationFileInstances).AsQueryable();
            if (!string.IsNullOrEmpty(userToSearch))
            {
                query = query.Where(u => u.FirstName.ToLower().Contains(userToSearch.ToLower()) || u.LastName.ToLower().Contains(userToSearch.ToLower()));
            }

            if (userStatusId > 0)
            {
                query = query.Where(u => u.UserStatusId == userStatusId);
            }
            return await query.ToListAsync();
        }

        public async Task<IEnumerable<object>> LoadEvaluators(int evaluatedId)
        {
            var evaluators = await (from u in _context.Users.Include(u => u.Department)
                                    join e in _context.EvaluatedEvaluators
                                    on u.Id equals e.EvaluatorId
                                    where e.EvaluatedId == evaluatedId
                                    select new
                                    {
                                        Id = u.Id,
                                        FullName = u.FirstName + " " + u.LastName,
                                        Title = u.Title,
                                        DepartmentName = u.Department.Name,
                                        Rank = e.Rank
                                    }).ToListAsync();

            return evaluators;
        }

        public async Task<IEnumerable<object>> LoadEvaluatees(int evaluatorId)
        {
            var evaluators = await (from u in _context.Users.Include(u => u.Department)
                                    join e in _context.EvaluatedEvaluators
                                    on u.Id equals e.EvaluatedId
                                    where e.EvaluatorId == evaluatorId
                                    select new
                                    {
                                        Id = u.Id,
                                        FullName = u.FirstName + " " + u.LastName,
                                        Title = u.Title,
                                        DepartmentName = u.Department.Name,
                                        Rank = e.Rank
                                    }).ToListAsync();

            return evaluators;
        }

        public async Task<EvaluatedEvaluator> GetEvaluatedEvaluator(int evaluatedId, int evaluatorId)
        {
            return await _context.EvaluatedEvaluators.SingleOrDefaultAsync(ee => ee.EvaluatedId == evaluatedId && ee.EvaluatorId == evaluatorId);
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

        public async Task<IEnumerable<BehavioralSkill>> GetBehavioralSkillsByIds(IEnumerable<int> ids)
        {
            return await _context.BehavioralSkills.Where(bs => ids.Contains(bs.Id)).ToListAsync();
        }

        public async Task<IEnumerable<BehavioralSkillInstance>> GetBehavioralSkillInstancesByBSIds(IEnumerable<int> bsIds)
        {
            return await _context.BehavioralSkillInstances.Where(bsi => bsIds.Contains(bsi.BehavioralSkillId)).ToListAsync();
        }

        public async Task<IEnumerable<BehavioralSkill>> GetBehavioralSkills(CommunParams behavioralSkillParams)
        {
            var behavioralSkills = _context.BehavioralSkills.Include(bs => bs.CreatedBy)
                                                            .OrderByDescending(s => s.Created)
                                                            .AsQueryable();

            switch (behavioralSkillParams.Status)
            {
                case Constants.PUBLISHED:
                    behavioralSkills = behavioralSkills.Where(s => s.Status == Constants.PUBLISHED);
                    break;
                case Constants.DRAFT:
                    behavioralSkills = behavioralSkills.Where(s => s.Status == Constants.DRAFT && s.CreatedById == behavioralSkillParams.OwnerId);
                    break;
                case Constants.REVIEW:
                    behavioralSkills = behavioralSkills.Where(s => s.Status == Constants.REVIEW);
                    break;
                case Constants.ARCHIVED:
                    behavioralSkills = behavioralSkills.Where(s => s.Status == Constants.ARCHIVED);
                    break;
                default:
                    behavioralSkills = behavioralSkills.Where(s => s.CreatedById == behavioralSkillParams.OwnerId);
                    break;
            }

            return await behavioralSkills.ToListAsync();
        }

        public async Task<BehavioralSkill> GetBehavioralSkill(int id)
        {
            return await _context.BehavioralSkills.SingleOrDefaultAsync(bs => bs.Id == id);
        }

        public async Task<IEnumerable<EvaluationViewModel>> GetEvaluationFiles(CommunParams evaluationFileParams)
        {
            var evaluationFilesWithBehavioralSkills = (from evaluationFile in _context.EvaluationFiles.Include(ef => ef.Strategy).Include(ef => ef.Owner)
                                                       select new EvaluationViewModel()
                                                       {
                                                           Id = evaluationFile.Id,
                                                           Title = evaluationFile.Title,
                                                           Year = evaluationFile.Year,
                                                           Strategy = evaluationFile.Strategy,
                                                           CreatedById = evaluationFile.OwnerId,
                                                           CreatedByName = evaluationFile.Owner.FirstName.FullName(evaluationFile.Owner.LastName),
                                                           BehavioralSkills = (from evaluationFileBehavioralSkill in evaluationFile.BehavioralSkills
                                                                               join bs in _context.BehavioralSkills on evaluationFileBehavioralSkill.BehavioralSkillId equals bs.Id
                                                                               select bs).ToList(),
                                                           Created = evaluationFile.Created,
                                                           Status = evaluationFile.Status,
                                                           Sealed = evaluationFile.Sealed,
                                                           SealedDate = evaluationFile.SealedDate
                                                       }).OrderByDescending(u => u.Created)
                                  .AsQueryable();

            switch (evaluationFileParams.Status)
            {
                case Constants.PUBLISHED:
                    evaluationFilesWithBehavioralSkills = evaluationFilesWithBehavioralSkills.Where(s => s.Status == Constants.PUBLISHED);
                    break;
                case Constants.DRAFT:
                    evaluationFilesWithBehavioralSkills = evaluationFilesWithBehavioralSkills.Where(s => s.Status == Constants.DRAFT && s.CreatedById == evaluationFileParams.OwnerId);
                    break;
                case Constants.REVIEW:
                    evaluationFilesWithBehavioralSkills = evaluationFilesWithBehavioralSkills.Where(s => s.Status == Constants.REVIEW);
                    break;
                case Constants.ARCHIVED:
                    evaluationFilesWithBehavioralSkills = evaluationFilesWithBehavioralSkills.Where(s => s.Status == Constants.ARCHIVED);
                    break;
                default:
                    evaluationFilesWithBehavioralSkills = evaluationFilesWithBehavioralSkills.Where(s => s.CreatedById == evaluationFileParams.OwnerId);
                    break;
            }

            return await evaluationFilesWithBehavioralSkills.ToListAsync();
        }

        public async Task<EvaluationFile> GetEvaluationFile(int id)
        {
            return await _context.EvaluationFiles.Include(ef => ef.Strategy).SingleOrDefaultAsync(ef => ef.Id == id);
        }

        public async Task<EvaluationViewModel> GetEvaluationFileDetail(int id)
        {
            return await (from evaluationFile in _context.EvaluationFiles.Include(ef => ef.Strategy)
                                                                         .ThenInclude(s => s.AxisList)
                                                                         .ThenInclude(a => a.AxisPoles)
                                                                         .Include(ef => ef.Owner)
                          select new EvaluationViewModel
                          {
                              Id = evaluationFile.Id,
                              Title = evaluationFile.Title,
                              Year = evaluationFile.Year,
                              Strategy = evaluationFile.Strategy,
                              CreatedById = evaluationFile.OwnerId,
                              CreatedByName = evaluationFile.Owner.FirstName.FullName(evaluationFile.Owner.LastName),
                              BehavioralSkills = (from evaluationFileBehavioralSkill in evaluationFile.BehavioralSkills
                                                  join bs in _context.BehavioralSkills on evaluationFileBehavioralSkill.BehavioralSkillId equals bs.Id
                                                  select bs).ToList(),
                              AxisList = evaluationFile.Strategy.AxisList,
                              Created = evaluationFile.Created,
                              Status = evaluationFile.Status,
                              Sealed = evaluationFile.Sealed,
                              SealedDate = evaluationFile.SealedDate
                          }).SingleOrDefaultAsync(ef => ef.Id == id);
        }

        public async Task<IEnumerable<int>> GetEvaluationFileBehavioralSkillIds(int evaluationFileId)
        {
            return await _context.EvaluationFileBehavioralSkills.Where(efbs => efbs.EvaluationFileId == evaluationFileId).Select(efbs => efbs.BehavioralSkillId).ToListAsync();
        }

        public async Task<IEnumerable<EvaluationFileInstance>> GetEvaluationFileInstancesByEvaluationFileId(int evaluationFileId)
        {
            return await _context.EvaluationFileInstances.Include(efi => efi.AxisInstances)
                                                        .Include(efi => efi.Owner)
                                                        .ThenInclude(u => u.Department)
                                                        .ThenInclude(d => d.Pole)
                                                        .Where(efi => efi.EvaluationFileId == evaluationFileId).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetUsersWithInstanceFileEvaluation(int evaluationFileId, IEnumerable<int> userIds)
        {
            return await _context.EvaluationFileInstances.Include(efi => efi.Owner)
                                                         .Where(efi => efi.EvaluationFileId == evaluationFileId &&
                                                                        userIds.Contains(efi.OwnerId))
                                                         .Select(efi => efi.Owner)
                                                         .ToListAsync();
        }

        public async Task<EvaluationFileInstance> GetEvaluationFileInstance(int id)
        {
            return await _context.EvaluationFileInstances.SingleOrDefaultAsync(efi => efi.Id == id);
        }
    }
}