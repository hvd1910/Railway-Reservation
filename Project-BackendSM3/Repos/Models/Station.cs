using System.ComponentModel.DataAnnotations;

namespace Project_BackendSM3.Repos.Models
{
    public class Station
    {
        [Key]
        public int Id { get; set; }

        public string stationName { get; set; }

        public string dateCreated { get; set; }
        public string dateUpdated { get; set; }
    }
}
