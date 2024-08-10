using BackendIndumentaria.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendIndumentaria.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly DbUserContext _dbUser;

        public UserController(DbUserContext _dbUser)
        {
            this._dbUser = _dbUser;
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> getUsers()
        {
            var listUsers = await this._dbUser.Users.ToListAsync();
            return Ok(listUsers);
        }

        [HttpGet]
        [Route("GetUserById")]
        public async Task<IActionResult> getUserById(int id)
        {
            User user = await this._dbUser.Users.FindAsync(id);

            return Ok(user);
        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<IActionResult> addUser([FromBody] User request)
        {

            Console.WriteLine(request);


            await this._dbUser.Users.AddAsync(request);
            await this._dbUser.SaveChangesAsync();
            return Ok(request);
        }

        [HttpPut]
        [Route("EditUser")]
        public async Task<IActionResult> Put(User user)
        {
            try
            {
                var userItem = await this._dbUser.Users.FirstOrDefaultAsync(x => x.Id == user.Id);

                if (userItem != null)
                {
                    userItem.Name = user.Name;
                    userItem.SurName = user.SurName;
                    userItem.Age = user.Age;
                    userItem.Dni = user.Dni;
                    userItem.City = user.City;
                    userItem.Country = user.Country;
                    userItem.Email = user.Email;
                    userItem.Password = user.Password;
                    userItem.Path = user.Path;


                    await this._dbUser.SaveChangesAsync();
                }


                if (userItem?.Id != user.Id)
                {
                    return BadRequest();
                }

                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        [Route("DeleteUser/{id:int}")]
        public async Task<IActionResult> deleteUser(int id)
        {
            var userToDelete = await this._dbUser.Users.FindAsync(id);


            if (userToDelete == null)
            {
                return BadRequest("El usuario no existe");
            }

            this._dbUser.Users.Remove(userToDelete);
            await this._dbUser.SaveChangesAsync();
            return Ok();

        }

    }
}

