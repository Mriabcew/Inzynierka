using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class SecurityController : ControllerBase
    {
        private readonly IUserService _userService;
    }
}
