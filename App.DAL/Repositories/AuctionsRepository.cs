using App.DAL.Interfaces;
using App.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DAL.Repositories
{
    public class AuctionsRepository : Repository, IAuctionsRepository
    {
        public AuctionsRepository(ApplicationDbContext context):base(context)
        { 
        }

        public async Task AddAuctionAsync(Auction auction)
        {
           await _context.Auctions.AddAsync(auction);
           await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAuction(Auction auction)
        {
            var auctionToDelete = await _context.Auctions.FindAsync(auction.Id);
            if(auctionToDelete == null) 
            {
                throw new ArgumentException("Auction with given id does not exist");
            }

            _context.Remove(auctionToDelete);
            await _context.SaveChangesAsync();
            return true;

        }

        public async Task<List<Auction>> GetAllAuctionsAsync()
        {
            var auctions = await _context.Auctions.ToListAsync();
            return auctions;
        }

        public async Task<Auction> GetAuctionByIdAsync(Guid id)
        {
            return await _context.Auctions.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<Auction>> GetAuctionsByCategory(Guid categoryId)
        {
            var auctionList = new List<Auction>();
            auctionList = await _context.Auctions.Where(a => a.CategoryId == categoryId).ToListAsync();

            return auctionList;
        }

        public async Task<List<Auction>> GetAuctionsByUserIdAsync(Guid userID)
        {
            var user = await _context.Users
                                     .Include(u => u.Auctions)
                                     .FirstOrDefaultAsync(u => u.Id == userID);

            return user?.Auctions ?? new List<Auction>();
        }

        public async Task<Auction> UpdateAuction(Auction auction)
        {
            var auctionToUpdate = await _context.Auctions.FindAsync(auction.Id);
            if(auctionToUpdate == null)
            {
                throw new ArgumentException("Auction with given id does not exist");
            }

            auctionToUpdate.Name = auction.Name;
            auctionToUpdate.Description = auction.Description;
            auctionToUpdate.Price = auction.Price;
            auctionToUpdate.Status = auction.Status;
            auctionToUpdate.AuctionPhotos = auction.AuctionPhotos;

            await _context.SaveChangesAsync();
            return auctionToUpdate;
        }
    }
    
}
