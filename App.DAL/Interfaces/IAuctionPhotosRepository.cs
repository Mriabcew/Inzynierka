using App.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DAL.Interfaces
{
    public interface IAuctionPhotosRepository
    {
        public Task<List<AuctionPhotos>> GetAllPhotosByAuctionId(Guid auctionId);

        public Task<bool> AddNewPhoto(Auction auction, string path);

    }
}
