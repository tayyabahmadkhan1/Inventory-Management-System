using Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IMS.Models;
using IMS.Business.Interfaces;

namespace InternProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class OrdersController : ControllerBase
    {
        private readonly InventoryDbContext dbobject;
        private readonly IOrderManager _OrderManager;

        public OrdersController(InventoryDbContext dbobj, IOrderManager OrderManager)
        {
            this.dbobject = dbobj;
            this._OrderManager = OrderManager;
        }


        [HttpPost("Add_UpdateOrder")]
        public bool Add_UpdateOrder([FromForm] Order OrderParameter)
        {
            return _OrderManager.Add_UpdateOrder(OrderParameter);
        }


        [HttpGet("GetOrderDetails")]
        public Order GetOrdersDetails(Guid OrderID)
        {
            return _OrderManager.GetOrderDetails(OrderID);
        }


        [HttpGet("ViewOrdersList")]
        public List<Order> ViewOrdersList()
        {
            return _OrderManager.ViewOrdersList();
        }


        [HttpDelete("DeleteOrder")]
        public bool DeleteOrder(Guid OrderID)
        {
            return _OrderManager.DeleteOrder(OrderID);
        }
    }
}