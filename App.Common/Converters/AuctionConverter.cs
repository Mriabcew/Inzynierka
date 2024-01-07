using App.Domain.Models;
using App.DTO.DTOModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Common.Converters
{
    public static class AuctionConverter
    {
        public static Auction ToEntity(this AuctionDTO dto)
        {
            var images = new List<Image>();
            foreach(var image  in dto.Images)
            {
                images.Add(image.ToEntity());
            }

            return new Auction()
            {
               Id = dto.Id,
               CreatedDate = dto.CreatedDate,
               Status = dto.Status,
               Price = dto.Price,
               Description = dto.Description,
               Name = dto.Name,
               CategoryId = dto.CategoryId,
               UserId = dto.UserId,
               AuctionPhotos = images
               
            };
        }

        public static AuctionDTO ToDTO(this Auction entity)
        {
            var imagesDTOs = new List<ImageDTO>();
            foreach(var image in entity.AuctionPhotos)
            {
                imagesDTOs.Add(image.toDTO());
            }

            return new AuctionDTO()
            {
                Id=entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Price = entity.Price,
                Status = entity.Status,
                CreatedDate = entity.CreatedDate,
                UserId = entity.UserId,
                CategoryId = entity.CategoryId,
                Images = imagesDTOs
            };
        }
    }
}
