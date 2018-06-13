
function ReduceValidationNumber(id) {
    
    if ($("#" + id).val() != "") {
        if (CheckArray.indexOf(id) == -1) {
            totalvalidation = totalvalidation + 1;
            if (totalvalidation > -1) {
                $("#ValidatonIndicator").text(totalvalidation + " of 14" + " required fields completed.");
                CheckArray.push(id);
            }
        }
    }
    else {
        
        if (CheckArray.indexOf(id) != -1) {
            totalvalidation = totalvalidation - 1;
            $("#ValidatonIndicator").text(totalvalidation + " of 14" + " required fields completed.");
            CheckArray.splice(CheckArray.indexOf(id), 1);
        }
    }
}

$(document).ready(function () {
    $("#InsuranceCompanyLicenseNumberExpire").datepicker({
        yearRange: "-0:+20",
        changeMonth: true,
        changeYear: true
    });
});


function FaxChecks() {
    SelectCode('InsuranceCompanyFax', 'CompanyFaxCode', 'lblFax');
    ReduceValidationNumber('InsuranceCompanyFax');
}

function PhoneChecks() {
    SelectCode('InsuranceCompanyMainPhone', 'MainPhoneCode', 'lblcode1');
    ReduceValidationNumber('InsuranceCompanyMainPhone');
}
function PhoneChecks1() {
    SelectCode('InsuranceCompanyMainContactPhone', 'MainContactPhoneCode', 'lblcode3');
    ReduceValidationNumber('InsuranceCompanyMainContactPhone');
}

function CountryChecks() {
    HideAndShowStates('InsuranceCompanyCountry', 'InsuranceCompanyState', 'lblemirates', 'lblstate');
    ReduceValidationNumber('InsuranceCompanyCountry');
}

function SaveAsDraft() {
    $("#IsDrafted").val('true');
}

function GetAllRecords() {
    window.location.href = "/Admin/InsuranceCompany";
}

function CheckCompanyName() {
    $("#IsDrafted").val('false');
    var url = '/Admin/DuplicateInsuranceCompany';
    var flag = false;
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            CompanyName: $("#InsuranceCompanyName").val()
        }),
        success: function (data) {
            
            if (data) {
                $("#spInsuranceCompanyName").text("Duplicate Company Name.");
            }
            else {
                $("#spInsuranceCompanyName").text("");
            }
            flag = data;

        },
        error: function (msg) {

        }
    });
    if (flag == true) {
        return false;
    }
    else {
        ReduceValidationNumber('InsuranceCompanyName');
        CheckCountry('InsuranceCompanyCountry', 'InsuranceCompanyState', 'lblstate');
        return true;
    }
}


function DeleteInsuranceCompany(Company_ID) {
    if (confirm("Do you want to delete the Insurance Company?")) {
        this.click;
        var url = '/Admin/DeleteInsuranceCompany';

        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                CompanyId: Company_ID
            }),
            success: function (data) {
                
                if (data) {
                    alert("Deleted successfully.");
                    window.location.reload();
                }
                else {

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

function GetDraftRecords() {
    
    window.location.href = "/Admin/InsuranceCompany?IsDrafted=true";
}
