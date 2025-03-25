using Microsoft.AspNetCore.Mvc;
using Task.Models;
using Task.DTO;
using Microsoft.EntityFrameworkCore;
using Task.Data;
using System.Security.Claims;
using System;

namespace Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskiController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskiController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskiDto>>> GetTasket()
        {
            var tasks = await _context.Tasks
                .Select(t => new TaskiDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    UserId = t.UserId 
                })
                .ToListAsync();

            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskiDto>> GetTaski(int id)
        {
            var task = await _context.Tasks
                .Where(t => t.Id == id)
                .Select(t => new TaskiDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    UserId = t.UserId 
                })
                .FirstOrDefaultAsync();

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<TaskiDto>> PostTaski(TaskiDto taskiDto)
        {
            try
            {
              
                var claims = User.Claims.ToList();
                foreach (var claim in claims)
                {
                    Console.WriteLine($"Claim type: {claim.Type}, Claim value: {claim.Value}");
                }

                // Get UserId directly from the taskiDto sent by front-end
                var userId = taskiDto.UserId;

              
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "User ID is missing in the request body." });
                }

                var taski = new Taski
                {
                    Title = taskiDto.Title,
                    Description = taskiDto.Description,
                    UserId = userId 
                };

            
                _context.Tasks.Add(taski);
                await _context.SaveChangesAsync();

                
                taskiDto.Id = taski.Id;

              
                return CreatedAtAction(nameof(GetTaski), new { id = taski.Id }, taskiDto);
            }
            catch (Exception ex)
            {
           
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing the request." });
            }
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaski(int id, TaskiDto taskiDto)
        {
            try
            {
             
                var userId = taskiDto.UserId;

              
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "User ID is missing in the request body." });
                }

               
                var taski = await _context.Tasks.FindAsync(id);
                if (taski == null)
                {
                    return NotFound();
                }

                
                if (taski.UserId != userId)  
                {
                    return Unauthorized(new { message = "You are not authorized to edit this task." });
                }

               
                taski.Title = taskiDto.Title;
                taski.Description = taskiDto.Description;

            
                _context.Entry(taski).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();  
            }
            catch (Exception ex)
            {
     
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred while processing the request." });
            }
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaski(int id)
        {
            var taski = await _context.Tasks.FindAsync(id);
            if (taski == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(taski);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}





/*using Microsoft.AspNetCore.Mvc;
using Task.Models;
using Task.DTO;
using Microsoft.EntityFrameworkCore;
using Task.Data;

namespace Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskiController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskiController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskiDto>>> GetTasket()
        {
            var tasks = await _context.Tasks
                .Select(t => new TaskiDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    UserId = t.UserId 
                })
                .ToListAsync();

            return Ok(tasks);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskiDto>> GetTaski(int id)
        {
            var task = await _context.Tasks
                .Where(t => t.Id == id)
                .Select(t => new TaskiDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    UserId = t.UserId 
                })
                .FirstOrDefaultAsync();

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        
        [HttpPost]
        public async Task<ActionResult<TaskiDto>> PostTaski(TaskiDto taskiDto)
        {
            var taski = new Taski
            {
                Title = taskiDto.Title,
                Description = taskiDto.Description,
                UserId = taskiDto.UserId
            };

            _context.Tasks.Add(taski);
            await _context.SaveChangesAsync();

            taskiDto.Id = taski.Id; 

            return CreatedAtAction(nameof(GetTaski), new { id = taski.Id }, taskiDto);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaski(int id, TaskiDto taskiDto)
        {
            if (id != taskiDto.Id)
            {
                return BadRequest();
            }

            var taski = await _context.Tasks.FindAsync(id);
            if (taski == null)
            {
                return NotFound();
            }

            taski.Title = taskiDto.Title;
            taski.Description = taskiDto.Description;
            taski.UserId = taskiDto.UserId;

            _context.Entry(taski).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaski(int id)
        {
            var taski = await _context.Tasks.FindAsync(id);
            if (taski == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(taski);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
*/

