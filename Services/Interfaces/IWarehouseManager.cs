using IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Business.Interfaces
{
    public interface IWarehouseManager
    {
        public bool Add_UpdateWarehouse(Warehouse AdminParameter);

        public Warehouse GetWarehouseDetails(Guid WarehouseID);

        public List<Warehouse> ViewWarehousesList();

        public bool DeleteWarehouse(Guid WarehouseID);
    }
}
