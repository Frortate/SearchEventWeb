
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsOrganizerController : ControllerBase
    {
        private readonly SearchEventContext _context;

        public EventsOrganizerController(SearchEventContext context)
        {
            _context = context;
        }


        #region GET
        [HttpGet]
        public IEnumerable<EventsOrganizer> GetAll()
        {
            return _context.EventsOrganizers.Include(p => p.Organizer)
                .Include(a => a.Event).Include(s => s.Sessions);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventsOrganizer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var evntorg = await _context.EventsOrganizers.Include(p => p.Organizer)
                .Include(a => a.Event).Include(s => s.Sessions).SingleOrDefaultAsync(m => m.Id == id);

            if (evntorg == null)
            {
                return NotFound();
            }

            return Ok(evntorg);
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EventsOrganizer evntorg)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.EventsOrganizers.Add(evntorg);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEventsOrganizer", new { id = evntorg.Id }, evntorg);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] EventsOrganizer evntorg)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.EventsOrganizers.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            item.EventId = evntorg.EventId;
            item.OrganizerId = evntorg.OrganizerId;
            


            _context.EventsOrganizers.Update(item);

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
            var item2 = _context.Sessions.Where(p => p.EventsOrganizersId == id).ToList();
            var item = _context.EventsOrganizers.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            
                for (int i = 0; i < item2.Count; i++)
                {
                    _context.Sessions.Remove(item2[i]);
                }
            
            

            _context.EventsOrganizers.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion
    }
}
