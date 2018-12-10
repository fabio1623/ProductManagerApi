using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagerApi.Models;
using ProductManagerApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace ProductManagerApi.Controllers
{
    [Route("product-api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _productRepository.GetAllAsync().ConfigureAwait(false);
        }

        [HttpGet("{id}", Name = nameof(GetByIdAsync))]
        public async Task<ActionResult<Product>> GetByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id).ConfigureAwait(false);
            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exists = await _productRepository.SimilarExist(product).ConfigureAwait(false);
            if (exists)
            {
                return BadRequest();
            }

            await _productRepository.CreateAsync(product).ConfigureAwait(false);

            return CreatedAtRoute(nameof(GetByIdAsync), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, Product product)
        {
            if (id != product.Id || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var exists = await _productRepository.SimilarExist(product).ConfigureAwait(false);
            if (exists)
            {
                return BadRequest();
            }

            await _productRepository.UpdateAsync(product).ConfigureAwait(false);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id).ConfigureAwait(false);
            if (product == null)
            {
                return NotFound();
            }

            await _productRepository.DeleteAsync(product).ConfigureAwait(false);

            return product;
        }
    }
}
