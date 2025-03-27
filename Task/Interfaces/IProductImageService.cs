using Task.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Task.Interfaces
{
    public interface IProductImageService
    {
        Task<ProductImageResponseDto> UploadProductImageAsync(ProductImageUploadRequestDto dto);
        Task<ProductImageResponseDto?> GetProductImageByIdAsync(int productimageId);
        Task<bool> DeleteProductImageAsync(int productimageId);

   
        Task<List<ProductImageResponseDto>> GetImagesByProductIdAsync(int productId);

        Task<List<ProductImageResponseDto>> GetAllProductImagesAsync();
    }
}
