using Task.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task.Models;
using Task.Data;
using Microsoft.EntityFrameworkCore;

namespace Task.Repositories
{
    public class ProductImageRepository : IProductImageRepository
    {
        private readonly AppDbContext _context;

        public ProductImageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProductImage> AddProductImageAsync(ProductImage productImage)
        {
            _context.ProductImage.Add(productImage);
            await _context.SaveChangesAsync();
            return productImage;
        }

        public async Task<List<ProductImage>> GetAllProductImagesAsync()
        {
            return await _context.ProductImage.ToListAsync();
        }

        public async Task<ProductImage?> GetProductImageByIdAsync(int productImageId)
        {
            return await _context.ProductImage.FindAsync(productImageId);
        }

        public async Task<bool> DeleteProductImageAsync(int productImageId)
        {
            var productImage = await _context.ProductImage.FindAsync(productImageId);
            if (productImage == null)
            {
                return false;
            }

            _context.ProductImage.Remove(productImage);
            await _context.SaveChangesAsync();
            return true;
        }

        
        public async Task<List<ProductImage>> GetImagesByProductIdAsync(int productId)
        {
            return await _context.ProductImage
                                 .Where(pi => pi.ProductSlId == productId)
                                 .ToListAsync();
        }
    }
}
