using Task.DTO;
using Task.Repositories;
using Task.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace Task.Controllers
{
    [ApiController]
    [Route("api/images")]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly IMapper _mapper; 

    
        public ImageController(IImageService imageService, IMapper mapper)
        {
            _imageService = imageService;
            _mapper = mapper;  
        }

        [HttpPost]
       
        public async Task<IActionResult> UploadImage([FromForm] ImageUploadRequestDto dto)
        {
            var result = await _imageService.UploadImageAsync(dto);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            var images = await _imageService.GetAllImagesAsync();
            var result = _mapper.Map<List<ImageResponseDto>>(images); 
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var result = await _imageService.GetImageByIdAsync(id);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var success = await _imageService.DeleteImageAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
