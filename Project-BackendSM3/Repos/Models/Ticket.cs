using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_BackendSM3.Repos.Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }
        public string fullName { get; set; }

        [MaxLength(270)]
        public string email { get; set; }

        [MaxLength(12)]
        public string phone { get; set; }

        public int seat_num { get; set; }

        public string route_from { get; set; }

        public string route_to { get; set; }

        public string seat_type { get; set; }

        public string dateSchedule { get; set; }

        public string timeSchedule { get; set; }

        public string codeTicket { get; set; }

        public string status { get; set; }

        public int scheduleId { get; set; }
        public Schedule Schedule { get; set; }

        public string dateCreated { get; set; }
        public string dateUpdated { get; set; }



    }
}
