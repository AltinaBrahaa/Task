using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task.DTO;
using AutoMapper;
using Task.Models;

namespace Task.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            CreateMap<Image, ImageUploadRequestDto>().ReverseMap();
            CreateMap<Image, ImageResponseDto>();

            CreateMap<ProductImage, ProductImageUploadRequestDto>().ReverseMap();
            CreateMap<ProductImage, ProductImageResponseDto>();
        }
    }
}

