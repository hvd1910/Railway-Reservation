using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_BackendSM3.Repos.Models;

public partial class User
{


    [Key]
    public int Id { get; set; }

    [MaxLength(270)]
    public string FullName { get; set; }

    [MaxLength(270)]
    public string Email { get; set; }

    public string Password { get; set; }

    
    [MaxLength(12)]
    public string Phone { get; set; }

    public string Role { get; set; }





}
