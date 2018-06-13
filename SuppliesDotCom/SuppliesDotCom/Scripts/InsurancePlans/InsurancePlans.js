$(function () {
    $("#InsurancePlansFormDiv").validationEngine();
    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });
    BindInsuranceCompany('');
});

function ValidatePlanNamePlanNumber(id) {
    var isValid = jQuery("#InsurancePlansFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtPlanName = $("#txtPlanName").val();
        var txtPlanNumber = $("#txtPlanNumber").val();
        var jsonData = JSON.stringify({
            planName: txtPlanName,
            planNumber: txtPlanNumber,
            id: id,
            insuranceCompanyId: $("#ddlInsuranceCompany").val()
        });
        $.ajax({
            type: "POST",
            url: '/InsurancePlans/ValidatePlanNamePlanNumber',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                var msg = '';
                switch (data) {
                    case 1:
                        msg = "Insurance Plan Name and Number are already taken for this Insurance Company. Change the Selections and try again!!";
                        break;
                    case 2:
                        msg = "Insurance Plan Name is already taken for this Insurance Company. Change the Selections and try again!";
                        break;
                    case 3:
                        msg = "Insurance Plan Number is already taken for this Insurance Company. Change the Selections and try again!";
                        break;
                    default:
                        SaveInsurancePlans(id);
                }
                if (msg != '')
                    ShowMessage(msg, "Alert", "warning", true);
            },
            error: function (msg) {
            }
        });
    }
}

function SaveInsurancePlans(Id) {
    var isValid = jQuery("#InsurancePlansFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var insuranceCompanyId = $("#ddlInsuranceCompany").val();
        var txtPlanName = $("#txtPlanName").val();
        var txtPlanNumber = $("#txtPlanNumber").val();
        var dtPlanBeginDate = $("#dtPlanBeginDate").val();
        var dtPlanEndDate = $("#dtPlanEndDate").val();
        var txtPlanDescription = $("#txtPlanDescription").val();

        var jsonData = JSON.stringify({
            InsurancePlanId: Id,
            InsuranceCompanyId: insuranceCompanyId,
            PlanName: txtPlanName,
            PlanNumber: txtPlanNumber,
            PlanBeginDate: dtPlanBeginDate,
            PlanEndDate: dtPlanEndDate,
            PlanDescription: txtPlanDescription,
            IsActive: $("#chkIsActive")[0].checked
        });
        $.ajax({
            type: "POST",
            url: '/InsurancePlans/SaveInsurancePlans',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                ClearInsurancePlanForm();

                var msg = "Records Saved successfully !";
                if (Id > 0)
                    msg = "Records updated successfully";

                ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {

            }
        });
    }
}

function editDetails(e) {

    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.InsurancePlanId;
    EditInsurancePlans(id);

}

function deleteDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.InsurancePlanId;
    DeleteInsurancePlans(id);
}

function EditInsurancePlans(id) {
    var txtInsurancePlanId = id;
    var jsonData = JSON.stringify({
        Id: txtInsurancePlanId
    });
    $.ajax({
        type: "POST",
        url: '/InsurancePlans/GetInsurancePlanById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#InsurancePlansFormDiv').empty();
            $('#InsurancePlansFormDiv').html(data);
            var companyId = $("#hdInsuranceCompanyId").val();
            $('#collapseOne').addClass('in');
            $("#InsurancePlansFormDiv").validationEngine();
            $(".collapseTitle").bind("click", function () {
                $.validationEngine.closePrompt(".formError", true);
            });
            BindInsuranceCompany(companyId);

            InitializeDateTimePicker();//initialize the datepicker by ashwani
        },
        error: function (msg) {

        }
    });
}

function ViewInsurancePlans(id) {

    var txtServiceCodeId = id;
    var jsonData = JSON.stringify({
        Id: txtServiceCodeId,
        ViewOnly: 'true'
    });
    $.ajax({
        type: "POST",
        url: '/ServiceCode/GetServiceCode',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {

            if (data) {
                $('#serviceCodeDiv').empty();
                $('#serviceCodeDiv').html(data);
                $('#collapseOne').addClass('in');
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function DeleteInsurancePlans() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var txtInsurancePlanId = $("#hfGlobalConfirmId").val();
        var jsonData = JSON.stringify({
            id: txtInsurancePlanId,
            ModifiedBy: 1,//Put logged in user id here
            ModifiedDate: new Date(),
            IsDeleted: true,
            DeletedBy: 1,//Put logged in user id here
            DeletedDate: new Date(),
            IsActive: false
        });
        $.ajax({
            type: "POST",
            url: '/InsurancePlans/DeleteInsurancePlans',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data) {
                    if (data == "-1") {
                        ShowMessage("Cannot Continue since this Insurance Plans contains Policies !!", "Warning", "warning", true);
                        return false;

                    }
                    BindInsurancePlansGrid();
                    ShowMessage("Records Deleted Successfully", "Success", "success", true);
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

function BindInsurancePlansGrid() {
    var active = $("#chkShowInActive").is(':checked');
    var isActive = active == true ? false : true;
    var jsonData = JSON.stringify({
        showIsActive: isActive
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/InsurancePlans/BindInsurancePlansList",
        dataType: "html",
        async: true,
        data: jsonData,
        success: function (data) {
            $("#InsurancePlansListDiv").empty();
            $("#InsurancePlansListDiv").html(data);
        },
        error: function (msg) {

        }
    });
}

function ClearInsurancePlanForm() {
    $("#InsurancePlansFormDiv").clearForm();
    BindInsurancePlansGrid();
    InitializeDateTimePicker();
    $("#btnAddUpdatePlan").val('Save');
    $("#chkIsActive").prop('checked', true);
}


function BindInsuranceCompany(companyId) {
    //Bind Countries
    $.ajax({
        type: "POST",
        url: "/InsurancePlans/GetInsuranceCompanies",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            var items = '<option value="0">--Select--</option>';
            $.each(data, function (i, main) {
                items += "<option value='" + main.InsuranceCompanyId + "'>" + main.InsuranceCompanyName + "</option>";
            });
            $("#ddlInsuranceCompany").html(items);

            if (companyId != '') {
                $("#ddlInsuranceCompany").val(companyId);
            }
        },
        error: function (msg) {
        }
    });
}

function ShowInActiveRecordsOfInsurancePlan(chkSelector) {
    var active = $(chkSelector)[0].checked;
    var isActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/InsurancePlans/BindInsurancePlansList",
        data: JSON.stringify({ showIsActive: isActive }),
        dataType: "html",
        success: function (data) {

            if (data != null) {
                $("#InsurancePlansListDiv").empty();
                $("#InsurancePlansListDiv").html(data);
            }
        },
        error: function (msg) {

        }
    });
}

function SortInsurancePlanGrid(event) {
    var active = $("#chkShowInActive").is(':checked');
    var showInActive = active == true ? false : true;
    var url = "/InsurancePlans/BindInsurancePlansList";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?showIsActive=" + showInActive + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#InsurancePlansListDiv").empty();
            $("#InsurancePlansListDiv").html(data);
        },
        error: function () {
        }
    });
}