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
    public class SecondProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SecondProductController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<SecondProductDto>>> GetSecondproducts()
        {
            var secondproducts = await _context.SecondProducts
            .Include(p => p.ProductImages)
            .Select(p => new SecondProductDto
            {
                SecondProductId = p.SecondProductId,
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

            return Ok(secondproducts);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<SecondProductDto>> GetSecondProduct(int id)
        {
            var secondproduct = await _context.SecondProducts
                .Where(p => p.SecondProductId == id)
                .Select(p => new SecondProductDto
                {
                    SecondProductId = p.SecondProductId,
                    Name = p.Name,
                    OldPrice = p.OldPrice,
                    NewPrice = p.NewPrice,
                    City = p.City,
                    Size = p.Size,
                    Discount = p.Discount,
                    UserId = p.UserId
                })
                .FirstOrDefaultAsync();

            if (secondproduct == null)
            {
                return NotFound();
            }

            return Ok(secondproduct);
        }


        [HttpPost]
        public async Task<ActionResult<SecondProductDto>> PostSecondProduct(SecondProductDto secondproductDto)
        {
            try
            {

                var userId = secondproductDto.UserId;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "User ID is missing in the request body." });
                }

                var secondproduct = new SecondProduct
                {
                    Name = secondproductDto.Name,
                    OldPrice = secondproductDto.OldPrice,
                    NewPrice = secondproductDto.NewPrice,
                    City = secondproductDto.City,
                    Size = secondproductDto.Size,
                    Discount = secondproductDto.Discount,
                    UserId = userId
                };

                _context.SecondProducts.Add(secondproduct);
                await _context.SaveChangesAsync();

                secondproductDto.SecondProductId = secondproduct.SecondProductId;

                return CreatedAtAction(nameof(GetSecondProduct), new { id = secondproduct.SecondProductId }, secondproductDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing the request." });
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutSecondProduct(int id, SecondProductDto secondproductDto)
        {
            try
            {
                var userId = secondproductDto.UserId;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "User ID is missing in the request body." });
                }

                var secondproduct = await _context.SecondProducts.FindAsync(id);
                if (secondproduct == null)
                {
                    return NotFound();
                }

                if (secondproduct.UserId != userId)
                {
                    return Unauthorized(new { message = "You are not authorized to edit this product." });
                }

                secondproduct.Name = secondproductDto.Name;
                secondproduct.OldPrice = secondproductDto.OldPrice;
                secondproduct.NewPrice = secondproductDto.NewPrice;
                secondproduct.Size = secondproductDto.Size;
                secondproduct.Discount = secondproductDto.Discount;

                _context.Entry(secondproduct).State = EntityState.Modified;
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
        public async Task<IActionResult> DeleteSecondProduct(int id)
        {
            var secondproduct = await _context.SecondProducts.FindAsync(id);
            if (secondproduct == null)
            {
                return NotFound();
            }

            _context.SecondProducts.Remove(secondproduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
