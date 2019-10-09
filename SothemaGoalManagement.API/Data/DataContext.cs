using SothemaGoalManagement.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SothemaGoalManagement.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole,
                                                    IdentityUserLogin<int>, IdentityRoleClaim<int>,
                                                    IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Message> Messages { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<Pole> Poles { get; set; }

        public DbSet<UserStatus> UserStatus { get; set; }

        public DbSet<Strategy> Strategies { get; set; }

        public DbSet<Axis> Axis { get; set; }

        public DbSet<AxisPole> AxisPoles { get; set; }

        public DbSet<EvaluatedEvaluator> EvaluatedEvaluators { get; set; }

        public DbSet<BehavioralSkill> BehavioralSkills { get; set; }

        public DbSet<EvaluationFile> EvaluationFiles { get; set; }

        public DbSet<EvaluationFileBehavioralSkill> EvaluationFileBehavioralSkills { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.RoleId)
                        .IsRequired();

                userRole.HasOne(ur => ur.User)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.UserId)
                        .IsRequired();
            });

            builder.Entity<EvaluatedEvaluator>(evaluatedEvaluator =>
            {
                evaluatedEvaluator.HasKey(ee => new { ee.EvaluatedId, ee.EvaluatorId });

                evaluatedEvaluator.HasOne(ee => ee.Evaluator)
                        .WithMany(u => u.EvaluatedEvaluators)
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasForeignKey(ee => ee.EvaluatorId)
                        .IsRequired();
            });

            builder.Entity<AxisPole>(axisPole =>
            {
                axisPole.HasKey(ap => new { ap.AxisId, ap.PoleId });

                axisPole.HasOne(ap => ap.Pole)
                        .WithMany(p => p.AxisPoles)
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasForeignKey(ap => ap.PoleId)
                        .IsRequired();

                axisPole.HasOne(ap => ap.Axis)
                        .WithMany(a => a.AxisPoles)
                        .HasForeignKey(ap => ap.AxisId)
                        .IsRequired();
            });

            builder.Entity<Message>()
            .HasOne(u => u.Sender)
            .WithMany(m => m.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);


            builder.Entity<Message>()
            .HasOne(u => u.Recipient)
            .WithMany(m => m.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Pole>().Property(p => p.Name).IsRequired();

            builder.Entity<Department>().Property(d => d.Name).IsRequired();

            builder.Entity<Photo>().HasQueryFilter(p => p.IsApproved);

            builder.Entity<UserStatus>().Property(d => d.Name).IsRequired();

            builder.Entity<EvaluationFileBehavioralSkill>(evaluationFileBehavioralSkill =>
            {
                evaluationFileBehavioralSkill.HasKey(efbs => new { efbs.EvaluationFileId, efbs.BehavioralSkillId });

                evaluationFileBehavioralSkill.HasOne(bs => bs.BehavioralSkill)
                                            .WithMany(ef => ef.EvaluationFiles)
                                            .OnDelete(DeleteBehavior.Restrict)
                                            .HasForeignKey(bs => bs.BehavioralSkillId)
                                            .IsRequired();

                evaluationFileBehavioralSkill.HasOne(ef => ef.EvaluationFile)
                                            .WithMany(bs => bs.BehavioralSkills)
                                            .OnDelete(DeleteBehavior.Restrict)
                                            .HasForeignKey(ef => ef.EvaluationFileId)
                                            .IsRequired();
            });

            builder.Entity<EvaluationFile>().HasOne<Strategy>(ef => ef.Strategy)
                       .WithMany(e => e.EvaluationFiles).HasForeignKey(ef => ef.StrategyId);

            builder.Entity<Strategy>().HasMany<EvaluationFile>(s => s.EvaluationFiles)
                                           .WithOne(ef => ef.Strategy)
                                           .HasForeignKey(ef => ef.StrategyId)
                                           .OnDelete(DeleteBehavior.Restrict);

        }
    }
}