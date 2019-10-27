using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SothemaGoalManagement.API.Data;
using SothemaGoalManagement.API.Interfaces;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Repositories
{
    public class PhotoRepository : GMRepository<Photo>, IPhotoRepository
    {
        public PhotoRepository(DataContext repositoryContext) : base(repositoryContext) { }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await RepositoryContext.Photos.IgnoreQueryFilters().FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await FindByCondition(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public void AddPhoto(Photo photo)
        {
            Add(photo);
        }

        public void UpdatePhoto(Photo dbPhoto)
        {
            Update(dbPhoto);
        }

        public void DeletePhoto(Photo photo)
        {
            Delete(photo);
        }

        public async Task SaveAllAsync()
        {
            await SaveAll();
        }
    }
}