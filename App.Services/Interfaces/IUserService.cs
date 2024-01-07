using App.DTO.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Services.Interfaces
{
    public interface IUserService
    {
        Task AddNew(RegisterDTO userModel);

        Task<UserDTO> GetByEmailOrUsername(string emailOrUsername);

        Task<UserDTO> GetById(Guid id);

        Task<bool> ChangeUserInfo(UserInfoDTO userDTO);

        Task<bool> ChangePassword(Guid id,string newPassword);

        Task<bool> DeleteAccount(Guid id);

        Task<bool> ChangeEmail(Guid id,string newEmail);

    }
}
