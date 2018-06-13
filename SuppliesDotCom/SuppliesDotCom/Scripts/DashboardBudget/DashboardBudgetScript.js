$(function () {
    $("#DashboardBudgetFormDiv").validationEngine();
    GetDashBoardBudgetData();
});

var GetDashBoardBudgetData = function() {
    BindGlobalCodesWithValue('#ddlBudgetType', 3112, '#hdBudgetType');
    BindFiscalYearDDl('#ddlFiscalYear', '#hdFiscalYear');
    BindGlobalCodesWithValue('#ddlBudgetFor', 3119, '#hdBudgetFor');
    $("#ddlFiscalYear").get(0).selectedIndex = 0;

};



function SaveDashboardBudget(id) {
    var isValid = jQuery("#DashboardBudgetFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtBudgetId = id;
        var txtBudgetType = $("#ddlBudgetType").val();
        var txtBudgetFor = $("#ddlBudgetFor").val();
        var txtBudgetDescription = $("#txtBudgetDescription").val();
        var txtDepartmentNumber = $("#txtDepartmentNumber").val();
        var txtFiscalYear = $("#ddlFiscalYear").val();
        var txtJanuaryBudget = $("#txtJanuaryBudget").val();
        var txtFebruaryBudget = $("#txtFebruaryBudget").val();
        var txtMarchBudget = $("#txtMarchBudget").val();
        var txtAprilBudget = $("#txtAprilBudget").val();
        var txtMayBudget = $("#txtMayBudget").val();
        var txtJuneBudget = $("#txtJuneBudget").val();
        var txtJulyBudget = $("#txtJulyBudget").val();
        var txtAugustBudget = $("#txtAugustBudget").val();
        var txtSeptemberBudget = $("#txtSeptemberBudget").val();
        var txtOctoberBudget = $("#txtOctoberBudget").val();
        var txtNovemberBudget = $("#txtNovemberBudget").val();
        var txtDecemberBudget = $("#txtDecemberBudget").val();
        var isActive;
        if ($('#chkActive').is(':checked'))
            isActive = true;
        else
            isActive = false;
        var jsonData = JSON.stringify({
            BudgetId: txtBudgetId,
            BudgetType: txtBudgetType,
            BudgetDescription: txtBudgetDescription,
            DepartmentNumber: txtDepartmentNumber,
            FiscalYear: txtFiscalYear,
            JanuaryBudget: txtJanuaryBudget,
            FebruaryBudget: txtFebruaryBudget,
            MarchBudget: txtMarchBudget,
            AprilBudget: txtAprilBudget,
            MayBudget: txtMayBudget,
            JuneBudget: txtJuneBudget,
            JulyBudget: txtJulyBudget,
            AugustBudget: txtAugustBudget,
            SeptemberBudget: txtSeptemberBudget,
            OctoberBudget: txtOctoberBudget,
            NovemberBudget: txtNovemberBudget,
            DecemberBudget: txtDecemberBudget,
            IsActive: isActive,
            BudgetFor: txtBudgetFor
        });
        $.ajax({
            type: "POST",
            url: '/DashboardBudget/SaveDashboardBudget',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function(data) {
                ClearAll();
                BindDashboardBudgetGrid();
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

function EditDashboardBudget(id) {
    var jsonData = JSON.stringify({
        Id: id
    });
    $.ajax({
        type: "POST",
        url: '/DashboardBudget/GetDashBoardBudgetData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindDashboardData(data);
            //$('#DashboardBudgetFormDiv').empty();
            //$('#DashboardBudgetFormDiv').html(data);
            //$('#collapseDashboardBudgetAddEdit').addClass('in');
            $("#DashboardBudgetFormDiv").validationEngine();
            //GetDashBoardBudgetData();
        },
        error: function (msg) {

        }
    });
}


function DeleteDashboardBudget() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            Id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/DashboardBudget/DeleteDashboardBudget',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data) {
                    BindDashboardBudgetGrid();
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


function BindDashboardBudgetGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/DashboardBudget/BindDashboardBudgetList",
        dataType: "html",
        async: true,
        data: null,
        success: function (data) {
            $("#DashboardBudgetListDiv").empty();
            $("#DashboardBudgetListDiv").html(data);
        },
        error: function (msg) {

        }

    });
}

function ClearForm() {
    
}

function ClearAll() {
    $("#DashboardBudgetFormDiv").clearForm(true);
    $('#collapseDashboardBudgetAddEdit').removeClass('in');
    $('#collapseDashboardBudgetList').addClass('in');
    $("#DashboardBudgetFormDiv").validationEngine();
    $.validationEngine.closePrompt(".formError", true);
    $('.emptyddl').val('0');
    $('.emptytxt').val('');
    $('#btnSave').attr('onclick', 'return SaveDashboardBudget("0")');
    $('#btnUpdate').attr('onclick', 'return SaveDashboardBudget("0")');
    $('#btnUpdate').val('save');
    $("#ddlFiscalYear").empty();
    $("#hdBudgetType").val('');
    BindFiscalYearDDl('#ddlFiscalYear', '#hdFiscalYear');
    $("#ddlFiscalYear").get(0).selectedIndex = 0;

    //BindDashboardBudgetGrid();
}


function SortDashboardBudgetGrid(event) {

    var url = "/DashboardBudget/BindDashboardBudgetList";
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
            $("#DashboardBudgetListDiv").empty();
            $("#DashboardBudgetListDiv").html(data);
            },
        error: function (msg) {
        }
    });
}



