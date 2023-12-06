using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace App.DAL
{
    public class ApplicationDbContext : DbContext 
    {
        public DbSet <User> Users { get; set; }

        public DbSet<Auction> Auctions { get; set; }

        public DbSet<AuctionPhotos> AuctionPhotos { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    }
}
