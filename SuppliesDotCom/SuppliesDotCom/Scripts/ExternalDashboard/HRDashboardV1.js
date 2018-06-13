$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');
    setTimeout(function () {
        HRGraphsV1();
        $('#ddlFacility option[value="2"]').text('---All---');
    }, 100);

    $('#btnReBindGraphs').on('click', function () {
        HRGraphsV1();
    });
});

/// <var>The enableddls</var>
var Enableddls = function () {
    var facilityId = $('#ddlFacility').val();
    if (facilityId === "2") {
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
        var items = '<option value="2">--All--</option>';
        $.each(data.reveuneAccount, function (i, obj) {
            var newItem = "<option id='" + obj.Value + "'  value='" + obj.Value + "'>" + obj.Text + "</option>";
            items += newItem;
        });
        $("#ddlDepartment").html(items);
        $("#ddlDepartment").val('2');
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
        Department: department != null ? department : 2,
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

function HRGraphsV1() {
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 2;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0,// $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/GetHRGraphsDataV1", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.FTEs != null && data.FTEs.length > 2) {
                GraphsBuilderWithoutPercentage(data.FTEs, 'myDashboardFTE', "column", "FTEs", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardFTE', "column", "FTEs", 1);
            }
            if (data.headcount != null && data.headcount.length > 2) {
                GraphsBuilderWithoutPercentage(data.headcount, 'myDashboardHeadcount', "column", "Headcount", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardHeadcount', "column", "Headcount", 3);
            }
            if (data.overtimeHours != null && data.overtimeHours.length > 2) {
                GraphsBuilderWith100(data.overtimeHours, 'myDashboardTotalWorkedHours', "column", "Overtime Hours % of Total Worked Hours", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTotalWorkedHours', "column", "Overtime Hours % of Total Worked Hours", 1);
            }
            if (data.attritionRate != null && data.attritionRate.length > 2) {
                GraphsBuilderWith100Target(data.attritionRate, 'myDashboardAttritionRate', "line", "Attrition rate", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAttritionRate', "line", "Attrition rate", 3);
            }
            if (data.employeeEngagementScore != null && data.employeeEngagementScore.length > 2) {
                GraphsBuilderWith100(data.employeeEngagementScore, 'myDashboardEmployeeEngagementScore', "column", "Employee Engagement Score", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardEmployeeEngagementScore', "column", "Employee Engagement Score", 1);
            }
            if (data.administrationTotalStaff != null && data.administrationTotalStaff.length > 2) {
                GraphsBuilderWith100(data.administrationTotalStaff, 'myDashboardAdministrationTotalStaff', "column", "Administration as a % of Total Staff", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAdministrationTotalStaff', "column", "Administration as a % of Total Staff", 1);
            }
            if (data.timetakenToRecruitVacantPos != null && data.timetakenToRecruitVacantPos.length > 2) {
                GraphsBuilderWithoutPercentage(data.timetakenToRecruitVacantPos, 'myDashboardTimeTakenToRecruitVacantPos', "column", "Time taken to recruit for a vacant position ", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTimeTakenToRecruitVacantPos', "column", "Time taken to recruit for a vacant position ", 1);
            }
            if (data.productiveHours != null && data.productiveHours.length > 2) {
                GraphsBuilderWithoutPercentage(data.productiveHours, 'myDashboardProductiveHours', "column", "Productive Hours", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardProductiveHours', "column", "Productive Hours", 1);
            }
            if (data.unproductiveHours != null && data.unproductiveHours.length > 2) {
                GraphsBuilderWithoutPercentage(data.unproductiveHours, 'myDashboardNonProductiveHours', "column", "Non productive Hours", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNonProductiveHours', "column", "Non productive Hours", 1);
            }

            if (data.nursingHoursPPD != null && data.nursingHoursPPD.length > 2) {
                GraphsBuilderWithoutPercentage(data.nursingHoursPPD, 'myDashboardNursingHoursPPD', "column", "Nursing Hours Per Patient Day", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingHoursPPD', "column", "Nursing Hours Per Patient Day", 1);
            }
        }
    });
}