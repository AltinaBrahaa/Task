using Task.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;


namespace Task.Repositories
{
    public interface IImageRepository
    {
        Task<Image> AddImageAsync(Image image);
        Task<Image?> GetImageByIdAsync(int imageId);
        Task<bool> DeleteImageAsync(int imageId);
        Task<List<Image>> GetAllImagesAsync();
    }



}