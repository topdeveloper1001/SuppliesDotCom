$(function () {
    BindFiscalYearDDls('#ddlYear','');
});

function BindProjectsData() {
    var ddlYear = $('#ddlYear').val() != null ? $('#ddlYear').val() : 0;
    var jsonData = JSON.stringify({
        year: ddlYear
    });
    $.ajax({
        type: "POST",
        url: "/ExternalDashboard/BindProjectData",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#divProjectsDashboard').empty();
            $('#divProjectsDashboard').html(data);
        },
        error: function (msg) {
        }
    });
}