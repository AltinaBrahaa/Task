using Task.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Task.Interfaces
{
    public interface IProductImageService
    {
        // Upload a product image
        Task<ProductImageResponseDto> UploadProductImageAsync(ProductImageUploadRequestDto dto);

        // Get a product image by its ID
        Task<ProductImageResponseDto?> GetProductImageByIdAsync(int productImageId);

        // Delete a product image by its ID
        Task<bool> DeleteProductImageAsync(int productImageId);

        // Get images by productId, firstProductId, or secondProductId
        Task<List<ProductImageResponseDto>> GetImagesByProductIdAsync(int? productId, int? firstProductId, int? secondProductId);

        // Get all product images
        Task<List<ProductImageResponseDto>> GetAllProductImagesAsync();
    }
}
