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
    public class InventoryManager : IInventoryManager
    {
        private readonly InventoryDbContext _InventoryDbContext;

        public InventoryManager(InventoryDbContext inventoryDbContext)
        {
            _InventoryDbContext = inventoryDbContext;

        }

        public bool Add_UpdateInventory(Inventory InventoryParameter)
        {

            bool hasInventoryId = _InventoryDbContext.Inventories.Any(c => c.Inventory_Id == InventoryParameter.Inventory_Id);

            if (hasInventoryId)
            {
                _InventoryDbContext.Inventories.Update(InventoryParameter);

            }
            else
            {
                _InventoryDbContext.Inventories.Add(InventoryParameter);
            }

            int response = _InventoryDbContext.SaveChanges();

            if (response == 0)
            {
                return false;
            }

            return true;

        }


        public Inventory GetInventoryDetails(Guid InventoryID)
        {
            return _InventoryDbContext.Inventories.FirstOrDefault(c => c.Inventory_Id == InventoryID);
        }


        public List<Inventory> ViewInventoryList()
        {
            return _InventoryDbContext.Inventories.ToList();
        }

        public bool DeleteInventory(Guid InventoryID)
        {

            bool InventoryExist = _InventoryDbContext.Inventories.Any(c => c.Inventory_Id == InventoryID);

            if (InventoryExist)
            {
                var obj = new Inventory();
                obj.Inventory_Id = InventoryID;

                _InventoryDbContext.Inventories.Remove(obj);
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
