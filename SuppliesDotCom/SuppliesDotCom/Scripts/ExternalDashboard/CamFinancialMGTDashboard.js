$(function () {
    //BindDepartmentsDropdown();
    //BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    //BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    //BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    //BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    ////BindMonthsListCustomPreviousMonth('#ddlMonth', '');
    //setTimeout(function () {
    //    CamBindFinancialMGTGraphs();
    //    $('#ddlFacility option[value="0"]').text('---All---');
    //}, 500);


    BindFinancialDataOnLoad($("#hdFacilityId").val());

    $('#btnReBindGraphs').on('click', function () {
        //CamBindFinancialMGTGraphs();

        RebindFinancialManagmentGraphs();
    });
});

function BindFinancialDataOnLoad(facilityId) {
    facilityId = facilityId == 14 ? 17 : facilityId;
    $.getJSON("/ExternalDashboard/BindAllFinancialManagementDataOnLoad", { facilityId: facilityId }, function (data) {
        if (data != null && data != "") {
            BindDropdownDataV2(data.ftList, "#ddlFacilityType", "", "All");
            BindDropdownDataV2(data.rList, "#ddlRegionType", "", "All");
            BindDropdownDataV2(data.fList, "#ddlFacility", data.facilityid, "---All---");

            if ($("#ddlMonth").length > 0)
                BindDropdownDataV2(data.mList, "#ddlMonth", data.defaultMonth, "--Select--");

            BindDropdownDataV2(data.dList, "#ddlDepartment", "", "All");


            //Graphs Binding starts here
            BindGraphsInFinancialManagment(data);
        }
    });
}

