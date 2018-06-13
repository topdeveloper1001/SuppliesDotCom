
CodeType = new function () {
    this.ServiceCode = 1;
    this.CPT = 2;
    this.DRG = 3;
    this.HCPCS = 4;
    this.Denial = 5;
    this.DiagnosisCode = 6;
    this.Drug = 7;
};

function SearchCodes(txtSelector, CodeType, searchResultDivSelector) {

    var searchText = $(txtSelector).val().trim();
    var tableNumber = $("#hfCodeTableNumber").val();
    var drugValue = $("#ddlDrugGridView").val();
    var drugStatus;
    if (drugValue != 0) {
        drugStatus = $("#ddlDrugGridView").val();
    } else {
        drugStatus = '0';
    }
    //if (DrugStatus)
    //if (searchText != '' && CodeType != '') {
    var jsonData = "";
    if (searchResultDivSelector == "#DrugListDiv" || searchResultDivSelector == "#DiagnosisCodeListDiv") {
        jsonData = JSON.stringify({
            text: searchText,
            searchType: CodeType,
            drugStatus: drugStatus,
            blockNumber: 2
        });
    } else {
        jsonData = JSON.stringify({
            text: searchText,
            searchType: CodeType,
            drugStatus: drugStatus,
            tableNumber: tableNumber
        });
    }
    if (ajaxStartActive) {
        ajaxStartActive = false;
    }
    $('#loader_event').show();
    $('#loader_event').show();
    $.ajax({
        type: "POST",
        url: "/Home/GetFilteredCodes",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#loader_event').hide();
            $(searchResultDivSelector).empty();
            $(searchResultDivSelector).html(data);
            var stringExpected = '?text=' + searchText + '&searchType=' + CodeType + '&';
            SetGridPaging('?', stringExpected);

            if (CodeType != 20) {
                SetGridCheckBoxes();
                setTimeout(CheckUncheckedBoxes(), 800);
                setTimeout(function () {
                    DisableEnable();
                    if (CodeType == 4) {
                        SetGridSorting(SortHCPCSCodeGrid, "#gridContent");
                    }
                    if (CodeType == 9) {
                        SetGridSorting(SortDrgCodeGrid, "#DRGCodesListDiv");
                    }
                    if (CodeType == 3) {
                        SetGridSorting(SortCptCodeGrid, "#CPTCodesListDiv");
                    }
                    if (CodeType == 5) {
                        SetGridSorting(SortDrugCodeGrid, "#DrugListDiv");
                    }
                    if (CodeType == 16) {
                        SetGridSorting(SortDiagnosisCodeList, "#DiagnosisCodeListDiv");
                    }
                    if (CodeType == 14) {
                        SetGridSorting(SortServiceCodeGrid, "#gridContent");
                    }
                    if (CodeType == 19) {
                        SetGridSorting(SortDenialCodeGrid, "#gridContent");
                    }

                }, 500);
            }

        },
        error: function (msg) {
        }
    });
    //}
    //else {

    //    ShowMessage("Plaese Enter The Code or Description!", "Warning", "warning", true);
    //}
}

//function SearchCodes(txtSelector, CodeType, searchResultDivSelector) {
//    
//    var searchText = $(txtSelector).val().trim();
//    var drugValue = $("#ddlDrugGridView").val();
//    var drugStatus;
//    if (drugValue != 0) {
//        drugStatus = $("#ddlDrugGridView").val();
//    } else {
//        drugStatus = '0';
//    }

//    //if (DrugStatus)
//    if (searchText != '' && CodeType != '') {
//        var jsonData = JSON.stringify({
//            text: searchText,
//            searchType: CodeType,
//            drugStatus: drugStatus
//        });

//        $.ajax({
//            type: "POST",
//            url: "/Home/GetFilteredCodes",
//            async: true,
//            contentType: "application/json; charset=utf-8",
//            dataType: "",
//            data: jsonData,
//            success: function (data) {
//                
//                $(searchResultDivSelector).empty();
//                $(searchResultDivSelector).html(data);
//                var stringExpected = '?text=' + searchText + '&searchType=' + CodeType + '&';
//                SetGridPaging('?', stringExpected);
//            },
//            error: function (msg) {
//            }
//        });
//    }
//    else {

//        ShowMessage("Plaese Enter The Code or Description!", "Warning", "warning", true);
//    }
//}

function CheckUncheckedBoxes() {
    var checkedCount = $('.check-box:checked').length;
    var classCount = $('.check-box').length;
    //if (checkedCount == 0) {
    //    $("#btnMarkAsInActive").addClass("disabled");
    //} else {
    //    $("#btnMarkAsInActive").removeClass("disabled");
    //}
    if (checkedCount == classCount) {
        $("#chkHeader").prop('checked', true);
    } else {
        $("#chkHeader").prop('checked', false);
    }
}

function DisableEnable() {
    $('#chkHeader').on('click', function (e) {
        $(".check-box").prop('checked', e.target.checked);
        //if (e.target.checked) {
        //    $("#btnMarkAsInActive").removeClass("disabled");
        //} else {
        //    $("#btnMarkAsInActive").addClass("disabled");
        //}
    });
    $('.check-box').on('click', function (e) {
        CheckUncheckedBoxes();
    });
}

