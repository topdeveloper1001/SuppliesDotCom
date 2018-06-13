using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using SuppliesDotCom.Bal.Mapper;
using SuppliesDotCom.Repository.UOW;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class ProjectTargetsBal : BaseBal
    {
        private ProjectTargetsMapper ProjectTargetsMapper { get; set; }

        public ProjectTargetsBal()
        {
            ProjectTargetsMapper = new ProjectTargetsMapper();
        }
        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <returns>Return the Entity List</returns>
        public List<ProjectTargetsCustomModel> GetProjectTargetsList(int corporateid, int facilityid)
        {
            var list = new List<ProjectTargetsCustomModel>();
            using (var projectTargetsRep = UnitOfWork.ProjectTargetsRepository)
            {
                var lstProjectTargets = corporateid > 0
                    ? projectTargetsRep.Where(
                        a => a.CorporateId == corporateid && a.FacilityId == facilityid).ToList()
                    : projectTargetsRep.GetAll().ToList();
                list.AddRange(lstProjectTargets.Select(item => ProjectTargetsMapper.MapModelToViewModel(item)));
            }
            return list;
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public List<ProjectTargetsCustomModel> SaveProjectTargets(ProjectTargets model)
        {
            using (var rep = UnitOfWork.ProjectTargetsRepository)
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

                var list = GetProjectTargetsList(model.CorporateId, model.FacilityId);
                return list;
            }
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ProjectTargets GetProjectTargetsById(int id)
        {
            using (var rep = UnitOfWork.ProjectTargetsRepository)
            {
                var model = rep.Where(x => x.Id == id).FirstOrDefault();
                return model;
            }
        }


        public List<ProjectTargetsCustomModel> DeleteProjectTarget(int id, int corporateId, int facilityId)
        {
            using (var rep = UnitOfWork.ProjectTargetsRepository)
            {
                rep.Delete(id);
                var list = GetProjectTargetsList(corporateId, facilityId);
                return list;
            }
        }

        public Int32 SaveMonthWiseValuesInProjectDashboard(string ProjectNumber, string Month, string CorporateId,
            string FacilityId, string TaskNumber)
        {
            Int32 retValue = 0; 
            return retValue;
        }
    }
}
