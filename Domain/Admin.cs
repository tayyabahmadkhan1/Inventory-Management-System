using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.Models
{
    public class Admin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]//FOR AUTO GENERATION OF ID (AUTO - GENERATE + AUTO INCREMENT)
        public Guid? A_Id { get; set; }

        public string name { get; set; }
        [MinLength(8)]
        public string Username { get; set; }
        [StringLength(100, MinimumLength = 8)] public string Password { get; set; }
    }

}
