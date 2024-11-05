using Microsoft.AspNetCore.Mvc;
using Project_BackendSM3.Modal.TicketPriceDTO;
using Project_BackendSM3.Modal;
using Project_BackendSM3.Repos.Models;
using Project_BackendSM3.Services;
using Project_BackendSM3.Modal.VnpayPayment;

namespace Project_BackendSM3.Controllers.Customer
{
    [ApiController]
    [Route("[controller]")]
    public class VnpayPaymentController : ControllerBase
    {
        private readonly Projects3Context _context;
        private readonly IVnPayService _vnPayService;


        public VnpayPaymentController(Projects3Context context, IVnPayService vnPayService)
        {
            _context = context;
            _vnPayService = vnPayService;
        }


        [HttpPost]
        public async Task<IActionResult> CreatePaymentUrl(PaymentInformationModel model)
        {
            var url = _vnPayService.CreatePaymentUrl(model, HttpContext);

            return Ok(url);
        }

        [HttpGet]
        public IActionResult PaymentCallback()
        {
            var response = _vnPayService.PaymentExecute(Request.Query);
            


            return Redirect("http://localhost:3000/payment?transactionNumber=" + response.OrderId);
        }


    }
}