var ExportToExcel = function (type) {
    var item = type == 1 ? $("#btnExportExcel") :
        type == 2 ? $("#btnCptToExcel") :
            type == 3 ? $("#btnServiceCode") :
                type == 4 ? $("#btnHCPCSToExcel") :
                    type == 5 ? $("#btnDiagnosisCodeToExcel") :
                        type == 6 ? $("#btnDRUGCodeToExcel") :
                            $("#btnDRGToExcel");
    var hrefString = item.attr("href");
    if (hrefString.indexOf('&') != '-1') {
        hrefString = hrefString.split('&')[0];
    }
    var controllerAction = hrefString;
    var searchText = $("#SearchCodeOrDesc").val();
    var hrefNew = controllerAction + "&searchText=" + searchText;
    var tableNumber = $("#hfCodeTableNumber").val();
    hrefNew = hrefNew + "&tableNumber=" + tableNumber;
    item.removeAttr('href');
    item.attr('href', hrefNew);
    return false;
}
function excelImport() {
    $('#loader_event').show();
    var url = '/Drug/ImportDrugCodesToDB';
    var photo = document.getElementById("ImportFile");
    var file = photo.files[0];
    var data = new FormData();
    data.append('file', file);
    $.ajax({
        type: "POST",
        url: url,
        enctype: "multipart/form-data",
        async: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (data) {
            var splitArray = data.split("`");
            switch (splitArray[1]) {
                case "1":
                    ShowMessage(splitArray[0], "Success", "success", true);
                    $("#ImportFile").val('');
                    break;
                case "0":
                    ShowMessage(splitArray[0], "Error", "error", true);
                    $("#ImportFile").val('');
                    break;
                case "2":
                    ShowMessage(splitArray[0], "Warning", "warning", true);
                    break;
            }
            $('#loader_event').hide();
        },
        error: function (msg) {
            ShowMessage(msg, "Error", "error", true);
            $('#loader_event').hide();
            $("#ImportFile").val('');
        }
    });
}

function BeforeExportToExcel(selector, codeType) {
    var item = $('#' + selector);
    var hrefString = item.attr("href");
    if (hrefString.indexOf('&') != '-1') {
        hrefString = hrefString.split('&')[0];
    }
    var controllerAction = hrefString;
    var searchText = $("#SearchCodeOrDesc").length > 0 ? $("#SearchCodeOrDesc").val() : "";
    var hrefNew = controllerAction + "&searchText=" + searchText;
    hrefNew = hrefNew + "&codeType=" + codeType;

    if ($("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0)
        hrefNew = hrefNew + "&tn=" + $("#ddlTableSet").val();

    item.removeAttr('href');
    item.attr('href', hrefNew);
    return false;
}

function ImportBillingCodes(codeType) {
    var url = '/Home/ImportAndSaveBillingCodesToDB';

    if (CheckIfFileIsSpreadsheet("ImportFile")) {
        var fileData = document.getElementById("ImportFile");
        var file = fileData.files[0];
        $('#loader_event').show();
        var data = new FormData();
        data.append('codeType', codeType);
        data.append('file', file);
        $.ajax({
            type: "POST",
            url: url,
            enctype: "multipart/form-data",
            async: false,
            contentType: false,
            processData: false,
            data: data,
            success: function (data) {
                var msg = "";
                var caption = "";
                var msgType = "";

                switch (parseInt(data)) {
                    case 1:
                        msg = "File Imported Successfully";
                        caption = "Success";
                        msgType = "success";
                        break;
                    case 101:
                        msg = "File has some invalid data";
                        caption = "Invalid!!";
                        msgType = "warning";
                        break;
                    case 102:
                        msg = "Effective Dates are Invalid!";
                        caption = "Invalid!!";
                        msgType = "warning";
                        break;
                    case 103:
                        msg = "No Records found in the file!";
                        caption = "No Data!";
                        msgType = "error";
                        break;
                    case 104:
                        msg = "Error while Importing file!! Try again in few momemts again. Thank You.";
                        caption = "Oops!";
                        msgType = "error";
                        break;
                    case 105:
                        msg = "Billing Code is mandatory for Imports. Check the records!!";

                        if (codeType == "bm")
                            msg = "Billing Modifier Codes are mandatory for Imports. Check the records!!"
                        else if (codeType == "pos")
                            msg = "PlaceOfService Codes are mandatory for Imports. Check the records!!"

                        caption = "Code Missing!!";
                        msgType = "warning";
                        break;
                    default:
                        msg = "";
                        break;
                }

                $("#ImportFile").val('');
                $('#loader_event').hide();

                if ($("#dtBillingModifier").length > 0)
                    GetBillingModifierList();
                else if ($("#dtPlaceOfService").length > 0)
                    GetPlaceOfServiceList();

                ShowMessage(msg, caption, msgType, true);
            },
            error: function (msg) {
                ShowMessage(msg, "Error", "error", true);
                $('#loader_event').hide();
                $("#ImportFile").val('');
            }
        });
    }
}

function CheckIfFileIsSpreadsheet(fileSelector) {
    var value = $("#" + fileSelector).val();
    var msg = "";
    if (value == '') {
        msg = "It seems File is not added yet to Import data to Database!!";
        ShowErrorMessage(msg, true);
        return false;
    }
    if (value != '') {
        if (!value.match(/\.xlsx|.xls/)) {
            msg = 'Only files having extensions .xls or .xlsx, are permissible to be uploaded here!';
        }
    }
    if (msg != "") {
        ShowErrorMessage(msg)
        return false;
    }
    return true;
}