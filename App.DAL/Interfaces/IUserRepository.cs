using App.Domain.Models;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DAL.Interfaces
{
    public interface IUserRepository
    {
        Task AddUserAsync(User user);

        Task<User> GetUserByEmailAsync(string email);

        Task<User> GetUserByUsernameOrEmail(string email);
        Task<User> GetUserByIdAsync(Guid id);
        Task<List<User>> GetAllAsync();

        Task<User> Update(User user);

        Task<bool> Delete(User user);
        Task ChangeImageString(User user, string newImageString);
    }
}
