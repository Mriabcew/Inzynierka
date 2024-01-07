using App.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DAL.Interfaces
{
    public interface IAuctionsRepository
    {
        Task<Auction> GetAuctionByIdAsync(Guid id);

        Task<bool> DeleteAuction(Auction auction);

        Task<Auction> UpdateAuction(Auction auction);

        Task AddAuctionAsync(Auction auction);

        Task<List<Auction>> GetAllAuctionsAsync();

        Task<List<Auction>> GetAuctionsByCategory(Guid categoryId);
        Task<List<Auction>> GetAuctionsByUserIdAsync(Guid userID);
    }
}
