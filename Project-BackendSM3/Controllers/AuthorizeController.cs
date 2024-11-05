using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Project_BackendSM3.Modal;
using Project_BackendSM3.Repos.Models;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Project_BackendSM3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private readonly Projects3Context context;
        private readonly JwtSettings jwtSettings;

        public AuthorizeController(Projects3Context _context, IOptions<JwtSettings> options)
        {
            this.context = _context;
            this.jwtSettings = options.Value;
        }

        // HashCode Input
        public static string HashPassword(string passcode)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(passcode));
                return Convert.ToBase64String(hashBytes);
            }
        }

        object[] jwtReture = new object[0];

        [HttpPost("GenerateToken")]
        public async Task<IActionResult> GenerateToken([FromBody] UserCred userCred)
        {

            var user = await this.context.Users.FirstOrDefaultAsync(item => item.Email == userCred.Email && item.Password == HashPassword(userCred.Password));
            
            if( user != null) {
                // Generate Token
                var tokenhandler = new JwtSecurityTokenHandler();
                var tokenkey = Encoding.UTF8.GetBytes(this.jwtSettings.securitykey);
                var tokendesc = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.FullName),
                        new Claim(ClaimTypes.Role, user.Role)
                    }),
                    Expires = DateTime.UtcNow.AddSeconds(5000),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)
                };
                var token = tokenhandler.CreateToken(tokendesc);
                var finaltoken = tokenhandler.WriteToken(token);
                var responseObject = new
                {
                    jwt = finaltoken,
                    fullName = user.FullName,
                    role = user.Role    
                };

                return Ok(responseObject);
            
            }else
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Email or Password is incorrect."

                });
            }
            
        }
    }
}
