using System.Threading.Tasks;
using SothemaGoalManagement.API.Models;

namespace SothemaGoalManagement.API.Interfaces
{
    public interface IPhotoRepository
    {
        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);

        void AddPhoto(Photo photo);

        void UpdatePhoto(Photo dbPhoto);

        void DeletePhoto(Photo photo);

        Task SaveAllAsync();

    }
}