$(function () {
    $("#DashboardDisplayOrderFormDiv").validationEngine();
    BindIndicators('#ddlIndicatorFilter', "");
    BindGlobalCodesWithValue("#ddlDashboardType", 4345, '');
    BindGlobalCodesWithValue("#ddlSubCategory1", 4347, "");
    BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', '0');
    $("#ddlDashboardType").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue > 0) {
            BindDashboardSections(selectedValue, "");
        }
    });
    $("#ddlSubCategory1").change(function () {
        var selectedValue = $(this).val();
        var descriptionText = "";
        var subCate2Text = "";
        if (selectedValue > 0) {
            RebindSubCategories2(selectedValue, "0");
        } else {
            BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
        }
    });
});
function RebindSubCategories2(selectedValue, subCategory2SelectedValue) {
    $.post("/GlobalCode/GetGlobalCodesDropdownDataByExternalValue1", { globalCodeValue: selectedValue, parentCategory: "4347" }, function (data) {
        if (subCategory2SelectedValue == null)
            subCategory2SelectedValue = "";
        BindDropdownData(data, "#ddlSubCategory2", subCategory2SelectedValue);
    });
}
function BindDashboardSections(selectedValue, subCategory2SelectedValue) {
    $.post("/GlobalCode/GetDashboardSectionsData", { globalCodeValue: selectedValue, parentCategory: "4345" }, function (data) {
        if (subCategory2SelectedValue == null)
            subCategory2SelectedValue = "";
        BindDropdownData(data, "#ddlDashboardSection", subCategory2SelectedValue);
    });
}
function SaveDashboardDisplayOrder(id) {
    var isValid = jQuery("#DashboardDisplayOrderFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtId = $("#hfId").val();
        var txtDashboardId = $("#ddlDashboardType").val();
        var txtSectionId = $("#ddlDashboardSection").val();
        var txtIndicatorNumber = $("#ddlIndicatorFilter").val();
        var txtSubCategory1 = $("#ddlSubCategory1").val();
        var txtSubCategory2 = $("#ddlSubCategory2").val();
        var txtFacilityId = $("#ddlFacility").val();
        var txtSortOrder = $("#txtSortOrder").val();
        var jsonData = JSON.stringify({
            Id: txtId,
            DashboardId: txtDashboardId,
            SectionId: txtSectionId,
            IndicatorNumber: txtIndicatorNumber,
            SubCategory1: txtSubCategory1,
            SubCategory2: txtSubCategory2,
            FacilityId: txtFacilityId,
            SortOrder: txtSortOrder
        });
        $.ajax({
            type: "POST",
            url: '/DashboardDisplayOrder/SaveDashboardDisplayOrder',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#DashboardDisplayOrderListDiv", data);
                ClearDashboardDisplayOrderForm();
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

function EditDashboardDisplayOrder(id) {
    var jsonData = JSON.stringify({
        id: id,
    });
    $.ajax({
        type: "POST",
        url: '/DashboardDisplayOrder/GetDashboardDisplayOrderDetails',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindDashboardDisplayOrderDetails(data);
        },
        error: function (msg) {

        }
    });
}

//function DeleteDashboardDisplayOrder(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var jsonData = JSON.stringify({
//            id: id,
//        });
//        $.ajax({
//            type: "POST",
//            url: '/DashboardDisplayOrder/DeleteDashboardDisplayOrder',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                BindList("#DashboardDisplayOrderListDiv", data);
//                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}

function DeleteDashboardDisplayOrder() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            id: $("#hfGlobalConfirmId").val(),
        });
        $.ajax({
            type: "POST",
            url: '/DashboardDisplayOrder/DeleteDashboardDisplayOrder',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#DashboardDisplayOrderListDiv", data);
                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
            },
            error: function (msg) {
                return true;
            }
        });
    }
}

function ClearDashboardDisplayOrderForm() {
    $("#DashboardDisplayOrderFormDiv").clearForm(true);
    $('#collapseDashboardDisplayOrderAddEdit').addClass('in');
    $('#collapseDashboardDisplayOrderList').addClass('in');
    $("#DashboardDisplayOrderFormDiv").validationEngine();
    $("#btnSave").val("Save");
    $.validationEngine.closePrompt(".formError", true);
    $("#hfId").val("0");
}

function BindDashboardDisplayOrderDetails(data) {
    $("#btnSave").val("Update");
    $('#collapseDashboardDisplayOrderList').addClass('in');
    $('#collapseDashboardDisplayOrderAddEdit').addClass('in');
    $("#DashboardDisplayOrderFormDiv").validationEngine();
    $("#hfId").val(data.Id);
    $("#ddlDashboardType").val(data.DashboardId);
    $("#ddlDashboardSection").val(data.SectionId);
    $("#ddlIndicatorFilter").val(data.IndicatorNumber);
    $("#ddlSubCategory1").val(data.SubCategory1);
    $("#ddlSubCategory2").val(data.SubCategory2);
    $("#ddlFacility").val(data.FacilityId);
    $("#txtSortOrder").val(data.SortOrder);
    var selectedValue = data.SectionId;
    if (selectedValue > 0) {
        BindDashboardSections(data.DashboardId, selectedValue);
    }
    var selectedSc1 = data.SubCategory1;
    if (selectedSc1 > 0) {
        RebindSubCategories2(data.SubCategory1, data.SubCategory2);
    } else {
        BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
    }
}




