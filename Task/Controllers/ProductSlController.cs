using Microsoft.AspNetCore.Mvc;
using Task.Models;
using Task.DTO;
using Microsoft.EntityFrameworkCore;
using Task.Data;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSlController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductSlController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductSlDto>>> GetProducts()
        {
                            var products = await _context.ProductSls
                            .Include(p => p.ProductImages)
                            .Select(p => new ProductSlDto
                            {
                                ProductSlId = p.ProductSlId,
                                Name = p.Name,
                                OldPrice = p.OldPrice,
                                NewPrice = p.NewPrice,
                                City = p.City,
                                Size = p.Size,
                                Discount = p.Discount,
                                UserId = p.UserId,
                                /*ProductImages = p.ProductImages.Select(pi => new ProductImageResponseDto
                                {
                                    FilePath = pi.FilePath
                                }).ToList()*/
                            })
                            .ToListAsync();

            return Ok(products);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ProductSlDto>> GetProduct(int id)
        {
            var product = await _context.ProductSls
                .Where(p => p.ProductSlId == id)
                .Select(p => new ProductSlDto
                {
                    ProductSlId = p.ProductSlId,
                    Name = p.Name,
                    OldPrice = p.OldPrice,
                    NewPrice = p.NewPrice,
                    City = p.City,
                    Size = p.Size,
                    Discount = p.Discount,
                    UserId = p.UserId
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

      
        [HttpPost]
        public async Task<ActionResult<ProductSlDto>> PostProduct(ProductSlDto productDto)
        {
            try
            {
               
                var userId = productDto.UserId;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "User ID is missing in the request body." });
                }

                var product = new ProductSl
                {
                    Name = productDto.Name,
                    OldPrice = productDto.OldPrice,
                    NewPrice = productDto.NewPrice,
                    City = productDto.City,
                    Size = productDto.Size,
                    Discount = productDto.Discount,
                    UserId = userId
                };

                _context.ProductSls.Add(product);
                await _context.SaveChangesAsync();

                productDto.ProductSlId = product.ProductSlId;

                return CreatedAtAction(nameof(GetProduct), new { id = product.ProductSlId }, productDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing the request." });
            }
        }

     
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductSlDto productDto)
        {
            try
            {
                var userId = productDto.UserId;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "User ID is missing in the request body." });
                }

                var product = await _context.ProductSls.FindAsync(id);
                if (product == null)
                {
                    return NotFound();
                }

                if (product.UserId != userId)
                {
                    return Unauthorized(new { message = "You are not authorized to edit this product." });
                }

                product.Name = productDto.Name;
                product.OldPrice = productDto.OldPrice;
                product.NewPrice = productDto.NewPrice;
                product.City = productDto.City;
                product.Size = productDto.Size;
                product.Discount = productDto.Discount;

                _context.Entry(product).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing the request." });
            }
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.ProductSls.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.ProductSls.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
