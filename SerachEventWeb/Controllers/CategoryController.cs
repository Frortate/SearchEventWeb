
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly SearchEventContext _context;

        public CategoryController(SearchEventContext context)
        {
            _context = context;
            if (_context.Categories.Count() == 0)
            {
                _context.Categories.Add(new Category { Name = "Ужасы" });
                _context.SaveChanges();
            }
        }


        #region GET
        [HttpGet]
        public IEnumerable<Category> GetAll()
        {
            return _context.Categories.Include(p => p.Events);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cat = await _context.Categories.SingleOrDefaultAsync(m => m.Id == id);

            if (cat == null)
            {
                return NotFound();
            }

            return Ok(cat);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Categories.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.Name = category.Name;
            _context.Categories.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion


        #region DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Categories.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Categories.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion
    }
}
