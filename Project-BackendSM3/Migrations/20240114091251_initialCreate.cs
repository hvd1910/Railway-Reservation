using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project_BackendSM3.Migrations
{
    /// <inheritdoc />
    public partial class initialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    stationName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateCreated = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateUpdated = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TicketPrices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ticketName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    dateCreated = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateUpdated = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketPrices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Trains",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    trainName = table.Column<string>(type: "nvarchar(270)", maxLength: 270, nullable: false),
                    ac1 = table.Column<int>(type: "int", nullable: false),
                    ac2 = table.Column<int>(type: "int", nullable: false),
                    ac3 = table.Column<int>(type: "int", nullable: false),
                    delete_flag = table.Column<bool>(type: "bit", nullable: false),
                    dateCreated = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateUpdated = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trains", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(270)", maxLength: 270, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(270)", maxLength: 270, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    codeSchedule = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    route_from = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    route_to = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateSchedule = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    timeSchedule = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    trainId = table.Column<int>(type: "int", nullable: false),
                    distance = table.Column<float>(type: "real", nullable: false),
                    delete_flag = table.Column<bool>(type: "bit", nullable: false),
                    dateCreated = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateUpdated = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schedules_Trains_trainId",
                        column: x => x.trainId,
                        principalTable: "Trains",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(270)", maxLength: 270, nullable: false),
                    phone = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    seat_num = table.Column<int>(type: "int", nullable: false),
                    route_from = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    route_to = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    seat_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateSchedule = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    timeSchedule = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    codeTicket = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    scheduleId = table.Column<int>(type: "int", nullable: false),
                    dateCreated = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateUpdated = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_Schedules_scheduleId",
                        column: x => x.scheduleId,
                        principalTable: "Schedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaymentDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    total = table.Column<float>(type: "real", maxLength: 270, nullable: false),
                    payment_method = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    transaction_number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateCreated = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateUpdated = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TicketId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentDetails_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PaymentDetails_TicketId",
                table: "PaymentDetails",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_codeSchedule",
                table: "Schedules",
                column: "codeSchedule",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_trainId",
                table: "Schedules",
                column: "trainId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_codeTicket",
                table: "Tickets",
                column: "codeTicket",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_scheduleId",
                table: "Tickets",
                column: "scheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Trains_trainName",
                table: "Trains",
                column: "trainName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentDetails");

            migrationBuilder.DropTable(
                name: "Stations");

            migrationBuilder.DropTable(
                name: "TicketPrices");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "Trains");
        }
    }
}
