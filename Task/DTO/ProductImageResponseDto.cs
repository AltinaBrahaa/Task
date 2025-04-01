namespace Task.DTO
{
    public class ProductImageResponseDto
    {
        public int ProductImageId { get; set; }
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public int? ProductSlId { get; set; }

        public int? FirstProductId { get; set; }

        public int? SecondProductId { get; set; }
    }
}
