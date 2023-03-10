using IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Business.Interfaces
{
    public interface IOrderManager
    {
        public bool Add_UpdateOrder(Order AdminParameter);

        public Order GetOrderDetails(Guid OrderID);

        public List<Order> ViewOrdersList();

        public bool DeleteOrder(Guid OrderID);
    }
}
