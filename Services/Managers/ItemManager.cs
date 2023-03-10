using IMS.Business.Interfaces;
using IMS.Models;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace IMS.Business.Managers
{
    public class ItemManager : IItemManager
    {
        private readonly InventoryDbContext _InventoryDbContext;

        public ItemManager(InventoryDbContext inventoryDbContext)
        {
            _InventoryDbContext = inventoryDbContext;

        }

        public bool Add_UpdateItem(Item ItemParameter)
        {

            bool hasItemId = _InventoryDbContext.Items.Any(c => c.item_Id == ItemParameter.item_Id);

            if (hasItemId)
            {
                _InventoryDbContext.Items.Update(ItemParameter);

            }
            else
            {
                _InventoryDbContext.Items.Add(ItemParameter);
            }

            int response = _InventoryDbContext.SaveChanges();

            if (response == 0)
            {
                return false;
            }

            return true;

        }


        public Item GetItemDetails(Guid ItemID)
        {
            return _InventoryDbContext.Items.FirstOrDefault(c => c.item_Id == ItemID);
        }


        public List<Item> ViewItemsList()
        {
            return _InventoryDbContext.Items.ToList();
        }

        public bool DeleteItem(Guid ItemID)
        {

            bool itemExist = _InventoryDbContext.Items.Any(c => c.item_Id == ItemID);

            if (itemExist)
            {
                var obj = new Item();
                obj.item_Id = ItemID;

                _InventoryDbContext.Items.Remove(obj);
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
