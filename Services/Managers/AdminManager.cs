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
    public class AdminManager : IAdminManager
    {
        private readonly InventoryDbContext _InventoryDbContext;

        public AdminManager(InventoryDbContext inventoryDbContext)
        {
            _InventoryDbContext = inventoryDbContext;
        
        }


        public bool Add_UpdateAdmin(Admin AdminParameter)
        {

            bool hasAdminId = _InventoryDbContext.Admins.Any(c => c.A_Id == AdminParameter.A_Id);

            if (hasAdminId)
            {
                _InventoryDbContext.Admins.Update(AdminParameter);

            }
            else
            {
                _InventoryDbContext.Admins.Add(AdminParameter);
            }

            int response = _InventoryDbContext.SaveChanges();

            if(response == 0)
            {
                return false;
            }

            return true;

        }


        public Admin GetAdminDetails(Guid ID)
        {
            return _InventoryDbContext.Admins.FirstOrDefault(c => c.A_Id == ID);
        }


        public List<Admin> ViewAdminsList()
        {
            return _InventoryDbContext.Admins.ToList();
        }
    }
}
