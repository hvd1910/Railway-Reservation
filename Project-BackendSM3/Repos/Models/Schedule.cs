using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_BackendSM3.Repos.Models
{
    public class Schedule
    {
        [Key]
        public int Id { get; set; }
        public string codeSchedule { get; set; }

        public string route_from { get; set; }

        public string route_to { get; set;}

        public string dateSchedule { get; set; }

        public string timeSchedule { get; set; }

        public int trainId { get; set; }
        public Train Train { get; set; }

        public float distance { get; set; }

        public Boolean delete_flag { get; set; }
        public string dateCreated { get; set; }
        public string dateUpdated { get; set; }

        public ICollection<Ticket> Tickets { get; set; }

    }
}
