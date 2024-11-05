using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BackendSM3.Modal;
using Project_BackendSM3.Repos.Models;
using System.Globalization;

namespace Project_BackendSM3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly Projects3Context _context;

        public HomeController(Projects3Context context)
        {
            _context = context;
        }


        [HttpGet("todaySchedule")]
        public async Task<IActionResult> GetCountSchedules()
        {
            var datenow = DateTime.Now.ToString("yyyy-MM-dd");


            try
            {
                var matchingSchedules = await _context.Schedules
                .Where(schedule => schedule.delete_flag == true && schedule.dateSchedule == datenow).ToListAsync();

                int count = matchingSchedules.Count;
                return Ok(count);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."
                });
            }
        }

        [HttpGet("todayTicket")]
        public async Task<IActionResult> GetCountTickets()
        {
            var datenow = DateTime.Now.ToString("dd/MM/yyyy");


            try
            {
                var matchingTickets = await _context.Tickets
                .Where(ticket => ticket.status == "Booked" && ticket.dateUpdated.StartsWith(datenow)).ToListAsync();

                int count = matchingTickets.Count;
                return Ok(count);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."
                });
            }
        }

        [HttpGet("todayAmount")]
        public async Task<IActionResult> GetCountAmounts()
        {
            var datenow = DateTime.Now.ToString("dd/MM/yyyy");


            try
            {
                var matchingPayments = await _context.PaymentDetails
                .Where(payment => payment.status == "Approved" && payment.dateUpdated.StartsWith(datenow)).ToListAsync();

                float totalAmount = matchingPayments.Sum(payment => payment.total);
                return Ok(totalAmount);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."
                });
            }


        }

        [HttpGet("todayRefund")]
        public async Task<IActionResult> GetCountRefunds()
        {
            var datenow = DateTime.Now.ToString("dd/MM/yyyy");


            try
            {
                var matchingPayments = await _context.PaymentDetails
                .Where(payment => payment.status == "Compensated" && payment.dateUpdated.StartsWith(datenow)).ToListAsync();

                float totalAmount = matchingPayments.Sum(payment => payment.total);
                return Ok(totalAmount);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."
                });
            }
        }

        private DateTime IsValidDateTime(string date)
        {
            DateTime parsedDate;
            if (DateTime.TryParseExact(date, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate))
            {
                return parsedDate;
            }

            // Xử lý trường hợp chuyển đổi không thành công (trả về một giá trị mặc định hoặc thông báo lỗi)
            return DateTime.MinValue;
        }

        [HttpGet("weekAmount")]
        public async Task<IActionResult> GetCountAmountWeek()
        {
            DateTime currentDate = DateTime.Now;


            try
            {
                var matchingPayments = await _context.PaymentDetails
             .Where(payment => payment.status == "Approved")
             .ToListAsync();


                var dailyTotals = matchingPayments
            .Where(payment => IsValidDateTime(payment.dateUpdated).Date >= currentDate.AddDays(-6).Date)
            .GroupBy(payment => IsValidDateTime(payment.dateUpdated).Date)
            .Select(group => new
            {
                Date = group.Key.ToString("dd/MM/yyyy"),
                TotalAmount = group.Sum(payment => payment.total)
            })
            .ToList();

                return Ok(dailyTotals);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."
                });
            }


        }


        [HttpGet("GetPayment")]
        public async Task<ActionResult<IEnumerable<PaymentDetail>>> GetPaymentNew()
        {
            if (_context.PaymentDetails == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }

            var latestPayments = await _context.PaymentDetails
            .OrderByDescending(payment => payment.dateCreated) // Điều chỉnh tên trường thời gian tạo trong PaymentDetail nếu cần
            .Take(5)
            .ToListAsync();
            return latestPayments;
        }


    }
}