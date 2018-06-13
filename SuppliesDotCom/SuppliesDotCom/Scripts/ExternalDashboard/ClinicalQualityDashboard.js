$(function () {
    //BindDepartmentsDropdown();
    //BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    //BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    //BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    //BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    ////BindMonthsListCustomPreviousMonth('#ddlMonth', '');


    //setTimeout(function () {
    //    //BindAllClinicalQualityGraphs();
    //    BindAllClinicalQualityGraphs_New();
    //    $('#ddlFacility option[value="0"]').text('---All---');
    //}, 500);

    BindAllClinicalDataOnLoad($("#hdFacilityId").val());

    $('#btnReBindGraphs').on('click', function () {
        //BindAllClinicalQualityGraphs();
        //BindAllClinicalQualityGraphs_New();
        RebindClinicalGraphs();
    });
});

function BindAllClinicalDataOnLoad(facilityId) {
    facilityId = facilityId == 14 ? 17 : facilityId;
    $.getJSON("/ExternalDashboard/BindAllClinicalDataOnLoad", { facilityId: facilityId }, function (data) {
        if (data != null && data != "") {
            BindDropdownDataV2(data.ftList, "#ddlFacilityType", "", "All");
            BindDropdownDataV2(data.rList, "#ddlRegionType", "", "All");
            BindDropdownDataV2(data.fList, "#ddlFacility", data.facilityid, "---All---");

            if ($("#ddlMonth").length > 0)
                BindDropdownDataV2(data.mList, "#ddlMonth", data.defaultMonth, "--Select--");

            BindDropdownDataV2(data.dList, "#ddlDepartment", "", "All");


            //Graphs Binding starts here
            BindGraphsInClinical(data);
        }
    });
}

