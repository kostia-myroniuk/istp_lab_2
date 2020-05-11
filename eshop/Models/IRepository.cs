using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eshop.Models
{
    public interface IRepository
    {
        IEnumerable<Manufacturer> GetAll();
        Manufacturer Get(int id);
        void Create(Manufacturer manufacturer);
    }
}
