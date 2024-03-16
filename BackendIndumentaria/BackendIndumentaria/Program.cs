using Microsoft.EntityFrameworkCore;
using BackendIndumentaria.Models;

var builder = WebApplication.CreateBuilder(args);


// Configurar la lectura de configuración desde appsettings.json
builder.Configuration.AddJsonFile("appsettings.json");
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    options.SetDefaultCulture("en-US");
    options.RequestCultureProviders.Clear();
});

//añadir servicio base de datos
builder.Services.AddDbContext<DbIndumentariaContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("connection"));
});

builder.Services.AddDbContext<DbUserContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("connection"));
});

builder.Services.AddCors(options => {

    //Agrego nueva politica
    options.AddPolicy("NewPolicy", app => {

        //Permito cualquier origen, cualquier cabecera y cualquier metodo.
        app.AllowAnyOrigin()
           .AllowAnyHeader()
           .AllowAnyMethod();

    });
});

var app = builder.Build();




// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

//Activo cors.
app.UseCors("NewPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();
