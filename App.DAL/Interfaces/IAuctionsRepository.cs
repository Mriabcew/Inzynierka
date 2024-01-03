using App.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DAL.Interfaces
{
    internal interface IAuctionsRepository
    {
        Task<Auction> GetAuctionByIdAsync(Guid id);

        Task<bool> DeleteAuctionById(Auction auction);

        Task<Auction> UpdateAuctionById(Auction auction);

        Task AddAuctionAsync(Auction auction);
    }
}
