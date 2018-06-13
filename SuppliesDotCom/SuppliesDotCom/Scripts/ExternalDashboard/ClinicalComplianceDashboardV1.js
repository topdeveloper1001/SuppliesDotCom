$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');

    setTimeout(function () {
        BindAllClinicalComplianceGraphsV1();
        $('#ddlFacility option[value="0"]').text('---All---');
    }, 500);

    $('#btnReBindGraphs').on('click', function () {
        BindAllClinicalComplianceGraphsV1();
    });
});

/// <var>The enableddls</var>
var Enableddls = function () {
    var facilityId = $('#ddlFacility').val();
    if (facilityId === "0") {
        $('.facDisabled').removeAttr('disabled');
    } else {
        $('.facDisabled').val('0');
        $('.facDisabled').attr('disabled', 'disabled');
    }

}

/// <var>bind the accounts dropdown</var>
var BindDepartmentsDropdown = function () {
    $.post("/FacilityDepartment/BindAccountDropdowns", null, function (data) {
        $("#ddlDepartment").empty();
        var items = '<option value="0">--All--</option>';
        $.each(data.reveuneAccount, function (i, obj) {
            var newItem = "<option id='" + obj.Value + "'  value='" + obj.Value + "'>" + obj.Text + "</option>";
            items += newItem;
        });
        $("#ddlDepartment").html(items);
        $("#ddlDepartment").val('0');
    });
};

function BindRemarksList(id) {
    /// <summary>
    /// Binds the remarks list.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    var facilityId = $('#ddlFacility').val();
    var month = $('#ddlMonth').val();
    var facilityType = $('#ddlFacilityType').val();
    var regionType = $('#ddlRegionType').val();
    var department = $('#ddlDepartment').val();
    var dashBoardType = $('#hdDashboardType').val();
    var typeSection = id;
    var viewAll = $('#chkShowAllSection' + id).prop('checked');
    var jsonData = JSON.stringify({
        facilityId: facilityId,
        month: month,
        facilityType: facilityType,
        segment: regionType,
        Department: department != null ? department : 0,
        type: dashBoardType,
        viewAll: viewAll,
        sectionType: typeSection
    });

    $.ajax({
        cache: false,
        type: "POST",
        url: '/ExternalDashboard/ViewRemarkdsListByDashboardSection',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            BindList("#divSection" + id, data);
        },
        error: function (msg) {
        }
    });
};

