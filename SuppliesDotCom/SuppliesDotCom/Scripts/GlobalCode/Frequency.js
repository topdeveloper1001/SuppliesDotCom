var gcc = "1024";
$(function () {
    $("#globalCodeForm").validationEngine();
});

function ClearFrequencyForm() {
    var maxValue = $("#MaxValue").val();
    $('#globalCodeForm').clearForm(true);
    $("#GlobalCodeValue").val(maxValue);
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseGlobalCodeAddEdit').removeClass('in');
    $('#collapseGlobalCodesList').addClass('in');
    $('.btnGlobalCodeSave').val('Save');
    $("#chkActive").prop('checked', true);

}

function CheckIfGlobalCodeNameAlreadyExist() {
    var id = $("#GlobalCodeID").val();
    id = id == "" ? '0' : id;
    var name = $("#txtGlobalCodeName").val();
    var jsonData = JSON.stringify({
        GlobalCodeName: name,
        GlobalCodeId: id,
        GlobalCodeCategoryValue: gcc
    });

    $.ajax({
        type: "POST",
        url: "/GlobalCode/CheckDuplicateSubCategory",
        //async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (isExist) {
            //If Already exist, it will return true otherwise false
            if (isExist) {
                ShowMessage("Record already exists! ", "Alert", "info", true);
            }
            else {
                SaveFrequency();
            }
        },
        error: function () {
        }
    });
}

function SaveFrequency() {
 

    if ($("#txtExternalValue1").val() > $("#txtExternalValue2").val() && $("#txtExternalValue2").val()!="") {
        ShowMessage("Time 1 can not be greater than to Time 2", "Warning", "warning", true);
        return false;
    }
    //TimeValidation();
    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }

    var globalCodeId = $("#GlobalCodeID").val();
    var globalCodeCategory = gcc;
    var globalCodeName = $("#txtGlobalCodeName").val();
    var globalCodeValue = $("#GlobalCodeValue").val();
    var description = $("#txtDescription").val();
    var externalValue1 = $("#txtExternalValue1").val();
    var externalValue2 = $("#txtExternalValue2").val();
    var externalValue3 = $("#txtExternalValue3").val();
    var externalValue4 = $("#txtExternalValue4").val();
    var externalValue5 = $("#txtExternalValue5").val();
    var externalValue6 = $("#txtExternalValue6").val();
    var isActive;
    if ($('#chkActive').is(':checked'))
        isActive = true;
    else
        isActive = false;

    var jsonData = JSON.stringify({
        GlobalCodeID: globalCodeId,
        GlobalCodeCategoryValue: globalCodeCategory,
        GlobalCodeName: globalCodeName,
        SortOrder: 0,
        Description: description,
        FacilityNumber: 0,
        GlobalCodeValue: globalCodeValue,
        IsActive: isActive,
        IsDeleted: false,
        ExternalValue1: externalValue1,
        ExternalValue2: externalValue2,
        ExternalValue3: externalValue3,
        ExternalValue4: externalValue4,
        ExternalValue5: externalValue5,
        ExternalValue6: externalValue6,
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/AddUpdateFrequency",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                var maxValue = $("#MaxValue").val();
                ClearFrequencyForm();
                BindList("#GlobalCodesList", data);
                ResetValues("#chkActive", "#GlobalCodeValue", globalCodeValue, globalCodeId);
                if (globalCodeId == 0) {
                    var value = parseInt(maxValue, 10);
                    ++value;
                    $("#MaxValue").val(value);
                }
                $("#chkShowInActive").prop('checked', false);
                $('#collapseGlobalCodesList').addClass('in');
                var msg = "Record Saved successfully !";
                if (globalCodeId > 0)
                    msg = "Record updated successfully";

                ShowMessage(msg, "Success", "success", true);
            }
        },
        error: function () {

        }
    });
    return false;
}

function EditFrequency(id) {
    var jsonData = JSON.stringify({ id: id });
    $.ajax({
        type: "POST",
        url: '/GlobalCode/GetGlobaCodeById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindFrequencyDetailsInEditMode(data);
        },
        error: function () {
        }
    });
}

function DeleteFrequency() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var url = '/GlobalCode/DeleteFrequency';
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                globalCodeId: $("#hfGlobalConfirmId").val()
            }),
            success: function (data) {
                if (data != null) {
                    $("#chkActive").prop('checked', true);
                    BindList("#GlobalCodesList", data);
                    ShowMessage("Frequency code deleted successfully", "Deleted!", "info", true);
                }
            },
            error: function () {
            }
        });
    }
}

