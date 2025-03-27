using Task.Interfaces;
using Task.Models;
using Task.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Task.Services
{
    public class ProductImageService : IProductImageService
    {
        private readonly IProductImageRepository _productImageRepository;
        private readonly IMapper _mapper;

        public ProductImageService(IProductImageRepository productImageRepository, IMapper mapper)
        {
            _productImageRepository = productImageRepository;
            _mapper = mapper;
        }

        // Existing methods...

        // Upload Product Image
        public async Task<ProductImageResponseDto> UploadProductImageAsync(ProductImageUploadRequestDto dto)
        {
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "ProductImages");

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

            var productImage = new ProductImage
            {
                FileName = fileName,
                FileDescription = dto.FileDescription,
                FileExtension = Path.GetExtension(dto.File.FileName),
                FileSizeInBytes = dto.File.Length,
                FilePath = $"/ProductImages/{fileName}",
                ProductSlId = dto.ProductSlId
            };

            var result = await _productImageRepository.AddProductImageAsync(productImage);
            return _mapper.Map<ProductImageResponseDto>(result);
        }

        // Get Product Image by ID
        public async Task<ProductImageResponseDto?> GetProductImageByIdAsync(int productImageId)
        {
            var productImage = await _productImageRepository.GetProductImageByIdAsync(productImageId);
            return productImage == null ? null : _mapper.Map<ProductImageResponseDto>(productImage);
        }

        // Get All Product Images
        public async Task<List<ProductImageResponseDto>> GetAllProductImagesAsync()
        {
            var productImages = await _productImageRepository.GetAllProductImagesAsync();
            return _mapper.Map<List<ProductImageResponseDto>>(productImages);
        }

        // Delete Product Image
        public async Task<bool> DeleteProductImageAsync(int productImageId)
        {
            var productImage = await _productImageRepository.GetProductImageByIdAsync(productImageId);
            if (productImage == null)
            {
                return false;
            }

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", productImage.FilePath.TrimStart('/'));

            if (File.Exists(filePath))
            {
                try
                {
                    File.Delete(filePath);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error deleting file: {ex.Message}");
                    return false;
                }
            }

            return await _productImageRepository.DeleteProductImageAsync(productImageId);
        }

        // New method to get images by Product ID
        public async Task<List<ProductImageResponseDto>> GetImagesByProductIdAsync(int productId)
        {
            var productImages = await _productImageRepository.GetImagesByProductIdAsync(productId);
            return _mapper.Map<List<ProductImageResponseDto>>(productImages);
        }
    }
}
