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
                orderType: "HCPCS"
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
                        BindHCPCSCodesGrid(blockNumber);
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

    BindTableSetList("4", "#ddlTableSet", "0");

});
var blockNumber = 2;        //Infinate Scroll starts from second block
var noMoreData = false;
var inProgress = false;

function JsCalls() {

    $("#chkIsActive").prop('checked', true);
    $("#HCPCSCodesFormDiv").validationEngine();
    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });

    BindCorporates('#ddlCorporate', '6');
    setTimeout(function () { BindFacilitiesDropdownDataWithFacilityNumbers('#ddlFacility', '1002'); }, 800);
    $("#ddlCorporate").on('change', function () {
        if ($("#ddlCorporate").val() != '0') {
            BindFacilitiesDropdownDataWithFacilityNumbers('#ddlFacility', '');
        }
    });

    SetGridCheckBoxes();
}

function editDetails(e) {

    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.HCPCSCodesId;
    EditHCPCSCodes(id);
}

function deleteDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.HCPCSCodesId;
    DeleteHCPCSCodes(id);
}

function SaveHCPCSCodes(id) {
    //id = $("#hdHCPCSCode").val();
    id = $("#hfHCPCSCodesId").val();
    var isValid = jQuery("#HCPCSCodesFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        //var txtCodeTableNumber = $("#txtCodeTableNumber").val();
        var txtCodeTableDescription = $("#txtCodeTableDescription").val();
        var txtCodeNumbering = $("#txtCodeNumbering").val();
        var txtCodeDescription = $("#txtCodeDescription").val();
        var txtCodePrice = $("#txtCodePrice").val();
        var dtCodeEffectiveDate = $("#dtCodeEffectiveDate").val();
        var dtCodeExpiryDate = $("#dtCodeExpiryDate").val();
        var txtCodeBasicProductApplicationRule = $("#txtCodeBasicProductApplicationRule").val();
        var txtCodeOtherProductsApplicationRule = $("#txtCodeOtherProductsApplicationRule").val();//$("#txtOrderedDateTime").val();
        var ddlCodeServiceMainCategory = $("#ddlGlobalCodeCategories").val();
        var ddlCodeServiceCodeSubCategory = $("#ddlGlobalCodes").val();
        var txtCodeCPTMUEValues = $("#txtCodeCPTMUEValues").val();
        var chkIsActive = $("#chkIsActive").is(':checked');
        var jsonData = JSON.stringify({
            HCPCSCodesId: id,
            //CodeTableNumber: txtCodeTableNumber,
            CodeServiceCodeSubCategory: ddlCodeServiceCodeSubCategory,
            CodeTableDescription: txtCodeTableDescription,
            CodeNumbering: txtCodeNumbering,
            ServiceCodeValue: txtCodeNumbering,
            CodeDescription: txtCodeDescription,
            CodePrice: txtCodePrice,
            CodeEffectiveDate: dtCodeEffectiveDate,
            CodeExpiryDate: dtCodeExpiryDate,
            CodeBasicProductApplicationRule: txtCodeBasicProductApplicationRule,
            CodeOtherProductsApplicationRule: txtCodeOtherProductsApplicationRule,
            CodeServiceMainCategory: ddlCodeServiceMainCategory,
            CodeCPTMUEValues: txtCodeCPTMUEValues,
            IsActive: chkIsActive,
        });
        $.ajax({
            type: "POST",
            url: '/HCPCSCodes/SaveHCPCSCodes',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                ClearAll();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";
                BindHCPCSCodesGrid(blockNumber);
                ShowMessage(msg, "Success", "success", true);
                $("#hfServiceCodeId").val('0');
            },
            error: function (msg) {
                ShowErrorMessage("Error while saving records!", true);
            }
        });
    }
}

//function EditHCPCSCodes(id) {
//    var jsonData = JSON.stringify({
//        Id: id
//    });
//    $.ajax({
//        type: "POST",
//        url: '/HCPCSCodes/GetHCPCSCodes',
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "html",
//        data: jsonData,
//        success: function (data) {
//           $('#HCPCSCodesFormDiv').empty();
//            $('#HCPCSCodesFormDiv').html(data);
//            BindServiceMainCategories();
//            var categoryId = $("#hdServiceMainCategory").val();
//            if (categoryId != null && categoryId != '') {
//                $("#ddlGlobalCodeCategories").val(categoryId);
//                var codeId = $("#hdServiceServiceCodeSub").val();
//                BindSubCategories(categoryId, codeId);

//            }
//            $('#collapseOne').addClass('in');
//            //JsCalls();
//            InitializeDateTimePicker();//initialize the datepicker by ashwani
//            $("#btnSave").val("Update");
//            $('html,body').animate({ scrollTop: $("#collapseOne").offset().top }, 'fast');
//        },
//        error: function (msg) {
//        }
//    });
//}

