using IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Business.Interfaces
{
    public interface IInventoryManager
    {
        public bool Add_UpdateInventory(Inventory AdminParameter);

        public Inventory GetInventoryDetails(Guid InventoryID);

        public List<Inventory> ViewInventoryList();

        public bool DeleteInventory(Guid InventoryID);
    }
}
