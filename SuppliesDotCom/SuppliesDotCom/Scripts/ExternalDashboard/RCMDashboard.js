$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());

    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');

    setTimeout(function () {
        BindRCMGraphs();
        $('#ddlFacility option[value="0"]').text('---All---');
    }, 500);

    $('#btnReBindGraphs').on('click', function () {
        BindRCMGraphs();
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

function BindRCMGraphs() {
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
    $.post("/ExternalDashboard/RCMGraphsData", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.ipReveune != null && data.ipReveune.length > 2) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.ipReveune, 'myDashboardIPRevenue', "column", "Inpatient Days - Gross", 3, 'By Month (000s)');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardIPRevenue', "column", "Inpatient Days - Gross", 3, 'By Month (000s)');
            }
            if (data.reveunePPD != null && data.reveunePPD.length > 2) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.reveunePPD, 'myDashboardRevenuePPD', "column", "Inpatient Days - Net", 3, 'By Month');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardRevenuePPD', "column", "Inpatient Days - Net", 3, 'By Month');
            }
            if (data.revenueDaman != null && data.revenueDaman.length > 2) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.revenueDaman, 'myDashboardRevenueDaman', "column", "Out On Pass Days", 3, 'By Month (000s)');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardRevenueDaman', "column", "Out On Pass Days", 3, 'By Month (000s)');
            }
            if (data.reveuneRoyalFamily != null && data.reveuneRoyalFamily.length > 2) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.reveuneRoyalFamily, 'myDashboardRevenueRoyalFamily', "column", "Discharge Patient Days", 3, 'By Month (000s)');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardRevenueRoyalFamily', "column", "Discharge Patient Days", 3, 'By Month (000s)');
            }
            if (data.reveuneInpatinetOther != null && data.reveuneInpatinetOther.length > 2) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.reveuneInpatinetOther, 'myDashboardRevenueInpatientOther', "column", "Patient Days by Service Code Current Month", 3, 'By Month (000s)');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardRevenueInpatientOther', "column", "Patient Days by Service Code Current Month", 3, 'By Month (000s)');
            }
            if (data.averageDailyCencus != null && data.averageDailyCencus.length > 2) {
                GraphsBuilderWithoutPercentage(data.averageDailyCencus, 'myDashboardAverageDailyCensus', "column", "Average Daily Census", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAverageDailyCensus', "column", "Average Daily Census", 1);
            }
            //
            if (data.arDays != null && data.arDays.length > 0) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.arDays, 'myDashboardARDays', "column", "Patient Days by Service Code YTD", 3, 'By Month', 'Net A/R Days');
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardARDays', "column", "Patient Days by Service Code YTD", 1);
            }
            if (data.newAdmissions != null && data.newAdmissions.length > 2) {
                GraphsBuilderWithoutPercentage(data.newAdmissions, 'myDashboardNewAdmissions', "column", "New Admissions", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNewAdmissions', "column", "New Admissions", 3);
            }
            if (data.plannedDischarges != null && data.plannedDischarges.length > 2) {
                GraphsBuilderWithoutPercentage(data.plannedDischarges, 'myDashboardDischargesPlanned', "column", "Average Length of Stay (ALOS)", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargesPlanned', "column", "Average Length of Stay (ALOS)", 3);
            }
            if (data.dischargesUnplanned != null && data.dischargesUnplanned.length > 2) {
                GraphsBuilderWithoutPercentage(data.dischargesUnplanned, 'myDashboardDischargesUnplannedAndExp', "column", "Average Length of Stay (ALOS)", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargesUnplannedAndExp', "column", "Average Length of Stay (ALOS)", 3);
            }
            if (data.acuteOutsPatients != null && data.acuteOutsPatients.length > 2) {
                GraphsBuilderWithoutPercentage(data.acuteOutsPatients, 'myDashboardAcuteOutsPatients', "column", "Acute Outs Patients", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAcuteOutsPatients', "column", "Acute Outs Patients", 3);
            }
            if (data.acuteOutsDays != null && data.acuteOutsDays.length > 2) {
                GraphsBuilderWithoutPercentage(data.acuteOutsDays, 'myDashboardAcuteOutDays', "column", "Acute Out Days", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAcuteOutDays', "column", "Acute Out Days", 3);
            }
            if (data.therapeuticLeaves != null && data.therapeuticLeaves.length > 2) {
                //GraphsBuilderWithoutPercentage(data.therapeuticLeaves, 'myDashboardTherapeuticLeaves', "column", "Therapeutic Leaves (OOP) Days", 1);
            }
            if (data.opRevenue != null && data.opRevenue.length > 2) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.opRevenue, 'myDashboardOPRevenue', "column", "Outpatient Revenue", 1, "By Month (000s)");
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardOPRevenue', "column", "Outpatient Revenue", 1, "By Month (000s)");
            }

            if (data.patientDays != null && data.patientDays.length > 2) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.patientDays, 'myDashboardPatientDays', "column", "Patient Days", 3, "By Month");
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPatientDays', "column", "Patient Days", 1);
            }
            if (data.serviceCodeDistributionbyBilledClaims != null && data.serviceCodeDistributionbyBilledClaims.length > 0) {
                SubCategoryPieChartBuilder(data.serviceCodeDistributionbyBilledClaims, 'myDashboardServiceCodeDistribution', "column", "Service Code Distribution by Billed Claims", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardServiceCodeDistribution', "column", "Service Code Distribution by Billed Claims", 1);
            }
            if (data.percentagebilledReveune != null && data.percentagebilledReveune.length > 2) {
                GraphsBuilderWith100(data.percentagebilledReveune, 'myDashboardBilledRevenuebyMonthEnd', "line", "% Billed Revenue by Month End", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardBilledRevenuebyMonthEnd', "line", "% Billed Revenue by Month End", 2);
            }
            if (data.accountSubmittedClaims != null && data.accountSubmittedClaims.length > 2) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.accountSubmittedClaims, 'myDashboardAmountSubmittedClaims', "column", "Amount Submitted Claims", 3, 'By Month (000s)');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardAmountSubmittedClaims', "column", "Amount Submitted Claims", 3, 'By Month (000s)');
            }
            //
            if (data.claimsResubmissionPercentage != null && data.claimsResubmissionPercentage.length > 0) {
                SubCategoryPieChartBuilderYearToDate(data.claimsResubmissionPercentage, 'myDashboardNumberSubmittedClaims', "column", "Claims Resubmission %", 1, 'Good Claims', 'Claims Resubmission %');
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNumberSubmittedClaims', "column", "Claims Resubmission %", 1);
            }
            if (data.payorMix != null && data.payorMix.length == 4) {
                SubCategoryPieChartBuilder(data.payorMix, 'myDashboardServiceCodeDistribution', "column", "Payor Mix", 1);
                $('#myDashboardServiceCodeDistribution').show();
                $('#myDashboardServiceCodeDistributionNoRecords').hide();
            }
            else {
                //EmptyGraphsBuilderWithoutPercentage('myDashboardServiceCodeDistribution', "column", "Payor Mix", 1);
                //var buildImgTag = "<img src='/images/nodata.jpg'>";
                $('#myDashboardServiceCodeDistribution').hide();
                $('#myDashboardServiceCodeDistributionNoRecords').show();
                //$('#myDashboardServiceCodeDistribution').html(buildImgTag);
            }
        }
    });
}
