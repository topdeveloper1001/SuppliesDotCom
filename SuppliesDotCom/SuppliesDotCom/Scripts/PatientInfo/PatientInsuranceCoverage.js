//---------------For 2nd Health Care Plan----------------------------/////

$(function () {
    ajaxStartActive = false;
    $("#divPatientInsurance").validationEngine();

    $("#ddlInsuranceCompany2").change(function () {
        var selectedCompanyValue = $(this).val();
        if (selectedCompanyValue > 0) {
            $("#CompanyId2").val(selectedCompanyValue > 0 ? selectedCompanyValue : 0);
            BindCompanyInsurancePlan2(selectedCompanyValue);
        }
        return false;
    });

    $("#ddlInsurancePlan2").change(function () {
        var selectedPlanValue = $(this).val();
        if (selectedPlanValue > 0) {
            $("#Plan2").val(selectedPlanValue > 0 ? selectedPlanValue : 0);
            BindInsurancePolicies2(selectedPlanValue);
        }
        return false;
    });

    $("#ddlInsurancePolicy2").change(function () {
        var selectedValue = $(this).val();
        $("#Policy2").val(selectedValue > 0 ? selectedValue : 0);
        return false;
    });

    IntializeDatesInPatientInsurance();
});

function SavePatientInsurance2() {
    var isValid = jQuery("#divPatientInsurance").validationEngine({ returnIsValid: true });
    if (isValid) {
        if ($('#ddlInsuranceCompany2').val() == '999') {
            $("#Plan2").val('0');
            $("#Policy2").val('0');
        }

        var jsonData1 = {
            PatientInsuraceID: $("#PatientInsuranceId2").val(),
            PatientID: $("#PatientId").val(),
            PersonHealthCareNumber: $("#PersonHealthCareNumber2").val(),
            InsuranceCompanyId: $("#CompanyId2").val(),
            InsurancePlanId: $("#Plan2").val(),
            InsurancePolicyId: $("#Policy2").val(),
            Startdate: $("#StartDate2").val(),
            Expirydate: $("#EndDate2").val(),
            IsActive: true,
            IsDeleted: false,
            IsPrimary: false
        };
        $.post("/PatientInfo/SavePatientInsurance2", jsonData1, function (data) {
            $("#Insurance_PatientInsuraceID").val(data.InsuranceId1);
            $("#PatientInsuranceId2").val(data.InsuranceId2);
            if ($("#PatientInsuraceID").val() > 0)
                ShowMessage("Patient Insurance Details Updated Successfully", "Success", "success", true);
            else
                ShowMessage("Patient Insurance Details Saved Successfully", "Success", "success", true);
        });
    }
    return false;
}

function ClearInsuranceForm2() {
    $("#divSecondInsuranceForm").each(function () {
        $('input,select,textarea', this).clearFields();
    });
    return false;
}

function IntializeDatesInPatientInsurance() {
    $("#Startdate").datetimepicker({
        format: 'm/d/Y',
        minDate: '1901/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2025/12/12',
        timepicker: false,
        closeOnDateSelect: true
    });

    $("#Expirydate").datetimepicker({
        format: 'm/d/Y',
        minDate: '2000/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2025/12/12',
        timepicker: false,
        closeOnDateSelect: true

    });

    $("#StartDate2").datetimepicker({
        format: 'm/d/Y',
        minDate: '2000/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2030/12/12',
        timepicker: false,
        closeOnDateSelect: true
    });

    $("#EndDate2").datetimepicker({
        format: 'm/d/Y',
        minDate: '0',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2030/12/12',
        timepicker: false,
        closeOnDateSelect: true
    });
}


//---------------For 2nd Health Care Plan----------------------------/////