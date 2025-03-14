using Microsoft.EntityFrameworkCore;
using Task.Models;
namespace Task.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {


        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Taski>()
                .HasOne(t => t.User)  
                .WithMany(u => u.Tasks)  
                .HasForeignKey(t => t.UserId)  
                .OnDelete(DeleteBehavior.Cascade);  
        }

        public DbSet<Taski>Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
