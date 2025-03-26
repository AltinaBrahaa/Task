using Task.DTO;

namespace Task.Interfaces
{
    public interface IProductImageService
    {
        Task<ProductImageResponseDto> UploadProductImageAsync(ProductImageUploadRequestDto dto);
        Task<ProductImageResponseDto?> GetProductImageByIdAsync(int productimageId);
        Task<bool> DeleteProductImageAsync(int productimageId);
        Task<List<ProductImageResponseDto>> GetAllProductImagesAsync();
    }
}
