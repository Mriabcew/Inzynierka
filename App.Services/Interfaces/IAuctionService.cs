using App.DTO.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IAuctionService
    {
        Task AddNew(AuctionDTO auctionModel);

        Task<AuctionDTO> GetById(Guid id);

        Task<AuctionDTO> Update(AuctionDTO auctionModel);

        Task Delete(AuctionDTO auctionModel);

        Task<List<AuctionDTO>> GetAll();

        Task<List<AuctionDTO>> GetByCategory(Guid categoryId);

        Task<List<AuctionDTO>> GetByUser(Guid userID);
    }
}
