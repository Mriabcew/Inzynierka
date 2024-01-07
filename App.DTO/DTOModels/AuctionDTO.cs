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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public OfferStatus Status {  get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        [Required]
        public Guid UserId { get; set; }

        public List<ImageDTO> Images { get; set; }
        
    }
}
