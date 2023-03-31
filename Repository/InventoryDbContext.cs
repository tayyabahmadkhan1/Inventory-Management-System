using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using IMS.Models;

namespace Repository
{

    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options)
        {

        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }

        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-EVLM7AD; Database=ProjectDatabase; Trusted_Connection=True; Encrypt=True; \r\nTrustServerCertificate=True ");
            }
        }*/
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //One to many relation b/w Inventory & Item
           /* modelBuilder.Entity<Inventory>()
                .HasMany(i => i.items)   // Inventory has many Items
                .WithOne(item => item.Inventorys) // Item has one Inventory
                .HasForeignKey(item => item.InventoryIdItems); // Use InventoryId as foreign key in Item table*/

            // One to many relation b/w warehouse & inventory
            modelBuilder.Entity<Warehouse>()
                .HasOne(w => w.InventoryW)
                .WithOne(ii => ii.warehouseI)
                .HasForeignKey<Inventory>(ii => ii.warehouse_idFK);

            //Many to many relation b/w Order and Item
            modelBuilder.Entity<Order>()
                .HasMany(a => a.itemsO)
                .WithMany(b => b.OrderI);

            // Applying validation rules for the ADMIN entity

            modelBuilder.Entity<Admin>()
                .Property(a => a.name)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Admin>()
                .Property(a => a.Username)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Admin>()
                .Property(a => a.Password)
                .IsRequired()
                .HasMaxLength(50);

            //Applying Validation to CUSTOMER entity (ANOTHER METHOD)

            /* modelBuilder.Entity<Customer>(u => {

                 u.Property(u => u.Customer_Id).ValueGeneratedOnAdd();

                 u.Property(u => u.Name).IsRequired()
                 .HasMaxLength(30);

                 u.Property(u => u.Address).IsRequired();

                 u.Property(u => u.Email).IsRequired();

                 u.Property(u => u.Phone).IsRequired().
                 HasMaxLength(15);

                 u.Property(u => u.Password).IsRequired().
                 HasMaxLength(20);
             });

             //Applying Validation to INVENTORY entity (ANOTHER METHOD)

             modelBuilder.Entity<Inventory>(u => {

                 u.Property(u => u.inventoryId).ValueGeneratedOnAdd();

                 u.Property(u => u.warehouse_idFK).ValueGeneratedOnAdd();

                 u.Property(u => u.Category).IsRequired();

             });

             //Applying Validation to ITEM entity (ANOTHER METHOD)

             modelBuilder.Entity<Item>(u => {

                 u.Property(u => u.item_Id).ValueGeneratedOnAdd();

                 u.Property(u => u.InventoryIdItems).ValueGeneratedOnAdd();

                 u.Property(u => u.item_name).IsRequired();

                 u.Property(u => u.cost_price).IsRequired();

                 u.Property(u => u.sell_price).IsRequired();

             });

             //Applying Validation to ORDER entity (ANOTHER METHOD)

             modelBuilder.Entity<Order>(u => {

                 u.Property(u => u.Order_Id).ValueGeneratedOnAdd();

                 u.Property(u => u.CustomerId).ValueGeneratedOnAdd();

                 u.Property(u => u.OrderQuantity).IsRequired();

                 u.Property(u => u.Status).IsRequired();

                 u.Property(u => u.OrderDate).IsRequired();

             });

             //Applying Validation to WAREHOUSE entity (ANOTHER METHOD)

             modelBuilder.Entity<Warehouse>(u => {

                 u.Property(u => u.W_Id).ValueGeneratedOnAdd();

                 u.Property(u => u.Warehouse_location).IsRequired();

             });*/

        }

    }
}


