using Project_BackendSM3.Modal.VnpayPayment;

namespace Project_BackendSM3.Services
{
    public interface IVnPayService
    {
        VnpayResult CreatePaymentUrl(PaymentInformationModel model, HttpContext context);
        PaymentResponseModel PaymentExecute(IQueryCollection collections);
    }
}
