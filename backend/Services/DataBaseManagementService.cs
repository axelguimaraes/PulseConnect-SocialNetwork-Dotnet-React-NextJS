using PulseConnect.Models;
using PulseConnect.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace PulseConnect.Services
{
    public static class DataBaseManagementService
    {

        public static void MigrationInitialisation(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var serviceDB = serviceScope.ServiceProvider
                    .GetService<APIDbContext>();

#pragma warning disable CS8602 // Desreferência de uma referência possivelmente nula.
                serviceDB.Database.Migrate();
#pragma warning restore CS8602 // Desreferência de uma referência possivelmente nula.
            }

        }
    }
}
