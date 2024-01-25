using PulseConnect.Data;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Services;
using PulseConnect.Settings;
using JsonApiDotNetCore.Configuration;
using Microsoft.AspNetCore.Identity;
using PulseConnect.Models;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http.Connections;
using PulseConnect.Hubs;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// Use 'connectionString' to establish your database connection
var SQLConfig = configuration.GetSection("SQLServer");
var SQLConnectionString = SQLConfig["ConnectionString"];
builder.Services.AddDbContext<APIDbContext>(options =>
    options.UseSqlServer(SQLConnectionString));

// Configurar a conexão com o MongoDB
var mongoDbConfig = builder.Configuration.GetSection("MongoDB");
var mongoClient = new MongoClient(mongoDbConfig["ConnectionString"]);
var database = mongoClient.GetDatabase(mongoDbConfig["DatabaseName"]);

// MongoDb Collections : Messages
builder.Services.AddSingleton<IMongoCollection<Messages>>(sp =>
    database.GetCollection<Messages>(mongoDbConfig["MessagesCollectionName"]));

// JWT Settings
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    // x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["Jwt:Key"]!)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true
    };
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
            builder => builder.WithOrigins("http://localhost:3000")
                               .AllowAnyMethod()
                               .AllowAnyHeader());
});

builder.Services.AddControllers();

// Adicionar SignalR para troca de mensagens em tempo real (websockets)
builder.Services.AddSignalR();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "PulseConnect", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter '{token}'",
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
{
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
});
});

// JsonApiDotNetCore
builder.Services.AddJsonApi<APIDbContext>();

// Registro do ASP.NET Core Identity
builder.Services.AddIdentity<Users, IdentityRole>()
    .AddEntityFrameworkStores<APIDbContext>()
    .AddDefaultTokenProviders();

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Auth Twitter
builder.Services.AddAuthentication()
    .AddTwitter(twitterOptions =>
    {
        twitterOptions.ConsumerKey = configuration["Authentication:Twitter:ApiKey"];
        twitterOptions.ConsumerSecret = configuration["Authentication:Twitter:ApiKeySecret"];
        twitterOptions.RetrieveUserDetails = true;
    });

var app = builder.Build();

// CORS
app.UseCors("AllowSpecificOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Configurar o middleware para permitir solicitações não autenticadas para o Swagger
    app.Map("/swagger", swaggerApp =>
    {
        app.UseSwaggerUI();
        swaggerApp.UseSwagger();
    });
}

// DataBaseManagementService.MigrationInitialisation(app);

app.UseHttpsRedirection();

// Uso de Autorização e Autenticação
app.UseAuthentication();

app.UseRouting();
#pragma warning disable ASP0014 // Suggest using top level route registrations

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chathub");
    endpoints.MapControllers();
});
#pragma warning restore ASP0014 // Suggest using top level route registrations

// Log requests
app.Use(async (context, next) =>
{
    Console.WriteLine($"Received request: {context.Request.Method} {context.Request.Path}");
    await next.Invoke();
});

app.MapControllers();
// app.UsePathBase("/api/v1");

app.UseCors();

app.Run();
