using ControlStock.Application.Mapping;
using ControlStock.Data;
using ControlStock.Data.Seed;
using ControlStock.Infra.IoC;
using ControlStockApi.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = builder.Configuration;

builder.Services.AddInfrastructure(configuration);
builder.Services.AddServices(configuration);

var app = builder.Build();
DbConfiguration.ApplyMigrations(app);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
	var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
	await DbSeeder.SeedAsync(context);
}

app.Run();
