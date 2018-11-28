using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagerApi.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ProductContext(
                serviceProvider.GetRequiredService<DbContextOptions<ProductContext>>()))
            {
                if (context.Products.Any())
                {
                    return;
                }

                context.Products.AddRange(
                    new Product
                    {
                        Name = "VISI/pocket",
                        Category = "firstClass",
                        Active = true,
                        Price = 999
                    },

                    new Product
                    {
                        Name = "VISI/frame",
                        Category = "secondClass",
                        Active = true,
                        Price = 888.0
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
