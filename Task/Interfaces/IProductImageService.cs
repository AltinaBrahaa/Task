using Task.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Task.Interfaces
{
    public interface IProductImageService
    {
        
        Task<ProductImageResponseDto> UploadProductImageAsync(ProductImageUploadRequestDto dto);

    
        Task<ProductImageResponseDto?> GetProductImageByIdAsync(int productImageId);

       
        Task<bool> DeleteProductImageAsync(int productImageId);

        
        Task<List<ProductImageResponseDto>> GetImagesByProductIdAsync(int? productId, int? firstProductId, int? secondProductId);

        Task<ProductImageResponseDto> UpdateProductImageAsync(int id, ProductImageUploadRequestDto dto);
        Task<List<ProductImageResponseDto>> GetAllProductImagesAsync();
    }
}
