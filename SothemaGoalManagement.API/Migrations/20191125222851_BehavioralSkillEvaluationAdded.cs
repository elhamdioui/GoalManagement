using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SothemaGoalManagement.API.Migrations
{
    public partial class BehavioralSkillEvaluationAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BehavioralSkillEvaluations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Created = table.Column<DateTime>(nullable: false),
                    EvaluatorId = table.Column<int>(nullable: false),
                    EvaluateeId = table.Column<int>(nullable: false),
                    Grade = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    Sealed = table.Column<bool>(nullable: false),
                    BehavioralSkillInstanceId = table.Column<int>(nullable: false),
                    EvaluationFileInstanceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BehavioralSkillEvaluations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BehavioralSkillEvaluations_BehavioralSkillInstances_BehavioralSkillInstanceId",
                        column: x => x.BehavioralSkillInstanceId,
                        principalTable: "BehavioralSkillInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BehavioralSkillEvaluations_AspNetUsers_EvaluatorId",
                        column: x => x.EvaluatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BehavioralSkillEvaluations_BehavioralSkillInstanceId",
                table: "BehavioralSkillEvaluations",
                column: "BehavioralSkillInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_BehavioralSkillEvaluations_EvaluatorId",
                table: "BehavioralSkillEvaluations",
                column: "EvaluatorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BehavioralSkillEvaluations");
        }
    }
}
