using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IMS.Models;

namespace IMS.Business.Interfaces
{
    public interface IAdminManager
    {
        public bool Add_UpdateAdmin(Admin AdminParameter);

        public Admin GetAdminDetails(Guid ID);

        public List<Admin> ViewAdminsList();
    }
}
