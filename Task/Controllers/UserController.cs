using Microsoft.AspNetCore.Mvc;
using Task.Models;
using Task.DTO;
using Microsoft.EntityFrameworkCore;
using Task.Data;

namespace Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Emri = u.Emri,
                    Email = u.Email
                })
                .ToListAsync();

            return Ok(users);
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Emri = u.Emri,
                    Email = u.Email
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        
        [HttpPost]
        public async Task<ActionResult<UserDto>> PostUser(UserDto userDto)
        {
            var user = new User
            {
                Emri = userDto.Emri,
                Email = userDto.Email
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            userDto.Id = user.Id; 

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDto);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserDto userDto)
        {
            if (id != userDto.Id)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Emri = userDto.Emri;
            user.Email = userDto.Email;

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

