using System.ComponentModel.DataAnnotations;

namespace Project_BackendSM3.Repos.Models
{
    public class TicketPrice
    {
        [Key]
        public int Id { get; set; }

        public string ticketName { get; set; }

        public float Price { get; set; }

        public string dateCreated { get; set; }
        public string dateUpdated { get; set; }

    }
}
