using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Task.Data;
using Task.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Swagger/OpenAPI configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Connection string configuration
var connectionString = builder.Configuration.GetConnectionString("MySqlConn");
Console.WriteLine($"Connection String: {connectionString}");

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// JWT Authentication Configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false, // Set to true if you have an issuer
            ValidateAudience = false, // Set to true if you have an audience
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret-key")), // Use a secure key in production
            ClockSkew = TimeSpan.Zero // Optional: to avoid expiration drift
        };
    });

// Authorization policy configuration
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SuperAdmin", policy => policy.RequireRole("SuperAdmin"));
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
    options.AddPolicy("User", policy => policy.RequireRole("User"));
});

// Register the Authentication service (if you use custom Authentication class)
builder.Services.AddScoped<Authentication>(); // If you use custom Authentication class

// Configure Identity (for role management)
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

var app = builder.Build();



// Development-specific settings (Swagger)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware configuration
app.UseHttpsRedirection();

// Use CORS policy
app.UseCors();

// Authentication middleware (required for JWT)
app.UseAuthentication();

// Authorization middleware
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Run the application
app.Run();