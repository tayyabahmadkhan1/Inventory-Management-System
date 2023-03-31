using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace IMS.Models
{
    public class Inventory
    {
        [Key] public Guid? Inventory_Id { get; set; }

        public Guid? warehouse_idFK { get; set; }
        public int stock_quantity { get; set; }
        public string Category { get; set; }

        //public ICollection<Item>? items { get; set; }

        public Warehouse? warehouseI { get; set; }

    }
}
