using Microsoft.AspNetCore.Mvc;
using Task.Data;
using Task.DTO;
using Task.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly Authentication _authentication;

    public AuthController(AppDbContext context, Authentication authentication)
    {
        _context = context;
        _authentication = authentication;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDTO)
    {
        // Log incoming credentials (avoid logging passwords)
        Console.WriteLine($"Login attempt for email: {loginDTO.Email}");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDTO.Email);

        if (user == null)
        {
            Console.WriteLine("User not found.");
            return Unauthorized(new { message = "Invalid credentials" });
        }

        // Verify password hash
        if (!_authentication.VerifyPasswordHash(loginDTO.Password, user.PasswordHash, user.PasswordSalt))
        {
            Console.WriteLine("Password mismatch.");
            return Unauthorized(new { message = "Invalid credentials" });
        }

        // Generate the token if credentials are correct
        var token = _authentication.CreateAccessToken(user);
        return Ok(new { AccessToken = token });
    }



}