function BindGraphsInClinical(data) {
    if (data != null && data != "") {
        //--Total sentinel events p--- Section 1
        if (data.totalsentinelevents != null && data.totalsentinelevents.length > 2) {
            GraphsBuilderWithoutPercentage(data.totalsentinelevents, 'myDashboardManagementHighAlertMedication', "column", "Total sentinel events", 2);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardManagementHighAlertMedication', "column", "Total sentinel events", 2);
        }
        //--Patient Fall Rate (per 1000 bed days) --- Section 1
        if (data.patienFallRate != null && data.patienFallRate.length > 2) {
            GraphsBuilderWithoutPercentageTarget(data.patienFallRate, 'myDashboardPatientFallRatewithInjury', "column", "Patient Fall Rate (per 1000 bed days) ", 1);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardPatientFallRatewithInjury', "column", "Patient Fall Rate (per 1000 bed days) ", 1);
        }
        //--Total Near miss --- Section 2
        if (data.totalNearmiss != null && data.totalNearmiss.length > 2) {
            GraphsBuilderWithoutPercentage(data.totalNearmiss, 'myDashboardDischargeCommunityRate', "column", "Total Near miss ", 2);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardDischargeCommunityRate', "column", "Total Near miss ", 2);
        }
        // -- Total adverse incidents  --- Section 2
        if (data.totaladverseincidents != null && data.totaladverseincidents.length > 2) {
            GraphsBuilderWithoutPercentage(data.totaladverseincidents, 'myDashboardLostReferals', "column", "Total adverse incidents ", 2);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardLostReferals', "column", "Total adverse incidents ", 2);
        }

        // -- Total Medication Errors  --- Section 3
        if (data.TotalMedicationErrors != null && data.TotalMedicationErrors.length > 2) {
            GraphsBuilderWithoutPercentage(data.TotalMedicationErrors, 'myDashboardTransferOutRate', "column", "Total Medication Errors ", 2);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardTransferOutRate', "column", "Total Medication Errors ", 2);
        }
        // -- Total Incidents Reports  --- Section 3
        if (data.totalIncidentsReports != null && data.totalIncidentsReports.length > 2) {
            GraphsBuilderWithoutPercentage(data.totalIncidentsReports, 'myDashboardPressureUlcerIncidentRate', "column", "Total Incidents Reports", 2);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardPressureUlcerIncidentRate', "column", "Total Incidents Reports", 2);
        }

        // --MDRO Rate Section 4
        if (data.mdroRate != null && data.mdroRate.length > 2) {
            GraphsBuilderWithoutPercentageTarget(data.mdroRate, 'myDashboardMDRORate', "column", "MDRO Rate", 1);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardMDRORate', "column", "MDRO Rate", 1);
        }
        // --MRSA Rate Section 4
        if (data.mrsaRate != null && data.mrsaRate.length > 2) {
            GraphsBuilderWithoutPercentageTarget(data.mrsaRate, 'myDashboardMRSARate', "column", "MRSA Rate", 1);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardMRSARate', "column", "MRSA Rate", 1);
        }

        // --Hand Hygiene Compliance  Section 5
        if (data.handHygieneCompliance != null && data.handHygieneCompliance.length > 2) {
            GraphsBuilderWith100TargetWithoutDecimal(data.handHygieneCompliance, 'myDashboardESBLRate', "column", "Hand Hygiene Compliance ");
        } else {
            EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardESBLRate', "column", "Hand Hygiene Compliance", 2, "By Month");
        }
        // --Pressure Ulcer Incident Rate   Section 5
        if (data.pressureUlcerIncidentRate != null && data.pressureUlcerIncidentRate.length > 2) {
            GraphsBuilderWith100TargetWithoutDecimal(data.pressureUlcerIncidentRate, 'myDashboardLRTIRate', "column", "Pressure Ulcer Incident Rate");
        } else {
            EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardLRTIRate', "column", "Pressure Ulcer Incident Rate", 2, "By Month");
        }


        // -- Average FIM Score - PAR  Section 6
        if (data.averageFIMScorePAR != null && data.averageFIMScorePAR.length > 2) {
            GraphsBuilderWith100Target(data.averageFIMScorePAR, 'myDashboardCautiRate', "column", "Average FIM Score - PAR", 3);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardCautiRate', "column", "Average FIM Score - PAR", 1);
        }
        // -- Average FIM Score – LTC   Section 6
        if (data.averageFIMScoreLTC != null && data.averageFIMScoreLTC.length > 2) {
            GraphsBuilderWith100Target(data.averageFIMScoreLTC, 'myDashboardBSIRate', "column", "Average FIM Score – LTC", 3);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardBSIRate', "column", "Average FIM Score – LTC", 1);
        }

        // --- Section 7,8,9
        if (data.inappropriateAntiBioticUsageRate != null && data.inappropriateAntiBioticUsageRate.length > 2) {
            GraphsBuilderWith100Target(data.inappropriateAntiBioticUsageRate, 'myDashboardInappropriateAntiBioticUsageRate', "column", "Inappropriate Anti-Biotic Usage Rate", 1);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardInappropriateAntiBioticUsageRate', "column", "Inappropriate Anti-Biotic Usage Rate", 1);
        }
        // --- Section 7,8,9
        if (data.nonMedicationRelatedIncidents != null && data.nonMedicationRelatedIncidents.length > 2) {
            BuildActualFiveBarGraphs(data.nonMedicationRelatedIncidents, 'myDashboardIncidents', "column", "NON MEDICATION RELATED INCIDENTS", 1, "");
        } else {
            EmptyGraphsBuilderWithoutPercentageTarget('myDashboardIncidents', "column", "NON MEDICATION RELATED INCIDENTS", 1);
        }
        // --- Section 7,8,9
        if (data.typeOfIncidents != null && data.typeOfIncidents.length > 2) {
            BuildActualFourBarGraphs(data.typeOfIncidents, 'myDashboardTypesOfIncidents', "column", "TYPES OF INCIDENTS", 1, "");
        } else {
            EmptyGraphsBuilderWithoutPercentageTarget('myDashboardTypesOfIncidents', "column", "TYPES OF INCIDENTS", 1);
        }
        // --- Section 7,8,9
        if (data.categoryofIncidents != null && data.categoryofIncidents.length > 2) {
            GraphsBuilderWithoutPercentageDefination(data.categoryofIncidents, 'myDashboardCategoryOfIncidents', "column", "CATEGORY OF THE INCIDENTS", 1, "");
        } else {
            GraphsBuilderWithoutPercentageTarget('myDashboardCategoryOfIncidents', "column", "CATEGORY OF THE INCIDENTS", 1);
        }
        // --- Section 7,8,9
        if (data.medicationErrors != null && data.medicationErrors.length == 20) {
            BuildBudgetTenBarGraphs(data.medicationErrors, 'myDashboardMedicationError', "column", "MEDICATION ERRORS", 1, "");
        } else {
            EmptyGraphsBuilderWithoutPercentageTarget('myDashboardMedicationError', "column", "MEDICATION ERRORS", 1);
        }
    }
}

