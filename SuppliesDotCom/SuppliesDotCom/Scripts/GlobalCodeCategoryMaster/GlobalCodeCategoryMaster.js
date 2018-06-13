//Added by Ashwani

$(document).ready(function () {
    $("#validate").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });
});

function CheckDuplicateGlobalCodeCategory() {
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (isValid) {
        var globalCodeCategoryId = $("#hfGlobalCodeCategoryID").val();

        var globalCodeCategoryName = $("#GlobalCodeCategoryName").val().trim();
        var jsonData = JSON.stringify({
            GlobalCodeCategoryName: globalCodeCategoryName,
            GlobalCodeCategoryId: globalCodeCategoryId
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/GlobalCodeCategoryMaster/CheckDuplicateGlobalCodeCategoryName",
            data: jsonData,
            dataType: "",
            beforeSend: function () { },
            success: function (data) {
                //Append Data to grid
                if (data != 'False') {
                    ShowMessage("GlobalCode Category already exist!", "Alert", "info", true);
                }
                else {
                    AddGlobalCodeCategory();
                    return true;
                }
            },
            error: function (msg) {
            }
        });
        return false;
    }
}


function AddGlobalCodeCategory() {
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }

    var globalCodeCategoryId = $("#hfGlobalCodeCategoryID").val();

    var facilityNumber = $("#ddlFacility").val();
    var globalCodeCategoryValue = $("#GlobalCodeCategoryValue").val().trim();
    var globalCodeCategoryName = $("#GlobalCodeCategoryName").val().trim();


    var isActive;
    if ($('#chkActive').is(':checked'))
        isActive = true;
    else
        isActive = false;

    var jsonData = JSON.stringify({
        globalCodeCategoryId: globalCodeCategoryId, FacilityNumber: facilityNumber, GlobalCodeCategoryValue: globalCodeCategoryValue,
        GlobalCodeCategoryName: globalCodeCategoryName,
        IsActive: isActive, IsDeleted: false
    });
    var msg = "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCodeCategoryMaster/AddUpdateGlobalCodeCategory",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                BindGlobalCodeCategoryList();
                ClearFields();
                $('#collapseTwo').addClass('in');
                msg = "Record Saved successfully !";
                if (globalCodeCategoryId > 0)
                    msg = "Record updated successfully";

                ShowMessage(msg, "Success", "success", true);
            }
        },
        error: function (msg) {

        }
    });
    return false;
}


function BindGlobalCodeCategoryList() {
    $.ajax({
        type: "POST",
        url: '/GlobalCodeCategoryMaster/GetGlobalCodeCategoryList',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        //data: jsonData,
        success: function (data) {
            if (data) {
                $('#GlobalCodeCategoryList').empty();
                $('#GlobalCodeCategoryList').html(data);
                $('#collapseTwo').addClass('in');
            } else {
            }
        },
        error: function (msg) {
        }
    });
}

function EditGlobalCodeCategory(id) {
    var globalCodeCategoryId = id;
    var jsonData = JSON.stringify({ GlobalCodeCategoryId: globalCodeCategoryId });
    $.ajax({
        type: "POST",
        url: '/GlobalCodeCategoryMaster/EditGlobalCategoryCode',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                $('#GlobalCodeCategoryInfo').empty();
                $('#GlobalCodeCategoryInfo').html(data);
                $("#validate").validationEngine();
                $('#collapseOne').addClass('in');
            } else {
            }
        },
        error: function (msg) {
        }
    });
}

function DeleteGlobalCodeCategory() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var url = '/GlobalCodeCategoryMaster/DeleteGlobalCodeCategory';
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                globalCodeCategoryId: $("#hfGlobalConfirmId").val()
            }),
            success: function (data) {
                if (data != null) {
                    ShowMessage("GlobalCode Category deleted successfully", "Warning", "warning", true);
                    ClearFields();
                    $('#GlobalCodeCategoryList').empty();
                    $('#GlobalCodeCategoryList').html(data);
                    $('#collapseTwo').addClass('in');
                }
                else {
                }
            },
            error: function (msg) {
            }
        });
    }
}

//function DeleteGlobalCodeCategory(id) {
//    var globalCodeCategoryId = id;
//    if (confirm("Do you want to delete GlobalCode Category?")) {
//        //var data = { userId: User_ID };
//        var url = '/GlobalCodeCategoryMaster/DeleteGlobalCodeCategory';
//        $.ajax({
//            type: "POST",
//            url: url,
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: JSON.stringify({
//                globalCodeCategoryId: globalCodeCategoryId
//            }),
//            success: function (data) {
//                if (data != null) {
//                    ShowMessage("GlobalCode Category deleted successfully", "Warning", "warning", true);
//                    ClearFields();
//                    $('#GlobalCodeCategoryList').empty();
//                    $('#GlobalCodeCategoryList').html(data);
//                    $('#collapseTwo').addClass('in');
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






function ClearFields() {
    $('#GlobalCodeCategoryInfo').clearForm();
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseOne').removeClass('in');
    $.ajax({
        type: "POST",
        url: "/GlobalCodeCategoryMaster/ResetGlobalCodeCategoryForm",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#GlobalCodeCategoryInfo").empty();
            $("#GlobalCodeCategoryInfo").html(data);
            $('#collapseTwo').addClass('in');
        },
        error: function (msg) {
        }
    });
}



//function SortOrderTypeCategoriesList(event) {

//    var url = "/GlobalCodeCategoryMaster/GetGlobalCodeCategoryList";
//    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
//        url += "?" + "&" + event.data.msg;
//    }
//    $.ajax({
//        type: "POST",
//        url: url,
//        contentType: "application/json; charset=utf-8",
//        dataType: "html",
//        data: null,
//        success: function (data) {
//            $('#GlobalCodeCategoryList').empty();
//            $('#GlobalCodeCategoryList').html(data);
//            $('#collapseTwo').addClass('in');
//        },
//        error: function (msg) {
//        }
//    });

//    return false;
//}




