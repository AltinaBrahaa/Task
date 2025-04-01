using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task.Data;
using Task.DTO;
using Task.Models;

namespace Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class   FirstProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FirstProductController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<FirstProductDto>>> GetFirstproducts()
        {
            var firstproducts = await _context.FirstProducts
            .Include(p => p.ProductImages)
            .Select(p => new FirstProductDto
            {
                FirstProductId = p.FirstProductId,
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

            return Ok(firstproducts);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<FirstProductDto>> GetFirstProduct(int id)
        {
            var firstproduct = await _context.FirstProducts
                .Where(p => p.FirstProductId == id)
                .Select(p => new FirstProductDto
                {
                    FirstProductId = p.FirstProductId,
                    Name = p.Name,
                    OldPrice = p.OldPrice,
                    NewPrice = p.NewPrice,
                    City = p.City,
                    Size = p.Size,
                    Discount = p.Discount,
                    UserId = p.UserId
                })
                .FirstOrDefaultAsync();

            if (firstproduct == null)
            {
                return NotFound();
            }

            return Ok(firstproduct);
        }


        [HttpPost]
        public async Task<ActionResult<FirstProductDto>> PostFirstProduct(FirstProductDto firstproductDto)
        {
            try
            {

                var userId = firstproductDto.UserId;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "User ID is missing in the request body." });
                }

                var firstproduct = new FirstProduct
                {
                    Name = firstproductDto.Name,
                    OldPrice = firstproductDto.OldPrice,
                    NewPrice = firstproductDto.NewPrice,
                    City = firstproductDto.City,
                    Size = firstproductDto.Size,
                    Discount = firstproductDto.Discount,
                    UserId = userId
                };

                _context.FirstProducts.Add(firstproduct);
                await _context.SaveChangesAsync();

                firstproductDto.FirstProductId = firstproduct.FirstProductId;

                return CreatedAtAction(nameof(GetFirstProduct), new { id = firstproduct.FirstProductId }, firstproductDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing the request." });
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutFirstProduct(int id, FirstProductDto firstproductDto)
        {
            try
            {
                var userId = firstproductDto.UserId;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "User ID is missing in the request body." });
                }

                var firstproduct = await _context.FirstProducts.FindAsync(id);
                if (firstproduct == null)
                {
                    return NotFound();
                }

                if (firstproduct.UserId != userId)
                {
                    return Unauthorized(new { message = "You are not authorized to edit this product." });
                }

                firstproduct.Name = firstproductDto.Name;
                firstproduct.OldPrice = firstproductDto.OldPrice;
                firstproduct.NewPrice = firstproductDto.NewPrice;
                firstproduct.City = firstproductDto.City;
                firstproduct.Size = firstproductDto.Size;
                firstproduct.Discount = firstproductDto.Discount;

                _context.Entry(firstproduct).State = EntityState.Modified;
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
        public async Task<IActionResult> DeleteFirstProduct(int id)
        {
            var firstproduct = await _context.FirstProducts.FindAsync(id);
            if (firstproduct == null)
            {
                return NotFound();
            }

            _context.FirstProducts.Remove(firstproduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
