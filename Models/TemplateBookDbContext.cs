using Microsoft.EntityFrameworkCore;
using Npgsql;
using template_generator.Common;
using template_generator.Models.Templates;

namespace template_generator.Models
{
    public class TemplateBookDbContext: DbContext
    {
        private readonly IConfiguration _configuration;
        //private readonly Utility _utility;

        public TemplateBookDbContext(IConfiguration configuration)//, Utility utility)
        {
            _configuration = configuration;
            //_utility = utility;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(GenerateConnectionString(_configuration.GetValue<string>("DATABASE_URL")));
            //optionsBuilder.UseNpgsql(_configuration.GetValue<string>("DATABASE_URL"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Template>().HasKey(col => new { col.Frontend, col.Backend, col.Platform });
            //modelBuilder.Entity<Template>().HasIndex(col => new {col.Frontend, col.Backend, col.Platform}).IsUnique();
            //modelBuilder.Entity<Template>().HasNoKey();
        }

        private string GenerateConnectionString(string databaseUrl)
        {
            var databaseUri = new Uri(databaseUrl);
            var userInfo = databaseUri.UserInfo.Split(':');

            var builder = new NpgsqlConnectionStringBuilder
            {
                Host = databaseUri.Host,
                Port = databaseUri.Port,
                Username = userInfo[0],
                Password = userInfo[1],
                Database = databaseUri.LocalPath.TrimStart('/')
            };

            return builder.ToString();
        }

        public DbSet<Template> Templates { get; set; }
    }
}
