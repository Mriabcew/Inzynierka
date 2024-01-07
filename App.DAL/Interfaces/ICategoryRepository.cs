using App.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DAL.Interfaces
{
    public interface ICategoryRepository
    {
        public Task<List<Category>> GetAll();
    }
}
