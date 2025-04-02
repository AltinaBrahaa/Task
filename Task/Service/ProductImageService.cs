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


        public async Task<ProductImageResponseDto> UploadProductImageAsync(ProductImageUploadRequestDto dto)
        {
            
            if (dto.FirstProductId == null && dto.SecondProductId == null && dto.ProductSlId == null)
            {
                throw new ArgumentNullException("At least one of FirstProductId, SecondProductId, or ProductSlId must be provided.");
            }

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
                ProductSlId = dto.ProductSlId,
                FirstProductId = dto.FirstProductId,
                SecondProductId = dto.SecondProductId
            };

  
            var result = await _productImageRepository.AddProductImageAsync(productImage);

          
            return _mapper.Map<ProductImageResponseDto>(result);
        }

     
        public async Task<ProductImageResponseDto?> GetProductImageByIdAsync(int productImageId)
        {
            var productImage = await _productImageRepository.GetProductImageByIdAsync(productImageId);

            if (productImage == null)
            {
                return null;
            }

        
            return _mapper.Map<ProductImageResponseDto>(productImage);
        }


        public async Task<List<ProductImageResponseDto>> GetAllProductImagesAsync()
        {
            var productImages = await _productImageRepository.GetAllProductImagesAsync();
            return _mapper.Map<List<ProductImageResponseDto>>(productImages);
        }

       
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

       
        public async Task<List<ProductImageResponseDto>> GetImagesByProductIdAsync(int? productId, int? firstProductId, int? secondProductId)
        {
          
            var productImages = await _productImageRepository.GetImagesByProductIdAsync(productId, firstProductId, secondProductId);

            
            return _mapper.Map<List<ProductImageResponseDto>>(productImages);
        }
      
        public async Task<ProductImageResponseDto> UpdateProductImageAsync(int id, ProductImageUploadRequestDto dto)
        {
           
            if (dto.FirstProductId == null && dto.SecondProductId == null && dto.ProductSlId == null)
            {
                throw new ArgumentNullException("At least one of FirstProductId, SecondProductId, or ProductSlId must be provided.");
            }

           
            var existingImage = await _productImageRepository.GetProductImageByIdAsync(id);
            if (existingImage == null)
            {
                throw new ArgumentException("Product image not found.");
            }

            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "ProductImages");

           
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            string newFileName = existingImage.FileName;

            if (dto.File != null)
            {
                
                newFileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.File.FileName);
                var fullPath = Path.Combine(uploadPath, newFileName);

              
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await dto.File.CopyToAsync(stream);
                }

       
                var oldFilePath = Path.Combine(uploadPath, existingImage.FileName);
                if (File.Exists(oldFilePath))
                {
                    try
                    {
                        File.Delete(oldFilePath);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error deleting old file: {ex.Message}");
                    }
                }
            }

           
            existingImage.FileName = newFileName;
            existingImage.FileDescription = dto.FileDescription;
            existingImage.FileExtension = Path.GetExtension(dto.File?.FileName ?? existingImage.FileName);
            existingImage.FileSizeInBytes = dto.File?.Length ?? existingImage.FileSizeInBytes;
            existingImage.FilePath = $"/ProductImages/{newFileName}";
            existingImage.ProductSlId = dto.ProductSlId;
            existingImage.FirstProductId = dto.FirstProductId;
            existingImage.SecondProductId = dto.SecondProductId;

            
            var updatedImage = await _productImageRepository.UpdateProductImageAsync(existingImage);

          
            return _mapper.Map<ProductImageResponseDto>(updatedImage);
        }
    }
}
