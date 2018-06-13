$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');


    setTimeout(function () {
        BindAllClinicalQualityGraphsV1();
        $('#ddlFacility option[value="0"]').text('---All---');
    }, 300);

    $('#btnReBindGraphs').on('click', function () {
        BindAllClinicalQualityGraphsV1();
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

function BindAllClinicalQualityGraphsV1() {
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
            if (data.hamList != null && data.hamList.length > 2) {
                GraphsBuilderWith100Target(data.hamList, 'myDashboardManagementHighAlertMedication', "column", "Management of High Alert Medication", 1);
                //GraphsBuilderWith100(data.hamList, 'myDashboardHighAlertMedication1', "column", "Management of High Alert Medication", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardManagementHighAlertMedication', "column", "Management of High Alert Medication", 1);
            }
            if (data.dischargeToComunityrate != null && data.dischargeToComunityrate.length > 2) {
                GraphsBuilderWith100Target(data.dischargeToComunityrate, 'myDashboardDischargeCommunityRate', "column", "Discharge to Community Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargeCommunityRate', "column", "Discharge to Community Rate", 1);
            }
            if (data.lostReferals != null && data.lostReferals.length > 2) {
                GraphsBuilderWith100Target(data.lostReferals, 'myDashboardLostReferals', "column", "Lost Referals", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardLostReferals', "column", "Lost Referals", 1);
            }
            if (data.transferOutRate != null && data.transferOutRate.length > 2) {
                GraphsBuilderWith100Target(data.transferOutRate, 'myDashboardTransferOutRate', "column", "Transfer Out Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTransferOutRate', "column", "Transfer Out Rate", 1);
            }
            if (data.patientFallRatewithInjury != null && data.patientFallRatewithInjury.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.patientFallRatewithInjury, 'myDashboardPatientFallRatewithInjury', "column", "Patient Fall Rate with Injury", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPatientFallRatewithInjury', "column", "Patient Fall Rate with Injury", 1);
            }
            if (data.pressureUlcerIncidentRate != null && data.pressureUlcerIncidentRate.length > 2) {
                GraphsBuilderWith100Target(data.pressureUlcerIncidentRate, 'myDashboardPressureUlcerIncidentRate', "line", "Pressure Ulcer Incident Rate", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPressureUlcerIncidentRate', "line", "Pressure Ulcer Incident Rate", 2);
            }
            if (data.mdroRate != null && data.mdroRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.mdroRate, 'myDashboardMDRORate', "column", "MDRO Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardMDRORate', "column", "MDRO Rate", 1);
            }
            if (data.mrsaRate != null && data.mrsaRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.mrsaRate, 'myDashboardMRSARate', "column", "MRSA Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardMRSARate', "column", "MRSA Rate", 1);
            }
            if (data.esblRate != null && data.esblRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.esblRate, 'myDashboardESBLRate', "column", "ESBL Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardESBLRate', "column", "ESBL Rate", 1);
            }
            if (data.lrtiRate != null && data.lrtiRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.lrtiRate, 'myDashboardLRTIRate', "column", "LRTI Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardLRTIRate', "column", "LRTI Rate", 1);
            }
            if (data.cautiRate != null && data.cautiRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.cautiRate, 'myDashboardCautiRate', "column", "Cauti Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardCautiRate', "column", "Cauti Rate", 1);
            }
            if (data.bsiRate != null && data.bsiRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.bsiRate, 'myDashboardBSIRate', "column", "BSI Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardBSIRate', "column", "BSI Rate", 1);
            }
            if (data.inappropriateAntiBioticUsageRate != null && data.inappropriateAntiBioticUsageRate.length > 2) {
                GraphsBuilderWith100Target(data.inappropriateAntiBioticUsageRate, 'myDashboardInappropriateAntiBioticUsageRate', "column", "Inappropriate Anti-Biotic Usage Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardInappropriateAntiBioticUsageRate', "column", "Inappropriate Anti-Biotic Usage Rate", 1);
            }
            //if (data.Incidents != null && data.Incidents.length > 0) {
            //    GraphsBuilderWith100Target(data.Incidents, 'myDashboardIncidents', "column", "Incidents", 1);
            //}
            if (data.nonMedicationRelatedIncidents != null && data.nonMedicationRelatedIncidents.length > 2) {
                BuildActualFiveBarGraphs(data.nonMedicationRelatedIncidents, 'myDashboardIncidents', "column", "NON MEDICATION RELATED INCIDENTS", 1, "");
            } else {
                EmptyGraphsBuilderWithoutPercentageTarget('myDashboardIncidents', "column", "NON MEDICATION RELATED INCIDENTS", 1);
            }
            if (data.typeOfIncidents != null && data.typeOfIncidents.length > 2) {
                BuildActualFourBarGraphs(data.typeOfIncidents, 'myDashboardTypesOfIncidents', "column", "TYPES OF INCIDENTS", 1, "");
            } else {
                EmptyGraphsBuilderWithoutPercentageTarget('myDashboardTypesOfIncidents', "column", "TYPES OF INCIDENTS", 1);
            }

            if (data.categoryofIncidents != null && data.categoryofIncidents.length > 2) {
                GraphsBuilderWithoutPercentageDefination(data.categoryofIncidents, 'myDashboardCategoryOfIncidents', "column", "CATEGORY OF THE INCIDENTS", 1, "");
            } else {
                GraphsBuilderWithoutPercentageTarget('myDashboardCategoryOfIncidents', "column", "CATEGORY OF THE INCIDENTS", 1);
            }
            if (data.medicationErrors != null && data.medicationErrors.length == 20) {
                BuildBudgetTenBarGraphs(data.medicationErrors, 'myDashboardMedicationError', "column", "MEDICATION ERRORS", 1, "");
            } else {
                EmptyGraphsBuilderWithoutPercentageTarget('myDashboardMedicationError', "column", "MEDICATION ERRORS", 1);
            }
        }
    });
}