using Task.DTO;
using Task.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using Task.Models;

namespace Task.Controllers
{
    [ApiController]
    [Route("api/product-images")]
    public class ProductImageController : ControllerBase
    {
        private readonly IProductImageService _productImageService;
        private readonly IMapper _mapper;

        public ProductImageController(IProductImageService productImageService, IMapper mapper)
        {
            _productImageService = productImageService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> UploadProductImage([FromForm] ProductImageUploadRequestDto dto)
        {
            try
            {
                // Kontrollo nëse fushat janë dërguar siç duhet
                if (dto.File == null || string.IsNullOrEmpty(dto.FileName))
                {
                    return BadRequest("File dhe FileName janë të detyrueshme.");
                }

                // Log për debug
                Console.WriteLine($"FileName: {dto.FileName}, ProductSlId: {dto.ProductSlId}");

                // Thirrja e shërbimit për ngarkimin e imazhit
                var result = await _productImageService.UploadProductImageAsync(dto);

                // Kthimi i përgjigjes pas ngarkimit të imazhit
                var responseDto = _mapper.Map<ProductImageResponseDto>(result);
                return Ok(responseDto); // Ky duhet të ketë FilePath si pjesë të tij
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetAllProductImages()
        {
            try
            {
                var images = await _productImageService.GetAllProductImagesAsync();
                var result = _mapper.Map<List<ProductImageResponseDto>>(images);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("product-images/{id}")]
        public IActionResult GetProductImage(int id)
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "ProductImages", $"{id}.jpg");

            if (System.IO.File.Exists(imagePath))
            {
                return File(System.IO.File.ReadAllBytes(imagePath), "image/jpeg");
            }
            return NotFound();
        }



        [HttpGet("by-product/{productId}")]
        public async Task<IActionResult> GetImagesByProductId(int productId)
        {
            try
            {
                var images = await _productImageService.GetImagesByProductIdAsync(productId);
                if (images == null || images.Count == 0)
                    return NotFound(new { message = "No images found for this product." });

                var result = _mapper.Map<List<ProductImageResponseDto>>(images);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductImage(int id)
        {
            try
            {
                var success = await _productImageService.DeleteProductImageAsync(id);
                if (!success)
                    return NotFound();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
