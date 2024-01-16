using App.Domain.Models;
using App.DTO.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Common.Converters
{
    public static class ImageConverter
    {
        public static Image ToEntity(this ImageDTO imageDTO)
        {
            return new Image()
            {
              AuctionId = imageDTO.AuctionId,
              Extension = imageDTO.Extension,
              Id = imageDTO.Id,
              Source = imageDTO.base64,
              Name = imageDTO.Name,
            };
        }

        public static ImageDTO toDTO(this Image image) 
        {
            return new ImageDTO()
            {
                AuctionId = image.AuctionId,
                Extension = image.Extension,
                Id = image.Id,
                base64 = image.Source,
                Name = image.Name,
            };
        }

        
    }
}
