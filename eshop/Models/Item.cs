using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eshop.Models
{
    public class Item
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Field can't be empty")]
        public string Name { get; set; }
        [Range(0, 10000)]
        public int Amount { get; set; }
        [Range(0.0, 1000000.0)]
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public int ManufacturerId { get; set; }

        public Manufacturer Manufacturer { get; set; }
        public Category Category { get; set; }
    }
}
