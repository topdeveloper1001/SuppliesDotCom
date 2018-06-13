$(function () {
    JsCalls();
    $("#btnMarkAsInActive").click(function () {
        var stringArray = new Array();
        var checkedItems = $('.check-box:checked');
        for (var i = 0, l = checkedItems.length; i < l; i++) {
            stringArray.push(checkedItems[i].defaultValue);
        }
        if (stringArray.length > 0) {
            var jsonData = JSON.stringify({
                codeValues: stringArray,
                orderType: "CPT"
            });
            $.ajax({
                type: "POST",
                url: '/Home/MarkInActive',
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: jsonData,
                success: function (data) {
                    if (data == "true") {
                        BindCPTCodesGrid(blockNumber);
                        ShowMessage("Selected Codes marked as InActive successfully", "Success", "success", true);
                        //$("#btnMarkAsInActive").addClass("disabled");
                    }
                },
                error: function (msg) {

                }
            });
        }
        else {
            ShowMessage("Select at least one billing code!", "warning", "warning", true);
        }
        CheckBoxIsSelectedEvent();
    });

    BindTableSetList("3", "#ddlTableSet", "0");
});

var blockNumber = 2;        //Infinate Scroll starts from second block
var noMoreData = false;
var inProgress = false;

function JsCalls() {
    $("#CPTCodesFormDiv").validationEngine();

    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });
    BindServiceMainCategories();

    BindCorporates('#ddlCorporate', '6');
    setTimeout(BindFacilitiesDropdownDataWithFacilityNumbers('#ddlFacility', '1002'), 500);
    $("#ddlCorporate").on('change', function () {
        if ($("#ddlCorporate").val() != '0') {
            BindFacilitiesDropdownDataWithFacilityNumbers('#ddlFacility', '');
            ShowHideViewRecords();
        }
    });

    SetGridCheckBoxes();
}

function editDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.CPTCodesId;
    EditCPTCodes(id);
}

function deleteDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.ServiceCodeId;
    DeleteCPTCodes(id);
}

function SaveCPTCodes(id) {
    id = $("#hfCPTCodesId").val();
    var isValid = jQuery("#CPTCodesFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var hdCPTCodesId = $("#hdCPTCodesId").val();
        //var txtCodeTableNumber = $("#txtCodeTableNumber").val();
        //var txtCodeTableDescription = $("#txtCodeTableDescription").val();
        var txtCodeNumbering = $("#txtCodeNumbering").val();
        var txtCodeDescription = $("#txtCodeDescription").val();
        var txtCodePrice = $("#txtCodePrice").val();
        var txtCodeAnesthesiaBaseUnit = $("#txtCodeAnesthesiaBaseUnit").val();
        var dtCodeEffectiveDate = $("#dtCodeEffectiveDate").val();
        var dtCodeExpiryDate = $("#dtCodeExpiryDate").val();
        var txtCodeBasicProductApplicationRule = $("#txtCodeBasicProductApplicationRule").val();
        var txtCodeOtherProductsApplicationRule = "txtCodeOtherProductsApplicationRule"; //$("#txtOrderedDateTime").val();
        var ddlCodeServiceMainCategory = $("#ddlGlobalCodeCategories").val();
        var ddlCodeServiceCodeSubCategory = $("#ddlGlobalCodes").val();
        var txtCodeUSCLSChapter = $("#txtCodeUSCLSChapter").val();
        var txtCodeCPTMUEValues = $("#txtCodeCPTMUEValues").val();
        var txtCodeGroup = $("#txtCodeGroup").val();
        var chkIsActive = $("#chkIsActive").is(':checked');

        var jsonData = JSON.stringify({
            CPTCodesId: hdCPTCodesId,
            //CodeTableNumber: txtCodeTableNumber,
            //CodeTableDescription: txtCodeTableDescription,
            CodeNumbering: txtCodeNumbering,
            CodeDescription: txtCodeDescription,
            CodePrice: txtCodePrice,
            CodeAnesthesiaBaseUnit: txtCodeAnesthesiaBaseUnit,
            CodeEffectiveDate: dtCodeEffectiveDate,
            CodeExpiryDate: dtCodeExpiryDate,
            CodeBasicProductApplicationRule: txtCodeBasicProductApplicationRule,
            CodeOtherProductsApplicationRule: txtCodeOtherProductsApplicationRule,
            CodeServiceMainCategory: ddlCodeServiceMainCategory,
            CodeServiceCodeSubCategory: ddlCodeServiceCodeSubCategory,
            CodeUSCLSChapter: txtCodeUSCLSChapter,
            CodeCPTMUEValues: txtCodeCPTMUEValues,
            CodeGroup: txtCodeGroup,
            IsActive: chkIsActive

        });
        $.ajax({
            type: "POST",
            url: '/CPTCodes/SaveCPTCodes',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                ClearAll();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";
                ShowMessage(msg, "Success", "success", true);
                $("#hfServiceCodeId").val('0');
                BindCPTCodesGrid(blockNumber);
            },
            error: function (msg) {

            }
        });
    }
}

