﻿namespace Task.DTO
{
    public class FirstProductDto
    {
        public int FirstProductId { get; set; }

        public string Name { get; set; }

        public decimal? OldPrice { get; set; }

        public decimal? NewPrice { get; set; }

        public string? City { get; set; }

        public string? Size { get; set; }

        public decimal? Discount { get; set; }

        public string? UserId { get; set; }
    }
}
