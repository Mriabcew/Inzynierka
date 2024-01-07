using App.Common.Converters;
using App.DAL.Interfaces;
using App.DTO.DTOModels;
using App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly IAuctionsRepository _auctionRepository;

        public AuctionService(IAuctionsRepository auctionRepository)
        {
            _auctionRepository = auctionRepository;
        }

        public async Task AddNew(AuctionDTO auctionModel)
        {
            await _auctionRepository.AddAuctionAsync(auctionModel.ToEntity());
        }

        public async Task Delete(AuctionDTO auctionModel)
        {
            await _auctionRepository.DeleteAuction(auctionModel.ToEntity());
            
        }

        public async Task<List<AuctionDTO>> GetAll()
        {
            var auctions = new List<AuctionDTO>();
            var auctionsList =  await _auctionRepository.GetAllAuctionsAsync();
            foreach(var auction in auctionsList)
            {
                auctions.Add(auction.ToDTO());
            }
            return auctions;
        }

        public async Task<List<AuctionDTO>> GetByCategory(Guid categoryId)
        {
            var auctionsList = await _auctionRepository.GetAuctionsByCategory(categoryId);
            var auctionsListDTO = new List<AuctionDTO>();

            foreach (var auction in auctionsList)
            {
                auctionsListDTO.Add(auction.ToDTO());
            }

            return auctionsListDTO;
        }

        public async Task<AuctionDTO> GetById(Guid id)
        {
            var auction = await _auctionRepository.GetAuctionByIdAsync(id);
            return auction.ToDTO(); 
        }

        public async Task<List<AuctionDTO>> GetByUser(Guid userID)
        {
            var auctions = await _auctionRepository.GetAuctionsByUserIdAsync(userID);
            var a = new List<AuctionDTO>();
            foreach (var auction in auctions)
            {
                a.Add(auction.ToDTO());
            }
            return a;
        }

        public async Task<AuctionDTO> Update(AuctionDTO auctionModel)
        {
           var aucitonDTO = await _auctionRepository.UpdateAuction(auctionModel.ToEntity());
           return aucitonDTO.ToDTO();
        }

        public async Task<bool> UpdateImage(AuctionDTO auctionModel)
        {
            return false;
        }
    }
}
