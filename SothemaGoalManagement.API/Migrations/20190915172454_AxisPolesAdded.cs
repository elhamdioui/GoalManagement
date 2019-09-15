using Microsoft.EntityFrameworkCore.Migrations;

namespace SothemaGoalManagement.API.Migrations
{
    public partial class AxisPolesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AxisPoles",
                columns: table => new
                {
                    AxisId = table.Column<int>(nullable: false),
                    PoleId = table.Column<int>(nullable: false),
                    Weight = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AxisPoles", x => new { x.AxisId, x.PoleId });
                    table.ForeignKey(
                        name: "FK_AxisPoles_Axis_AxisId",
                        column: x => x.AxisId,
                        principalTable: "Axis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AxisPoles_Poles_PoleId",
                        column: x => x.PoleId,
                        principalTable: "Poles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AxisPoles_PoleId",
                table: "AxisPoles",
                column: "PoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AxisPoles");
        }
    }
}
