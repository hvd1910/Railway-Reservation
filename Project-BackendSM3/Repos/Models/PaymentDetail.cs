using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_BackendSM3.Repos.Models
{
    public class PaymentDetail
    {
        [Key]
        public int Id { get; set; }

        public float total { get; set; }
        public string payment_method { get; set; }

        public string transaction_number { get; set; }

        public string status { get; set; }

        public string dateCreated { get; set; }
        public string dateUpdated { get; set; }

        [ForeignKey("Ticket")]
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }


    }
}
