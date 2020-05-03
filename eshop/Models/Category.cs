using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eshop.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Field can't be empty")]
        public string Name { get; set; }
        public string Info { get; set; }
    }
}
