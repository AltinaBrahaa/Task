using Microsoft.AspNetCore.Mvc;
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


