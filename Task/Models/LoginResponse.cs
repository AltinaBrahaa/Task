namespace Task.Models
{
    public class LoginResponse
    {
      
            public string AccessToken { get; set; } = null!;
            public string RefreshToken { get; set; } = null!;
            public User? User { get; set; }

        
    }
}

