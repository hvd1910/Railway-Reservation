using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Project_BackendSM3.Repos.Models;

public partial class Projects3Context : DbContext
{
    public Projects3Context()
    {
    }

    public Projects3Context(DbContextOptions<Projects3Context> options)
        : base(options)
    {
    }


    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Train> Trains { get; set; }
    public virtual DbSet<Schedule> Schedules { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<TicketPrice> TicketPrices { get; set; }

    public virtual DbSet<Station> Stations { get; set; }

    public virtual DbSet<PaymentDetail> PaymentDetails { get; set; }








    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=Laptop\\SQLEXPRESS;Initial Catalog=railway;User ID=sa;Password=12345678;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
       .HasIndex(u => u.Email)
       .IsUnique();

        modelBuilder.Entity<Train>()
      .HasIndex(u => u.trainName)
      .IsUnique();

        modelBuilder.Entity<Schedule>()
      .HasIndex(u => u.codeSchedule)
      .IsUnique();

             modelBuilder.Entity<Ticket>()
       .HasIndex(u => u.codeTicket)
       .IsUnique();



        modelBuilder.Entity<Schedule>()
     .HasOne(s => s.Train)
     .WithMany(t => t.Schedules)
     .HasForeignKey(s => s.trainId);

        modelBuilder.Entity<Ticket>()
            .HasOne(s => s.Schedule)
            .WithMany(t => t.Tickets)
            .HasForeignKey(s => s.scheduleId);

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
