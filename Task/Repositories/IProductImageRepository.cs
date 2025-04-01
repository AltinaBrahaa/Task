using Task.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Task.Interfaces
{
    public interface IProductImageRepository
    {
        // Adds a product image to the repository
        Task<ProductImage> AddProductImageAsync(ProductImage productImage);

        // Retrieves all product images
        Task<List<ProductImage>> GetAllProductImagesAsync();

        // Retrieves a product image by its ID
        Task<ProductImage?> GetProductImageByIdAsync(int productImageId);

        // Deletes a product image by its ID
        Task<bool> DeleteProductImageAsync(int productImageId);

        // Retrieves images based on any of the provided product IDs (ProductSlId, FirstProductId, SecondProductId)
        Task<List<ProductImage>> GetImagesByProductIdAsync(int? productId, int? firstProductId, int? secondProductId);
    }
}
