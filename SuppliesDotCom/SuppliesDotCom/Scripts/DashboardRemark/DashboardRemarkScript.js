$(function () {
    $("#DashboardRemarkFormDiv").validationEngine();
    BindGlobalCodesWithValue("#ddlDashboardType", 4345, '');
    BindFacilitiesWithoutCorporate('#ddlFacility', '');
    BindMonthsList("#ddlMonth", "");
    $("#ddlDashboardType").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue > 0) {
            BindDashboardSections(selectedValue, "");
        }
    });
});

function SaveDashboardRemark(id) {
    var isValid = jQuery("#DashboardRemarkFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtId = $("#hfId").val();
        var txtDashboardType = $("#ddlDashboardType").val();
        var txtDashboardSection = $("#ddlDashboardSection").val();
        var txtRemarks = $("#txtRemarks").val();
        var txtFacilityId = $("#ddlFacility").val();
        //var txtCorporateId = $("#txtCorporateId").val();
        //var txtCreatedBy = $("#txtCreatedBy").val();
        //var dtCreatedDate = $("#dtCreatedDate").val();
        var jsonData = JSON.stringify({
            Id: txtId,
            DashboardType: txtDashboardType,
            DashboardSection: txtDashboardSection,
            Remarks: txtRemarks,
            FacilityId: txtFacilityId,
            Month: $("#ddlMonth").val(),
            //FacilityNumber: txtFacilityNumber,
            //CorporateId: txtCorporateId,
            //CreatedBy: txtCreatedBy,
            //CreatedDate: dtCreatedDate,
        });
        $.ajax({
            type: "POST",
            url: '/DashboardRemark/SaveDashboardRemark',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#DashboardRemarkListDiv", data);
                ClearDashboardRemarkForm();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";
                ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {

            }
        });
    }
}

function EditDashboardRemark(id) {
    var jsonData = JSON.stringify({
        Id: id
    });
    $.ajax({
        type: "POST",
        url: '/DashboardRemark/GetDashboardRemarkDetails',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindDashboardRemarkDetails(data);
        },
        error: function (msg) {

        }
    });
}

function DeleteDashboardRemark() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/DashboardRemark/DeleteDashboardRemark',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#DashboardRemarkListDiv", data);
                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
            },
            error: function (msg) {
                return true;
            }
        });
    }
}

//function DeleteDashboardRemark(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var jsonData = JSON.stringify({
//            id: id
//        });
//        $.ajax({
//            type: "POST",
//            url: '/DashboardRemark/DeleteDashboardRemark',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                BindList("#DashboardRemarkListDiv", data);
//                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}

function ClearDashboardRemarkForm() {
    $("#DashboardRemarkFormDiv").clearForm(true);
    $('#collapseDashboardRemarkAddEdit').removeClass('in');
    $('#collapseDashboardRemarkList').addClass('in');
    $("#DashboardRemarkFormDiv").validationEngine();
    $("#btnSave").val("Save");
    $.validationEngine.closePrompt(".formError", true);
}

function BindDashboardRemarkDetails(data) {
    $("#btnSave").val("Update");
    $('#collapseDashboardRemarkList').removeClass('in');
    $('#collapseDashboardRemarkAddEdit').addClass('in');
    $("#DashboardRemarkFormDiv").validationEngine();
    $('#hfId').val(data.Id);
    $('#ddlDashboardType').val(data.DashboardType);
    $('#ddlDashboardSection').val(data.DashboardSection);
    BindDashboardSections(data.DashboardType, data.DashboardSection);
    $("#ddlMonth").val(data.Month);
    $('#txtRemarks').val(data.Remarks);
    $('#ddlFacility').val(data.FacilityId);
}

function BindDashboardSections(selectedValue, subCategory2SelectedValue) {
    $.post("/GlobalCode/GetDashboardSectionsData", { globalCodeValue: selectedValue, parentCategory: "4345" }, function (data) {
        if (subCategory2SelectedValue == null)
            subCategory2SelectedValue = "";
        BindDropdownData(data, "#ddlDashboardSection", subCategory2SelectedValue);
    });
}