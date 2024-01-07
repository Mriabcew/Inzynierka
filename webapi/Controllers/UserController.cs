using App.DTO.DTOModels;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUserById(Guid id)
        {
            var user = await _userService.GetById(id);
            if(user == null) 
            { 
                return NotFound();
            }

            return Ok(user);
        }


    }
}
