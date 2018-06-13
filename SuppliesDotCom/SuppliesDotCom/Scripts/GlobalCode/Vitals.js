var globalCodeCategoryValue = 1901;

$(function () {
    $("#globalCodeForm").validationEngine();
    BindGlobalCodesWithValue("#ddlGlobalCodeName", 1901, '');
});

function ClearVitalForm() {

    $('#globalCodeForm').clearForm(true);
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseGlobalCodeAddEdit').removeClass('in');
    $('#collapseGlobalCodesList').addClass('in').attr('style', 'height:auto');
    $('.btnGlobalCodeSave').val('Save');
    $('#chkActive').prop("checked", true);
    $("#divUnitOfMeasure").hide();
    $("#hfExternalValue3").val('');
    $("#hfGlobalCodeID").val('0');

}

function CheckIfVitalAlreadyExists() {
    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return;
    }
    var id = $("#hfGlobalCodeID").val();
    var name = $("#ddlGlobalCodeName option:selected").text();
    var gcValue = $("#ddlGlobalCodeName").val();
    var uom = $("#hfExternalValue3").val();
    if (uom == null)
        uom = "";

    if (gcValue > 0) {
        var jsonData = JSON.stringify({
            GlobalCodeName: name,
            id: id,
            categoryValue: globalCodeCategoryValue,
            value: gcValue,
            unitOfMeasure: uom
        });

        $.ajax({
            type: "POST",
            url: "/GlobalCode/CheckDuplicateVital",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                //If Already exist, it will return true otherwise false
                if (data) {
                    ShowMessage("Record already exists! ", "Alert", "info", true);
                }
                else {
                    SaveVitals();
                }
            },
            error: function (msg) {
            }
        });
    }
}

function SaveVitals() {
    if (parseFloat($("#txtExternalValue1").val()) > parseFloat($("#txtExternalValue2").val())) {
        ShowMessage("Miniumum Limit cannot be greater than Maximum Limit!", "Warning", "warning", true);
        return false;
    }
    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }

    var globalCodeId = $("#hfGlobalCodeID").val();
    var globalCodeName = $("#ddlGlobalCodeName option:selected").text();
    var globalCodeValue = $("#ddlGlobalCodeName").val();
    var minValue = $("#txtExternalValue1").val();
    var maxValue = $("#txtExternalValue2").val();
    var uom = $("#hfExternalValue3").val();

    if (uom == null)
        uom = "";

    var isActive;
    if ($('#chkActive').is(':checked'))
        isActive = true;
    else
        isActive = false;

    var jsonData = JSON.stringify({
        GlobalCodeID: globalCodeId,
        GlobalCodeCategoryValue: globalCodeCategoryValue,
        GlobalCodeName: globalCodeName,
        SortOrder: 0,
        Description: globalCodeName,
        FacilityNumber: 0,
        GlobalCodeValue: globalCodeValue,
        IsActive: isActive,
        IsDeleted: false,
        ExternalValue1: minValue,
        ExternalValue2: maxValue,
        ExternalValue3: uom,
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/SaveVitals",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            $('#collapseGlobalCodesList').addClass('in').attr('style', 'height:auto;');

            if (data != null) {
                ClearVitalForm();
                var msg = "Record Saved successfully !";
                if (globalCodeId > 0)
                    msg = "Record updated successfully";

                BindList("#GlobalCodesList", data);
                $("#chkShowInActive").prop("checked", false);
                ShowMessage(msg, "Success", "success", true);
            }
        },
        error: function (msg) {

        }
    });
    return false;
}

function EditVitals(id) {

    //$('#collapseGlobalCodesList').addClass('panel-heading');
    $.validationEngine.closePrompt(".formError", true);
    var jsonData = JSON.stringify({ id: id });
    $.ajax({
        type: "POST",
        url: '/GlobalCode/GetGlobaCodeById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {

            BindVitalDetailsInEditMode(data);
        },
        error: function (msg) {
        }
    });
}

function DeleteVital() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var url = '/GlobalCode/DeleteGlobalCode';
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                globalCodeId: $("#hfGlobalConfirmId").val()
            }),
            success: function (data) {
                if (data > 0) {
                    ShowMessage("Vitals deleted successfully", "Deleted!", "info", true);
                    ClearVitalForm();
                }
            },
            error: function (msg) {
            }
        });
    }
}


function BindVitalDetailsInEditMode(data) {
    $('#collapseGlobalCodesList').addClass('in');
    $("#hfGlobalCodeID").val(data.Id);
    $("#ddlGlobalCodeName").val(data.Value);
    $('#chkActive')[0].checked = data.IsActive;
    $('.btnGlobalCodeSave').val('Update');
    //$('#collapseGlobalCodesList').removeClass('in');
    //$('#collapseDiagnosisAddEdit').addClass('in');

    $('#collapseGlobalCodeAddEdit').addClass('in').attr('style', 'height:250px');
    OnChangeVital("#ddlGlobalCodeName");
    $("#hfExternalValue3").val(data.ExternalValue3);
    $("#txtExternalValue1").val(data.ExternalValue1);
    $("#txtExternalValue2").val(data.ExternalValue2);
}

function OnChangeVital(ddlSelector) {
    var selectedValue = $(ddlSelector).val();
    $("#divUnitOfMeasure").hide();
    if (selectedValue == 2) {
        $("#lblUnitOfMeasure").text("Kg");
        //$("#lblUnitOfMeasure1").text("Kg");
        //$("#lblUnitOfMeasure2").text("lbs");
        //$("#rdUnitOfMeasure1").val("6");
        //$("#rdUnitOfMeasure2").val("11");
        $("#hfExternalValue3").val("6");
        $("#divUnitOfMeasure").show();
    }
    else if (selectedValue == 3) {
        $("#lblUnitOfMeasure").text("Fahrenheit");
        //$("#lblUnitOfMeasure1").text("°C");
        //$("#lblUnitOfMeasure2").text("°F");
        //$("#rdUnitOfMeasure2").val("8");
        //$("#rdUnitOfMeasure1").val("2");
        $("#hfExternalValue3").val("2");
        $("#divUnitOfMeasure").show();
    }
    else
        $("#hfExternalValue3").val('');
}

function GetSelectedUnitOfMeasure() {
    var checked = $("#rdUnitOfMeasure1").length > 0 && $("#rdUnitOfMeasure1")[0].checked;
    if (checked) {
        $("#hfExternalValue3").val($("#rdUnitOfMeasure1").val());
        $("#rdUnitOfMeasure1").prop("checked", true);
    }
    else {
        $("#hfExternalValue3").val($("#rdUnitOfMeasure2").length > 0 ? $("#rdUnitOfMeasure2").val() : "");
        $("#rdUnitOfMeasure2").prop("checked", true);
    }
}



function ShowInActiveRecordsInVital(chkSelector) {


    $("#chkActive").prop("checked", false);
    //var categoryId = $("#hfGlobalCodeID").val();

    var active = $(chkSelector)[0].checked;
    var isActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/ActiveInActiveVital",
        data: JSON.stringify({ showInActive: isActive }),
        dataType: "html",

        success: function (data) {
            $('#collapseGlobalCodesList').addClass('in').attr('style', 'height:auto;');
            if (data != null) {
                BindList("#GlobalCodesList", data);

            }
        },
        error: function (msg) {

        }
    });
}



function SortVitalGridGrid(event) {
   var url = "/GlobalCode/ActiveInActiveVital";
   var active = $("#chkShowInActive").is(':checked');
   var isActive = active == true ? false : true;

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
            BindList("#GlobalCodesList", data);
        },
        error: function () {
        }
    });
}