using Microsoft.EntityFrameworkCore.Migrations;

namespace SothemaGoalManagement.API.Migrations
{
    public partial class EvaluatedEvaluatorsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EvaluatedEvaluators",
                columns: table => new
                {
                    EvaluatedId = table.Column<int>(nullable: false),
                    EvaluatorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EvaluatedEvaluators", x => new { x.EvaluatedId, x.EvaluatorId });
                    table.ForeignKey(
                        name: "FK_EvaluatedEvaluators_AspNetUsers_EvaluatedId",
                        column: x => x.EvaluatedId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EvaluatedEvaluators_AspNetUsers_EvaluatorId",
                        column: x => x.EvaluatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EvaluatedEvaluators_EvaluatorId",
                table: "EvaluatedEvaluators",
                column: "EvaluatorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EvaluatedEvaluators");
        }
    }
}
