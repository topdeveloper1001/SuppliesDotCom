var category = "";
$(function () {
    $("#globalCodeForm").validationEngine();
    category = $("#GlobalCodeCategoryValue").val();
    //BindFacilitiesDropdownDataWithFacilityNumber("#ddlFacility", "#FacilityNumber");
    $.getJSON("/GlobalCode/GetFacilitiesDropdownDataWithFacilityNumber", {}, function (data) {
        BindDropdownData(data, "#ddlFacility", "#FacilityNumber");
    });


    $("#ddlFacility").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue > 0) {
            GetDetailsByFacilityNumber(selectedValue);
        }
    });
});

function SaveSecurityParameters() {

    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }
    var formData = $("#form1").serializeArray();
    $.post("/GlobalCode/SaveSecurityParameters", formData, function (data) {
        if (data != null && data > 0) {
            $.validationEngine.closePrompt(".formError", true);
            var msg = "Record Saved successfully !";
            if ($("#GlobalCodeValue").val() > 0)
                msg = "Record updated successfully";
            ShowMessage(msg, "Success", "success", true);
            $("#btnSave").val("Save");
            $('#globalCodeForm').clearForm(false);
            return true;
        }
        else
            ShowMessage("Failed to save the Security Parameters", "Alert", "warning", true);
        return false;
    });
    return false;
}

function GetDetailsByFacilityNumber(selectedValue) {
    if (selectedValue != null && selectedValue != '') {
        $.post("/GlobalCode/GetDetailsByFacilityNumber", { category: category, facilityNumber: selectedValue }, function (data) {
            BindDetails(data);
        });
    }
}
function ClearGenericForm() {
    $("#btnSave").val("Save");
    $('#globalCodeForm').clearForm(false);
}
function BindDetails(data) {
    if (data != null) {
        
        $("#FacilityNumber").val(data.FacilityNumber);
        $("#IsDeleted").val(data.IsDeleted);
        $("#GlobalCodeID").val(data.GlobalCodeID);

        $("#GlobalCodeValue").val(data.GlobalCodeValue);

        $("#GlobalCodeCategoryValue").val(data.GlobalCodeCategoryValue);

        $("#GlobalCodeName").val(data.GlobalCodeName);

        if ($("#ExternalValue1").length > 0)
            $("#ExternalValue1").val(data.ExternalValue1);

        if ($("#ExternalValue2").length > 0)
            $("#ExternalValue2").val(data.ExternalValue2);

        if ($("#ExternalValue3").length > 0)
            $("#ExternalValue3").val(data.ExternalValue3);

        if ($("#ExternalValue4").length > 0)
            $("#ExternalValue4").val(data.ExternalValue4);

        if ($("#ExternalValue5").length > 0)
            $("#ExternalValue5").val(data.ExternalValue5);

        if ($("#ExternalValue6").length > 0)
            $("#ExternalValue6").val(data.ExternalValue6);

        $("#IsActive").prop("checked", data.IsActive);
        $("#btnSave").val("Update");
    } else {
        $('#globalCodeForm').clearForm(false);
    }
}