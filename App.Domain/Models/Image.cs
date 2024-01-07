using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Domain.Models
{
    public class Image
    {

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Name { get; set; }

        [Required]
        public string Source { get; set; }

        [Required]
        public string Extension {  get; set; }

        [Required]
        [ForeignKey("AuctionId")]
        public Guid AuctionId { get; set; }
        
        
    }
}
