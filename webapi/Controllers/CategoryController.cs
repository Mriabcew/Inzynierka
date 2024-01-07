using Microsoft.AspNetCore.Mvc;
using App.Services.Interfaces;
using App.Services.Services;
using App.Domain.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<List<Category>> GetAll() 
        {
            return await _categoryService.GetAll();
        }
    }
}
