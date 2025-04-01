using Task.DTO;
using Task.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using Task.Models;
using System;
using System.IO;

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

        // POST method to upload an image
        [HttpPost]
        public async Task<IActionResult> UploadProductImage([FromForm] ProductImageUploadRequestDto dto)
        {
            try
            {
                // Check if the file is null
                if (dto.File == null)
                {
                    return BadRequest("File është e detyrueshme.");
                }

                // Validate if the file name is provided
                if (string.IsNullOrEmpty(dto.FileName))
                {
                    return BadRequest("FileName është e detyrueshme.");
                }

                // Validate that at least one product ID is provided
                if ((dto.FirstProductId == null || dto.FirstProductId == 0) &&
                    (dto.SecondProductId == null || dto.SecondProductId == 0) &&
                    (dto.ProductSlId == null || dto.ProductSlId == 0))
                {
                    return BadRequest("Duhet të jetë i pranishëm ose FirstProductId ose ProductSlId ose SecondProductId.");
                }

                // Log the incoming request
                Console.WriteLine($"FileName: {dto.FileName}, ProductSlId: {dto.ProductSlId}, FirstProductId: {dto.FirstProductId}, SecondProductId: {dto.SecondProductId}");

                // Call the service to upload the product image
                var result = await _productImageService.UploadProductImageAsync(dto);

                // Map the result to a response DTO
                var responseDto = _mapper.Map<ProductImageResponseDto>(result);
                return Ok(responseDto); // Return the response including the FilePath
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET method to fetch all images
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

        // GET method to fetch a single image by its ID
        [HttpGet("product-images/{id}")]
        public async Task<IActionResult> GetProductImage(int id)
        {
            try
            {
                // Try to get the image by its ID
                var image = await _productImageService.GetProductImageByIdAsync(id);

                if (image == null)
                {
                    // If not found, check by product ID (FirstProductId, SecondProductId, or ProductSlId)
                    var imagesByProductId = await _productImageService.GetImagesByProductIdAsync(id, null, null);

                    if (imagesByProductId == null || imagesByProductId.Count == 0)
                    {
                        return NotFound(new { message = "No image found for this product." });
                    }

                    return Ok(imagesByProductId); // Return images by product ID
                }

                // If the image is found, return it directly
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "ProductImages", image.FileName);
                if (System.IO.File.Exists(imagePath))
                {
                    return File(System.IO.File.ReadAllBytes(imagePath), "image/jpeg");
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET method to fetch images by ProductId, FirstProductId, or SecondProductId
        [HttpGet("by-product")]
        public async Task<IActionResult> GetImagesByProductIdOrFirstProductId(
    [FromQuery] int? productId,
    [FromQuery] int? firstProductId,
    [FromQuery] int? secondProductId)
        {
            try
            {
                var images = await _productImageService.GetImagesByProductIdAsync(productId, firstProductId, secondProductId);

                if (images == null || images.Count == 0)
                    return NotFound(new { message = "No images found for this product." });

                return Ok(images);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


        // DELETE method to remove an image by its ID
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
