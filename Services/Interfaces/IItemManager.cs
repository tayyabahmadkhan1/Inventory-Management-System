using IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Business.Interfaces
{
    public interface IItemManager
    {
        public bool Add_UpdateItem(Item AdminParameter);

        public Item GetItemDetails(Guid ItemID);

        public List<Item> ViewItemsList();

        public bool DeleteItem(Guid ItemID);
    }
}