function BindGraphsInFinancialManagment(data) {
    if (data != null && data != "") {
        // --- Section 1.1
        if (data.netRevenue != null && data.netRevenue.length > 2) {
            GraphsBuilderWithoutPercentage(data.netRevenue, 'myDashboardNetRevenue', "column", "Net Revenue", 7);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardNetRevenue', "column", "Net Revenue", 7);
        }
        // --- Section 1.2
        if (data.swbDirect != null && data.swbDirect.length > 2) {
            GraphsBuilderWithoutPercentage(data.swbDirect, 'myDashboardSWBDirect', "column", "SWB Direct", 7);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardSWBDirect', "column", "SWB Direct", 7);
        }
        // --- Section 2.1
        if (data.otherDirect != null && data.otherDirect.length > 2) {
            GraphsBuilderWithoutPercentage(data.otherDirect, 'myDashboardSupplies', "column", "Other Direct", 7);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardSupplies', "column", "Other Direct", 7);
        }
        // --- Section 2.2
        if (data.otherGAExpenses != null && data.otherGAExpenses.length > 2) {
            GraphsBuilderWithoutPercentage(data.otherGAExpenses, 'myDashboardOtherDirect', "column", "Other G&A Expenses", 7);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardOtherDirect', "column", "Other G&A Expenses", 7);
        }
        // --- Section 3.1
        if (data.facilityRentandUtilities != null && data.facilityRentandUtilities.length > 2) {
            GraphsBuilderWithoutPercentage(data.facilityRentandUtilities, 'myDashboardSWBIndirect', "column", "Facility Rent and Utilities", 7);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardSWBIndirect', "column", "Facility Rent and Utilities", 7);
        }
        // --- Section 3.2
        if (data.otherdirectpatientrelatedcosts != null && data.otherdirectpatientrelatedcosts.length > 2) {
            GraphsBuilderWithoutPercentage(data.otherdirectpatientrelatedcosts, 'myDashboardOtherIndirectCosts', "column", "Other Direct Patient Related Costs", 7);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardOtherIndirectCosts', "column", "Other Direct Patient Related Costs", 7);
        }
        // --- Section 4.1
        if (data.consumablesPPD != null && data.consumablesPPD.length > 2) {
            GraphsBuilderWithoutPercentage(data.consumablesPPD, 'myDashboardDeprAmort', "column", "Consumables PPD", 3);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardDeprAmort', "column", "Consumables PPD", 1);
        }
        // --- Section 4.2
        if (data.pharmacyPPD != null && data.pharmacyPPD.length > 2) {
            GraphsBuilderWithoutPercentage(data.pharmacyPPD, 'myDashboardInterest', "column", "Pharmacy PPD", 3);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardInterest', "column", "Pharmacy PPD", 1);
        }
        // --- Section 5.1
        if (data.fBPPD != null && data.fBPPD.length > 2) {
            GraphsBuilderWithoutPercentage(data.fBPPD, 'myDashboardCapitalExpenditures', "column", "F+B PPD", 3);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardCapitalExpenditures', "column", "F+B PPD", 1);
        }
        // --- Section 5.2
        if (data.newmarketdevelopmentSWB != null && data.newmarketdevelopmentSWB.length > 2) {
            GraphsBuilderWithoutPercentage(data.newmarketdevelopmentSWB, 'myDashboardTotalCashCollected', "column", "New Market Development SWB", 7);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardTotalCashCollected', "column", "New Market Development SWB", 7);
        }
        // --- Section 6.1
        if (data.marketingBDCosts != null && data.marketingBDCosts.length > 2) {
            GraphsBuilderWithoutPercentage(data.marketingBDCosts, 'myDashboardTotalPayablesSalariesPaidOut', "column", "Marketing & BD Costs", 7);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardTotalPayablesSalariesPaidOut', "column", "Marketing & BD Costs", 7);
        }
        // --- Section 6.2
        if (data.newMarketDevelopmentOtherCosts != null && data.newMarketDevelopmentOtherCosts.length > 2) {
            GraphsBuilderWithoutPercentage(data.newMarketDevelopmentOtherCosts, 'myDashboardTotalCapitalPaymentsMade', "column", "New Market Development Other Costs", 7);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardTotalCapitalPaymentsMade', "column", "New Market Development Other Costs", 7);
        }
        // --- Section 7.1
        if (data.deprandAmort != null && data.deprandAmort.length > 2) {
            GraphsBuilderWithoutPercentage(data.deprandAmort, 'myDashboardDaysTotalExpendituresCash', "column", "Depr and Amort", 7);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardDaysTotalExpendituresCash', "column", "Depr and Amort", 7);
        }

        // --- Section 8.1
        if (data.NursePatientRatio != null && data.NursePatientRatio.length > 0) {
            GraphsBuilderWithoutPercentageWithTwoDecimal(data.NursePatientRatio, 'myDashboardSection81', "column", "Nurse: Patient Ratio", 8);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardSection81', "column", "Nurse: Patient Ratio", 1);
        }
        // --- Section 8.2
        if (data.healthCareassistantPatientratio != null && data.healthCareassistantPatientratio.length > 2) {
            GraphsBuilderWithoutPercentageWithTwoDecimal(data.healthCareassistantPatientratio, 'myDashboardSection82', "column", "Health Care Assistant: Patient Ratio", 8);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardSection82', "column", "Health Care Assistant: Patient Ratio", 1);
        }
        // --- Section 9.1
        if (data.therapistPatientratio != null && data.therapistPatientratio.length > 2) {
            GraphsBuilderWithoutPercentageWithTwoDecimal(data.therapistPatientratio, 'myDashboardSection91', "column", "Therapist: Patient Ratio", 8);
        } else {
            EmptyGraphsBuilderWithoutPercentageTwoDecimal('myDashboardSection91', "column", "Therapist: Patient Ratio", 1);
        }
        // --- Section 9.2
        if (data.physicianPatientratio != null && data.physicianPatientratio.length > 2) {
            GraphsBuilderWithoutPercentageWithTwoDecimal(data.physicianPatientratio, 'myDashboardSection92', "column", "Physician : Patient Ratio", 8);
        } else {
            EmptyGraphsBuilderWithoutPercentageTwoDecimal('myDashboardSection92', "column", "Physician : Patient Ratio", 1);
        }
    }
}

