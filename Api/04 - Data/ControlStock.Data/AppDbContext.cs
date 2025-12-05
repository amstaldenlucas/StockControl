using ControlStock.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace ControlStock.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
		public DbSet<Product> Products => Set<Product>();
		public DbSet<ProductGroup> ProductGroups => Set<ProductGroup>();
		public DbSet<ErrorLog> ErrorLogs => Set<ErrorLog>();

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<RefreshToken>(entity =>
			{
				entity.HasIndex(x => x.Token).IsUnique();
				entity.HasIndex(x => x.ExpirationUtcDate);
			});

			modelBuilder.Entity<ProductGroup>().HasQueryFilter(x => !x.IsDeleted);
			modelBuilder.Entity<Product>().HasQueryFilter(x => !x.IsDeleted);
		}

		public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
		{
			var entries = ChangeTracker.Entries<EntityBase>();

			foreach (var entry in entries)
			{
				if (entry.State == EntityState.Added)
				{
					entry.Entity.CreatedAt = DateTime.Now;
					entry.Entity.LastUpdate = DateTime.Now;
					entry.Entity.IsDeleted = false;
				}

				if (entry.State == EntityState.Modified)
				{
					entry.Entity.LastUpdate = DateTime.UtcNow;
				}
			}

			return await base.SaveChangesAsync(cancellationToken);
		}
	}
}
