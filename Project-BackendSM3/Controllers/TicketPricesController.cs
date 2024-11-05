using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BackendSM3.Modal;
using Project_BackendSM3.Modal.TicketPriceDTO;
using Project_BackendSM3.Repos.Models;

namespace Project_BackendSM3.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TicketPricesController : ControllerBase
    {
        private readonly Projects3Context _context;

        public TicketPricesController(Projects3Context context)
        {
            _context = context;
        }


        [AllowAnonymous]
        // GET: api/TicketPrices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketPrice>>> GetTicketPrices()
        {
          if (_context.TicketPrices == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            return await _context.TicketPrices.ToListAsync();
        }

        // GET: api/TicketPrices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketPrice>> GetTicketPrice(int id)
        {
          if (_context.TicketPrices == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            var ticketPrice = await _context.TicketPrices.FindAsync(id);

            if (ticketPrice == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Ticket price does not exist."

                });
            }

            return ticketPrice;
        }

        // PUT: api/TicketPrices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicketPrice(int id, TicketPriceDTO ticketPriceDTO)
        {



            
             var ticketPrice = await _context.TicketPrices.FindAsync(id);
            if (ticketPrice == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Ticket price does not exist."

                });
            }
            ticketPrice.ticketName = ticketPriceDTO.ticketName;
            ticketPrice.Price = ticketPriceDTO.Price;
            ticketPrice.dateUpdated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");

            if (id != ticketPrice.Id)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Ticket price does not exist."

                });
            }


            _context.Entry(ticketPrice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketPriceExists(id))
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

        // POST: api/TicketPrices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TicketPrice>> PostTicketPrice(TicketPriceDTO ticketPriceCreateDTO)
        {
          if (_context.TicketPrices == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
          TicketPrice ticketPrice = new TicketPrice();
            ticketPrice.ticketName = ticketPriceCreateDTO.ticketName;
            ticketPrice.Price = ticketPriceCreateDTO.Price;
            ticketPrice.dateUpdated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
            ticketPrice.dateCreated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");

            _context.TicketPrices.Add(ticketPrice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicketPrice", new { id = ticketPrice.Id }, ticketPrice);

        }

        // DELETE: api/TicketPrices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicketPrice(int id)
        {
            if (_context.TicketPrices == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            var ticketPrice = await _context.TicketPrices.FindAsync(id);
            if (ticketPrice == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Ticket price does not exist."

                });
            }

            _context.TicketPrices.Remove(ticketPrice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketPriceExists(int id)
        {
            return (_context.TicketPrices?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
