using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BackendSM3.Modal;
using Project_BackendSM3.Modal.PaymentDTO;
using Project_BackendSM3.Modal.TicketDTO;
using Project_BackendSM3.Repos.Models;

namespace Project_BackendSM3.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentDetailsController : ControllerBase
    {
        private readonly Projects3Context _context;

        public PaymentDetailsController(Projects3Context context)
        {
            _context = context;
        }

        // GET: api/PaymentDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentDetail>>> GetPaymentDetails()
        {
          if (_context.PaymentDetails == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            return await _context.PaymentDetails.ToListAsync();
        }

        // GET: api/PaymentDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentDetail>> GetPaymentDetail(int id)
        {
          if (_context.PaymentDetails == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            var paymentDetail = await _context.PaymentDetails.FindAsync(id);

            if (paymentDetail == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Payment does not exist."

                });
            }

            return paymentDetail;
        }


        //Put Status
        [HttpPut("status/{id}")]
        public async Task<IActionResult> PutStatusTicket(int id, PaymentPutStatus paymentPutStatus)
        {





            var paymentDetail = await _context.PaymentDetails.FindAsync(id);
            if (paymentDetail == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Payment does not exist."

                });
            }

            paymentDetail.status = paymentPutStatus.status;

            _context.Entry(paymentDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentDetailExists(id))
                {
                    return Ok(new ErrorDTO
                    {
                        Status = "error",
                        Message = "Update payment failed, please try again."

                    });
                }
                else
                {
                    throw;
                }
            }


            var ticket = await _context.Tickets.FirstOrDefaultAsync(p => p.Id == paymentDetail.TicketId);

            if(paymentPutStatus.status == "Approved")
            {
                ticket.status = "Booked";
            }else if(paymentPutStatus.status == "Rejected")
            {
                ticket.status = "Rejected";

            }

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
                    Message = "Update ticket failed, please try again."

                });

            }

            return NoContent();
        }

        // PUT: api/PaymentDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentDetail(int id, PaymentDetail paymentDetail)
        {
            if (id != paymentDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(paymentDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentDetailExists(id))
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

        [AllowAnonymous]
        // POST: api/PaymentDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaymentDetail>> PostPaymentDetail(PaymentDeTailDTO paymentDeTailDTO)
        {

            PaymentDetail paymentDetail = new PaymentDetail();
            paymentDetail.TicketId = paymentDeTailDTO.TicketId;
            paymentDetail.total = paymentDeTailDTO.total;
            paymentDetail.payment_method = paymentDeTailDTO.payment_method;
            paymentDetail.transaction_number = paymentDeTailDTO.transaction_number;
            paymentDetail.status = "Pending";
            paymentDetail.dateUpdated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
            paymentDetail.dateCreated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");

            if (_context.PaymentDetails == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });

            }
            _context.PaymentDetails.Add(paymentDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentDetail", new { id = paymentDetail.Id }, paymentDetail);
        }

       
       
        private bool PaymentDetailExists(int id)
        {
            return (_context.PaymentDetails?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