function ViewHCPCSCodes(id) {

    var txtHCPCSCodesId = id;
    var jsonData = JSON.stringify({
        Id: txtHCPCSCodesId,
        ViewOnly: 'true'
    });
    $.ajax({
        type: "POST",
        url: '/HCPCSCodes/GetHCPCSCodes',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {

            if (data) {
                $('#HCPCSCodesDiv').empty();
                $('#HCPCSCodesDiv').html(data);
                $('#collapseOne').addClass('in');
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function DeleteHCPCSCodes() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            Id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/HCPCSCodes/DeleteHCPCSCodes',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data) {
                    BindHCPCSCodesGrid(blockNumber);
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

//function DeleteHCPCSCodes(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var txtHCPCSCodesId = id;
//        var jsonData = JSON.stringify({
//            Id: txtHCPCSCodesId
//        });
//        $.ajax({
//            type: "POST",
//            url: '/HCPCSCodes/DeleteHCPCSCodes',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data) {
//                    BindHCPCSCodesGrid(blockNumber);
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

//function ExportHCPCSCodes() {
//    $.ajax({
//        type: "POST",
//        url: '/HCPCSCodes/ExportHCPCSCodesToExcel',
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
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

//function BindHCPCSCodesGrid(bn) {
//    $.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: "/HCPCSCodes/BindHCPCSCodesListNew?blockNumber=" + bn,
//        dataType: "html",
//        async: true,
//        success: function (data) {
//            $("#HCPCSCodesListDiv").empty();
//            $("#HCPCSCodesListDiv").html(data);
//            SetGridCheckBoxes();
//        },
//        error: function (msg) {
//            //alert(msg);
//        }

//    });
//}

function BindHCPCSCodesGrid(bn) {
    var activeInActive = $("#chkShowInActive").is(':checked');
    if (activeInActive) {
        activeInActive = false;
    } else {
        activeInActive = true;
    }
    var jsonData = JSON.stringify({
        blockNumber: bn,
        showInActive: activeInActive,
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/HCPCSCodes/BindActiveInActiveHcpcsCodesList",
        dataType: "html",
        async: true,
        data: jsonData,
        success: function (data) {
            $("#HCPCSCodesListDiv").empty();
            $("#HCPCSCodesListDiv").html(data);
            SetGridCheckBoxes();
        },
        error: function (msg) {
            //alert(msg);
        }

    });
}

function ClearForm() {
    $("#HCPCSCodesFormDiv").clearForm();
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
    $("#btnSave").val("Save");
    $("#hfHCPCSCodesId").val('0');
}

function ClearAll() {

    ClearForm();
    $.validationEngine.closePrompt(".formError", true);
    InitializeDateTimePicker();
    /*var jsonData = JSON.stringify({
        Id: 0,
    });
    $.ajax({
        type: "POST",
        url: '/HCPCSCodes/ResetHCPCSCodesForm',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {

                $('#HCPCSCodesFormDiv').empty();
                $('#HCPCSCodesFormDiv').html(data);
                $('#collapseTwo').addClass('in');
                BindHCPCSCodesGrid();
                InitializeDateTimePicker();//initialize the datepicker by ashwani
            }
            else {
                return false;
            }
        },
        error: function (msg) {


            return true;
        }
    });*/

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
};

function AppendDataToHCPCSCodeGrid(data, userId) {
    var html = "";
    if (data.length > 0) {
        $.each(data, function (i, obj) {
            html += "<tr class=\"gridRow\">";
            //if (userId == 1) {
            html += "<td><input type=\"checkbox\" value=\"" + obj.HCPCSCodesId + "\" name=\"assignChkBx\" id=\"assignChkBx\" class=\"check-box\"></td>";
            //}
            html += "<td class=\"col1\">" + obj.CodeTableNumber + "</td>";
            html += "<td class=\"col2\">" + obj.CodeTableDescription + "</td>";
            html += "<td class=\"col3\">" + obj.CodeNumbering + "</td>";
            html += "<td class=\"col4\">" + obj.CodeDescription + "</td>";
            html += "<td class=\"col5\">" + obj.CodePrice + "</td>";
            var dateCodeEffectiveDate = '';
            if (obj.CodeEffectiveDate != null) {
                dateCodeEffectiveDate = new Date(parseInt(obj.CodeEffectiveDate.substr(6)));
                dateCodeEffectiveDate = dateCodeEffectiveDate.getDate() + "/" + parseInt(dateCodeEffectiveDate.getMonth() + 1) + "/" + dateCodeEffectiveDate.getFullYear();
            }
            var dateCodeExpiryDate = '';
            if (obj.CodeExpiryDate != null) {
                dateCodeExpiryDate = new Date(parseInt(obj.CodeExpiryDate.substr(6)));
                dateCodeExpiryDate = dateCodeExpiryDate.getDate() + "/" + parseInt(dateCodeExpiryDate.getMonth() + 1) + "/" + dateCodeExpiryDate.getFullYear();
            }
            html += "<td class=\"col6\">" + dateCodeEffectiveDate + "</td>";
            html += "<td class=\"col6\">" + dateCodeExpiryDate + "</td>";
            html += "<td class=\"col11\">";
            html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"EditHCPCSCodes('" + obj.HCPCSCodesId + "') \" href=\"javascript:;\">";
            html += "<img src=\"/images/edit.png\">";
            html += "</a>";
            //html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"return DeleteHCPCSCodes('" + obj.HCPCSCodesId + "'); \" title=\"Remove\" href=\"javascript:;\">";
            html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"return OpenConfirmPopup('" + obj.HCPCSCodesId + "','Delete HCPCS Codes','',DeleteHCPCSCodes,null); \" title=\"Remove\" href=\"javascript:;\">";

            html += "<img src=\"/images/delete.png\">";
            html += "</a>";
            html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px; display: none;\" onclick=\"return MarkAsFav('" + obj.CodeNumbering + "'); \" title=\"Add As Favorite\" href=\"javascript:;\">";
            html += "<img src=\"/images/delete.png\">";
            html += "</a>";
            html += "</td>";
            html += "</tr>";
        });
    }
    return html;
}


function SortHCPCSCodeGrid(event) {
    var url = "";
    var searchText = $("#SearchCodeOrDesc").val();
    if (searchText != "" && searchText != null) {
        url = "/Home/GetFilteredCodes";
        if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
            url += "?text=" + searchText + "&searchType="+4+"&drugStatus="+0+ "&" + event.data.msg;
        }
    } else {
        url = "/HCPCSCodes/SortHCPCSCodes";
        if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
            url += "?" + "&" + event.data.msg;
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
            $("#HCPCSCodesListDiv").empty();
            $("#HCPCSCodesListDiv").html(data);
            SetGridCheckBoxes();

        },
        error: function (msg) {
        }
    });
}

function ShowInActiveHcpcsCodes(chkSelector) {
    $("#chkActive").prop("checked", false);
    var active = $(chkSelector)[0].checked;
    var isActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/HCPCSCodes/BindActiveInActiveHcpcsCodesList",
        data: JSON.stringify({ blockNumber: blockNumber, showInActive: isActive }),
        dataType: "html",
        success: function (data) {
            if (data != null) {
                $("#HCPCSCodesListDiv").empty();
                $("#HCPCSCodesListDiv").html(data);
                SetGridCheckBoxes();
            }
        },
        error: function (msg) {

        }
    });
}

