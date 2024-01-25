using PulseConnect.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace PulseConnect.Data


{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions<APIDbContext> options) : base(options)
        {

        }

        public DbSet<Users> Users { get; set; }
        
        public DbSet<Connection> Connections { get; set; }

        public DbSet<PasswordReset> PasswordResets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        /// <summary>
        /// Gets or sets the collection of sessions in the database.
        /// </summary>
        public DbSet<Session> Sessions { get; set; }

        //ConnectionLog
        public DbSet<ConnectionLog> ConnectionLogs { get; set; }

        //ThirdPartyAccount
        public DbSet<ThirdPartyAccount> ThirdPartyAccounts { get; set; }

        //ExternalAuthToken
        public DbSet<ExternalAuthToken> ExternalAuthToken { get; set; } = default!;

    }
}