function BindDataToJqDatatable(selector, url, isPaging, bProcessing, columns, objData) {
    $('#' + selector).dataTable({
        sAjaxSource: url,
        "scrollY": "200px",
        "scrollCollapse": true,
        bProcessing: bProcessing,
        paging: isPaging,
        aoColumnDefs: columns
    });
}


function BindJQDatatableWithData(selector, columns, data, isPaging = true, bProcessing = true) {
    $('#' + selector).dataTable({
        aaData: data,
        scrollY: "200px",
        scrollCollapse: true,
        bProcessing: bProcessing,
        paging: isPaging,
        aoColumnDefs: columns
    });
}