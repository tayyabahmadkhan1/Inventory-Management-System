using IMS.Business.Interfaces;
using IMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace Inventory_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class WarehousesController : ControllerBase
    {
        private readonly IWarehouseManager _WarehouseManager;

        public WarehousesController(InventoryDbContext dbobj, IWarehouseManager WarehouseManager)
        {
            this._WarehouseManager = WarehouseManager;
        }


        [HttpPost("Add_UpdateWarehouse")]
        public bool Add_UpdateWarehouse([FromForm] Warehouse WarehouseParameter)
        {
            return _WarehouseManager.Add_UpdateWarehouse(WarehouseParameter);
        }


        [HttpGet("GetWarehouseDetails")]
        public Warehouse GetWarehousesDetails(Guid WarehouseID)
        {
            return _WarehouseManager.GetWarehouseDetails(WarehouseID);
        }


        [HttpGet("ViewWarehousesList")]
        public List<Warehouse> ViewWarehousesList()
        {
            return _WarehouseManager.ViewWarehousesList();
        }


        [HttpDelete("DeleteWarehouse")]
        public bool DeleteWarehouse([FromQuery] Guid WarehouseID)
        {
            return _WarehouseManager.DeleteWarehouse(WarehouseID);
        }
    }
}
