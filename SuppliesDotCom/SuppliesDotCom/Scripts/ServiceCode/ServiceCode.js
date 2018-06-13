$(function () {
    JsCalls();
    $("#btnMarkAsInActive").click(function () {
        var stringArray = new Array();
        var checkedItems = $('.check-box:checked');
        for (var i = 0, l = checkedItems.length; i < l; i++) {
            stringArray.push(checkedItems[i].defaultValue);
        }

        if (stringArray.length > 0) {
            var tn = $("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0 ? $("#ddlTableSet").val() : "";

            var jsonData = JSON.stringify({
                codeValues: stringArray,
                orderType: "BedCharges"
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
                        BindServiceCodeGrid(blockNumber, tn);
                        ShowMessage("Selected Codes marked as InActive successfully", "Success", "success", true);
                    }
                },
                error: function (msg) {

                }
            });
        } else {
            ShowMessage("Select at least one billing code!", "warning", "warning", true);
        }
    });
    BindServiceMainCategories();

    BindTableSetList("8", "#ddlTableSet", "0");
});
var blockNumber = 2;        //Infinate Scroll starts from second block
var noMoreData = false;
var inProgress = false;

function JsCalls() {
    $("#ServiceCodeFormDiv").validationEngine();

    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });

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
    var id = dataItem.ServiceCodeId;
    EditServiceCode(id);
}

function deleteDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.ServiceCodeId;
    DeleteServiceCode(id);
}

function SaveServiceCode(id) {
    
    id = $("#ServiceCodeId").val();
    var isValid = jQuery("#ServiceCodeFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtServiceCodeValue = $("#ServiceCodeValue").val();
        var txtServiceCodeDescription = $("#ServiceCodeDescription").val();
        var txtServiceCodePrice = $("#ServiceCodePrice").val();
        var dtServiceCodeEffectiveDate = $("#ServiceCodeEffectiveDate").val();
        var dtServiceExpiryDate = $("#ServiceExpiryDate").val();
        var txtServiceCodeBasicApplicationRule = $("#ServiceCodeBasicApplicationRule").val();
        var serviceCodeOtherApplicationRule = $("#ServiceCodeOtherApplicationRule").val();
        var ddlServiceCodeServiceCodeMain = $("#ddlGlobalCodeCategories").val();
        var ddlServiceServiceCodeSub = $("#ddlGlobalCodes").val();
        var chkCanOverride = $("#canOveRide")[0].checked ? '1' : '0';

        var jsonData = JSON.stringify({
            ServiceCodeId: id,
            ServiceCodeValue: txtServiceCodeValue,
            ServiceCodeDescription: txtServiceCodeDescription,
            ServiceCodePrice: txtServiceCodePrice,
            ServiceCodeEffectiveDate: dtServiceCodeEffectiveDate,
            ServiceExpiryDate: dtServiceExpiryDate,
            ServiceCodeBasicApplicationRule: txtServiceCodeBasicApplicationRule,
            ServiceCodeServiceCodeMain: ddlServiceCodeServiceCodeMain,
            ServiceServiceCodeSub: ddlServiceServiceCodeSub,
            ServiceCodeOtherApplicationRule: serviceCodeOtherApplicationRule,
            CanOverRide: chkCanOverride,
            IsActive: 1,
            IsDeleted:0
        });

        $.ajax({
            type: "POST",
            url: '/ServiceCode/SaveServiceCode',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                var tn = $("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0 ? $("#ddlTableSet").val() : "";
                ClearAll();
                BindServiceCodeGrid(blockNumber, tn);
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";
                ShowMessage(msg, "Success", "success", true);

            },
            error: function (msg) {
            }
        });
    }
}

function EditServiceCode(id) {
    var jsonData = JSON.stringify({
        Id: id
    });
    $.ajax({
        type: "POST",
        url: '/ServiceCode/GetServiceCode',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            //$('#ServiceCodeFormDiv').empty();
            //$('#ServiceCodeFormDiv').html(data);
            //BindServiceMainCategories();
            //var categoryId = $("#hdServiceMainCategory").val();
            //if (categoryId != null && categoryId != '') {
            //    $("#ddlGlobalCodeCategories").val(categoryId);
            //    var codeId = $("#hdServiceServiceCodeSub").val();
            //    BindSubCategories(categoryId, codeId);
            //}
            BindServiceCodeDetails(data);
        },
        error: function (msg) {

        }
    });
}

