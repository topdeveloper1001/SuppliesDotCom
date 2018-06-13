$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');

    setTimeout(function () {
        BindCaseMGTGraphs();
        $('#ddlFacility option[value="0"]').text('---All---');
    }, 100);

    $('#btnReBindGraphs').on('click', function () {
        //BindCaseMGTGraphs();
        BindCaseMGTGraphs_New();
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

function BindCaseMGTGraphs() {
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 0;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0, // $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/CaseManagementGraphsData", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.acuteOutDays != null && data.acuteOutDays.length > 2) {
                GraphsBuilderWithoutPercentage(data.acuteOutDays, 'myDashboardAcuteOutDays', "column", "Acute Out Days", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAcuteOutDays', "column", "Acute Out Days", 3);
            }
            if (data.acuteOut != null && data.acuteOut.length > 2) {
                GraphsBuilderWithoutPercentage(data.acuteOut, 'myDashboardAcuteOut', "column", "Acute Out", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAcuteOut', "column", "Acute Out", 3);
            }
            if (data.therapueticLeaves != null && data.therapueticLeaves.length > 2) {
                GraphsBuilderWithoutPercentage(data.therapueticLeaves, 'myDashboardTherapueticLeaves', "column", "Therapuetic Leave Days", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTherapueticLeaves', "column", "Therapuetic Leave Days", 3);
            }
            if (data.presenceInitialAssessment != null && data.presenceInitialAssessment.length > 2) {
                GraphsBuilderWith100(data.presenceInitialAssessment, 'myDashboardInitialAccessment', "line", "Presence of initial assessment", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardInitialAccessment', "line", "Presence of initial assessment", 2);
            }
            if (data.presenceMDTdocumentation != null && data.presenceMDTdocumentation.length > 2) {
                GraphsBuilderWith100Target(data.presenceMDTdocumentation, 'myDashboardMDTDcoumentation', "line", "Presence of MDT documentation", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardMDTDcoumentation', "line", "Presence of MDT documentation", 2);
            }
            if (data.presenceDischargedDocumentation != null && data.presenceDischargedDocumentation.length > 2) {
                GraphsBuilderWith100(data.presenceDischargedDocumentation, 'myDashboardDischargeddocumentation', "column", "Presence of discharged documentation", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargeddocumentation', "column", "Presence of discharged documentation", 1);
            }
            if (data.dischargeDisposition != null && data.dischargeDisposition.length > 2) {
                GraphsBuilderWithoutPercentage(data.dischargeDisposition, 'myDashboardDischargeDisposition', "column", "Discharge Disposition", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargeDisposition', "column", "Discharge Disposition", 1);
            }
            if (data.numberUnplannedDischarges != null && data.numberUnplannedDischarges.length > 2) {
                GraphsBuilderWithoutPercentage(data.numberUnplannedDischarges, 'myDashboardUnplannedDischarges', "column", "Number of unplanned discharges", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardUnplannedDischarges', "column", "Number of unplanned discharges", 1);
            }
            if (data.postDischargeFollowup != null && data.postDischargeFollowup.length > 2) {
                GraphsBuilderWith100Target(data.postDischargeFollowup, 'myDashboardPostDischargeFollowup', "column", "Post Discharge Follow-up Contact", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPostDischargeFollowup', "column", "Post Discharge Follow-up Contact", 1);
            }
            if (data.lostReferral != null && data.lostReferral.length > 2) {
                GraphsBuilderWith100(data.lostReferral, 'myDashboardLostRefrallsPercent', "column", "Lost Referral %", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardLostRefrallsPercent', "column", "Lost Referral %", 1);
            }
        }
    });
}
