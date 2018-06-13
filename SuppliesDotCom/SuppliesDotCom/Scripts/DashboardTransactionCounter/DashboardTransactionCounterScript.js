$(function () {
    $("#DashboardTransactionCounterFormDiv").validationEngine();
    GetDashBoardCounterData();
});


var GetDashBoardCounterData = function () {
    BindGlobalCodesWithValue('#ddlStatisticDescription', 3110, '#hdStatisticDescription');
    InitializeDateTimePicker();
};


function SaveDashboardTransactionCounter(id) {
    var isValid = jQuery("#DashboardTransactionCounterFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtCounterId = $("#hdDashbordCounterId").val();;
        var txtStatisticDescription = $("#ddlStatisticDescription").val();
        var dtActivityDay = $("#dtActivityDay").val();
        var txtActivityTotal = $("#txtActivityTotal").val();
        var txtDepartmentNumber = $("#txtDepartmentNumber").val();
        var isActive;
        if ($('#chkActive').is(':checked'))
            isActive = true;
        else
            isActive = false;
        var jsonData = JSON.stringify({
            CounterId: txtCounterId,
            StatisticDescription: txtStatisticDescription,
            ActivityDay: dtActivityDay,
            ActivityTotal: txtActivityTotal,
            DepartmentNumber: txtDepartmentNumber,
            IsActive: isActive,
        });
        $.ajax({
            type: "POST",
            url: '/DashboardTransactionCounter/SaveDashboardTransactionCounter',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function(data) {
                ClearAll();
                BindDashboardTransactionCounterGrid();

                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";

                ShowMessage(msg, "Success", "success", true);
            },
            error: function(msg) {

            }
        });
    }
}

function EditDashboardTransactionCounter(id) {
    var jsonData = JSON.stringify({
        Id: id
    });
    $.ajax({
        type: "POST",
        url: '/DashboardTransactionCounter/BindDashboardData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            //$('#DashboardTransactionCounterFormDiv').empty();
            //$('#DashboardTransactionCounterFormDiv').html(data);
            //$('#collapseDashboardTransactionCounterAddEdit').addClass('in');
            //$("#DashboardTransactionCounterFormDiv").validationEngine();
            //GetDashBoardCounterData();
            BindDashboardCounterData(data);
        },
        error: function (msg) {

        }
    });
}

function BindDashboardCounterData(data) {
    $("#hdDashbordCounterId").val(data.CounterId);
    $("#ddlStatisticDescription").val(data.StatisticDescription);
    $("#dtActivityDay").val(data.ActivityDay);
    $("#txtActivityTotal").val(data.ActivityTotal);
    $("#txtDepartmentNumber").val(data.DepartmentNumber);
    $("#chkActive").prop('checked',data.IsActive);
    $('#collapseDashboardTransactionCounterAddEdit').addClass('in').attr('style', 'height:auto;');
}


function DeleteDashboardTransactionCounter() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            Id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/DashboardTransactionCounter/DeleteDashboardTransactionCounter',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data) {
                    BindDashboardTransactionCounterGrid();
                    ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
                }
                else {
                    return false;
                }
            },
            error: function (msg) {
                return true;
            }
        });

    }
}

//function DeleteDashboardTransactionCounter(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var txtDashboardTransactionCounterId = id;
//        var jsonData = JSON.stringify({
//            Id: id
//        });
//        $.ajax({
//            type: "POST",
//            url: '/DashboardTransactionCounter/DeleteDashboardTransactionCounter',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data) {
//                    BindDashboardTransactionCounterGrid();
//                    ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
//                }
//                else {
//                    return false;
//                }
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}

function BindDashboardTransactionCounterGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/DashboardTransactionCounter/BindDashboardTransactionCounterList",
        dataType: "html",
        async: true,
        data: null,
        success: function (data) {
            $("#DashboardTransactionCounterListDiv").empty();
            $("#DashboardTransactionCounterListDiv").html(data);
        },
        error: function (msg) {

        }

    });
}

function ClearForm() {
    
}

function ClearAll() {
    $("#DashboardTransactionCounterFormDiv").clearForm();
    $('#collapseDashboardTransactionCounterAddEdit').removeClass('in');
    $('#collapseDashboardTransactionCounterList').addClass('in');
    $("#DashboardTransactionCounterFormDiv").validationEngine();
    $.validationEngine.closePrompt(".formError", true);
    $('.emptyddl').val('0');
    $('.emptytxt').val('');
    $("#hdDashbordCounterId").val('0');
}


function SortDashboardTransactionCounterGrid(event) {
    var url = "/DashboardTransactionCounter/SortDashboardTrasData";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?" + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#DashboardTransactionCounterListDiv").empty();
            $("#DashboardTransactionCounterListDiv").html(data);

        },
        error: function (msg) {
        }
    });
}


