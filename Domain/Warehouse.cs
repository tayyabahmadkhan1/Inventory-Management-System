using System.ComponentModel.DataAnnotations;

namespace IMS.Models
{
    public class Warehouse
    {
        [Key] public Guid? Warehouse_Id { get; set; }
        public string Warehouse_location { get; set; }

        public Inventory? InventoryW { get; set; }
    }
}