function DeleteServiceCode() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            Id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/ServiceCode/DeleteServiceCode',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data != null) {
                    var tn = $("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0 ? $("#ddlTableSet").val() : "";
                    BindServiceCodeGrid(blockNumber, tn);
                    ShowMessage("Records Deleted Successfully", "Success", "success", true);
                }
                else {
                    return false;
                }
            },
            error: function (msg) {
                return true;
            }
        });

    }
}

//function DeleteServiceCode(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var txtServiceCodeId = id;
//        var jsonData = JSON.stringify({
//            Id: txtServiceCodeId
//        });
//        $.ajax({
//            type: "POST",
//            url: '/ServiceCode/DeleteServiceCode',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data != null) {
//                    var tn = $("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0 ? $("#ddlTableSet").val() : "";
//                    BindServiceCodeGrid(blockNumber, tn);
//                    ShowMessage("Records Deleted Successfully", "Success", "success", true);
//                }
//                else {
//                    return false;
//                }
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
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
                //$("#ddlGlobalCodes").append('<option value="' + code.GlobalCodeValue + '">' + code.GlobalCodeName + '</option>');
                $("#ddlGlobalCodes").append('<option value="' + code.GlobalCodeValue + '">' + code.GlobalCodeValue + '</option>');
            });

            if (codeId != null && codeId != "0") {
                $("#ddlGlobalCodes").val(codeId);
            }
        },
        error: function (msg) {

            Console.log(msg);
        }
    });
    return false;
}

function BindServiceCodeGrid(bn, tn) {
    var active = $("#chkShowInActive").is(':checked');
    var showInActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/ServiceCode/BindServiceCodeListNew?blockNumber=" + bn + "&tn=" + tn + "&showInActive=" + showInActive,
        dataType: "html",
        async: true,
        // data: jsonData,
        success: function (data) {
            $("#ServiceCodeListDiv").empty();
            $("#ServiceCodeListDiv").html(data);
            SetGridCheckBoxes();
        },
        error: function (msg) {
        }
    });
}

function ClearAll() {
    $("#ServiceCodeFormDiv").clearForm(true);
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
    $("#btnUpdate").val("Save");
    $("#btnSave").val("Save");
    $("#ServiceCodeId").val('0');
    $.validationEngine.closePrompt(".formError", true);
    InitializeDateTimePicker();
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
                    //items += "<option value='" + main.GlobalCodeCategoryValue + "'>" + main.GlobalCodeCategoryName + "</option>";
                    items += "<option value='" + main.GlobalCodeCategoryValue + "'>" + main.ExternalValue1 + "</option>";
                });
                $("#ddlGlobalCodeCategories").html(items);
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function BindFacilitiesDropdownDataWithFacilityNumber(ddlSelector, hdSelector) {
    $.ajax({
        type: "POST",
        url: "/Home/GetFacilitiesDropdownDataWithFacilityNumber",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ corporateId: $("#ddlCorporate").val() }),
        success: function (data) {
            BindDropdownData(data, ddlSelector, hdSelector);
        },
        error: function (errorResponse) {
        }
    });
}

