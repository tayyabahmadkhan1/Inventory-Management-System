using IMS.Business.Interfaces;
using IMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace Inventory_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class InventorysController : ControllerBase
    {
        private readonly IInventoryManager _InventoryManager;

        public InventorysController(InventoryDbContext dbobj, IInventoryManager InventoryManager)
        {
            this._InventoryManager = InventoryManager;
        }


        [HttpPost("Add_UpdateInventory")]
        public bool Add_UpdateInventory(Inventory InventoryParameter)
        {
            return _InventoryManager.Add_UpdateInventory(InventoryParameter);
        }


        [HttpGet("GetInventoryDetails")]
        public Inventory GetInventorysDetails(Guid InventoryID)
        {
            return _InventoryManager.GetInventoryDetails(InventoryID);
        }


        [HttpGet("ViewInventorysList")]
        public List<Inventory> ViewInventoryList()
        {
            return _InventoryManager.ViewInventoryList();
        }


        [HttpDelete("DeleteInventory")]
        public bool DeleteInventory(Guid InventoryID)
        {
            return _InventoryManager.DeleteInventory(InventoryID);
        }
    }
}
