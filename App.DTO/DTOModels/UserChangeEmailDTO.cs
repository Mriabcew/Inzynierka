using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DTO.DTOModels
{
    public class UserChangeEmailDTO
    {
        public Guid Id { get; set; }
        public string Password { get; set; }
        public string OldEmail { get; set; }
        public string NewEmail { get; set; }
    }
}
