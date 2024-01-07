using App.DAL.Interfaces;
using App.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DAL.Repositories
{
    internal class AuctionPhotosRepository : Repository, IAuctionPhotosRepository
    {
        public AuctionPhotosRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<bool> AddNewPhoto(Auction auction, string path)
        {
            //var _auction = _context.Auctions.FirstOrDefault(auction);
            //var auctionPhoto = _context.AuctionPhotos.Where(photo => photo.AuctionId == auction.Id).FirstOrDefault(); 
            //if (_auction != null)
            //{
            //     return false;
            //}

            //auctionPhoto.Path = path;
            // _context.SaveChanges();
            return true;

        }

        public async Task<List<AuctionPhotos>> GetAllPhotosByAuctionId(Guid auctionId)
        {
            return _context.AuctionPhotos.Where(photo => photo.AuctionId == auctionId).ToList();
        }
    }
}
