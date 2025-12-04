using ControlStock.Application.Mapping;
using ControlStock.Core.Interfaces;
using ControlStock.Data;
using ControlStock.Data.Seed;
using ControlStock.Infra.IoC;
using ControlStockApi.Configuration;
using ControlStockApi.Middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = builder.Configuration;

builder.Services.AddInfrastructure(configuration, builder.Environment.ContentRootPath);
builder.Services.AddServices(configuration);

var app = builder.Build();
DbConfiguration.ApplyMigrations(app);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
	var seeder = scope.ServiceProvider.GetRequiredService<IDatabaseSeeder>();
	await seeder.SeedAsync();
}

app.Run();
