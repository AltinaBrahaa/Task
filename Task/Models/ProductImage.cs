using System.ComponentModel.DataAnnotations.Schema;

namespace Task.Models
{
    public class ProductImage
    {
        public int ProductImageId { get; set; }
        [NotMapped]
        public IFormFile File { get; set; }
        public string FileName { get; set; }
        public string? FileDescription { get; set; }
        public string FileExtension { get; set; }
        public long FileSizeInBytes { get; set; }
        public string FilePath { get; set; }
        public int? ProductSlId { get; set; }
        public ProductSl? ProductSl { get; set; }

        public int? FirstProductId { get; set; }
        public FirstProduct? FirstProduct { get; set; }

        public int? SecondProductId { get; set; }
        public SecondProduct? SecondProduct { get; set; }
    }
}
