$(function () {
    BindKPIDropdownData();
    BindResponsibleUsers();
    if ($('#btnReBindGraphsProjects').length > 0) {
        $('#btnReBindGraphsProjects').on('click', function () {
            BindProjectsDashboard();
        });
    } else {
        $('#btnReBindGraphs').on('click', function () {
            BindExecutiveKeyIndicatorDashboard();
        });
    }
});

var Enableddls = function () {
    var facilityId = $('#ddlFacility').val();
    if (facilityId === "0") {
        $('.facDisabled').removeAttr('disabled');
    } else {
        $('.facDisabled').val('0');
        $('.facDisabled').attr('disabled', 'disabled');
    }
}

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

function BindExecutiveKeyIndicatorDashboard() {
    /// <summary>
    /// Binds the executive key indicator dashboard.
    /// </summary>
    /// <returns></returns>
    var facilityId = $('#ddlFacility').val();
    var facilityType = $('#ddlFacilityType').val();
    var regionType = $('#ddlRegionType').val();
    var jsonData = JSON.stringify({
        facilityId: facilityId,
        facilityType: facilityType,
        segment: regionType,
    });
    $.ajax({
        cache: false,
        type: "POST",
        url: '/ExternalDashboard/ExecutiveKeyPerformanceFilters',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#divExecutiveKeyIndicatorDashboard').empty();
            $('#divExecutiveKeyIndicatorDashboard').html(data);
        },
        error: function (msg) {
        }
    });
}

function BindProjectsDashboard() {
    /// <summary>
    /// Binds the executive key indicator dashboard.
    /// </summary>
    /// <returns></returns>
    var facilityId = $('#ddlFacility').val();
    var facilityType = $('#ddlFacilityType').val();
    var regionType = $('#ddlRegionType').val();
    var jsonData = JSON.stringify({
        facilityId: facilityId,
        facilityType: facilityType,
        segment: regionType,
        userId: $("#ddlOwnership").val() > 0 ? $("#ddlOwnership").val() : "0"
    });
    $.ajax({
        cache: false,
        type: "POST",
        url: '/ExternalDashboard/ProjectsDashboardFilters',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#divProjectDashboard').empty();
            $('#divProjectDashboard').html(data);
        },
        error: function (msg) {
        }
    });
}

function DownloadImage() {
    html2canvas(document.body, {
        onrendered: function (canvas) {
            var image = canvas.toDataURL("image/png");
            image = image.replace('data:image/png;base64,', '');
            $.ajax({
                type: "POST",
                url: '/Home/DownloadSnapshot',
                dataType: 'text',
                data: { base64data: image },
                success: function (result) { },
                error: function (result) { }
            });
        }
    }
    );
}


function BindKPIDropdownData() {
    $.getJSON("/ExternalDashboard/BindKPIDropdownData", {}, function (data) {
        if (data != null) {
            BindDropdownDataV2(data.ftList, "#ddlFacilityType", "", "All");
            BindDropdownDataV2(data.rList, "#ddlRegionType", "", "All");
            BindDropdownDataV2(data.fList, "#ddlFacility", "", "---All---");

            if ($("#ddlMonth").length > 0)
                BindDropdownDataV2(data.mList, "#ddlMonth", data.defaultMonth, "--Select--");

            BindDropdownDataV2(data.dList, "#ddlDepartment", "", "All");
        }
    });
}










///---------------Methods not in use--------------
function BindResponsibleUsers() {
    $.getJSON("/Home/GetNonAdminUsersByCorporate", null, function (data) {
        BindDropdownData(data, "#ddlOwnership", "");
    });
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

function BindAllExecutiveKeyPerformGraphs() {
    /// <summary>
    /// Binds all clinical quality graphs.
    /// </summary>
    /// <returns></returns>
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 0;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0,// $('#ddlFacility').val(),
        month: $('#ddlMonth').val(),
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/ExecKeyPerformanceData", jsonData, function (data) {
        if (data != null && data != "") {
            EmptyGraphsBuilderWithoutPercentageTarget('myDashboardIncidents', "column", "NON MEDICATION RELATED INCIDENTS", 1);
            EmptyGraphsBuilderWithoutPercentageTarget('myDashboardTypesOfIncidents', "column", "TYPES OF INCIDENTS", 1);
            EmptyGraphsBuilderWithoutPercentageTarget('myDashboardCategoryOfIncidents', "column", "CATEGORY OF THE INCIDENTS", 1);
            EmptyGraphsBuilderWithoutPercentageTarget('myDashboardMedicationError', "column", "MEDICATION ERRORS", 1);
        }
    });
}

function BindFacilitiesInExeKpi(selector, selectedId) {
    //Bind Facilities
    /// <summary>
    /// Binds the facilities.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: "/Home/GetFacilitiesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            $(selector).empty();
            var items = '<option value="0">--All--</option>';
            $.each(data, function (i, facility) {
                items += "<option value='" + facility.Value + "'>" + facility.Text + "</option>";
            });
            $(selector).html(items);

            if (selectedId != null && selectedId != '')
                $(selector).val(selectedId);
        },
        error: function (msg) {
        }
    });
}