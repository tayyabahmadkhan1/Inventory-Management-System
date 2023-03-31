using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;

namespace IMS.Models
{
    public class Customer
    {
        [Key] public Guid? Customer_Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // Navigation property for orders
        //public ICollection<Order>? Orders { get; set; }
    }
}