function BindAllClinicalComplianceGraphsV1_Backup() {
    /// <summary>
    /// Binds all clinical quality graphs.
    /// </summary>
    /// <returns></returns>
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 0;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0,// $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/ClinicalGraphsDataV1", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.fallRiskList != null && data.fallRiskList.length > 2) {
                GraphsBuilderWith100Target(data.fallRiskList, 'myDashboardFallRisk', "bar", "Fall Risk Assessment Protocol Compliance Rate", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardFallRisk', "bar", "Fall Risk Assessment Protocol Compliance Rate", 2);
            }
            if (data.painManagementList != null && data.painManagementList.length > 2) {
                GraphsBuilderWith100Target(data.painManagementList, 'myDashboardPainManagementComplianceRate', "column", "Pain Management Compliance  Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPainManagementComplianceRate', "column", "Pain Management Compliance  Rate", 1);
            }
            if (data.nursingStaffCompetency != null && data.nursingStaffCompetency.length > 2) {
                GraphsBuilderWith100Target(data.nursingStaffCompetency, 'myDashboardNursingStaffCompetency', "column", "Nursing Staff Competency", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingStaffCompetency', "column", "Nursing Staff Competency", 1);
            }
            if (data.nursingDepartmentOrientation != null && data.nursingDepartmentOrientation.length > 2) {
                GraphsBuilderWith100Target(data.nursingDepartmentOrientation, 'myDashboardNursingDepartmentOrientation', "column", "Nursing Department Orientation", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingDepartmentOrientation', "column", "Nursing Department Orientation", 1);
            }
            if (data.patientIdentification != null && data.patientIdentification.length > 2) {
                GraphsBuilderWith100Target(data.patientIdentification, 'myDashboardPatientIdentification', "column", "Patient Identification", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPatientIdentification', "column", "Patient Identification", 1);
            }
            if (data.compliancetoPressureUlcerPreventionProtocol != null && data.compliancetoPressureUlcerPreventionProtocol.length > 2) {
                GraphsBuilderWith100Target(data.compliancetoPressureUlcerPreventionProtocol, 'myDashboardCompliancetoPressureUlcerPreventionProtocol', "column", "Compliance to Pressure Ulcer Prevention Protocol", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardCompliancetoPressureUlcerPreventionProtocol', "column", "Compliance to Pressure Ulcer Prevention Protocol", 1);
            }
            if (data.sbarProtocolComplianceRate != null && data.sbarProtocolComplianceRate.length > 2) {
                GraphsBuilderWith100Target(data.sbarProtocolComplianceRate, 'myDashboardSBARProtocolComplianceRate', "column", "SBAR Protocol Compliance Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardSBARProtocolComplianceRate', "column", "SBAR Protocol Compliance Rate", 1);
            }
            if (data.handHygineComplainceRate != null && data.handHygineComplainceRate.length > 2) {
                GraphsBuilderWith100Target(data.handHygineComplainceRate, 'myDashboardHandHygineComplainceRate', "column", "Hand Hygine Complaince Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardHandHygineComplainceRate', "column", "Hand Hygine Complaince Rate", 1);
            }
            if (data.staffVaccinationRate != null && data.staffVaccinationRate.length > 2) {
                GraphsBuilderWith100Target(data.staffVaccinationRate, 'myDashboardStaffVaccinationRate', "column", "Staff Vaccination Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardStaffVaccinationRate', "column", "Staff Vaccination Rate", 1);
            }
            if (data.therapyInitialAssessmentProtocolCompliance != null && data.therapyInitialAssessmentProtocolCompliance.length > 2) {
                GraphsBuilderWith100Target(data.therapyInitialAssessmentProtocolCompliance, 'myDashboardTherapyInitialAssessmentProtocolCompliance', "column", "Therapy Initial Assessment Protocol Compliance", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTherapyInitialAssessmentProtocolCompliance', "column", "Therapy Initial Assessment Protocol Compliance", 1);
            }
            if (data.manualHandlingRiskAssessmentProtocolCompliance != null && data.manualHandlingRiskAssessmentProtocolCompliance.length > 2) {
                GraphsBuilderWith100Target(data.manualHandlingRiskAssessmentProtocolCompliance, 'myDashboardManualHandlingRiskAssessmentProtocolCompliance', "column", "Manual Handling Risk Assessment Protocol Compliance", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardManualHandlingRiskAssessmentProtocolCompliance', "column", "Manual Handling Risk Assessment Protocol Compliance", 1);
            }
            if (data.standardizedOutcomeMeasureProtocol != null && data.standardizedOutcomeMeasureProtocol.length > 2) {
                GraphsBuilderWith100Target(data.standardizedOutcomeMeasureProtocol, 'myDashboardStandardizedOutcomeMeasureProtocolAdmissionCompliance', "column", "Standardized Outcome Measure Protocol within 7 days of Admission Compliance", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardStandardizedOutcomeMeasureProtocolAdmissionCompliance', "column", "Standardized Outcome Measure Protocol within 7 days of Admission Compliance", 1);
            }
        }
    });
}

function BindAllClinicalComplianceGraphsV1() {
    /// <summary>
    /// Binds all clinical quality graphs.
    /// </summary>
    /// <returns></returns>
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 0;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0,// $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/ClinicalComplianceGraphsDataV1", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.conversionRate != null && data.conversionRate.length > 2) {
                GraphsBuilderWith100Target(data.conversionRate, 'myDashboardFallRisk', "bar", "Conversion Rate", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardFallRisk', "bar", "Conversion Rate", 2);
            }
            if (data.patientinFunnel != null && data.patientinFunnel.length > 2) {
                GraphsBuilderWith100Target(data.patientinFunnel, 'myDashboardPainManagementComplianceRate', "column", "Patient in Funnel (Active Refferals)", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPainManagementComplianceRate', "column", "Patient in Funnel (Active Refferals)", 1);
            }
            if (data.timefromFunneltoBed != null && data.timefromFunneltoBed.length > 2) {
                GraphsBuilderWith100Target(data.timefromFunneltoBed, 'myDashboardNursingStaffCompetency', "column", "Time from Funnel to Bed", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingStaffCompetency', "column", "Time from Funnel to Bed", 1);
            }
            if (data.lostfromFunnel != null && data.lostfromFunnel.length > 2) {
                GraphsBuilderWith100Target(data.lostfromFunnel, 'myDashboardNursingStaffCompetency', "column", "Lost from Funnel  ", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingStaffCompetency', "column", "Lost from Funnel  ", 1);
            }
        }
    });
}