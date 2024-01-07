using App.Domain.Models;
using App.DTO.DTOModels;
using App.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class SecurityController : ControllerBase
    {
        private readonly IUserService _userService;
        private IAuthenticationService _authenticationService;

        public SecurityController(IUserService userService, IAuthenticationService authenticationService)
        {
            _userService = userService;
            _authenticationService = authenticationService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _userService.AddNew(model);

            return Ok();
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            var usernameOrEmail = model.EmailOrUsername;
            var user = await _userService.GetByEmailOrUsername(usernameOrEmail);
            if (user.Email == null)
            {
                return BadRequest("No user found with the given email address or username");
            }

            var verified = App.Common.Checkers.UserChecker.VerifyPassword(model.Password, user.Password);
            if (!verified)
            {
                return BadRequest("Password wrong");
            }

            return Ok(
                await _authenticationService.AuthenticationAsync(
                    new AuthenticationRequest()
                    {
                        EmailOrUsername = model.EmailOrUsername,
                        Password = model.Password
                    }
                    )
               );
        }

        [HttpPost]
        [Route("UserInfoSet")]
        public async Task<IActionResult> ChangeUserInfo([FromBody] UserInfoDTO userInfoDto)
        {
            if (await _userService.ChangeUserInfo(userInfoDto))
            {
                return Ok("Informations updated");
            }
            else
            {
                return BadRequest("Error data not updated");
            }
        }
        [HttpPost]
        [Route("SetNewPassword")]
        public async Task<IActionResult> ChangePassword([FromBody] UserChangePasswordDTO userDto)
        {
            var user = _userService.GetById(userDto.Id).Result;
            var verified = App.Common.Checkers.UserChecker.VerifyPassword(userDto.OldPassword, user.Password);
            if (verified)
            {
                if (await _userService.ChangePassword(userDto.Id, userDto.NewPassword))
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Password change error");
                }
            }
            else
            {
                return BadRequest("Old password wrong");
            }
        }

        [HttpPost]
        [Route("SetNewEmail")]
        public async Task<IActionResult> ChangeEmail([FromBody] UserChangeEmailDTO userDto)
        {
            var user = _userService.GetById(userDto.Id).Result;
            var verified = App.Common.Checkers.UserChecker.VerifyPassword(userDto.Password, user.Password);
            if (verified)
            {
                if (await _userService.ChangeEmail(userDto.Id, userDto.NewEmail))
                {
                    return Ok("Email change successfully");
                }
                else
                {
                    return BadRequest("Email change error");
                }
            }
            else
            {
                return BadRequest("Password Wrong");
            }
        }
        [Route("DeleteAccount")]
        [HttpPost]
        public async Task<IActionResult> DeleteAccount([FromBody] UserDTO userDto)
        {
            var user = _userService.GetById(userDto.Id).Result;
            if (App.Common.Checkers.UserChecker.VerifyPassword(userDto.Password, user.Password))
            {
                if (await _userService.DeleteAccount(userDto.Id))
                    return Ok("Account deleted");
                else
                {
                    return BadRequest("Account not deleted error");
                }
            }
            else
            {
                return BadRequest("Password wrong");
            }
        }


    }
}
