using App.DAL.Interfaces;
using App.Domain.Models;
using App.DTO.DTOModels;
using App.Services.Interfaces;
using App.Common.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using System.Xml.Linq;

namespace App.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {  
            _userRepository = userRepository;
        }

        public async Task AddNew(RegisterDTO userModel)
        {
            var user = new User()
            {
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                Password = BCrypt.Net.BCrypt.HashPassword(userModel.Password),
                UserName = userModel.Username,
                PhoneNumber = "Nie informacji",
                Address = "Brak informacji",
                UserAvatarPath = "reactapp/src/assets/profile/defaultProfileImg.jpg"
            };
            await _userRepository.AddUserAsync(user);
        }

        public async Task<bool> ChangeEmail(Guid id, string newEmail)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user.Email == newEmail)
                return false;
            user.Email = newEmail;
            var userAfterUpdate = await _userRepository.Update(user);
            if (userAfterUpdate.Email == newEmail)
                return true;
            return false;
        }

        public async Task<bool> ChangePassword(Guid id, string newPassword)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            var userAfterUpdate = await _userRepository.Update(user);
            if (Common.Checkers.UserChecker.VerifyPassword(newPassword, userAfterUpdate.Password))
                return true;
            return false;
        }

        public async Task<bool> ChangeUserInfo(UserInfoDTO userDTO)
        {
            var user = await _userRepository.GetUserByIdAsync(userDTO.Id);
            if(user == null) return false;
            var veryfied = Common.Checkers.UserChecker.VerifyPassword(userDTO.Password, user.Password);
            if (veryfied)
            {
                user.UserName = user.UserName;
                user.Email = user.Email;
                user.FirstName = userDTO.FirstName;
                user.LastName = userDTO.LastName;
                user.Address = userDTO.Address;
                user.PhoneNumber = userDTO.PhoneNumber;
                var userAfterUpdate = await _userRepository.Update(user);
                if (userAfterUpdate.FirstName == userDTO.FirstName && userAfterUpdate.LastName == userDTO.LastName)
                {
                    return true;
                }
            }

            return false;
        }

        public async Task<bool> DeleteAccount(Guid id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            return await _userRepository.Delete(user);
        }

        public async Task<UserDTO> GetByEmailOrUsername(string emailOrUsername)
        {
            var user = await _userRepository.GetUserByUsernameOrEmail(emailOrUsername);
            return user.ToDTO();
        }

        public async Task<UserDTO> GetById(Guid id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            return user.ToDTO();
        }
    }
}