//function EditCPTCodes(id) {
//    var jsonData = JSON.stringify({
//        Id: id
//    });
//    $.ajax({
//        type: "POST",
//        url: '/CPTCodes/GetCPTCodes',
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "html",
//        data: jsonData,
//        success: function (data) {
//            $('#CPTCodesFormDiv').empty();
//            $('#CPTCodesFormDiv').html(data);
//            BindServiceMainCategories();
//            var categoryId = $("#hdServiceMainCategory").val();
//            if (categoryId != null && categoryId != '') {
//                $("#ddlGlobalCodeCategories").val(categoryId);
//                var codeId = $("#hdServiceServiceCodeSub").val();
//                BindSubCategories(categoryId, codeId);
//            }
//            $('#collapseOne').addClass('in');
//            InitializeDateTimePicker(); //initialize the datepicker by ashwani
//            $("#btnSave").val("Update");
//            $('html,body').animate({ scrollTop: $("#CPTCodesFormDiv").offset().top }, 'fast');
//        },
//        error: function (msg) {
//        }
//    });
//}
function EditCPTCodes(id) {
    var jsonData = JSON.stringify({
        Id: id
    });
    $.ajax({
        type: "POST",
        url: '/CPTCodes/GetCptCodesOnEdit',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindCptCodeData(data);
            $('html,body').animate({ scrollTop: $("#CPTCodesFormDiv").offset().top }, 'fast');
        },
        error: function (msg) {
        }
    });
}

function ViewCPTCodes(id) {
    var txtCPTCodesId = id;
    var jsonData = JSON.stringify({
        Id: txtServiceCodeId,
        ViewOnly: 'true'
    });
    $.ajax({
        type: "POST",
        url: '/CPTCodes/GetCPTCodes',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#CPTCodesDiv').empty();
                $('#CPTCodesDiv').html(data);
                $('#collapseOne').addClass('in');
            } else {
            }
        },
        error: function (msg) {
        }
    });
}

function DeleteCPTCodes() {
    var txtCptCodesId = $("#hfGlobalConfirmId").val();
    var jsonData = JSON.stringify({
        Id: txtCptCodesId,
        IsDeleted: true,
        DeletedBy: 1, //Put logged in user id here
        DeletedDate: new Date(),
        IsActive: false
    });
    $.ajax({
        type: "POST",
        url: '/CPTCodes/DeleteCPTCodes',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                //BindCPTCodesGrid();
                BindCPTCodesGrid(blockNumber);
                ShowMessage("Records Deleted Successfully", "Success", "success", true);
            } else {
                return false;
            }
        },
        error: function (msg) {
            return true;
        }
    });
}


//function DeleteCPTCodes(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var txtCPTCodesId = id;
//        var jsonData = JSON.stringify({
//            Id: txtCPTCodesId,
//            IsDeleted: true,
//            DeletedBy: 1, //Put logged in user id here
//            DeletedDate: new Date(),
//            IsActive: false
//        });
//        $.ajax({
//            type: "POST",
//            url: '/CPTCodes/DeleteCPTCodes',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data) {
//                    //BindCPTCodesGrid();
//                    BindCPTCodesGrid(blockNumber);
//                    ShowMessage("Records Deleted Successfully", "Success", "success", true);
//                } else {
//                    return false;
//                }
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}



