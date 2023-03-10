using Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Linq;
using IMS.Models;
using IMS.Business.Interfaces;

namespace InternProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AdminController : ControllerBase
    {
        private readonly InventoryDbContext dbobject;

        private readonly IAdminManager _AdminManager;

        public AdminController(InventoryDbContext dbobj, IAdminManager adminManager) { 
            this.dbobject = dbobj;
            this._AdminManager = adminManager;
        }


        [HttpPost("Add_UpdateAdmin")]
        public bool Add_UpdateAdmin(Admin AdminParameter)
        {
            return _AdminManager.Add_UpdateAdmin(AdminParameter);
        }


        [HttpGet("GetAdminDetails")]
        public Admin GetAdminDetails(Guid ID)
        {
            return _AdminManager.GetAdminDetails(ID);
        }


        [HttpGet("ViewAdminsList")]
        public List<Admin> ViewAdminsList()
        {
            return _AdminManager.ViewAdminsList();
        }
    }
}