using Project_BackendSM3.Repos.Models;

namespace Project_BackendSM3.Modal.TicketDTO
{
    public class TicketCreateDTO
    {
       

        public string route_from { get; set; }

        public string route_to { get; set; }
        public string dateSchedule { get; set; }

        public string timeSchedule { get; set; }

        public int scheduleId { get; set; }
        public string seat_type { get; set; }

        public int seat_num { get; set; }
        
        public string codeTicket { get; set; }

        public string fullName { get; set; }

        public string email { get; set; }

        public string phone { get; set; }




    }
}
