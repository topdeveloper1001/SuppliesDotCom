$(function () {
    BindAll();
});

function BindAll() {
    BindCorporates();
    BindFacilities();
    $("#ErrorMasterFormDiv").validationEngine();
    InitializeDateTimePicker();
    BindGlobalCodesWithValue("#ddlErrorTypes", 1010, "#hdErrorType");
    $('#chkShowInActive').change(function () {
        BindErrorMasterGrid();
    });
}

function SaveErrorMaster() {
    var isValid = jQuery("#ErrorMasterFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var id = $("#hdErrorMasterID").val();
        var corporateId = $("#ddlCorporates").val();
        var facilityID = $("#ddlFacilities").val();
        var txtErrorCode = $("#txtErrorCode").val();
        var txtErrorType = $("#ddlErrorTypes").val();
        var txtErrorDescription = $("#txtErrorDescription").val();
        var txtErrorResolution = $("#txtErrorResolution").val();
        var txtExtValue1 = $("#txtExtValue1").val();
        var isActive = $("#chkIsActive")[0].checked;

        var jsonData = JSON.stringify({
            ErrorMasterID: id,
            CorporateID: corporateId,
            FacilityID: facilityID,
            ErrorCode: txtErrorCode,
            ErrorType: txtErrorType,
            ErrorDescription: txtErrorDescription,
            ErrorResolution: txtErrorResolution,
            ExtValue1: txtExtValue1,
            IsActive: isActive
        });

        $.ajax({
            type: "POST",
            url: '/ErrorMaster/SaveErrorMaster',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                ClearAll();
                var msg = "Records Saved successfully !";
                if (id > 0) {
                    msg = "Records updated successfully";
                    $('#btnUpdate').val('Save');
                    $('#btnUpdate').attr('onclick', 'return SaveErrorMaster("0");');
                }
                ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {

            }
        });
    }
}

function EditErrorMaster(id) {
    
    var jsonData = JSON.stringify({
        ErrorMasterID: id
    });
    $.ajax({
        type: "POST",
        url: '/ErrorMaster/GetErrorMaster',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
          
            $('#ErrorMasterFormDiv').empty();
            $('#ErrorMasterFormDiv').html(data);
            BindAll();
            $('#collapseErrorMasterAddEdit').addClass('in');
            $("#ErrorMasterFormDiv").validationEngine();
            $('#BtnSave').val('Update');
            BindGlobalCodesWithValue("#ddlErrorTypes", 1010, "#hdErrorType");
        },
        error: function (msg) {

        }
    });
}

function DeleteErrorMaster() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            ErrorMasterID: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/ErrorMaster/DeleteErrorMaster',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindErrorMasterGrid();
                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
            },
            error: function (msg) {
            }
        });
    }
}

//function DeleteErrorMaster(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var jsonData = JSON.stringify({
//            ErrorMasterID: id
//        });
//        $.ajax({
//            type: "POST",
//            url: '/ErrorMaster/DeleteErrorMaster',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                BindErrorMasterGrid();
//                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
//            },
//            error: function (msg) {
//            }
//        });
//    }
//}

function BindErrorMasterGrid() {
    
    $.validationEngine.closePrompt(".formError", true);
    var showInActive = $("#chkShowInActive").prop("checked");
    var jsonData = JSON.stringify({
        showInActive: showInActive
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/ErrorMaster/BindErrorMasterList",
        dataType: "html",
        async: true,
        data: jsonData,
        success: function (data) {
            $("#ErrorMasterListDiv").empty();
            $("#ErrorMasterListDiv").html(data);
            //SetGridPaging('?' + '?showInActive=' + showInActive+'&');
        },
        error: function (msg) {
        }

    });
}

function ClearAll() {
    

    $("#ErrorMasterFormDiv").clearForm();
    $("#hdErrorMasterID").val(0);
    ResetAllDropdowns("#ErrorMasterFormDiv");
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseErrorMasterAddEdit').removeClass('in');
    $('#collapseErrorMasterList').addClass('in');
    //BindAll();

    $('#chkIsActive').prop('checked', true);
    $('#btnUpdate').val('Save');
    $('#btnUpdate').attr('onclick', 'return SaveErrorMaster("0");');
    BindErrorMasterGrid();
    //$.ajax({
    //    type: "POST",
    //    url: '/ErrorMaster/ResetErrorMasterForm',
    //    async: false,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "html",
    //    data: null,
    //    success: function (data) {

    //    },
    //    error: function (msg) {
    //    }
    //});
}

function BindCorporates() {
    $.ajax({
        type: "POST",
        url: '/Home/GetCorporatesDropdownData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, "#ddlCorporates", "#hdCorporateID");
        },
        error: function (msg) {
        }
    });
}

function BindFacilities() {
    $.ajax({
        type: "POST",
        url: '/Home/GetFacilitiesDropdownData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, "#ddlFacilities", "#hdFacilityID");
        },
        error: function (msg) {
        }
    });
}

/*--------------Sort Error Master List Grid--------By krishna on 08092015---------*/
function SortErrorMasterGrid(event) {
    var url = "/ErrorMaster/BindErrorMasterList";
    var showInActive = $("#chkShowInActive").prop("checked");
    //showInActive = showInActive;
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?showInActive=" + showInActive +  "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#ErrorMasterListDiv").empty();
            $("#ErrorMasterListDiv").html(data);

        },
        error: function (msg) {
        }
    });
}