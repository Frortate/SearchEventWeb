
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly SearchEventContext _context;

        public SessionController(SearchEventContext context)
        {
            _context = context;
            if (_context.Sessions.Count() == 0)
            {
                _context.Sessions.Add(new Session { EventsOrganizersId = 1 });
                _context.SaveChanges();
            }
        }


        #region GET
        [HttpGet]
        public IEnumerable<Session> GetAll()
        {
            return _context.Sessions;
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSession([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sess = await _context.Sessions.SingleOrDefaultAsync(m => m.Id == id);

            if (sess == null)
            {
                return NotFound();
            }

            return Ok(sess);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Session session)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSession", new { id = session.Id }, session);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Session session)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Sessions.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.EventsOrganizersId = session.EventsOrganizersId;
            item.Date = session.Date;
            _context.Sessions.Update(item);
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
            var item = _context.Sessions.Find(id);
           
            if (item == null)
            {
                return NotFound();
            }

            _context.Sessions.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion

    }
}
