using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eshop.Models
{
    public class EShopContext : DbContext
    {
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Manufacturer> Manufacturers { get; set; }
        public virtual DbSet<Item> Items { get; set; }

        public EShopContext(DbContextOptions<EShopContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

    }
}
