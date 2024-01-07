using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DTO.DTOModels
{
    public class ImageDTO
    {
        public Guid AuctionId {  get; set; }
        public string Name { get; set; }
        public string base64 { get; set; }
        public string Extension { get; set; }
        public Guid Id { get; set; }
    }
}
