using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace SerachEventWeb
{
    [Produces("application/json")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager,
        SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }


        #region POST регистрация
        [HttpPost]
        [Route("api/Account/Register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            if (ModelState.IsValid)
            {
                User user = new User
                {
                    Email = model.Email,
                    UserName = model.Email
                };
                // Добавление нового пользователя
                var result = await _userManager.CreateAsync(user,
                model.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "user");
                    // установка куки

                    await _signInManager.SignInAsync(user, false);

                    var msg = new
                    {
                        message = "Добавлен новый пользователь: " +
                    user.UserName
                    };
                    return Ok(msg);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty,
                        error.Description);
                    }
                    var errorMsg = new
                    {
                        message = "Пользователь не добавлен.",
                        error = ModelState.Values.SelectMany(e =>
                        e.Errors.Select(er => er.ErrorMessage))
                    };
                    return StatusCode(203, errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Неверные входные данные.",
                    error = ModelState.Values.SelectMany(e =>
                    e.Errors.Select(er => er.ErrorMessage))
                };

                return StatusCode(203, errorMsg);
            }
        }
        #endregion


        #region POST логин
        [HttpPost]
        [Route("api/Account/Login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password,
                model.RememberMe, false);
                if (result.Succeeded)
                {
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    string role = "user";
                    if (await _userManager.IsInRoleAsync(user, "admin"))
                    {
                        role = "admin";
                    }
                    var msg = new
                    {
                        messange = "Выполнен вход пользователем: " + model.Email,
                        role = role
                    };
                    return Ok(msg);
                }
                else
                {
                    ModelState.AddModelError("", "Неправильный логин и (или) пароль");
                    var errorMsg = new
                    {
                        message = "Вход не выполнен.",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    return StatusCode(203, errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Вход не выполнен.",
                    error = ModelState.Values.SelectMany(e =>
                    e.Errors.Select(er => er.ErrorMessage))
                };
                return StatusCode(203, errorMsg);
            }
        }
        #endregion


        #region POST выход
        [HttpPost]
        [Route("api/Account/LogOff")]
        public async Task<IActionResult> LogOff()
        {
            // Удаление куки
            await _signInManager.SignOutAsync();
            var msg = new
            {
                message = "Выполнен выход."
            };
            return Ok(msg);
        }
        #endregion


        #region POST проверка роли
        [HttpPost]
        [Route("api/Account/checkRole/")]
        public async Task<IActionResult> CheckRole()
        {
            User user = await GetCurrentUserAsync();
            string role;
            if (user == null)
            {
                role = "";
            }
            else
            {
                if (await _userManager.IsInRoleAsync(user, "admin"))
                {
                    role = "admin";
                }
                else
                {
                    role = "user";
                }
            }
            var msg = new
            {
                role = role
            };
            return Ok(msg);
        }
        #endregion


        #region POST аутентификация
        [HttpPost]
        [Route("api/Account/isAuthenticated")]
        public async Task<IActionResult> LogisAuthenticatedOff()
        {
            User usr = await GetCurrentUserAsync();
            var message = usr == null ? "Вы Гость. Пожалуйста, выполните вход." : "Вы вошли как: " + usr.UserName;
            var msg = new
            {
                message
            };
            return StatusCode(203, msg);
        }
        #endregion


        private Task<User> GetCurrentUserAsync() =>
        _userManager.GetUserAsync(HttpContext.User);
    }
}

