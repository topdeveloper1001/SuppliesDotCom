//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System.ComponentModel.DataAnnotations;

namespace SuppliesDotCom.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class UserDefinedDescriptions
    {
        [Key]
        public int UserDefinedDescriptionID { get; set; }
        public string CategoryId { get; set; }
        public string CodeId { get; set; }
        public string RoleID { get; set; }
        public Nullable<int> UserID { get; set; }
        public string UserDefineDescription { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> Modifieddate { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public Nullable<int> DeletedBy { get; set; }
        public Nullable<System.DateTime> DeletedDate { get; set; }
    }
}