function AppendDataToServiceCodeGrid(data, userId) {
    var html = "";
    if (data.length > 0) {
        $.each(data, function (i, obj) {
            html += "<tr class=\"gridRow\">";
            //if (userId == 1) {
            html += "<td><input type=\"checkbox\" value=\"" + obj.ServiceCodeId + "\" name=\"assignChkBx\" id=\"assignChkBx\" class=\"check-box\"></td>";
            //}
            html += "<td class=\"col1\">" + obj.ServiceCodeTableNumber + "</td>";
            html += "<td class=\"col3\">" + obj.ServiceCodeValue + "</td>";
            //html += "<td class=\"col2\">" + obj.ServiceCodeTableDescription + "</td>";
            html += "<td class=\"col4\">" + obj.ServiceCodeDescription + "</td>";
            html += "<td class=\"col5\">" + obj.ServiceCodePrice + "</td>";
            var dateServiceCodeEffectiveDate = '';
            if (obj.ServiceCodeEffectiveDate != null) {
                dateServiceCodeEffectiveDate = new Date(parseInt(obj.ServiceCodeEffectiveDate.substr(6)));
                dateServiceCodeEffectiveDate = dateServiceCodeEffectiveDate.getDate() + "/" + parseInt(dateServiceCodeEffectiveDate.getMonth() + 1) + "/" + dateServiceCodeEffectiveDate.getFullYear();
            }
            var dateServiceExpiryDate = '';
            if (obj.ServiceExpiryDate != null) {
                dateServiceExpiryDate = new Date(parseInt(obj.ServiceExpiryDate.substr(6)));
                dateServiceExpiryDate = dateServiceExpiryDate.getDate() + "/" + parseInt(dateServiceExpiryDate.getMonth() + 1) + "/" + dateServiceExpiryDate.getFullYear();
            }
            html += "<td class=\"col6\">" + dateServiceCodeEffectiveDate + "</td>";
            html += "<td class=\"col6\">" + dateServiceExpiryDate + "</td>";
            html += "<td class=\"col6\">" + obj.ServiceCodeBasicApplicationRule + "</td>";
            html += "<td class=\"col6\">" + obj.ServiceCodeServiceCodeMainText + "</td>";
            html += "<td class=\"col6\">" + obj.ServiceServiceCodeSub + "</td>";
            html += "<td class=\"col11\">";
            html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"EditServiceCode('" + obj.ServiceCodeId + "') \" href=\"javascript:;\">";
            html += "<img src=\"/images/edit.png\">";
            html += "</a>";
            //html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"return DeleteServiceCode('" + obj.ServiceCodeId + "'); \" title=\"Remove\" href=\"javascript:;\">";
            html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"return OpenConfirmPopup('" + obj.ServiceCodeId + "','Delete Service Codes','',DeleteServiceCode,null); \" title=\"Remove\" href=\"javascript:;\">";

            html += "<img src=\"/images/delete.png\">";
            html += "</a>";
            html += "</td>";
            html += "</tr>";
        });
    }
    return html;
}

function BindServiceCodeDetails(data) {
    
    $("#ServiceCodeId").val(data.ServiceCodeId);
    $("#ServiceCodeValue").val(data.ServiceCodeValue);
    $("#ServiceCodeDescription").val(data.ServiceCodeDescription);
    $("#ServiceCodePrice").val(data.ServiceCodePrice);
    $("#ServiceCodeEffectiveDate").val(data.ServiceCodeEffectiveDate);
    $("#ServiceExpiryDate").val(data.ServiceExpiryDate);
    $("#ServiceCodeBasicApplicationRule").val(data.ServiceCodeBasicApplicationRule);
    $("#ServiceCodeOtherApplicationRule").val(data.ServiceCodeOtherApplicationRule);
    if (data.ServiceCodeServiceCodeMain != null && data.ServiceCodeServiceCodeMain != '') {
        $("#ddlGlobalCodeCategories").val(data.ServiceCodeServiceCodeMain);
        BindSubCategories(data.ServiceCodeServiceCodeMain, data.ServiceServiceCodeSub);
    }
    if (data.CanOverRide == "1") {
        $('#canOveRide').prop('checked', true);
    } else {
        $('#canOveRide').prop('checked', false);

    }
    $('#collapseOne').addClass('in');
    InitializeDateTimePicker();
    $("#btnSave").val("Update");
    $('html,body').animate({ scrollTop: $("#collapseOne").offset().top }, 'fast');
}



function SortServiceCodeGrid(event) {
    var tn = $("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0 ? $("#ddlTableSet").val() : "";
    var url = "";
    var searchText = $("#SearchCodeOrDesc").val();
    if (searchText != "" && searchText != null) {
        url = "/Home/GetFilteredCodes";
        if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
            url += "?text=" + searchText + "&searchType=" + 14 + "&drugStatus=" + 0 + "&" + event.data.msg;
        }
    } else {
        url = "/ServiceCode/BindServiceCodeListNew";
        if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
            url += "?blockNumber=" + blockNumber + "&tn=" + tn +  "&" + event.data.msg;
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
            $("#ServiceCodeListDiv").empty();
            $("#ServiceCodeListDiv").html(data);
            SetGridCheckBoxes();

        },
        error: function (msg) {
        }
    });
}


function ShowInActiveServiceCodes(chkSelector) {
    var tn = $("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0 ? $("#ddlTableSet").val() : "";
    var active = $(chkSelector)[0].checked;
    var showInActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/ServiceCode/BindServiceCodeListNew",
        data: JSON.stringify({ blockNumber: blockNumber, tn: tn, showInActive: showInActive }),
        dataType: "html",
        success: function (data) {
            if (data != null) {
                $("#ServiceCodeListDiv").empty();
                $("#ServiceCodeListDiv").html(data);
                SetGridCheckBoxes();
            }
        },
        error: function (msg) {

        }
    });
}