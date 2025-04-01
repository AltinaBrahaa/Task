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

        // Upload Product Image
        public async Task<ProductImageResponseDto> UploadProductImageAsync(ProductImageUploadRequestDto dto)
        {
            // Validate that at least one of the product IDs is provided
            if (dto.FirstProductId == null && dto.SecondProductId == null && dto.ProductSlId == null)
            {
                throw new ArgumentNullException("At least one of FirstProductId, SecondProductId, or ProductSlId must be provided.");
            }

            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "ProductImages");

            // Ensure that the upload directory exists
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            // Generate a unique file name for the uploaded image
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.File.FileName);
            var fullPath = Path.Combine(uploadPath, fileName);

            // Save the uploaded file to the server
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await dto.File.CopyToAsync(stream);
            }

            // Create the ProductImage entity
            var productImage = new ProductImage
            {
                FileName = fileName,
                FileDescription = dto.FileDescription,
                FileExtension = Path.GetExtension(dto.File.FileName),
                FileSizeInBytes = dto.File.Length,
                FilePath = $"/ProductImages/{fileName}",
                ProductSlId = dto.ProductSlId,
                FirstProductId = dto.FirstProductId,
                SecondProductId = dto.SecondProductId
            };

            // Save the product image to the repository
            var result = await _productImageRepository.AddProductImageAsync(productImage);

            // Return the mapped ProductImageResponseDto
            return _mapper.Map<ProductImageResponseDto>(result);
        }

        // Get Product Image by ID
        public async Task<ProductImageResponseDto?> GetProductImageByIdAsync(int productImageId)
        {
            var productImage = await _productImageRepository.GetProductImageByIdAsync(productImageId);

            if (productImage == null)
            {
                return null;
            }

            // Return the mapped ProductImageResponseDto
            return _mapper.Map<ProductImageResponseDto>(productImage);
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

            // Determine the path to the image file
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", productImage.FilePath.TrimStart('/'));

            // Delete the file if it exists
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

            // Delete the product image record from the repository
            return await _productImageRepository.DeleteProductImageAsync(productImageId);
        }

        // Get Images by ProductId, FirstProductId, or SecondProductId
        public async Task<List<ProductImageResponseDto>> GetImagesByProductIdAsync(int? productId, int? firstProductId, int? secondProductId)
        {
            // Get images using the combined method in the repository
            var productImages = await _productImageRepository.GetImagesByProductIdAsync(productId, firstProductId, secondProductId);

            // Map the product images to response DTOs and return them
            return _mapper.Map<List<ProductImageResponseDto>>(productImages);
        }

    }
}
