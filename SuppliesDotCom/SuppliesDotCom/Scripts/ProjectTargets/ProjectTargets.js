$(function () {
    $("#ProjectTargetsFormDiv").validationEngine();
    BindProjectNumbersDropDown("#ddlProjectNumber1");
    BindTargetCompletionValueDropDown(".projectsValue", 4601);
});
function BindTargetCompletionValueDropDown(clsselectors, categoryIdval) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: "/Projects/BindTargetCompletionValueDropDown",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                if (items.length > 0 && clsselectors.length > 0) {
                    $(clsselectors).empty();
                    $(clsselectors).html(items);
                }
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}
function BindProjectNumbersDropDown(ddl) {
    $.ajax({
        type: "POST",
        url: '/Projects/GetProjectNumbers',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            BindDropdownData(data, ddl, "");

            if ($("#ddlTaskProjectNumber").length > 0)
                BindDropdownData(data, ddl, "");
        },
        error: function (msg) {

        }
    });
}

function SaveProjectTargets() {
    var isValid = jQuery("#ProjectTargetsFormDiv").validationEngine({ returnIsValid: true });
    if ($("#ddlFacility").val() == "0" && isValid == true) {
        isValid = false;
        var msg = "Please select facility";
        ShowMessage(msg, "Warning", "warning", true);
        $("#ddlFacility").focus();
    }
    if (isValid == true) {
        var txtProjectNumber = $("#ddlProjectNumber1").val();
        var dtProjectDate = $("#dtProjectDate").val();
        var txtTargetedCompletionValue = $("#ddlPrTargetedValue1").val();
        var jsonData = JSON.stringify({
            Id: $("#hfProjectTargetId").val(),
            ProjectNumber: txtProjectNumber,
            ProjectDate: dtProjectDate,
            TargetedCompletionValue: txtTargetedCompletionValue,
            IsActive: $('#ProjectTargetIsActive').prop("checked"), //$("#ProjectTargetIsActive")[0].checked
            ExternalValue1: $("#ddlPrTargetedValue1 option:selected").text().replace("%", "").trim(),
            FacilityId: $("#ddlFacility").val()
    });
        $.ajax({
            type: "POST",
            url: '/Projects/SaveProjectTargets',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#ProjectTargetsListDiv", data);
                ClearProjectTargetsForm();
                var msg = "Records Saved successfully !";
                if (parseInt($("#hfProjectTargetId").val()) > 0)
                    msg = "Records updated successfully";
                ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {

            }
        });
    }
}

function EditProjectTargets(id) {
    var jsonData = JSON.stringify({
        Id: id,
    });
    $.ajax({
        type: "POST",
        url: '/ProjectTargets/GetProjectTargetsDetails',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindProjectTargetsDetails(data);
        },
        error: function (msg) {

        }
    });
}

function DeleteProjectTargets() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            id: $("#hfGlobalConfirmId").val(),
        });

        $.ajax({
            type: "POST",
            url: '/Projects/DeleteProjectTargets',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#ProjectTargetsListDiv", data);
                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
            },
            error: function (msg) {
                return true;
            }
        });
    }
}

//function DeleteProjectTargets(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var jsonData = JSON.stringify({
//            id: id,
//        });

//        $.ajax({
//            type: "POST",
//            url: '/Projects/DeleteProjectTargets',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                BindList("#ProjectTargetsListDiv", data);
//                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}

function ClearProjectTargetsForm() {
    $("#ProjectTargetsFormDiv").clearForm(true);
    $('#collapseProjectTargetsAddEdit').addClass('in');
    $('#collapseProjectTargetsList').addClass('in');
    $("#ProjectTargetsFormDiv").validationEngine();
    $("#btnSave").val("Save");
    $.validationEngine.closePrompt(".formError", true);
    $('#ProjectTargetIsActive').prop("checked", true);
}

function BindProjectTargetsDetails(data) {
    $('#hfProjectTargetId').val(data.Id);
    $('#dtProjectDate').val(data.ProjectDate1);
    $('#ddlProjectNumber1').val(data.ProjectNumber);
    $('#ddlPrTargetedValue1').val(data.TargetedCompletionValue);

    if (data.IsActive) {
        $('#ProjectTargetIsActive').prop("checked", true);
    } else {
        $('#ProjectTargetIsActive').prop("checked", false);
    }
    $("#btnSave").val("Update");
    $('#collapseProjectTargetsList').addClass('in');
    $('#collapseProjectTargetsAddEdit').addClass('in');
    $("#ProjectTargetsFormDiv").validationEngine();
}
