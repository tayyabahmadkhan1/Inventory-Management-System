using IMS.Business.Interfaces;
using IMS.Models;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Business.Managers
{
    public class OrderManager : IOrderManager
    {
        private readonly InventoryDbContext _InventoryDbContext;

        public OrderManager(InventoryDbContext inventoryDbContext)
        {
            _InventoryDbContext = inventoryDbContext;

        }

        public bool Add_UpdateOrder(Order OrderParameter)
        {

            bool hasOrderId = _InventoryDbContext.Orders.Any(c => c.Order_Id == OrderParameter.Order_Id);

            if (hasOrderId)
            {
                _InventoryDbContext.Orders.Update(OrderParameter);

            }
            else
            {
                _InventoryDbContext.Orders.Add(OrderParameter);
            }

            int response = _InventoryDbContext.SaveChanges();

            if (response == 0)
            {
                return false;
            }

            return true;

        }


        public Order GetOrderDetails(Guid OrderID)
        {
            return _InventoryDbContext.Orders.FirstOrDefault(c => c.Order_Id == OrderID);
        }


        public List<Order> ViewOrdersList()
        {
            return _InventoryDbContext.Orders.ToList();
        }

        public bool DeleteOrder(Guid OrderID)
        {

            bool OrderExist = _InventoryDbContext.Orders.Any(c => c.Order_Id == OrderID);

            if (OrderExist)
            {
                var obj = new Order();
                obj.Order_Id = OrderID;

                _InventoryDbContext.Orders.Remove(obj);
                int response = _InventoryDbContext.SaveChanges();

                if (response == 0)
                {
                    return false;
                }

                return true;

            }
            else
            {
                return false;
            }


        }

    }
}
