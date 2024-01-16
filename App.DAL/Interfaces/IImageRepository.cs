using App.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DAL.Interfaces
{
    public interface IImageRepository
    {
        public Task<List<Image>> GetAllPhotosByAuctionId(Guid auctionId);

        public Task<bool> AddNewPhoto(Image image);
        public Task DeleteImageAsync(Image image);
    }
}
