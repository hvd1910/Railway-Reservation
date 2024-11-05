using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BackendSM3.Modal;
using Project_BackendSM3.Modal.TicketDTO;
using Project_BackendSM3.Repos.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Project_BackendSM3.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly Projects3Context _context;

        public TicketsController(Projects3Context context)
        {
            _context = context;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
          if (_context.Tickets == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            return await _context.Tickets.ToListAsync();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
          if (_context.Tickets == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Ticket does not exist."

                });
            }

            return ticket;
        }


        [AllowAnonymous]
        [HttpPost("GetTicket")]
        public async Task<ActionResult<Ticket>> GetTicketCode(TicketStatusDTO ticketDTO)
        {
            if (_context.Tickets == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }

            var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.codeTicket == ticketDTO.codeTicket && t.email == ticketDTO.email && t.phone == ticketDTO.phone);

            if (ticket == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Ticket does not exist."

                });
            }else if(ticket.status == "Pending" ||  ticket.status == "Rejected")
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Ticket does not exist."

                });
            }

            return ticket;
        }


        // PUT: api/Tickets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
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


        [HttpPut("status/{id}")]
        public async Task<IActionResult> PutStatusTicket(int id, TicketPutStatus ticketPutStatus)
        {


          


            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Ticket does not exist."

                });
            }

            ticket.status = ticketPutStatus.status;

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
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


        [AllowAnonymous]
        [HttpPut("status/code")]
        public async Task<IActionResult> PutStatusTicket( TicketStatusDTO ticketStatusDTO)
        {

            var ticket = await _context.Tickets.FirstOrDefaultAsync(t=> t.codeTicket == ticketStatusDTO.codeTicket && t.email == ticketStatusDTO.email && t.phone == ticketStatusDTO.phone);
            if (ticket == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Ticket does not exist."

                });
            }
            DateTime dateTime1 = DateTime.Now;

            string chuoiNgayThang = ticket.dateSchedule;
            string chuoiGio = ticket.timeSchedule;
            string dinhDangNgayThang = "dd/MM/yyyy";
            string dinhDangGio = "HH:mm";
            string chuoiDateTime = chuoiNgayThang + " " + chuoiGio;
            DateTime dateTime2 = DateTime.ParseExact(chuoiDateTime, $"{dinhDangNgayThang} {dinhDangGio}", CultureInfo.InvariantCulture);

            TimeSpan khoangThoiGian = dateTime2 - dateTime1;
            double soGio = khoangThoiGian.TotalHours;
            if(ticket.status == "Rejected" || ticket.status == "Pending")
            {

                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Train tickets do not exist."

                });

            }
            else 
            {
                if (soGio > 24)
                {
                    ticket.status = "Rejected";

                    _context.Entry(ticket).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {

                        return Ok(new ErrorDTO
                        {
                            Status = "error",
                            Message = "Return the ticket failed, please try again."

                        });

                    }



                    var payment = await _context.PaymentDetails.FirstOrDefaultAsync(p=> p.TicketId == ticket.Id);

                    payment.status = "Refund";

                    _context.Entry(payment).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {

                        return Ok(new ErrorDTO
                        {
                            Status = "error",
                            Message = "Return the ticket failed, please try again."

                        });

                    }

                }
                else
                {
                    return Ok(new ErrorDTO
                    {
                        Status = "error",
                        Message = "Ticket refund time beyond the allowed time is 24 hours before the train departs."

                    });

                }
            }


           

            return NoContent();
        }



        [AllowAnonymous]
        // POST: api/Tickets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(TicketCreateDTO ticketCreateDTO)
        {

            Ticket ticket  = new Ticket ();

            ticket.route_from = ticketCreateDTO.route_from;
            ticket.route_to = ticketCreateDTO.route_to;
            ticket.dateSchedule = ticketCreateDTO.dateSchedule;
            ticket.timeSchedule = ticketCreateDTO.timeSchedule;
            ticket.scheduleId = ticketCreateDTO.scheduleId;
            ticket.seat_type = ticketCreateDTO.seat_type;
            ticket.seat_num = ticketCreateDTO.seat_num;
            ticket.codeTicket = ticketCreateDTO.codeTicket;
            ticket.fullName = ticketCreateDTO.fullName;
            ticket.email    = ticketCreateDTO.email;
            ticket.phone = ticketCreateDTO.phone;
            ticket.status = "Pending";
            ticket.dateUpdated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
            ticket.dateCreated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
          if (_context.Tickets == null)
          {
              return Problem("Entity set 'Projects3Context.Tickets'  is null.");
          }
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            if (_context.Tickets == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }

            try
            {
                var getPayment = await _context.PaymentDetails.FirstOrDefaultAsync(t => t.TicketId == id);

                if (getPayment.Id != null)
                {
                    return Ok(new ErrorDTO
                    {
                        Status = "error",
                        Message = "Train tickets have been paid and cannot be deleted."

                    });
                }
            }
            catch
            {
                var ticket = await _context.Tickets.FindAsync(id);
                if (ticket == null)
                {
                    return Ok(new ErrorDTO
                    {
                        Status = "error",
                        Message = "Ticket does not exist."

                    });
                }

                _context.Tickets.Remove(ticket);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            return NoContent();
        }

        [AllowAnonymous]
        [HttpGet("countTicket")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetCountTickets(
            [FromQuery] string seatType,
             [FromQuery] int  scheduleId
             )
        {
            try
            {
                var matchingTickets = await _context.Tickets
                .Where(ticket =>
                        ticket.seat_type == seatType
                        && ticket.scheduleId == scheduleId &&
        (ticket.status == "pending" || ticket.status == "booked"))
                    .ToListAsync();

                return Ok(matchingTickets);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return Ok( new ErrorDTO
                {
                    Status = "error",
                    Message = $"Internal server error: {ex.Message}"
                });
            }
        }


        private bool TicketExists(int id)
        {
            return (_context.Tickets?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
