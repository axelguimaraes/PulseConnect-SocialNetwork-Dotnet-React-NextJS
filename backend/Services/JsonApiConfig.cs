using JsonApiDotNetCore.Configuration;
using PulseConnect.Data;

namespace PulseConnect.Services
{
    public static class JsonApiConfig
    {
        public static IServiceCollection AddJsonApiConfiguration(this IServiceCollection services)
        {
            services.AddJsonApi<APIDbContext>(options =>
            {
                // aditional options OPTIONAL , see https://json-api-dotnet.github.io/#/configuration/options?id=configuration-options
            });

            return services;
        }
    }
}
