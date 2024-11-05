using Project_BackendSM3.Helper;

namespace Project_BackendSM3.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest mailrequest);

    }
}
