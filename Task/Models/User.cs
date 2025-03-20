using Task.Models;

public class User
{
    public int Id { get; set; }
    public string Emri { get; set; }
    public string Email { get; set; }
    public byte[] PasswordHash { get; set; } = null!;
    public byte[] PasswordSalt { get; set; } = null!;
    public string Role { get; set; } = "User"; 
    public ICollection<Taski> Tasks { get; set; }
}