function BindDashboardData(data) {
    $("#hdBudgetType").val(data.BudgetId);
    $("#ddlBudgetType").val(data.BudgetType);
    $("#ddlBudgetFor").val(data.BudgetFor);
    $("#txtBudgetDescription").val(data.BudgetDescription);
    $("#txtDepartmentNumber").val(data.DepartmentNumber);
    $("#ddlFiscalYear").val(data.FiscalYear);
    $("#txtJanuaryBudget").val(data.JanuaryBudget);
    $("#txtFebruaryBudget").val(data.FebruaryBudget);
    $("#txtMarchBudget").val(data.MarchBudget);
    $("#txtAprilBudget").val(data.AprilBudget);
    $("#txtMayBudget").val(data.MayBudget);
    $("#txtJuneBudget").val(data.JuneBudget);
    $("#txtJulyBudget").val(data.JulyBudget);
    $("#txtAugustBudget").val(data.AugustBudget);
    $("#txtSeptemberBudget").val(data.SeptemberBudget);
    $("#txtOctoberBudget").val(data.OctoberBudget);
    $("#txtNovemberBudget").val(data.NovemberBudget);
    $("#txtDecemberBudget").val(data.DecemberBudget);
    $("#chkActive").prop('checked',data.IsActive);
    var year = data.FiscalYear;
    if ($("#ddlFiscalYear").val() == '' || $("#ddlFiscalYear").val() == null) {
        BindFiscalYearDDlInDashboardBudget("#ddlFiscalYear", "#hdFiscalYear", year);
        $("#ddlFiscalYear").val(data.FiscalYear);

    }



    $('#collapseDashboardBudgetAddEdit').addClass('in').attr('style', 'height:auto;');
}

var BindFiscalYearDDlInDashboardBudget = function (selector, selectedval, year) {
    $("#ddlFiscalYear").empty();
    var currentYear = year;
    $(selector).append(
            $("<option></option>")
            .attr("value", '0')
            .text("--Select--")
        );
    for (var i = 1; i <= 10; i++) {
        $(selector).append(
            $("<option></option>")
            .attr("value", currentYear)
            .text(currentYear)
        );
        currentYear++;
    }
    if (selectedval != '') {
        $(selector).val($(selectedval).val());
    } else {
        var currentdate = new Date();
        $(selector).val(currentdate.getFullYear().toString());
    }
};