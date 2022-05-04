
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly SearchEventContext _context;

        public EventController(SearchEventContext context)
        {
            _context = context;
            if (_context.Events.Count() == 0)
            {
                _context.Events.Add(new Event { Title = "No Name", Description = "Что-то о фильме No Name", 
                    Site = "https://metanit.com/sharp/entityframeworkcore/1.3.php", TypeId = 3, CategoryId = 2,
                    AgeId = 1});
                _context.SaveChanges();
            }
        }


        #region GET
        [HttpGet]
        public IEnumerable<Event> GetAll()
        {
            return _context.Events.Include(a => a.Age).Include(c => c.Category).Include(t => t.Type).Include(p => p.EventsOrganizers).ThenInclude(s => s.Organizer).ThenInclude(s => s.Place).Include(p => p.EventsOrganizers).ThenInclude(s => s.Sessions);
        }
        #endregion


        #region GET по id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent([FromRoute] int id) /*[FromBody]Event evnt*/
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //string s = Convert.ToBase64String(evnt.Poster);

            var ev = await _context.Events.Include(a => a.Age).Include(c => c.Category).Include(t => t.Type).Include(p => p.EventsOrganizers).ThenInclude(s => s.Organizer).ThenInclude(s => s.Place).Include(p => p.EventsOrganizers).ThenInclude(s => s.Sessions).SingleOrDefaultAsync(m => m.Id == id);

            

            if (ev == null)
            {
                return NotFound();
            }

            return Ok(ev);
            //return Ok(new { ev, s });
        }
        #endregion


        #region POST
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Event evnt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Events.Add(evnt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = evnt.Id }, evnt);
        }
        #endregion


        #region PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Event evnt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Events.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            //item.Title = evnt.Title;
            item.Description = evnt.Description;
            ////item.Site = evnt.Site;
            ////item.Poster = evnt.Poster;
            ////item.TypeId = evnt.TypeId;
            ////item.CategoryId = evnt.CategoryId;
            ////item.AgeId = evnt.AgeId;


            _context.Events.Update(item);
            
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
           
            //var item4 = _context.UsersSessions.Where(p => p.SessionId == id).ToList();
            //var item3 = _context.Sessions.Where(p => p.EventsOrganizersId == id).ToList();
            var item2 = _context.EventsOrganizers.Where(p => p.EventId == id).ToList();
            var item = _context.Events.Find(id);
            
            if (item == null)
            {
                return NotFound();
            }

            
                for (int i = 0; i < item2.Count; i++)
                {
                    _context.EventsOrganizers.Remove(item2[i]);
                    var item3 = _context.Sessions.Where(p => p.EventsOrganizersId == item2[i].Id).ToList();

                for (int j = 0; j < item3.Count; j++)
                    {
                        _context.Sessions.Remove(item3[j]);
                    }

                }
            
            
;
            _context.Events.Remove(item);
            
            await _context.SaveChangesAsync();
            return NoContent();
        }
        #endregion
    }
}
