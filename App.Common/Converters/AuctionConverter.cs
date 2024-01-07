using App.Domain.Models;
using App.DTO.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Common.Converters
{
    public static class AuctionConverter
    {
        public static Auction ToEntity(this AuctionDTO dto)
        {
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
            };
        }

        public static AuctionDTO ToDTO(this Auction entity)
        {
            return new AuctionDTO()
            {
                Id=entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Price = entity.Price,
                Status = entity.Status,
                CreatedDate = entity.CreatedDate,
                UserId = entity.UserId,
                CategoryId = entity.CategoryId
                
                
            };
        }
    }
}
