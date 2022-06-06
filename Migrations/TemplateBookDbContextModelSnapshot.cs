﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using template_generator.Models;

#nullable disable

namespace template_generator.Migrations
{
    [DbContext(typeof(TemplateBookDbContext))]
    partial class TemplateBookDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("template_generator.Models.Templates.Template", b =>
                {
                    b.Property<string>("Frontend")
                        .HasColumnType("text");

                    b.Property<string>("Backend")
                        .HasColumnType("text");

                    b.Property<string>("Platform")
                        .HasColumnType("text");

                    b.HasKey("Frontend", "Backend", "Platform");

                    b.ToTable("Templates");
                });
#pragma warning restore 612, 618
        }
    }
}
