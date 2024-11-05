using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BackendSM3.Modal;
using Project_BackendSM3.Modal.UserDTO;
using Project_BackendSM3.Repos.Models;

namespace Project_BackendSM3.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Projects3Context _context;


        public UsersController(Projects3Context context)
        {
            _context = context;
        }

        public static string HashPassword(string passcode)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(passcode));
                return Convert.ToBase64String(hashBytes);
            }
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.Users == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.Users == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "User does not exist."

                });
            }

            return user;
        }


        [HttpGet("find/{email}")]
        public async Task<ActionResult<object>> GetUserByEmail(string email)
        {
            if (_context.Users == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            var user = await _context.Users.FirstOrDefaultAsync(item=> item.Email == email);

            if (user == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "User does not exist, please sign in again."

                });
            }

            return user;
        }

        [AllowAnonymous]
        [HttpGet("check/{email}")]
        public async Task<ActionResult<Boolean>> ChecKEmail(string email)
        {
            if (_context.Users == null)
            {
                return false;
            }
            var user = await _context.Users.FirstOrDefaultAsync(item => item.Email == email);

            if (user == null)
            {
                return false;
            }

            return true;
        }



        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserUpdateDTO userUpdateDTO)
        {


            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "User does not exist."

                });
            }
            user.FullName = userUpdateDTO.FullName;
            user.Email = userUpdateDTO.Email;
            user.Phone = userUpdateDTO.Phone;
            user.Password = HashPassword(userUpdateDTO.Password);
            user.Role = userUpdateDTO.Role;



            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return Ok(new ErrorDTO
                    {
                        Status = "error",
                        Message = "Update failed, please try again."

                    });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserCreate userCreate)
        {
                    
            User user = new User();
            if(userCreate == null)
            {
                return Problem("Entity set 'Projects3Context.Users'  is null.");
            }

            user.FullName = userCreate.FullName;
            user.Email = userCreate.Email;
            user.Password = HashPassword(userCreate.Password);
            user.Phone = userCreate.Phone;
            user.Role = "ADMIN";


            _context.Users.Add(user);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
