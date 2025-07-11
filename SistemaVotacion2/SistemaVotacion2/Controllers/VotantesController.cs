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
    public class VotantesController : ControllerBase
    {
        private readonly SistemaVotacion2Context _context;

        public VotantesController(SistemaVotacion2Context context)
        {
            _context = context;
        }

        // GET: api/Votantes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Votante>>> GetVotante()
        {
            return await _context.Votante.ToListAsync();
        }

        // GET: api/Votantes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Votante>> GetVotante(int id)
        {
            var votante = await _context.Votante.FindAsync(id);

            if (votante == null)
            {
                return NotFound();
            }

            return votante;
        }

        // PUT: api/Votantes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVotante(int id, Votante votante)
        {
            if (id != votante.Id)
            {
                return BadRequest();
            }

            _context.Entry(votante).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VotanteExists(id))
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

        // POST: api/Votantes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Votante>> PostVotante(Votante votante)
        {
            _context.Votante.Add(votante);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVotante", new { id = votante.Id }, votante);
        }

        // DELETE: api/Votantes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVotante(int id)
        {
            var votante = await _context.Votante.FindAsync(id);
            if (votante == null)
            {
                return NotFound();
            }

            _context.Votante.Remove(votante);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VotanteExists(int id)
        {
            return _context.Votante.Any(e => e.Id == id);
        }
    }
}
