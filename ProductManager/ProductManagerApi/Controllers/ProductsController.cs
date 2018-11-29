using Microsoft.AspNetCore.Mvc;
using ProductManagerApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagerApi.Controllers
{
    [Route("product-api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductContext _context;

        public ProductsController(ProductContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Product>> GetAll()
        {
            return _context.Products.ToList();
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public ActionResult<Product> GetById(int id)
        {
            var item = _context.Products.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public IActionResult Create(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();

            return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Product product)
        {
            var productDb = _context.Products.Find(id);
            if (productDb == null)
            {
                return NotFound();
            }

            productDb.Name = product.Name;
            productDb.Category= product.Category;
            productDb.Active = product.Active;
            productDb.Price = product.Price;

            _context.Products.Update(productDb);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todo = _context.Products.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Products.Remove(todo);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
