using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Bal.Mapper;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class FacilityDepartmentBal : BaseBal
    {

        /// <summary>
        /// Gets or sets the operating room mapper.
        /// </summary>
        /// <value>
        /// The operating room mapper.
        /// </value>
        private FacilityDepartmentMapper FacilityDepartmentMapper { get; set; }


          /// <summary>
        /// Initializes a new instance of the <see cref="OperatingRoomBal"/> class.
        /// </summary>
        public FacilityDepartmentBal()
        {
            FacilityDepartmentMapper = new FacilityDepartmentMapper();
        }


        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <param name="corpoarteId">The corpoarte identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="showInActive">if set to <c>true</c> [show in active].</param>
        /// <returns>
        /// Return the Entity List
        /// </returns>
        public List<FacilityDepartmentCustomModel> GetFacilityDepartmentList(int corpoarteId, int facilityId,bool showInActive)
        {
            var list = new List<FacilityDepartmentCustomModel>();
            using (var facilityDepartmentRep = UnitOfWork.FacilityDepartmentRepository)
            {
                var lstFacilityDepartment =
                    facilityDepartmentRep.Where(
                        a => a.IsActive==showInActive && a.FacilityId == facilityId && a.CorporateId == corpoarteId).ToList();
                if (lstFacilityDepartment.Any())
                {
                    list.AddRange(
                        lstFacilityDepartment.Select(item => FacilityDepartmentMapper.MapModelToViewModel(item)));
                }
            }
            return list;
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public List<FacilityDepartmentCustomModel> SaveFacilityDepartment(FacilityDepartment model)
        {
            using (var rep = UnitOfWork.FacilityDepartmentRepository)
            {
                if (model.Id > 0)
                {
                    var current = rep.GetSingle(model.Id);
                    model.CreatedBy = current.CreatedBy;
                    model.CreatedDate = current.CreatedDate;
                    rep.UpdateEntity(model, model.Id);
                }
                else
                    rep.Create(model);

                var currentId = model.Id;
                var list = GetFacilityDepartmentList(model.CorporateId, model.FacilityId,true);
                return list;
            }
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="facilityDepartmentId">The facility department identifier.</param>
        /// <returns></returns>
        public FacilityDepartment GetFacilityDepartmentById(int? facilityDepartmentId)
        {
            using (var rep = UnitOfWork.FacilityDepartmentRepository)
            {
                var model = rep.Where(x => x.Id == facilityDepartmentId).FirstOrDefault();
                return model;
            }
        }
    }
}
