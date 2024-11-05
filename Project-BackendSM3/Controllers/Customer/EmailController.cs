using Microsoft.AspNetCore.Mvc;
using Project_BackendSM3.Helper;
using Project_BackendSM3.Repos.Models;
using Project_BackendSM3.Services;

namespace Project_BackendSM3.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {

        private readonly Projects3Context _context;
        private readonly IEmailService emailService;
            public EmailController(Projects3Context context, IEmailService service)
            {
            _context = context;
            this.emailService = service;
            }

           

        [HttpPost("SendMail")]
        public async Task<IActionResult> SendMail( MailRequesDTO mailRequesDTO )
        {
                
             
                try
                {
                    MailRequest mailRequest = new MailRequest();
                    mailRequest.ToEmail = mailRequesDTO.ToEmail;
                    mailRequest.Subject = "Train Ticket Booking Notification";
                    mailRequest.Body = GetHtmlContent(mailRequesDTO);
                    await emailService.SendEmailAsync(mailRequest);
                    return Ok();
                }
                catch (Exception ex)
                {
                    throw;
                }
           
          
        }

        private string GetHtmlContent(MailRequesDTO mailRequesDTO)
        {
            string response = "<div style=\"width:100%;background-color:#f4f4f4;text-align:center;margin:10px;padding:20px;\">";
            response += "<div style=\"display:flex;\">";
            response += "<div style=\"flex: 1;\">";
            response += "<div style=\"margin-right: 20px; float: left;\">";
            response += "<h1 style=\"margin-bottom: 10px;\">Train Ticket Booking Notification</h1>";
            response += "<img src=\"https://i.imgur.com/qxDtWEq.png\" style=\"max-width: 100%; height: auto;\" />";
            response += "</div>";
            response += "</div>";
            response += "<div style=\"flex: 1;\">";
            response += "<div class=\"container\" style=\"text-align:left;\">";
            response += "<div class=\"column\" style=\"text-align:left; margin-top:20px\" >";
            response += "<h2>Your train ticket information</h2>";
            response += "<h4>Full name: "+ mailRequesDTO.fullName + "</h4>";
            response += "<h4>Email: "+ mailRequesDTO.email + "</h4>";
            response += "<h4>Phone: "+ mailRequesDTO.phone + "</h4>";
            response += "</div>";
            response += "<div class=\"column\"  style=\"text-align:left;\">";
            response += "<div class=\"details\">";
            response += "<div><strong>From: </strong><span>" + mailRequesDTO.route_from +  "</span></div>";
            response += "<div><strong>To: </strong><span>" + mailRequesDTO.route_to +  "</span></div>";
            response += "<div><strong>Date schedule: </strong><span>" + mailRequesDTO.dateSchedule + "</span></div>";
            response += "<div><strong>Time schedule: </strong><span>" + mailRequesDTO.timeSchedule + "</span></div>";
            response += "<div><strong>Seat type: </strong><span>" + mailRequesDTO.seat_type + "</span></div>";
            response += "<div><strong>Seat num: </strong><span>" + mailRequesDTO.seat_num + "</span></div>";
            response += "<div><strong>Code ticket: </strong><span>" + mailRequesDTO.codeTicket + "</span></div>";
            response += "<div><strong>Total: </strong><span>" + mailRequesDTO.total + "VNĐ</span></div>";
            response += "</div>";
            response += "</div>";
            response += "</div>";
            response += "</div>";
            response += "</div>";
            response += "<div><h2>Contact us: railswift.company@gmail.com</h2></div>";
            response += "</div>";
            response += "</div>";


            return response;
        }

      

    }
}