//function DeleteFrequency(id) {
//    if (confirm("Do you want to delete GlobalCode?")) {
//        var url = '/GlobalCode/DeleteFrequency';
//        $.ajax({
//            type: "POST",
//            url: url,
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: JSON.stringify({
//                globalCodeId: id
//            }),
//            success: function (data) {
//                if (data != null) {
//                    BindList("#GlobalCodesList", data);
//                    ShowMessage("Frequency code deleted successfully", "Deleted!", "info", true);
//                }
//            },
//            error: function () {
//            }
//        });
//    }
//}

function BindFrequencyDetailsInEditMode(data) {
    $('#collapseGlobalCodeAddEdit').addClass('in');
    $("#GlobalCodeID").val(data.Id);
    $("#hdGlobalCodeCategoryValue").val(data.Category);
    $("#txtGlobalCodeName").val(data.Name);
    $('#GlobalCodeValue').val(data.Value);
    $("#txtDescription").val(data.Description);
    $("#txtExternalValue1").val(data.ExternalValue1);
    $("#txtExternalValue2").val(data.ExternalValue2);
    $("#txtExternalValue3").val(data.ExternalValue3);
    $("#txtExternalValue4").val(data.ExternalValue4);
    $("#txtExternalValue5").val(data.ExternalValue5);
    $("#txtExternalValue6").val(data.ExternalValue6);
    $('#chkActive')[0].checked = data.IsActive;
    if ($("#GlobalCodeID").val() <= 0) {
        $('.btnGlobalCodeSave').val('Save');
    }
    else {
        $('.btnGlobalCodeSave').val('Update');
    }
    $('#collapseDiagnosisAddEdit').addClass('in');

    $(".dtGeneralTimeOnly").datetimepicker({
        datepicker: false,
        format: 'H:i',
        mask: false,
    });
}

function ShowInActiveRecordsInFrequency(chkSelector) {
    $("#chkActive").prop("checked", false);
    var active = $(chkSelector)[0].checked;
    var isActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/ActiveInActive",
        data: JSON.stringify({ showInActive: isActive }),
        dataType: "html",
       
        success: function (data) {
            
            if (data != null) {
                BindList("#GlobalCodesList", data);
            }
        },
        error: function () {

        }
    });
}

function SortOrderGrid(event) {
    
    
    var url = "/GlobalCode/ActiveInActive";
    var active = $("#chkShowInActive").val();
    var isActive = active == 'on' ? true : false;

    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?showInActive=" + isActive + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {

            $("#GlobalCodesList").empty();
            $("#GlobalCodesList").html(data);
            //BindList("#GlobalCodesList", data);
            //ReportingGrid

        },
        error: function () {
        }
    });
}

function checkTimeLimit() {
    var timeLimit = $("#txtExternalValue6").val();
    if (timeLimit > 5) {
        ShowMessage("Number Of times Should be lessthan or equal to 5", "Warning!", "warning", true);
        $("#txtExternalValue6").val('');
        return false;
    }
    
    if (timeLimit == 1) {
        $("#timeOne").show();
        $("#timeTwo").hide();
        $("#timeThree").hide();
        $("#timeFour").hide();
        $("#timeFive").hide();
        $("#txtExternalValue2").val('');
        $("#txtExternalValue3").val('');
        $("#txtExternalValue4").val('');
        $("#txtExternalValue5").val('');

        return true;
    }
    else if (timeLimit == 2) {
        $("#timeTwo").show();
        $("#timeThree").hide();
        $("#timeFour").hide();
        $("#timeFive").hide();
        $("#txtExternalValue3").val('');
        $("#txtExternalValue4").val('');
        $("#txtExternalValue5").val('');
        return true;

    }
    else if (timeLimit == 3) {
        $("#timeThree").show();
        $("#timeTwo").show();

        $("#timeFour").hide();
        $("#timeFive").hide();
        $("#txtExternalValue4").val('');
        $("#txtExternalValue5").val('');
        return true;

    }
    else if (timeLimit == 4) {
        $("#timeTwo").show();
        $("#timeThree").show();
        $("#timeFour").show();
        $("#timeFive").hide();
        $("#txtExternalValue5").val('');
        return true;

    }
    else if (timeLimit == 5) {
        $("#timeTwo").show();
        $("#timeThree").show();
        $("#timeFour").show();
        $("#timeFive").show();
        return true;

    } else {
        return false;
    }


    return true;
}
