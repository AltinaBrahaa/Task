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

     
        [HttpPost("upload")]
        public async Task<IActionResult> UploadProductImage([FromForm] ProductImageUploadRequestDto dto)
        {
            try
            {
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

       
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductImage(int id)
        {
            try
            {
                var result = await _productImageService.GetProductImageByIdAsync(id);
                if (result == null)
                    return NotFound();

                var productImageDto = _mapper.Map<ProductImageResponseDto>(result);
                return Ok(productImageDto);
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
