using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.Domain.Enums;
using App.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace App.DTO.DTOModels
{
    public class AuctionDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedDate { get; set; }
        public OfferStatus Status {  get; set; }
        public Guid CategoryId { get; set; }
        public Guid UserId { get; set; }

        public List<ImageDTO> Images { get; set; }
        
    }
}
