using Task.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Task.Interfaces
{
    public interface IProductImageRepository
    {
        
        Task<ProductImage> AddProductImageAsync(ProductImage productImage);

       
        Task<List<ProductImage>> GetAllProductImagesAsync();

       
        Task<ProductImage?> GetProductImageByIdAsync(int productImageId);

       
        Task<bool> DeleteProductImageAsync(int productImageId);

        Task<ProductImage> UpdateProductImageAsync(ProductImage productImage);


        Task<List<ProductImage>> GetImagesByProductIdAsync(int? productId, int? firstProductId, int? secondProductId);
    }
}
