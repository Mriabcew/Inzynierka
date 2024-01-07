using App.DTO.DTOModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IImageService
    {
        Task SaveImageAsync(AuctionDTO auction);
    }
}
