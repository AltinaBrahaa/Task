using System.ComponentModel.DataAnnotations;

namespace Task.DTO
{
    public class ProductImageUploadRequestDto
    {
        [Required]
        public IFormFile File { get; set; }

        [Required]
        public string FileName { get; set; }

        public string? FileDescription { get; set; }
        public int? ProductSlId { get; set; }

        public int? FirstProductId { get; set; }

        public int? SecondProductId { get; set; }
    }
}