function EditHCPCSCodes(id) {
    var jsonData = JSON.stringify({
        Id: id
    });
    $.ajax({
        type: "POST",
        url: '/HCPCSCodes/GetHCPCSCodesOnEdit',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindHcpcsCodeData(data);
            $('html,body').animate({ scrollTop: $("#collapseOne").offset().top }, 'fast');
        },
        error: function (msg) {
        }
    });
}


function BindHcpcsCodeData(data) {
    $("#hfHCPCSCodesId").val(data.HCPCSCodesId);
    $("#txtCodeTableDescription").val(data.CodeTableDescription);
    $("#txtCodeNumbering").val(data.CodeNumbering);
    $("#txtCodePrice").val(data.CodePrice);
    $("#txtCodeCPTMUEValues").val(data.CodeCPTMUEValues);
    $("#dtCodeEffectiveDate").val(data.CodeEffectiveDate);
    $("#txtCodeDescription").val(data.CodeDescription);
    $("#txtCodeOtherProductsApplicationRule").val(data.CodeOtherProductsApplicationRule);
    $("#txtCodeBasicProductApplicationRule").val(data.CodeBasicProductApplicationRule);
    $("#dtCodeExpiryDate").val(data.CodeExpiryDate);
    $("#ddlGlobalCodeCategories").val(data.CodeServiceMainCategory);
    $("#ddlGlobalCodes").val(data.CodeServiceCodeSubCategory);
    $("#chkIsActive").prop('checked', data.IsActive);
    var categoryId = $("#hdServiceMainCategory").val();
    if (categoryId != null && categoryId != '') {
        $("#ddlGlobalCodeCategories").val(categoryId);
        var codeId = $("#hdServiceServiceCodeSub").val();
        BindSubCategories(categoryId, codeId);
    }
    $('#collapseOne').addClass('in');
   InitializeDateTimePicker();
    $("#btnSave").val("Update");
}