function RebindClinicalGraphs() {
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
    $.getJSON("/ExternalDashboard/RebindClinicalGraphs", jsonData, function (data) {
        BindGraphsInClinical(data);
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

function BindAllClinicalQualityGraphs() {
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
    $.post("/ExternalDashboard/ClinicalGraphsData", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.hamList != null && data.hamList.length > 2) {
                GraphsBuilderWith100Target(data.hamList, 'myDashboardManagementHighAlertMedication', "column", "Total sentinel events", 1);
                //GraphsBuilderWith100(data.hamList, 'myDashboardHighAlertMedication1', "column", "Management of High Alert Medication", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardManagementHighAlertMedication', "column", "Total sentinel events", 1);
            }
            if (data.dischargeToComunityrate != null && data.dischargeToComunityrate.length > 2) {
                GraphsBuilderWith100Target(data.dischargeToComunityrate, 'myDashboardDischargeCommunityRate', "column", "Total Near miss", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargeCommunityRate', "column", "Total Near miss", 1);
            }
            if (data.lostReferals != null && data.lostReferals.length > 2) {
                GraphsBuilderWith100Target(data.lostReferals, 'myDashboardLostReferals', "column", " Total adverse incidents", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardLostReferals', "column", " Total adverse incidents", 1);
            }
            if (data.transferOutRate != null && data.transferOutRate.length > 2) {
                GraphsBuilderWith100Target(data.transferOutRate, 'myDashboardTransferOutRate', "column", "Total Medication Errors", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTransferOutRate', "column", "Total Medication Errors", 1);
            }
            if (data.patientFallRatewithInjury != null && data.patientFallRatewithInjury.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.patientFallRatewithInjury, 'myDashboardPatientFallRatewithInjury', "column", "Patient Fall Rate (per 1000 bed days)", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPatientFallRatewithInjury', "column", "Patient Fall Rate (per 1000 bed days)", 1);
            }
            if (data.pressureUlcerIncidentRate != null && data.pressureUlcerIncidentRate.length > 2) {
                GraphsBuilderWith100Target(data.pressureUlcerIncidentRate, 'myDashboardPressureUlcerIncidentRate', "line", "Total Incidents Reports", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPressureUlcerIncidentRate', "line", "Total Incidents Reports", 2);
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
                GraphsBuilderWithoutPercentageTarget(data.esblRate, 'myDashboardESBLRate', "column", "Hand Hygiene Compliance", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardESBLRate', "column", "Hand Hygiene Compliance", 1);
            }
            if (data.lrtiRate != null && data.lrtiRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.lrtiRate, 'myDashboardLRTIRate', "column", "Pressure Ulcer Incident Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardLRTIRate', "column", "Pressure Ulcer Incident Rate", 1);
            }
            if (data.cautiRate != null && data.cautiRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.cautiRate, 'myDashboardCautiRate', "column", "Average FIM Score - PAR", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardCautiRate', "column", "Average FIM Score - PAR", 1);
            }
            if (data.bsiRate != null && data.bsiRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.bsiRate, 'myDashboardBSIRate', "column", "Average FIM Score - LTC", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardBSIRate', "column", "Average FIM Score - LTC", 1);
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

function BindAllClinicalQualityGraphs_New() {
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
    $.post("/ExternalDashboard/ClinicalGraphsData_New", jsonData, function (data) {
        if (data != null && data != "") {
            //--Total sentinel events p--- Section 1
            if (data.totalsentinelevents != null && data.totalsentinelevents.length > 2) {
                GraphsBuilderWithoutPercentage(data.totalsentinelevents, 'myDashboardManagementHighAlertMedication', "column", "Total sentinel events", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardManagementHighAlertMedication', "column", "Total sentinel events", 2);
            }
            //--Patient Fall Rate (per 1000 bed days) --- Section 1
            if (data.patienFallRate != null && data.patienFallRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.patienFallRate, 'myDashboardPatientFallRatewithInjury', "column", "Patient Fall Rate (per 1000 bed days) ", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPatientFallRatewithInjury', "column", "Patient Fall Rate (per 1000 bed days) ", 1);
            }
            //--Total Near miss --- Section 2
            if (data.totalNearmiss != null && data.totalNearmiss.length > 2) {
                GraphsBuilderWithoutPercentage(data.totalNearmiss, 'myDashboardDischargeCommunityRate', "column", "Total Near miss ", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargeCommunityRate', "column", "Total Near miss ", 2);
            }
            // -- Total adverse incidents  --- Section 2
            if (data.totaladverseincidents != null && data.totaladverseincidents.length > 2) {
                GraphsBuilderWithoutPercentage(data.totaladverseincidents, 'myDashboardLostReferals', "column", "Total adverse incidents ", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardLostReferals', "column", "Total adverse incidents ", 2);
            }

            // -- Total Medication Errors  --- Section 3
            if (data.TotalMedicationErrors != null && data.TotalMedicationErrors.length > 2) {
                GraphsBuilderWithoutPercentage(data.TotalMedicationErrors, 'myDashboardTransferOutRate', "column", "Total Medication Errors ", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTransferOutRate', "column", "Total Medication Errors ", 2);
            }
            // -- Total Incidents Reports  --- Section 3
            if (data.totalIncidentsReports != null && data.totalIncidentsReports.length > 2) {
                GraphsBuilderWithoutPercentage(data.totalIncidentsReports, 'myDashboardPressureUlcerIncidentRate', "column", "Total Incidents Reports", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPressureUlcerIncidentRate', "column", "Total Incidents Reports", 2);
            }

            // --MDRO Rate Section 4
            if (data.mdroRate != null && data.mdroRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.mdroRate, 'myDashboardMDRORate', "column", "MDRO Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardMDRORate', "column", "MDRO Rate", 1);
            }
            // --MRSA Rate Section 4
            if (data.mrsaRate != null && data.mrsaRate.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.mrsaRate, 'myDashboardMRSARate', "column", "MRSA Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardMRSARate', "column", "MRSA Rate", 1);
            }

            // --Hand Hygiene Compliance  Section 5
            if (data.handHygieneCompliance != null && data.handHygieneCompliance.length > 2) {
                GraphsBuilderWith100TargetWithoutDecimal(data.handHygieneCompliance, 'myDashboardESBLRate', "column", "Hand Hygiene Compliance ");
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardESBLRate', "column", "Hand Hygiene Compliance", 2, "By Month");
            }
            // --Pressure Ulcer Incident Rate   Section 5
            if (data.pressureUlcerIncidentRate != null && data.pressureUlcerIncidentRate.length > 2) {
                GraphsBuilderWith100TargetWithoutDecimal(data.pressureUlcerIncidentRate, 'myDashboardLRTIRate', "column", "Pressure Ulcer Incident Rate");
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardLRTIRate', "column", "Pressure Ulcer Incident Rate", 2, "By Month");
            }


            // -- Average FIM Score - PAR  Section 6
            if (data.averageFIMScorePAR != null && data.averageFIMScorePAR.length > 2) {
                GraphsBuilderWith100Target(data.averageFIMScorePAR, 'myDashboardCautiRate', "column", "Average FIM Score - PAR", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardCautiRate', "column", "Average FIM Score - PAR", 1);
            }
            // -- Average FIM Score – LTC   Section 6
            if (data.averageFIMScoreLTC != null && data.averageFIMScoreLTC.length > 2) {
                GraphsBuilderWith100Target(data.averageFIMScoreLTC, 'myDashboardBSIRate', "column", "Average FIM Score – LTC", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardBSIRate', "column", "Average FIM Score – LTC", 1);
            }

            // --- Section 7,8,9
            if (data.inappropriateAntiBioticUsageRate != null && data.inappropriateAntiBioticUsageRate.length > 2) {
                GraphsBuilderWith100Target(data.inappropriateAntiBioticUsageRate, 'myDashboardInappropriateAntiBioticUsageRate', "column", "Inappropriate Anti-Biotic Usage Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardInappropriateAntiBioticUsageRate', "column", "Inappropriate Anti-Biotic Usage Rate", 1);
            }
            // --- Section 7,8,9
            if (data.nonMedicationRelatedIncidents != null && data.nonMedicationRelatedIncidents.length > 2) {
                BuildActualFiveBarGraphs(data.nonMedicationRelatedIncidents, 'myDashboardIncidents', "column", "NON MEDICATION RELATED INCIDENTS", 1, "");
            } else {
                EmptyGraphsBuilderWithoutPercentageTarget('myDashboardIncidents', "column", "NON MEDICATION RELATED INCIDENTS", 1);
            }
            // --- Section 7,8,9
            if (data.typeOfIncidents != null && data.typeOfIncidents.length > 2) {
                BuildActualFourBarGraphs(data.typeOfIncidents, 'myDashboardTypesOfIncidents', "column", "TYPES OF INCIDENTS", 1, "");
            } else {
                EmptyGraphsBuilderWithoutPercentageTarget('myDashboardTypesOfIncidents', "column", "TYPES OF INCIDENTS", 1);
            }
            // --- Section 7,8,9
            if (data.categoryofIncidents != null && data.categoryofIncidents.length > 2) {
                GraphsBuilderWithoutPercentageDefination(data.categoryofIncidents, 'myDashboardCategoryOfIncidents', "column", "CATEGORY OF THE INCIDENTS", 1, "");
            } else {
                GraphsBuilderWithoutPercentageTarget('myDashboardCategoryOfIncidents', "column", "CATEGORY OF THE INCIDENTS", 1);
            }
            // --- Section 7,8,9
            if (data.medicationErrors != null && data.medicationErrors.length == 20) {
                BuildBudgetTenBarGraphs(data.medicationErrors, 'myDashboardMedicationError', "column", "MEDICATION ERRORS", 1, "");
            } else {
                EmptyGraphsBuilderWithoutPercentageTarget('myDashboardMedicationError', "column", "MEDICATION ERRORS", 1);
            }
        }
    });
}


//-------------$$$$$$$$$$$$$$$$$--Above Methods NOT-IN-USE--$$$$$$$$$$$$$$$$$$$$$$$$$