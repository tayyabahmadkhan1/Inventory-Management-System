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
    public class WarehouseManager : IWarehouseManager
    {
        private readonly InventoryDbContext _InventoryDbContext;

        public WarehouseManager(InventoryDbContext inventoryDbContext)
        {
            _InventoryDbContext = inventoryDbContext;

        }

        public bool Add_UpdateWarehouse(Warehouse WarehouseParameter)
        {

            bool hasWarehouseId = _InventoryDbContext.Warehouses.Any(c => c.Warehouse_Id == WarehouseParameter.Warehouse_Id);

            if (hasWarehouseId)
            {
                _InventoryDbContext.Warehouses.Update(WarehouseParameter);

            }
            else
            {
                _InventoryDbContext.Warehouses.Add(WarehouseParameter);
            }

            int response = _InventoryDbContext.SaveChanges();

            if (response == 0)
            {
                return false;
            }

            return true;

        }


        public Warehouse GetWarehouseDetails(Guid WarehouseID)
        {
            return _InventoryDbContext.Warehouses.FirstOrDefault(c => c.Warehouse_Id == WarehouseID);
        }


        public List<Warehouse> ViewWarehousesList()
        {
            return _InventoryDbContext.Warehouses.ToList();
        }

        public bool DeleteWarehouse(Guid WarehouseID)
        {

            bool WarehouseExist = _InventoryDbContext.Warehouses.Any(c => c.Warehouse_Id == WarehouseID);

            if (WarehouseExist)
            {
                var obj = new Warehouse();
                obj.Warehouse_Id = WarehouseID;

                _InventoryDbContext.Warehouses.Remove(obj);
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
