﻿using Task.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Task.DTO;

namespace Task.Interfaces
{
    public interface IProductImageRepository
    {
        Task<ProductImage> AddProductImageAsync(ProductImage productImage);
        Task<List<ProductImage>> GetAllProductImagesAsync();

        Task<List<ProductImage>> GetImagesByProductIdAsync(int productId);
        Task<ProductImage?> GetProductImageByIdAsync(int productImageId);
        Task<bool> DeleteProductImageAsync(int productImageId);
    }
}
