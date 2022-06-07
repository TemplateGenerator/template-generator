using Microsoft.EntityFrameworkCore;
using template_generator.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "wwwroot";
});
builder.Services.AddCognitoIdentity(config =>
{
    config.Password = new Microsoft.AspNetCore.Identity.PasswordOptions
    {
        RequiredLength = 8,
        RequireDigit = true,
        RequireLowercase = true,
        RequireUppercase = true,
        RequireNonAlphanumeric = true,
        RequiredUniqueChars = 0
    };
});
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/signin";
    options.LogoutPath = "/signout";
});
builder.Services.AddEntityFrameworkNpgsql().AddDbContext<TemplateBookDbContext>();

builder.Configuration.AddEnvironmentVariables(prefix: "TB_");

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TemplateBookDbContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseHttpsRedirection();
app.UseSpaStaticFiles();
app.UseStaticFiles();
app.UseRouting();
app.UseCookiePolicy();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
