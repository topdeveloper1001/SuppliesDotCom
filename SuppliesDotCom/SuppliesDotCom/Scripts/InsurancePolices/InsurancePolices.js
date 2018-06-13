$(function () {
    $("#InsurancePolicesFormDiv").validationEngine();
    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });
    GetManageCareContracts();
    BindInsuranceCompany('');

    $("#ddlInsuranceCompanyPlan").change(function () {
        if ($(this).val() > 0) {
            $("#InsurancePlanId").val($(this).val());
        }
    });

    $("#ddlMcContracts").change(function () {
        if ($(this).val() > 0) {
            $("#McContractCode").val($(this).val());
        }
    });

    $("#ddlInsuranceCompany").change(function () {
        if ($(this).val() > 0) {
            $("#InsuranceCompanyId").val($(this).val());
            BindInsurancePlan($(this).val(), "#InsurancePlanId");
        } else {
            var item = '<option value="0">--Select--</option>';
            $("#ddlInsuranceCompanyPlan").html(item);
        }
        });
});

function ValidatePolicyNamePolicyNumber(id) {
    var isValid = jQuery("#InsurancePolicesFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var formData = {
            policyName: $("#PolicyName").val(),
            policyNumber: $("#PolicyNumber").val(),
            id: $("#InsurancePolicyId").val(),
            insuranceCompanyId: $("#ddlInsuranceCompany").val(),
            planId: $("#ddlInsuranceCompanyPlan").val(),
        };
        $.post("/InsurancePolices/ValidatePolicyNamePolicyNumber", formData, function (data) {
            if (data == 1) { //1 means Policy name and Plan number matched
                ShowMessage('Policy name and Policy number is already used. Please change!', "Alert", "warning", true);
            } else if (data == 2) //2 means Policy name  matched
            {
                ShowMessage('Policy Name is already used. Please change!', "Alert", "warning", true);
            } else if (data == 3) { //3 means Policy number matched
                ShowMessage('Policy number is already used. Please change!', "Alert", "warning", true);
            } else {
                SaveInsurancePolices(id);
            }
            return false;
        });
    }
    return false;
}

function SaveInsurancePolices() {
    var isValid = jQuery("#InsurancePolicesFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var formData = $("#form1").serializeArray();
        $.post("/InsurancePolices/SaveInsurancePolices", formData, function (data) {
            ClearInsurancePolicyForm();
            BindList("#InsurancePolicesListDiv", data);
            var msg = "Records Saved successfully !";
            if ($("#InsurancePolicyId").val() > 0)
                msg = "Records updated successfully";
            ShowMessage(msg, "Success", "success", true);
            return false;
        });
    }
    return false;
}

function EditInsurancePolices(id) {
    $.post("/InsurancePolices/GetInsurancePolicesById", { id: id }, function (data) {
        BindInsurancePolicyDetails(data);
        $("#InsurancePolicesFormDiv").validationEngine();
        $('#collapseOne').addClass('in');
        InitializeDateTimePicker();
        return false;
    });
    return false;
}

function DeleteInsurancePolices() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        $.post("/InsurancePolices/DeleteInsurancePolices", { policyId: $("#hfGlobalConfirmId").val() }, function (data) {
            if (data != null && data.length > 0) {
                BindList("#InsurancePolicesListDiv", data);
                ShowMessage("Records Deleted Successfully", "Success", "success", true);
            }
            return false;
        });
    }
}

//function DeleteInsurancePolices(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        $.post("/InsurancePolices/DeleteInsurancePolices", { policyId: id }, function (data) {
//            if (data != null && data.length > 0) {
//                BindList("#InsurancePolicesListDiv", data);
//                ShowMessage("Records Deleted Successfully", "Success", "success", true);
//            }
//            return false;
//        });
//    }
//    return false;
//}

function ClearInsurancePolicyForm() {
    $("#InsurancePolicesFormDiv").clearForm(true);
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
    $.validationEngine.closePrompt(".formError", true);
    $("#btnSave").text("Save");
    $("#InsurancePolicyId").val('0');
    return false;
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
                BindInsurancePlan(companyId, "#InsurancePlanId");
            } else {
                var item = '<option value="0">--Select--</option>';
                $("#ddlInsuranceCompanyPlan").html(item);
            }
        },
        error: function (msg) {
        }
    });
    return false;
}

function BindInsurancePlan(insuranceCompanyId, planId) {
    $.post("/InsurancePolices/GetInsurancePlanByCompany", { companyId: insuranceCompanyId }, function (data) {
        BindDropdownData(data, "#ddlInsuranceCompanyPlan", planId);
        if ($("#ddlInsuranceCompanyPlan").val() == null)
            $("#ddlInsuranceCompanyPlan").val("0");
    });
}

function GetManageCareContracts() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/McContract/GetMcContracts",
        data: null,
        dataType: "json",
        success: function (data) {
            $("#ddlMcContracts").empty();
            $("#ddlMcContracts").append('<option value="0">--Select One--</option>');
            $.each(data, function (i, code) {
                $("#ddlMcContracts").append('<option value="' + code.MCCode + '">' + code.ModelName + '</option>');
            });
            if ($('#McContractCode') != null && $('#McContractCode').val() != "0") {
                $("#ddlInsuranceCompanyPlan").val($('#McContractCode').val());
            }
        },
        error: function (msg) {
            // Console.log(msg);
        }
    });
    return false;
};

function BindInsurancePolicyDetails(data) {
    $("#InsurancePolicyId").val(data.InsurancePolicyId);
    $("#InsuranceCompanyId").val(data.InsuranceCompanyId);
    $("#ddlInsuranceCompany").val(data.InsuranceCompanyId);
    $("#InsurancePlanId").val(data.InsurancePlanId);
    if (data.InsurancePlanId > 0 && data.InsuranceCompanyId > 0) {
        BindInsurancePlan(data.InsuranceCompanyId, "#InsurancePlanId");
    }

    $("#PolicyName").val(data.PolicyName);
    $("#PolicyNumber").val(data.PolicyNumber);
    $("#McContractCode").val(data.McContractCode);
    $("#ddlMcContracts").val(data.McContractCode);
    $("#PolicyHolderName").val(data.PolicyHolderName);
    $("#PolicyDescription").val(data.PolicyDescription);
    $("#PolicyBeginDate").val(data.PolicyBeginDate);
    $("#PolicyEndDate").val(data.PolicyEndDate);
    $("#btnSave").text("Update");
}

function SortInsurancePoliceGrid(event) {
   var url = "/InsurancePolices/GetInsurancePoliceData";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?" +  "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            BindList("#InsurancePolicesListDiv", data);
        },
        error: function () {
        }
    });
}