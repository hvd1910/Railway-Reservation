using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BackendSM3.Modal;
using Project_BackendSM3.Modal.ScheduleDTO;
using Project_BackendSM3.Repos.Models;

namespace Project_BackendSM3.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulesController : ControllerBase
    {
        private readonly Projects3Context _context;

        public SchedulesController(Projects3Context context)
        {
            _context = context;
        }

        // GET: api/Schedules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Schedule>>> GetSchedules()
        {
          if (_context.Schedules == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            return await _context.Schedules.ToListAsync();
        }

        // GET: api/Schedules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Schedule>> GetSchedule(int id)
        {
          if (_context.Schedules == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            var schedule = await _context.Schedules.FindAsync(id);

            if (schedule == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "The train schedule does not exist."

                });
            }

            return schedule;
        }


        // PUT: api/Schedules/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSchedule(int id, ScheduleUpdateDTO scheduleUpdateDTO)
        {
            if (_context.Schedules == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }

            var schedule = await _context.Schedules.FindAsync(id);
            if (schedule == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "The train schedule does not exist."

                });
            }
            var getTrain = await _context.Trains.FirstOrDefaultAsync(t => t.trainName == scheduleUpdateDTO.trainName);

            if (getTrain == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Error, Please try again."

                });
            }


            schedule.route_from = scheduleUpdateDTO.route_from;
            schedule.route_to = scheduleUpdateDTO.route_to;
            schedule.dateSchedule = scheduleUpdateDTO.dateSchedule;
            schedule.timeSchedule = scheduleUpdateDTO.timeSchedule;
            schedule.trainId = getTrain.Id;
            schedule.codeSchedule = scheduleUpdateDTO.codeSchedule;
            schedule.distance = scheduleUpdateDTO.distance;
            schedule.delete_flag = scheduleUpdateDTO.delete_flag;
            schedule.dateUpdated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");



            var existingSchedule = await _context.Schedules.Include(t => t.Tickets).FirstOrDefaultAsync(t => t.Id == id);

            try
            {
                var getTicket = await _context.Tickets.FirstOrDefaultAsync(t => t.scheduleId == id);

                if (getTicket.fullName != null)
                {
                    return Ok(new ErrorDTO
                    {
                        Status = "error",
                        Message = "There are already train tickets booked with this timetable, so it cannot be updated."

                    });
                }
            }
            catch
            {

                if (id != schedule.Id)
                {
                    return BadRequest();
                }

                _context.Entry(existingSchedule).CurrentValues.SetValues(schedule);

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ScheduleExists(id))
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

            }

            return NoContent();
        }

        // POST: api/Schedules
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Schedule>> PostSchedule(ScheduleCreateDTO scheduleCreateDTO)
        {
            Schedule schedule = new Schedule();

            var getTrain = await _context.Trains.FirstOrDefaultAsync(t => t.trainName == scheduleCreateDTO.trainName);

            if (getTrain == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Error, Please try again."

                });
            }

            schedule.route_from = scheduleCreateDTO.route_from;
            schedule.route_to = scheduleCreateDTO.route_to;
            schedule.dateSchedule = scheduleCreateDTO.dateSchedule;
            schedule.timeSchedule = scheduleCreateDTO.timeSchedule;
            schedule.trainId = getTrain.Id;
            schedule.codeSchedule = scheduleCreateDTO.codeSchedule;
            schedule.distance = scheduleCreateDTO.distance;
            schedule.delete_flag = true;
            schedule.dateUpdated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
            schedule.dateCreated = DateTime.Now.ToString("dd/MM/yyyy HH:mm");



          if (_context.Schedules == null)
          {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }
            _context.Schedules.Add(schedule);
            await _context.SaveChangesAsync();

            var scheduleDto = new scheduleDTO
            {
                Id = schedule.Id,
                route_from = schedule.route_from,
                route_to = schedule.route_to,
                dateSchedule = schedule.dateSchedule,
                timeSchedule = schedule.timeSchedule,
                trainId = getTrain.Id,
                codeSchedule = schedule.codeSchedule,
                distance = schedule.distance,
                delete_flag = schedule.delete_flag,
                dateUpdated = schedule.dateUpdated,
                dateCreated = schedule.dateCreated,
            };

            return CreatedAtAction("GetSchedule", new { id = schedule.Id }, scheduleDto);
        }

        // DELETE: api/Schedules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSchedule(int id)
        {
            if (_context.Schedules == null)
            {
                return Ok(new ErrorDTO
                {
                    Status = "error",
                    Message = "Connection errors."

                });
            }


            try
            {
                var getTicket = await _context.Tickets.FirstOrDefaultAsync(t => t.scheduleId == id);

                if (getTicket.fullName != null)
                {
                    try
                    {
                        var schedule = await _context.Schedules.FindAsync(id);
                        schedule.delete_flag = false;
                        await _context.SaveChangesAsync();
                        return Ok(new ErrorDTO
                        {
                            Status = "error",
                            Message = "There are already train tickets booked according to this schedule, so it has been flagged."

                        });
                    }
                    catch 
                    {
                        return Ok(new ErrorDTO
                        {
                            Status = "error",
                            Message = "Delete Failed."

                        });
                    }
                }
            }
            catch
            {
                var schedule = await _context.Schedules.FindAsync(id);
                if (schedule == null)
                {
                    return NotFound();
                }

                _context.Schedules.Remove(schedule);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            return NoContent();

        }

        [AllowAnonymous]
        [HttpGet("GetSchedulesCustomer")]
        public async Task<ActionResult<IEnumerable<Schedule>>> GetSchedulesCustomer(
            [FromQuery] string from,
             [FromQuery] string to,
            [FromQuery] string date)
        {
            try
            {
                var matchingSchedules = await _context.Schedules
                    .Where(schedule =>
                        schedule.route_from == from &&
                        schedule.route_to == to &&
                        schedule.dateSchedule == date && schedule.delete_flag == true)
                    .ToListAsync();

                return Ok(matchingSchedules);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, new ErrorDTO
                {
                    Status = "error",
                    Message = $"Internal server error: {ex.Message}"
                });
            }
        }

        private bool ScheduleExists(int id)
        {
            return (_context.Schedules?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
