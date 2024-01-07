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
    public class ImageRepository : Repository, IImageRepository
    {
        public ImageRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<bool> AddNewPhoto(Image image)
        {
            _context.AuctionPhotos.Add(image);
            _context.SaveChanges();
            return true;

        }

        public async Task<List<Image>> GetAllPhotosByAuctionId(Guid auctionId)
        {
            return _context.AuctionPhotos.Where(photo => photo.AuctionId == auctionId).ToList();
        }
    }
}
