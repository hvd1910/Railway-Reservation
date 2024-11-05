using System.ComponentModel.DataAnnotations;

namespace Project_BackendSM3.Repos.Models
{
    public class Train
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(270)]
        public string trainName { get; set; }

        public int ac1 { get; set; }

        public int ac2 { get; set; }

        public int ac3 { get; set; }

        public Boolean delete_flag { get; set; }

        public string dateCreated { get; set; }
        public string dateUpdated { get; set; }

        public ICollection<Schedule> Schedules { get; set; }


    }
}
