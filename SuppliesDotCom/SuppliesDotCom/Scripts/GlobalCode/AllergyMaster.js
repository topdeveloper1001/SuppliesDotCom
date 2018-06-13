$(function () {
    $("#AllergyAddEditFormDiv").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });

    BindAllergyCategories("#ddlAllergyCategories", "#hdAllergyCategoryValue");
});

function CheckDuplicateRecord() {
    var name = $("#txtAllergryName").val().trim();
    var globalCodeCategory = $("#ddlAllergyCategories").val();
    var globalCodeId = $("#hdAllergyId").val();
    if (globalCodeId == '')
        globalCodeId = 0;

    var isValid = jQuery("#AllergyAddEditFormDiv").validationEngine({ returnIsValid: true });
    if (isValid) {
        var jsonData = JSON.stringify({
            GlobalCodeName: name,
            GlobalCodeId: globalCodeId,
            GlobalCodeCategoryValue: globalCodeCategory
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/GlobalCode/CheckDuplicateSubCategory",
            data: jsonData,
            dataType: "",
            beforeSend: function () { },
            success: function (data) {
                //Append Data to grid
                if (data) {
                    ShowMessage("Allergy already exists. Try adding with different name!", "Alert", "info", true);
                }
                else {
                    AddAlergy();
                    return true;
                }
            },
            error: function (msg) {
            }
        });
        return false;
    }
    else {
        AddAlergy();
    }
    return false;
}

function AddAlergy() {
    var isValid = jQuery("#AllergyAddEditFormDiv").validationEngine({ returnIsValid: true });
    if (isValid) {

        var globalCodeId = $("#hdAllergyId").val();
        var globalCodeCategory = $("#ddlAllergyCategories").val();
        var name = $("#txtAllergryName").val().trim();
        var description = $("#txtDescription").val().trim();
        var isActive = false;
        var globalCodeValue = $("#hdGlobalCodeValue").val();
        if ($('#chkIsActive').is(':checked'))
            isActive = true;

        var jsonData = JSON.stringify({
            GlobalCodeID: globalCodeId,
            GlobalCodeCategoryValue: globalCodeCategory,
            //GlobalCodeCategoryValue: globalCodeCategory,
            GlobalCodeName: name,
            Description: description,
            FacilityNumber: 0,
            GlobalCodeValue: globalCodeValue,     //to be changed later
            IsActive: isActive,
            IsDeleted: false
        });
        var msg = "";
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/GlobalCode/AddUpdateGlobalCode",
            data: jsonData,
            dataType: "html",
            beforeSend: function () { },
            success: function (data) {
                //Append Data to grid
                if (data != null) {
                    ClearAllergyFields();
                    msg = "Record Saved successfully !";
                    if (globalCodeId > 0)
                        msg = "Record updated successfully";

                    ShowMessage(msg, "Success", "success", true);
                }
            },
            error: function (msg) {

            }
        });
    }
    else {
        return false;
    }
}

function EditCurrentAllergy(globalCodeId) {
    if (globalCodeId > 0) {
        var jsonData = JSON.stringify({ id: globalCodeId });
        $.ajax({
            type: "POST",
            url: '/GlobalCode/GetCurrentAllergy',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data != null) {
                    $("#AllergyAddEditFormDiv").html(data);
                    BindAllergyCategories("#ddlAllergyCategories", "#hdAllergyCategoryValue");
                    $("#AllergyAddEditFormDiv").validationEngine();
                    $('#collapseAllergyMasterAddEdit').addClass('in');
                }
            },
            error: function (msg) {
            }
        });
    }
}

function DeleteAllergyRecord() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var url = '/GlobalCode/DeleteOrderSubCategory';
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
                    ShowMessage("Record deleted successfully", "Alert", "info", true);
                    ClearAllergyFields();
                }
                else {
                }
            },
            error: function (msg) {
            }
        });
    }
}

//function DeleteAllergyRecord(id) {
//    if (confirm("Do you want to delete Allergy?")) {
//        var url = '/GlobalCode/DeleteOrderSubCategory';
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
//                    ShowMessage("Record deleted successfully", "Alert", "info", true);
//                    ClearAllergyFields();
//                }
//                else {
//                }
//            },
//            error: function (msg) {
//            }
//        });
//    }
//    else {
//        return false;
//    }
//}

//Bind Dropdown Data of Order Type Categories
function BindAllergyCategories(ddlSelector, hdSelector) {
    var jsonData = JSON.stringify({
        startRange: "8101",
        endRange: "8999"
    });
    $.ajax({
        type: "POST",
        url: '/Home/GetGlobalCodeCategories',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $(ddlSelector).empty();
            var items = '<option value="0">--Select--</option>';
            $.each(data, function (i, gcc) {
                items += "<option value='" + gcc.GlobalCodeCategoryValue + "'>" + gcc.GlobalCodeCategoryName + "</option>";
            });

            $(ddlSelector).html(items);

            var hdValue = $(hdSelector).val();
            if (hdValue != null && hdValue != '') {
                $(ddlSelector).val(hdValue);
            }
        },
        error: function (msg) {
        }
    });
}

function ClearAllergyFields() {
    $("#AllergyAddEditFormDiv").clearForm();
    $('#collapseAllergyMasterAddEdit').removeClass('in');
    $.ajax({
        type: "POST",
        url: "/GlobalCode/ResetAllergyForm",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#AllergyAddEditFormDiv").empty();
            $("#AllergyAddEditFormDiv").html(data);
            BindAllergyCategories("#ddlAllergyCategories", "#hdAllergyCategoryValue");
            $('#collapseAllergyMasterListDiv').addClass('in');
            $.validationEngine.closePrompt(".formError", true);
            BindAllergyList();
        },
        error: function (msg) {
        }
    });
}


function BindAllergyList() {
    $.ajax({
        type: "POST",
        url: "/GlobalCode/BindAllergyList",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            BindList("#AllergyMasterListDiv", data);
        },
        error: function (msg) {
        }
    });
}


function OnChangeAllergyCategory(ddlselector) {
    var value = $(ddlselector).val();
    if (value != '' && value > 0) {
        $.ajax({
            type: "POST",
            url: "/Home/GetMaxGlobalCodeValueByCategory",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ categoryValue: value }),
            success: function (data) {
                $("#hdGlobalCodeValue").val(data + 1);
            },
            error: function (msg) {
            }
        });
    }
}