//function ExportCPTCodes() {
//    $.validationEngine.closePrompt(".formError", true);
//    $.ajax({
//        type: "POST",
//        url: '/CPTCodes/ExportCPTCodesToExcel',
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "html",
//        data: '',
//        success: function (data) {
//        },
//        error: function (msg) {
//            return true;
//        }
//    });
//}

function OnChangeGlobalCodeCategory() {
    var categoryId = $("#ddlGlobalCodeCategories").val();
    BindSubCategories(categoryId, "0");
    return false;
}

function BindSubCategories(categoryId, codeId) {
    var jsonData = JSON.stringify({ categoryId: categoryId });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Home/GetGlobalCodes",
        data: jsonData,
        dataType: "json",
        beforeSend: function () { },
        success: function (data) {
            $("#ddlGlobalCodes").empty();
            $("#ddlGlobalCodes").append('<option value="0">--Select One--</option>');
            /*
                data contains the JSON formatted list of codes 
                passed from the controller
                */
            $.each(data, function (i, code) {
                $("#ddlGlobalCodes").append('<option value="' + code.GlobalCodeValue + '">' + code.GlobalCodeName + '</option>');
            });

            if (codeId != null && codeId != "0") {
                $("#ddlGlobalCodes").val(codeId);
            }
        },
        error: function (msg) {
        }
    });
    return false;
}

function BindServiceMainCategories() {
    //Bind Countries
    $.ajax({
        type: "POST",
        url: "/ServiceCode/GetServiceMainCategories",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, main) {
                    items += "<option value='" + main.GlobalCodeCategoryValue + "'>" + main.GlobalCodeCategoryName + "</option>";
                });
                $("#ddlGlobalCodeCategories").html(items);
            } else {
            }
        },
        error: function (msg) {
        }
    });
}

function BindCPTCodesGrid(bn) {
    var activeInActive = $("#chkShowInActive").is(':checked');
    if (activeInActive) {
        activeInActive = false;
    } else {
        activeInActive = true;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/CPTCodes/BindCPTCodesListNew",
        dataType: "html",
        async: true,
        data: JSON.stringify({ blockNumber: bn, showInActive: activeInActive }),
        success: function (data) {
            $("#CPTCodesListDiv").empty();
            $("#CPTCodesListDiv").html(data);
            SetGridCheckBoxes();
        },
        error: function (msg) {
        }

    });
}

function ClearForm() {
    $("#CPTCodesFormDiv").clearForm();
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
    $("#btnSave").val("Save");
    $("#hfCPTCodesId").val('0');
}

function ClearAll() {
    $.validationEngine.closePrompt(".formError", true);
    ClearForm();
    $.validationEngine.closePrompt(".formError", true);
    InitializeDateTimePicker();
    /*var jsonData = JSON.stringify({
        Id: 0,
    });
    $.ajax({
        type: "POST",
        url: '/CPTCodes/ResetCPTCodesForm',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                BindCPTCodesGrid();
                $('#CPTCodesFormDiv').empty();
                $('#CPTCodesFormDiv').html(data);
                $('#collapseTwo').addClass('in');
                InitializeDateTimePicker(); //initialize the datepicker by ashwani

            } else {
                return false;
            }
        },
        error: function (msg) {
            return true;
        }
    });*/
}

