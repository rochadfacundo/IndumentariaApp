using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendIndumentaria.Models;

namespace BackendIndumentaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndumentariaController : ControllerBase
    {
        private readonly DbIndumentariaContext _dbIndumentaria;

        public IndumentariaController(DbIndumentariaContext dbIndumentaria)
        {
           this._dbIndumentaria = dbIndumentaria;
        }

        [HttpGet]
        [Route("GetProducto")]
        public async Task<IActionResult> getProductos()
        {
            var listProductos = await this._dbIndumentaria.Productos.ToListAsync();
            return Ok(listProductos);
        }

        [HttpGet]
        [Route("GetProductoById")]
        public async Task<IActionResult> getUserById(int id)
        {
            Producto producto = await this._dbIndumentaria.Productos.FindAsync(id);


            return Ok(producto);
        }

        [HttpPost]
        [Route("AddProducto")]
        public async Task<IActionResult> addProducto([FromBody] Producto request)
        {
            await this._dbIndumentaria.Productos.AddAsync(request);
            await this._dbIndumentaria.SaveChangesAsync();
            return Ok(request);
        }


        [HttpPut]
        [Route("EditProducto")]
        public async Task<IActionResult> PutProducto([FromBody] Producto producto)
        {
            try
            {
                var productoItem = await this._dbIndumentaria.Productos.FirstOrDefaultAsync(x => x.Id == producto.Id);

                if (productoItem != null)
                {
                    productoItem.Nombre = producto.Nombre;
                    productoItem.Precio = producto.Precio;
                    productoItem.Path = producto.Path;



                    await this._dbIndumentaria.SaveChangesAsync();
                }


                if (productoItem?.Id != producto.Id)
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
        [Route("DeleteProducto/{id:int}")]
        public async Task<IActionResult> deleteProducto(int id)
        {
            var productoAEliminar = await this._dbIndumentaria.Productos.FindAsync(id);
        
        
            if(productoAEliminar == null)
            {
                return BadRequest("El producto no existe");
            }

            this._dbIndumentaria.Productos.Remove(productoAEliminar);
            await this._dbIndumentaria.SaveChangesAsync();
            return Ok();

        }

    }
}
