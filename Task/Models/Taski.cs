using Microsoft.AspNetCore.Identity;

namespace Task.Models
{
    public class Taski
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        
        public string? UserId { get; set; }

        
        public User User { get; set; }
    }
}
