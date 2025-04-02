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

       
        [HttpPost]
        public async Task<IActionResult> UploadProductImage([FromForm] ProductImageUploadRequestDto dto)
        {
            try
            {
               
                if (dto.File == null)
                {
                    return BadRequest("File është e detyrueshme.");
                }

              
                if (string.IsNullOrEmpty(dto.FileName))
                {
                    return BadRequest("FileName është e detyrueshme.");
                }

                
                if ((dto.FirstProductId == null || dto.FirstProductId == 0) &&
                    (dto.SecondProductId == null || dto.SecondProductId == 0) &&
                    (dto.ProductSlId == null || dto.ProductSlId == 0))
                {
                    return BadRequest("Duhet të jetë i pranishëm ose FirstProductId ose ProductSlId ose SecondProductId.");
                }

                
                Console.WriteLine($"FileName: {dto.FileName}, ProductSlId: {dto.ProductSlId}, FirstProductId: {dto.FirstProductId}, SecondProductId: {dto.SecondProductId}");

                
                var result = await _productImageService.UploadProductImageAsync(dto);

                
                var responseDto = _mapper.Map<ProductImageResponseDto>(result);
                return Ok(responseDto); 
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
        public async Task<IActionResult> GetProductImage(int id)
        {
            try
            {
            
                var image = await _productImageService.GetProductImageByIdAsync(id);

                if (image == null)
                {
                    
                    var imagesByProductId = await _productImageService.GetImagesByProductIdAsync(id, null, null);

                    if (imagesByProductId == null || imagesByProductId.Count == 0)
                    {
                        return NotFound(new { message = "No image found for this product." });
                    }

                    return Ok(imagesByProductId); 
                }

               
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

        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductImage(int id, [FromForm] ProductImageUploadRequestDto dto)
        {
            try
            {
               
                Console.WriteLine($"Received request to update image for product with ID: {id}");
                Console.WriteLine($"File: {dto.File?.FileName}, ProductSlId: {dto.ProductSlId}");

                if (dto.File == null)
                {
                    Console.WriteLine("No file provided");
                    return BadRequest("File është e detyrueshme.");
                }

                if (string.IsNullOrEmpty(dto.FileName))
                {
                    Console.WriteLine("File name is missing");
                    return BadRequest("FileName është e detyrueshme.");
                }

                if (dto.ProductSlId == null || dto.ProductSlId == 0)
                {
                    Console.WriteLine("ProductSlId is missing or invalid");
                    return BadRequest("ProductSlId është i detyrueshëm për përditësimin e imazhit.");
                }

                
                Console.WriteLine($"Updating image for ProductSlId: {dto.ProductSlId}, FileName: {dto.FileName}");

                var result = await _productImageService.UpdateProductImageAsync(id, dto);

                if (result == null)
                {
                    Console.WriteLine("Failed to update image in the service layer.");
                    return StatusCode(500, "Failed to update image.");
                }

                var responseDto = _mapper.Map<ProductImageResponseDto>(result);
                return Ok(responseDto);
            }
            catch (Exception ex)
            {
          
                Console.WriteLine($"Exception occurred: {ex.Message}");
                return StatusCode(500, new { message = ex.Message });
            }
        }
        /*
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductImage(int id, [FromForm] ProductImageUploadRequestDto dto, [FromQuery] int productIdToUpdate)
        {
            try
            {
                Console.WriteLine($"Received request to update image for product with ID: {id}");
                Console.WriteLine($"File: {dto.File?.FileName}, ProductSlId: {dto.ProductSlId}, ProductIdToUpdate: {productIdToUpdate}");

                if (dto.File == null)
                {
                    Console.WriteLine("No file provided");
                    return BadRequest("File është e detyrueshme.");
                }

                if (string.IsNullOrEmpty(dto.FileName))
                {
                    Console.WriteLine("File name is missing");
                    return BadRequest("FileName është e detyrueshme.");
                }

                if (dto.ProductSlId == null || dto.ProductSlId == 0)
                {
                    Console.WriteLine("ProductSlId is missing or invalid");
                    return BadRequest("ProductSlId është i detyrueshëm për përditësimin e imazhit.");
                }

                Console.WriteLine($"Updating image for ProductSlId: {dto.ProductSlId}, FileName: {dto.FileName}, ProductIdToUpdate: {productIdToUpdate}");

                var result = await _productImageService.UpdateProductImageAsync(id, dto, productIdToUpdate);

                if (result == null)
                {
                    Console.WriteLine("Failed to update image in the service layer.");
                    return StatusCode(500, "Failed to update image.");
                }

                var responseDto = _mapper.Map<ProductImageResponseDto>(result);
                return Ok(responseDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception occurred: {ex.Message}");
                return StatusCode(500, new { message = ex.Message });
            }
        }*/




    }
}
