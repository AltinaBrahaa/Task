﻿using Microsoft.AspNetCore.Identity;
using System.Collections.Generic; 

namespace Task.Models
{
    public class User : IdentityUser
    {
        
        public string Emri { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; } = null!;
        public byte[] PasswordSalt { get; set; } = null!;
        public string Role { get; set; } = "User";
        public ICollection<Taski> Tasks { get; set; }

        public ICollection<ProductSl> ProductSls { get; set; }

        public ICollection<FirstProduct> FirstProducts { get; set; }

        public ICollection<SecondProduct> SecondProducts { get; set; }
    }
}