function RebindFinancialManagmentGraphs() {
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
    $.getJSON("/ExternalDashboard/RebindFinancialManagementGraphs", jsonData, function (data) {
        BindGraphsInFinancialManagment(data);
    });
}

var Enableddls = function () {
    var facilityId = $('#ddlFacility').val();
    if (facilityId === "0") {
        $('.facDisabled').removeAttr('disabled');
    } else {
        $('.facDisabled').val('0');
        $('.facDisabled').attr('disabled', 'disabled');
    }

}






//-------------$$$$$$$$$$$$$$$$$--Below Methods NOT-IN-USE--$$$$$$$$$$$$$$$$$$$$$$$$$

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

function CamBindFinancialMGTGraphs() {
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
    $.post("/ExternalDashboard/CamGetFinancialMGTGraphsData", jsonData, function (data) {
        if (data != null && data != "") {
            // --- Section 1.1
            if (data.netRevenue != null && data.netRevenue.length > 2) {
                GraphsBuilderWithoutPercentage(data.netRevenue, 'myDashboardNetRevenue', "column", "Net Revenue", 7);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNetRevenue', "column", "Net Revenue", 7);
            }
            // --- Section 1.2
            if (data.swbDirect != null && data.swbDirect.length > 2) {
                GraphsBuilderWithoutPercentage(data.swbDirect, 'myDashboardSWBDirect', "column", "SWB Direct", 7);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardSWBDirect', "column", "SWB Direct", 7);
            }
            // --- Section 2.1
            if (data.otherDirect != null && data.otherDirect.length > 2) {
                GraphsBuilderWithoutPercentage(data.otherDirect, 'myDashboardSupplies', "column", "Other Direct", 7);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardSupplies', "column", "Other Direct", 7);
            }
            // --- Section 2.2
            if (data.otherGAExpenses != null && data.otherGAExpenses.length > 2) {
                GraphsBuilderWithoutPercentage(data.otherGAExpenses, 'myDashboardOtherDirect', "column", "Other G&A Expenses", 7);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardOtherDirect', "column", "Other G&A Expenses", 7);
            }
            // --- Section 3.1
            if (data.facilityRentandUtilities != null && data.facilityRentandUtilities.length > 2) {
                GraphsBuilderWithoutPercentage(data.facilityRentandUtilities, 'myDashboardSWBIndirect', "column", "Facility Rent and Utilities", 7);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardSWBIndirect', "column", "Facility Rent and Utilities", 7);
            }
            // --- Section 3.2
            if (data.otherdirectpatientrelatedcosts != null && data.otherdirectpatientrelatedcosts.length > 2) {
                GraphsBuilderWithoutPercentage(data.otherdirectpatientrelatedcosts, 'myDashboardOtherIndirectCosts', "column", "Other Direct Patient Related Costs", 7);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardOtherIndirectCosts', "column", "Other Direct Patient Related Costs", 7);
            }
            // --- Section 4.1
            if (data.consumablesPPD != null && data.consumablesPPD.length > 2) {
                GraphsBuilderWithoutPercentage(data.consumablesPPD, 'myDashboardDeprAmort', "column", "Consumables PPD", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDeprAmort', "column", "Consumables PPD", 1);
            }
            // --- Section 4.2
            if (data.pharmacyPPD != null && data.pharmacyPPD.length > 2) {
                GraphsBuilderWithoutPercentage(data.pharmacyPPD, 'myDashboardInterest', "column", "Pharmacy PPD", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardInterest', "column", "Pharmacy PPD", 1);
            }
            // --- Section 5.1
            if (data.fBPPD != null && data.fBPPD.length > 2) {
                GraphsBuilderWithoutPercentage(data.fBPPD, 'myDashboardCapitalExpenditures', "column", "F+B PPD", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardCapitalExpenditures', "column", "F+B PPD", 1);
            }
            // --- Section 5.2
            if (data.newmarketdevelopmentSWB != null && data.newmarketdevelopmentSWB.length > 2) {
                GraphsBuilderWithoutPercentage(data.newmarketdevelopmentSWB, 'myDashboardTotalCashCollected', "column", "New Market Development SWB", 7);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTotalCashCollected', "column", "New Market Development SWB", 7);
            }
            // --- Section 6.1
            if (data.marketingBDCosts != null && data.marketingBDCosts.length > 2) {
                GraphsBuilderWithoutPercentage(data.marketingBDCosts, 'myDashboardTotalPayablesSalariesPaidOut', "column", "Marketing & BD Costs", 7);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTotalPayablesSalariesPaidOut', "column", "Marketing & BD Costs", 7);
            }
            // --- Section 6.2
            if (data.newMarketDevelopmentOtherCosts != null && data.newMarketDevelopmentOtherCosts.length > 2) {
                GraphsBuilderWithoutPercentage(data.newMarketDevelopmentOtherCosts, 'myDashboardTotalCapitalPaymentsMade', "column", "New Market Development Other Costs", 7);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTotalCapitalPaymentsMade', "column", "New Market Development Other Costs", 7);
            }
            // --- Section 7.1
            if (data.deprandAmort != null && data.deprandAmort.length > 2) {
                GraphsBuilderWithoutPercentage(data.deprandAmort, 'myDashboardDaysTotalExpendituresCash', "column", "Depr and Amort", 7);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDaysTotalExpendituresCash', "column", "Depr and Amort", 7);
            }
            // --- Section 7.2
            //if (data.totalPayablesSalaries != null && data.totalPayablesSalaries.length > 2) {
            //    GraphsBuilderWithoutPercentage(data.totalPayablesSalaries, 'myDashboardOtherAdjustmentsWorkingCapital', "column", "Total Payables and Salaries Paid Out", 3);
            //} else {
            //    EmptyGraphsBuilderWithoutPercentage('myDashboardOtherAdjustmentsWorkingCapital', "column", "Total Payables and Salaries Paid Out", 1);
            //}
            // --- Section 8.1
            if (data.NursePatientRatio != null && data.NursePatientRatio.length > 0) {
                GraphsBuilderWithoutPercentageWithTwoDecimal(data.NursePatientRatio, 'myDashboardSection81', "column", "Nurse: Patient Ratio", 8);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardSection81', "column", "Nurse: Patient Ratio", 1);
            }
            // --- Section 8.2
            if (data.healthCareassistantPatientratio != null && data.healthCareassistantPatientratio.length > 2) {
                GraphsBuilderWithoutPercentageWithTwoDecimal(data.healthCareassistantPatientratio, 'myDashboardSection82', "column", "Health Care Assistant: Patient Ratio", 8);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardSection82', "column", "Health Care Assistant: Patient Ratio", 1);
            }
            // --- Section 9.1
            if (data.therapistPatientratio != null && data.therapistPatientratio.length > 2) {
                GraphsBuilderWithoutPercentageWithTwoDecimal(data.therapistPatientratio, 'myDashboardSection91', "column", "Therapist: Patient Ratio", 8);
            } else {
                EmptyGraphsBuilderWithoutPercentageTwoDecimal('myDashboardSection91', "column", "Therapist: Patient Ratio", 1);
            }
            // --- Section 9.2
            if (data.physicianPatientratio != null && data.physicianPatientratio.length > 2) {
                GraphsBuilderWithoutPercentageWithTwoDecimal(data.physicianPatientratio, 'myDashboardSection92', "column", "Physician : Patient Ratio", 8);
            } else {
                EmptyGraphsBuilderWithoutPercentageTwoDecimal('myDashboardSection92', "column", "Physician : Patient Ratio", 1);
            }
        }
    });
}

//-------------$$$$$$$$$$$$$$$$$--Above Methods NOT-IN-USE--$$$$$$$$$$$$$$$$$$$$$$$$$