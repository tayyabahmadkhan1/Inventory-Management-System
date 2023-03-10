using System.ComponentModel.DataAnnotations;

namespace IMS.Models
{
    public class Item
    {

        [Key] public Guid? item_Id { get; set; }

        public string item_name { get; set; }

        public string Description { get; set; }

        public int cost_price { get; set; }

        public int sell_price { get; set; }


        public Guid? InventoryIdItems { get; set; }
        public Inventory? Inventorys { get; set; }

        public ICollection<Order>? OrderI { get; set; }
    }
}
