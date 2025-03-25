using Task.Interfaces;
using Task.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using AutoMapper;
using Task.DTO;
using Task.Repositories;
using Task.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Task.Services
{

    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;
        private readonly IMapper _mapper;

        public ImageService(IImageRepository imageRepository, IMapper mapper)
        {
            _imageRepository = imageRepository;
            _mapper = mapper;
        }

        public async Task<ImageResponseDto> UploadImageAsync(ImageUploadRequestDto dto)
        {
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");

          
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.File.FileName);
            var fullPath = Path.Combine(uploadPath, fileName);

         
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await dto.File.CopyToAsync(stream);
            }

            var image = new Image
            {
                FileName = fileName,
                FileDescription = dto.FileDescription,
                FileExtension = Path.GetExtension(dto.File.FileName),
                FileSizeInBytes = dto.File.Length,
                FilePath = $"/Images/{fileName}" 
            };

            var result = await _imageRepository.AddImageAsync(image);

            return _mapper.Map<ImageResponseDto>(result);
        }

            

        public async Task<ImageResponseDto?> GetImageByIdAsync(int imageId)
        {
            var image = await _imageRepository.GetImageByIdAsync(imageId);
            return image == null ? null : _mapper.Map<ImageResponseDto>(image);
        }

        public async Task<List<ImageResponseDto>> GetAllImagesAsync()
        {
            var images = await _imageRepository.GetAllImagesAsync();
            return _mapper.Map<List<ImageResponseDto>>(images);
        }


        public async Task<bool> DeleteImageAsync(int imageId)
        {
            
            var image = await _imageRepository.GetImageByIdAsync(imageId);
            if (image == null)
            {
                return false; 
            }

    
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.FilePath.TrimStart('/'));

    
            if (File.Exists(filePath))
            {
                try
                {
                 
                    File.Delete(filePath);
                }
                catch (Exception ex)
                {
       
                    Console.WriteLine($"Gabim gjatë fshirjes së skedarit: {ex.Message}");
                    return false;
                }
            }

            return await _imageRepository.DeleteImageAsync(imageId);
        }

    }
}