using App.Domain.Models;
using App.DTO.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Common.Converters
{
    public static class UserConverter
    {
        public static User ToEntity(this UserDTO dto)
        {
            return new User()
            {
                Id = dto.Id,
                UserName = dto.Username,
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                Password = dto.Password,
            };
        }

        public static UserDTO ToDTO(this User user)
        {
            if(user is null)
            {
                return new UserDTO 
                {

                };
            }
            else
                return new UserDTO()
                {
                    Address = user.Address,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    Id = user.Id,
                    Password = user.Password,
                    Username = user.UserName,
                };
        }
    }
}
