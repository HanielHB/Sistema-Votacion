using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaVotacion2.Data;
using SistemaVotacion2.Models;

namespace SistemaVotacion2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VotacionMesasController : ControllerBase
    {
        private readonly SistemaVotacion2Context _context;

        public VotacionMesasController(SistemaVotacion2Context context)
        {
            _context = context;
        }

        // GET: api/VotacionMesas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VotacionMesa>>> GetVotacionMesa()
        {
            return await _context.VotacionMesa.ToListAsync();
        }

        // GET: api/VotacionMesas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VotacionMesa>> GetVotacionMesa(int id)
        {
            var votacionMesa = await _context.VotacionMesa.FindAsync(id);

            if (votacionMesa == null)
            {
                return NotFound();
            }

            return votacionMesa;
        }

        // PUT: api/VotacionMesas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVotacionMesa(int id, VotacionMesa votacionMesa)
        {
            if (id != votacionMesa.Id)
            {
                return BadRequest();
            }

            _context.Entry(votacionMesa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VotacionMesaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/VotacionMesas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VotacionMesa>> PostVotacionMesa(VotacionMesa votacionMesa)
        {
            _context.VotacionMesa.Add(votacionMesa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVotacionMesa", new { id = votacionMesa.Id }, votacionMesa);
        }

        // DELETE: api/VotacionMesas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVotacionMesa(int id)
        {
            var votacionMesa = await _context.VotacionMesa.FindAsync(id);
            if (votacionMesa == null)
            {
                return NotFound();
            }

            _context.VotacionMesa.Remove(votacionMesa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VotacionMesaExists(int id)
        {
            return _context.VotacionMesa.Any(e => e.Id == id);
        }
    }
}
