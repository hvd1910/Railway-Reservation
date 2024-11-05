namespace Project_BackendSM3.Modal.ScheduleDTO
{
    public class ScheduleUpdateDTO
    {
        public string route_from { get; set; }

        public string route_to { get; set; }

        public String dateSchedule { get; set; }

        public String timeSchedule { get; set; }

        public string trainName { get; set; }

        public string codeSchedule { get; set; }

        public float distance { get; set; }

        public Boolean delete_flag { get; set; }
    }
}
