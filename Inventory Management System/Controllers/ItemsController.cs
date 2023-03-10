using Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IMS.Models;
using IMS.Business.Interfaces;

namespace InternProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ItemsController : ControllerBase
    {
        private readonly InventoryDbContext dbobject;
        private readonly IItemManager _ItemManager;

        public ItemsController(InventoryDbContext dbobj, IItemManager itemManager)
        {
            this.dbobject = dbobj;
            this._ItemManager = itemManager;
        }


        [HttpPost("Add_UpdateItem")]
        public bool Add_UpdateItem(Item ItemParameter)
        {
            return _ItemManager.Add_UpdateItem(ItemParameter);
        }


        [HttpGet("GetItemDetails")]
        public Item GetItemsDetails(Guid ItemID)
        {
            return _ItemManager.GetItemDetails(ItemID);
        }


        [HttpGet("ViewItemsList")]
        public List<Item> ViewItemsList()
        {
            return _ItemManager.ViewItemsList();
        }


        [HttpDelete("DeleteItem")]
        public bool DeleteItem(Guid ItemID)
        {
            return _ItemManager.DeleteItem(ItemID);
        }
    }
}