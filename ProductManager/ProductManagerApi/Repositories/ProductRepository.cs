using Microsoft.EntityFrameworkCore;
using ProductManagerApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagerApi.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductContext _context;

        public ProductRepository(ProductContext productContext)
        {
            _context = productContext;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products
                .ToListAsync()
                .ConfigureAwait(false);
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await _context.Products
                .FindAsync(id)
                .ConfigureAwait(false);
        }

        public async Task<bool> SimilarExist(Product product)
        {
            return await _context.Products
                .AnyAsync(x => x.Id != product.Id && x.Name == product.Name && x.Category == product.Category);
        }

        public async Task CreateAsync(Product product)
        {
            await _context.Products
                .AddAsync(product)
                .ConfigureAwait(false);
            await _context.SaveChangesAsync()
                .ConfigureAwait(false);
        }

        public async Task UpdateAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync()
                .ConfigureAwait(false);
        }

        public async Task DeleteAsync(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync()
                .ConfigureAwait(false);
        }
    }
}
