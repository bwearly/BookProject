using Microsoft.EntityFrameworkCore;
using Mission11_Early.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookStoreContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

// builder.Services.AddCors(options =>
//  {
//      options.AddPolicy("AllowFrontend", policy =>
//          {
//              policy.WithOrigins("http://localhost:3000")
//                  .AllowCredentials()
//                  .AllowAnyHeader()
//                  .AllowAnyMethod();
//          });
// });

builder.Services.AddCors(options =>
    options.AddPolicy("AddReactApp", policy => {
        policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AddReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
