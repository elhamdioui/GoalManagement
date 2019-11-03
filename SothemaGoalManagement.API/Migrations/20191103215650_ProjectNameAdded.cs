using Microsoft.EntityFrameworkCore.Migrations;

namespace SothemaGoalManagement.API.Migrations
{
    public partial class ProjectNameAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjectName",
                table: "Goals",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectName",
                table: "Goals");
        }
    }
}
