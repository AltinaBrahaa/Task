using Microsoft.AspNetCore.Identity;

namespace Task.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Shtoni fushat shtesë që dëshironi për përdoruesin
        public string FullName { get; set; }  // Fusha për emrin e plotë të përdoruesit
       // public string ProfilePictureUrl { get; set; } // Fusha për ruajtjen e URL të imazhit të profilit (nëse përdoret)
    }
}
