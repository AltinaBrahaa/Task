using Microsoft.AspNetCore.Mvc;
using Task.Models;
using Task.DTO;
using Microsoft.EntityFrameworkCore;
using Task.Data;
using Microsoft.AspNetCore.Authorization;

namespace Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Authentication _authentication; // Add the Authentication field

        // Modify the constructor to inject the Authentication service
        public UserController(AppDbContext context, Authentication authentication)
        {
            _context = context;
            _authentication = authentication;  // Initialize _authentication
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

     //   [Authorize(Roles = "SuperAdmin")]

        [HttpPost]
        public async Task<ActionResult<UserDto>> PostUser(UserDto userDto)
        {
            byte[] passwordHash, passwordSalt;
            _authentication.CreatePasswordHash(userDto.Password, out passwordHash, out passwordSalt);

            var user = new User
            {
                Emri = userDto.Emri,
                Email = userDto.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = userDto.Role ?? "User"
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
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
        
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            // Verify password
            if (!_authentication.VerifyPasswordHash(loginDto.Password, user.PasswordHash, user.PasswordSalt))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            // Create and return access token
            var token = _authentication.CreateAccessToken(user);
            return Ok(new { AccessToken = token });
        }
    }
}
