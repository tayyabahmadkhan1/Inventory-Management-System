using System.ComponentModel.DataAnnotations;

namespace IMS.Models
{
    public class Order
    {
        [Key] public Guid? Order_Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }

        public string OrderQuantity { get; set; }
        public int Price { get; set; } 

        // Foreign key for customer
        /*public Guid? CustomerId { get; set; }
        public Customer? Customer { get; set; }*/
        public string Itemname { get; set; }

        public ICollection<Item>? itemsO { get; set; }

    }
}