function AppendDataToCptGrid(data, userId) {
    var html = "";
    if (data.length > 0) {
        $.each(data, function (i, obj) {
            html += "<tr class=\"gridRow\">";
            //if (userId == 1) {
            html += "<td><input type=\"checkbox\" value=\"" + obj.CPTCodesId + "\" name=\"assignChkBx\" id=\"assignChkBx\" class=\"check-box\"></td>";
            //}
            html += "<td class=\"col1\">" + obj.CodeTableNumber + "</td>";
            html += "<td class=\"col2\">" + obj.CodeTableDescription + "</td>";
            html += "<td class=\"col3\">" + obj.CodeNumbering + "</td>";
            html += "<td class=\"col4\">" + obj.CodeDescription + "</td>";
            html += "<td class=\"col5\">" + obj.CodePrice + "</td>";
            html += "<td class=\"col6\">" + obj.CodeAnesthesiaBaseUnit + "</td>";
            html += "<td class=\"col6\">" + obj.CodeGroup + "</td>";
            html += "<td class=\"col11\">";
            html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"EditCPTCodes('" + obj.CPTCodesId + "') \" href=\"javascript:;\">";
            html += "<img src=\"/images/edit.png\">";
            html += "</a>";
            html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"return OpenConfirmPopup('"+obj.CPTCodesId+"','Delete CPT Code','',DeleteCPTCodes,null); \" title=\"Remove\" href=\"javascript:;\">";
            html += "<img src=\"/images/delete.png\">";
            html += "</a>";
            html += "<a style=\"float: left; margin-right: 7px; width: 15px; display: none\" onclick=\"return MarkAsFav('" + obj.CodeNumbering + "'); \" title=\"Add As Favorite\" class=\"AddFav\" href=\"javascript:;\">";
            html += "<img src=\"/images/Fav (1).png\">";
            html += "</a>";
            html += "</td>";
            html += "</tr>";
        });
    }
    return html;
}

function SortCptCodeGrid(event) {
    var activeInActive = $("#chkShowInActive").is(':checked');
    if (activeInActive) {
        activeInActive = false;
    } else {
        activeInActive = true;
    }
    var url = "";
    var searchText = $("#SearchCodeOrDesc").val();
    if (searchText != "" && searchText != null) {
        url = "/Home/GetFilteredCodes";
        if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
            url += "?text=" + searchText + "&searchType=" + 3 + "&drugStatus=" + 0 + "&" + event.data.msg;
        }
    } else {
        url = "/CPTCodes/BindCPTCodesListNew";
        if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
            url += "?blockNumber=" + blockNumber + "&showInActive=" + activeInActive + "&" + event.data.msg;
        }
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#CPTCodesListDiv").empty();
            $("#CPTCodesListDiv").html(data);
            SetGridCheckBoxes();
        },
        error: function (msg) {
        }
    });
}

function ShowInActiveCptCodes(chkSelector) {
    $("#chkActive").prop("checked", false);
    var active = $(chkSelector)[0].checked;
    var isActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/CPTCodes/BindActiveInActiveCptCodesList",
        data: JSON.stringify({ blockNumber: blockNumber, showInActive: isActive }),
        dataType: "html",
        success: function (data) {
            if (data != null) {
                $("#CPTCodesListDiv").empty();
                $("#CPTCodesListDiv").html(data);
                SetGridCheckBoxes();
            }
        },
        error: function (msg) {

        }
    });
}

function BindCptCodeData(data) {
    $("#hdCPTCodesId").val(data.CPTCodesId);
    $("#dtCodeEffectiveDate").val(data.CodeEffectiveDate);
    $("#txtCodeAnesthesiaBaseUnit").val(data.CodeAnesthesiaBaseUnit);
    $("#txtCodePrice").val(data.CodePrice);
    $("#txtCodeNumbering").val(data.CodeNumbering);
    $("#dtCodeExpiryDate").val(data.CodeExpiryDate);
    $("#txtCodeBasicProductApplicationRule").val(data.CodeBasicProductApplicationRule);
    $("#txtCodeOtherProductsApplicationRule").val(data.CodeOtherProductsApplicationRule);
    $("#txtCodeDescription").val(data.CodeDescription);

    if (data.CodeServiceMainCategory != '' || data.CodeServiceMainCategory != null) {
        $("#ddlGlobalCodeCategories").val(data.CodeServiceMainCategory);
    } else {
        $("#ddlGlobalCodeCategories").val(0);
    }

    $("#txtCodeUSCLSChapter").val(data.CodeUSCLSChapter);
    $("#txtCodeCPTMUEValues").val(data.CodeCPTMUEValues);
    $("#txtCodeGroup").val(data.CodeGroup);
    $("#chkIsActive").prop('checked', data.IsActive);
    var categoryId = $("#ddlGlobalCodeCategories").val();
    if (categoryId > 0) {
        $("#ddlGlobalCodeCategories").val(categoryId);
        BindSubCategories(categoryId, data.CodeServiceCodeSubCategory);
    }
    $('#collapseOne').addClass('in');
    InitializeDateTimePicker();
    $("#btnSave").val("Update");
}