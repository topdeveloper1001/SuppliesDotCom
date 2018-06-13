// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Careplan.cs" company="Spadez">
//   OmniHealthcare
// </copyright>
// <summary>
//   The careplan.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.ComponentModel.DataAnnotations;

namespace SuppliesDotCom.Model
{
    /// <summary>
    /// The careplan.
    public class PatientEvaluationSet
    {
        [Key]
        public int SetId { get; set; }

        public int? EncounterId { get; set; }

        public int? PatientId { get; set; }

        public int ?CreatedBy { get; set; }

        public DateTime ?CreatedDate { get; set; }

        public int? UpdateBy { get; set; }

        public DateTime? UpdateDate { get; set; }

        public string ExtValue1 { get; set; }

        public string ExtValue2 { get; set; }

        public string FormType { get; set; }
        public string FormNumber { get; set; }
        public string Title { get; set; }

    }

}