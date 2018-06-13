$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');
    setTimeout(function () {
        BindFinancialMGTGraphs();
        $('#ddlFacility option[value="0"]').text('---All---');
    }, 500);

    $('#btnReBindGraphs').on('click', function () {
        BindFinancialMGTGraphs();
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

function BindFinancialMGTGraphs() {

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
    $.post("/ExternalDashboard/GetFinancialMGTGraphsData", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.netRevenue != null && data.netRevenue.length > 2) {
                GraphsBuilderWithoutPercentage(data.netRevenue, 'myDashboardNetRevenue', "column", "Net Revenue", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNetRevenue', "column", "Net Revenue", 1);
            }
            if (data.swbDirect != null && data.swbDirect.length > 2) {
                GraphsBuilderWithoutPercentage(data.swbDirect, 'myDashboardSWBDirect', "column", "SWB Direct", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardSWBDirect', "column", "SWB Direct", 1);
            }
            if (data.supplies != null && data.supplies.length > 2) {
                GraphsBuilderWithoutPercentage(data.supplies, 'myDashboardSupplies', "column", "Supplies", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardSupplies', "column", "Supplies", 1);
            }
            if (data.otherDirect != null && data.otherDirect.length > 2) {
                GraphsBuilderWithoutPercentage(data.otherDirect, 'myDashboardOtherDirect', "column", "Other Direct",3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardOtherDirect', "column", "Other Direct", 3);
            }
            if (data.swbinDirect != null && data.swbinDirect.length > 2) {
                GraphsBuilderWithoutPercentage(data.swbinDirect, 'myDashboardSWBIndirect', "column", "SWB Indirect", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardSWBIndirect', "column", "SWB Indirect", 1);
            }
            if (data.otherIndirectCosts != null && data.otherIndirectCosts.length >2) {
                GraphsBuilderWithoutPercentage(data.otherIndirectCosts, 'myDashboardOtherIndirectCosts', "column", "Other Indirect Costs", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardOtherIndirectCosts', "column", "Other Indirect Costs", 1);
            }
            if (data.deprAndAmort != null && data.deprAndAmort.length > 2) {
                GraphsBuilderWithoutPercentage(data.deprAndAmort, 'myDashboardDeprAmort', "column", "Depr & Amort", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDeprAmort', "column", "Depr & Amort", 1);
            }
            if (data.interest != null && data.interest.length > 2) {
                GraphsBuilderWithoutPercentage(data.interest, 'myDashboardInterest', "column", "Interest", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardInterest', "column", "Interest", 1);
            }
            if (data.changesWorkingCapital != null && data.changesWorkingCapital.length > 2) {
               // GraphsBuilderWithoutPercentage(data.changesWorkingCapital, 'myDashboardChangesWorkingCapital', "column", "Changes in Working Capital", 1);
            }
            if (data.otherAdjustments != null && data.otherAdjustments.length > 2) {
               // GraphsBuilderWithoutPercentage(data.otherAdjustments, 'myDashboardOtherAdjustmentsWorkingCapital', "column", "Other Adjustments to Working Capital", 1);
            }
            if (data.capitalExpenditures != null && data.capitalExpenditures.length > 2) {
                GraphsBuilderWithoutPercentage(data.capitalExpenditures, 'myDashboardCapitalExpenditures', "column", "Capital Expenditures", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardCapitalExpenditures', "column", "Capital Expenditures", 1);
            }
            if (data.cashInBank != null && data.cashInBank.length > 2) {
               // GraphsBuilderWithoutPercentage(data.cashInBank, 'myDashboardOtherCashInBank', "column", "Cash in Bank", 1);
            }
            if (data.daysTotalExpendituresInCash != null && data.daysTotalExpendituresInCash.length > 2) {
               // GraphsBuilderWithoutPercentage(data.daysTotalExpendituresInCash, 'myDashboardDaysTotalExpendituresCash', "column", "Days of Total Expenditures in Cash", 1);
            }
            if (data.totalCashCollected != null && data.totalCashCollected.length > 2) {
                GraphsBuilderWithoutPercentage(data.totalCashCollected, 'myDashboardTotalCashCollected', "column", "Total Cash Collected", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTotalCashCollected', "column", "Total Cash Collected", 1);
            }
            if (data.totalPayablesSalaries != null && data.totalPayablesSalaries.length > 2) {
                GraphsBuilderWithoutPercentage(data.totalPayablesSalaries, 'myDashboardTotalPayablesSalariesPaidOut', "column", "Total Payables and Salaries Paid Out", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTotalPayablesSalariesPaidOut', "column", "Total Payables and Salaries Paid Out", 1);
            }
            if (data.totalCapitalPaymentsMade != null && data.totalCapitalPaymentsMade.length > 2) {
                GraphsBuilderWithoutPercentage(data.totalCapitalPaymentsMade, 'myDashboardTotalCapitalPaymentsMade', "column", "Total Capital Payments Made", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTotalCapitalPaymentsMade', "column", "Total Capital Payments Made", 1);
            }
        }
    });
}