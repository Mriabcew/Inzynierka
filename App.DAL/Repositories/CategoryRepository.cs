using App.DAL.Interfaces;
using App.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DAL.Repositories
{
    public class CategoryRepository : Repository, ICategoryRepository
    {

        public CategoryRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<Category>> GetAll()
        {
            var categories = await _context.Categories.ToListAsync();
            return categories;
        }
    }
}
