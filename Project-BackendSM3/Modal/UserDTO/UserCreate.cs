using System.ComponentModel.DataAnnotations;

namespace Project_BackendSM3.Modal.UserDTO
{
    public class UserCreate
    {
        public string? FullName { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? Phone { get; set; }

    }
}
