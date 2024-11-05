using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BackendSM3.Modal;
using Project_BackendSM3.Modal.TrainDTO;
using Project_BackendSM3.Repos.Models;

namespace Project_BackendSM3.Controllers
{
    [Authorize]

    [Route("api/[controller]")]
    [ApiController]
    public class TrainsController : ControllerBase
    {
        private readonly Projects3Context _context;

        public TrainsController(Projects3Context context)
        {
            _context = context;
        }


        // GET: api/Trains
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Train>>> GetTrains()
        {
            if (_context.Trains == null)
            {
                return  Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            return await _context.Trains.ToListAsync();
        }

        [AllowAnonymous]
        // GET: api/Trains/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Train>> GetTrain(int id)
        {
            if (_context.Trains == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            var train = await _context.Trains.FindAsync(id);

            if (train == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Object does not exist."

                });
            }

            return train;
        }

        // PUT: api/Trains/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrain(int id, TrainUpdateDTO trainUpdateDTO)
        {

            if (_context.Trains == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }

            var train = await _context.Trains.FindAsync(id);
            if (train == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Object does not exist."

                });
            }

            train.trainName = trainUpdateDTO.trainName;
            train.ac1 = trainUpdateDTO.ac1;
            train.ac2 = trainUpdateDTO.ac2;
            train.ac3 = trainUpdateDTO.ac3;
            train.delete_flag = trainUpdateDTO.delete_flag;
            train.dateUpdated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");




            var existingTrain = await _context.Trains.Include(t => t.Schedules).FirstOrDefaultAsync(t => t.Id == id);

            if (id != train.Id)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Object does not exist."

                });
            }

            _context.Entry(existingTrain).CurrentValues.SetValues(train);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainExists(id))
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

        // POST: api/Trains
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Train>> PostTrain(TrainCreateDTO trainCreateDTO)
        {
            var notifi = new ErrorDTO();
            notifi.Status = "error";

            Train train = new Train();
            
            
            train.trainName = trainCreateDTO.trainName;
            train.ac1 = trainCreateDTO.ac1;
            train.ac2 = trainCreateDTO.ac2;
            train.ac3 = trainCreateDTO.ac3;
            train.delete_flag = true;
            train.dateUpdated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
            train.dateCreated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");


            if (_context.Trains == null)
            {
                return Ok(notifi);
            }
            _context.Trains.Add(train);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrain", new { id = train.Id }, train);
        }

        // DELETE: api/Trains/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrain(int id)
        {
            if (_context.Trains == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }

            try
            {
                var getSchedules = await _context.Schedules.FirstOrDefaultAsync(t => t.trainId == id);

                if (getSchedules.delete_flag == true || getSchedules.delete_flag == false)
                {
                    return Ok(new ErrorDTO
                    {
                        Status = "error",
                        Message = "The train already has a scheduled schedule so it cannot be deleted."

                    });
                }
            }catch
            {
                
                var train = await _context.Trains.FindAsync(id);
                if (train == null)
                {
                    return Ok(new ErrorDTO
                    {
                        Status = "error",
                        Message = "Object does not exist, please try again."

                    });
                }

                _context.Trains.Remove(train);
                await _context.SaveChangesAsync();

                return NoContent();

            }

            return NoContent();
        }



        [AllowAnonymous]

        // GET: api/Trains/trainName
        [HttpGet("checkName/{name}")]
        public async Task<ActionResult<object>> GetTrainName(string name)
        {
            var notifi = new ErrorDTO();
            notifi.Status = "error";
             
            if (_context.Trains == null)
            {
                notifi.Message = "Connection errors.";
                return Ok(notifi);
            }
            
                var train = await _context.Trains.FirstOrDefaultAsync(t => t.trainName == name);
                if (train != null)
                {
                    
                    notifi.Message = "The train name already exists, please give another name.";
                    return Ok(notifi);

                }

            notifi.Status = "success";
            notifi.Message = "";
            return Ok(notifi);
        }


       


        private bool TrainExists(int id)
        {
            return (_context.Trains?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
