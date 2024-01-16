using App.DAL.Interfaces;
using App.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
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

        public async Task DeleteImageAsync(Image image)
        {
            try
            {
                var tempImg = await _context.AuctionPhotos.FirstOrDefaultAsync(i => i.Id == image.Id);

                if (tempImg != null)
                {
                    _context.AuctionPhotos.Attach(tempImg);
                    _context.AuctionPhotos.Remove(tempImg);
                    await _context.SaveChangesAsync();
                }
            }
            finally
            {
            }
        }

        public async Task<List<Image>> GetAllPhotosByAuctionId(Guid auctionId)
        {
            return _context.AuctionPhotos.Where(photo => photo.AuctionId == auctionId).ToList();
        }

        public async Task<Image> GetImageById(Guid imageId)
        {
            return _context.AuctionPhotos.Where(image => image.Id == imageId).FirstOrDefault();
        }
    }
}
