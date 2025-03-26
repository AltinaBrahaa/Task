using Microsoft.AspNetCore.Http;
using Task.Models;
using System.Threading.Tasks;
using Task.DTO;

namespace Task.Interfaces
{
    public interface IImageService
    {
            Task<ImageResponseDto> UploadImageAsync(ImageUploadRequestDto dto);
            Task<ImageResponseDto?> GetImageByIdAsync(int imageId);
            Task<bool> DeleteImageAsync(int imageId);
            Task<List<ImageResponseDto>> GetAllImagesAsync();
    }


}

