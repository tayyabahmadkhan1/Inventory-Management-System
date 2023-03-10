using Repository;
using Microsoft.EntityFrameworkCore;
using IMS.Business.Interfaces;
using IMS.Models;
using IMS.Business.Managers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<InventoryDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),a=>a.MigrationsAssembly("Inventory Management System")));
builder.Services.AddScoped<IAdminManager, AdminManager>();
builder.Services.AddScoped<IItemManager, ItemManager>();
builder.Services.AddScoped<IOrderManager, OrderManager>();
builder.Services.AddScoped<IWarehouseManager, WarehouseManager>();
builder.Services.AddScoped<IInventoryManager, InventoryManager>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
