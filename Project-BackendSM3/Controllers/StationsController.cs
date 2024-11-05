using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BackendSM3.Modal;
using Project_BackendSM3.Modal.StationDTO;
using Project_BackendSM3.Repos.Models;

namespace Project_BackendSM3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationsController : ControllerBase
    {
        private readonly Projects3Context _context;

        public StationsController(Projects3Context context)
        {
            _context = context;
        }

        // GET: api/Stations
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Station>>> GetStations()
        {
          if (_context.Stations == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            return await _context.Stations.ToListAsync();
        }

        // GET: api/Stations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Station>> GetStation(int id)
        {
          if (_context.Stations == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            var station = await _context.Stations.FindAsync(id);

            if (station == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "The train station does not exist."

                });
            }

            return station;
        }

        // PUT: api/Stations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStation(int id, StationDTO stationDTO)
        {



            var station = await _context.Stations.FindAsync(id);
            if (station == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "The train station does not exist."

                });
            }
            station.stationName = stationDTO.stationName;
            station.dateUpdated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");


            _context.Entry(station).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StationExists(id))
                {
                    return Ok(new ErrorDTO
                    {
                        Status = "error",
                        Message = "Update failed, please try again."

                    });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Stations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Station>> PostStation(StationDTO stationDTO)
        {
            Station station = new Station();
            station.stationName = stationDTO.stationName;
            station.dateCreated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
            station.dateUpdated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
          if (_context.Stations == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            _context.Stations.Add(station);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStation", new { id = station.Id }, station);
        }

        // DELETE: api/Stations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStation(int id)
        {
            if (_context.Stations == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            var station = await _context.Stations.FindAsync(id);
            if (station == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "The train station does not exist."

                });
            }

            _context.Stations.Remove(station);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StationExists(int id)
        {
            return (_context.Stations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
