using Microsoft.EntityFrameworkCore;

namespace BackendIndumentaria.Models
{
    public partial class DbUserContext : DbContext
    {

        public DbUserContext()
        {
        }

        public DbUserContext(DbContextOptions<DbUserContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__User__3213E83F022F4252");

                entity.ToTable("Users");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("name");
                entity.Property(e => e.SurName)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("surName");
                entity.Property(e => e.Dni)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("dni");
               entity.Property(e => e.Country)
               .HasMaxLength(20)
               .IsUnicode(false)
               .HasColumnName("country");
               entity.Property(e => e.City)
              .HasMaxLength(20)
              .IsUnicode(false)
              .HasColumnName("city");
               entity.Property(e => e.Email)
              .HasMaxLength(20)
              .IsUnicode(false)
              .HasColumnName("email");
                entity.Property(e => e.Age)
              .IsUnicode(false)
              .HasColumnName("age");
                entity.Property(e => e.Password)
              .HasMaxLength(20)
              .IsUnicode(false)
              .HasColumnName("password");
                entity.Property(e => e.Path)
              .HasMaxLength(500)
              .IsUnicode(false)
              .HasColumnName("path");
               entity.Property(e => e.typeOfUser)
            .HasMaxLength(10)
            .IsUnicode(false)
            .HasColumnName("user");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }

}

