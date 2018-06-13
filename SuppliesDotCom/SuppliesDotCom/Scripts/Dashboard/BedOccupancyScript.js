$(function () {
    BindCorporateDataInBedOccupancy();
    BindDropDownOnlyWithSelect("#ddlFacilityFilter");

    $("#ddlFacilityFilter").change(function () {
        var selected = $(this).val();
        $("#hfFacilityId").val(selected > 0 ? selected : "");
    });

    $("#btnRebindGraphs").click(function () {
        RebindBedOccupancyCharts();
    });
});

function BindCorporateDataInBedOccupancy() {
    //Bind Corporates
    /// <summary>
    /// Binds the corporates.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: "/Home/GetCorporatesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, "#ddlCorporate", "#hfCorporateId");
            var corporaeIdFilter = $("#ddlCorporate").val();
            if (corporaeIdFilter > 0) {
                BindFacilityDropdownFilterInBedOccupancy(corporaeIdFilter);
            }
        },
        error: function (msg) {
        }
    });
}

function BindFacilityDropdownFilterInBedOccupancy(cId) {
    if (cId > 0) {
        $.ajax({
            type: "POST",
            url: "/Home/GetFacilitiesbyCorporate",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ corporateid: cId }),
            success: function (data) {
                BindDropdownData(data, "#ddlFacilityFilter", "#hfFacilityId");
                if ($("#ddlFacilityFilter").val() == null)
                    $("#ddlFacilityFilter")[0].selectedIndex = 0;
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }
    else {
        BindDropdownData('', "#ddlFacilityFilter", "");
        $("#ddlFacilityFilter")[0].selectedIndex = 0;
    }
    $("#hfCorporateId").val(cId > 0 ? cId : "");
}

function RebindBedOccupancyCharts() {
    if ($("#ddlCorporate").val() > 0 && $("#ddlFacilityFilter").val() > 0) {
        $.ajax({
            type: "POST",
            url: "/Dashboard/RebindBedOccupancyData",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ facilityId: $("#ddlFacilityFilter").val(), corporateId: $("#ddlCorporate").val() }),
            success: function (data) {
                //Re bind the Bed Occupancy PieChart Data
                BedOccupancyPieGraph($("#ddlFacilityFilter").val(), $("#ddlCorporate").val());

                //Rebind the Bed Occupancy First List data in the First Panel
                var currentData = data.currentBedsStats;
                if (currentData != null) {
                    $("#lblTotalBeds").html("Total Beds (" + currentData.TotalBeds + ")");
                    $("#lblOccupiedBeds").html(currentData.OccupiedBeds);
                    $("#lblVacantBeds").html(currentData.VacantBeds);
                    var occupancyRate = currentData.OccupiedRate;
                    if (currentData.OccupiedRate > 0.0) {
                        occupancyRate = (occupancyRate * 100).toFixed(2);
                    }
                    $("#lblOccupancyRate").html(occupancyRate + " %");
                }

                //Rebind Bed Occupancy Hierarchy Structure.
                $("#DivBedOccupancyStruc").empty();
                $("#DivBedOccupancyStruc").html(data.partialViewResult);
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    } else {
        ShowMessage($("#ddlCorporate").val() == 0 ? "Select Corporate first!" : "Select Facility first!", "Alert", "warning", true);
    }
}
