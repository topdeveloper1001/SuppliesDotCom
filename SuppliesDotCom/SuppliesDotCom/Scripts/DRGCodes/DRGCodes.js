$(function () {
    JsCalls();
    $("#btnMarkAsInActive").click(function () {
    //var activeInActive = $("#chkShowInActive").is(':checked');
        var stringArray = new Array();
        var checkedItems = $('.check-box:checked');
        for (var i = 0, l = checkedItems.length; i < l; i++) {
            stringArray.push(checkedItems[i].defaultValue);
        }
        if (stringArray.length > 0) {
            var jsonData = JSON.stringify({
                codeValues: stringArray,
                orderType: "DRG"
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
                        BindDRGCodesGrid(blockNumber);
                        ShowMessage("Selected Codes marked as InActive successfully", "Success", "success", true);
                    }
                },
                error: function (msg) {

                }
            });
        }
        else {
            ShowMessage("Select at least one billing code!", "warning", "warning", true);
        }
    });
    BindTableSetList("9", "#ddlTableSet", "0");

});
var blockNumber = 2;        //Infinate Scroll starts from second block
var noMoreData = false;
var inProgress = false;

function JsCalls() {
    $("#chkIsActive").prop('checked', true);
    $("#DRGCodesFormDiv").validationEngine();
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

function SaveDRGCodes(id) {
    var isValid = jQuery("#DRGCodesFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        
        var hdDrgCodesId = $("#hdDRGCodesId").val();
        //var txtCodeTableNumber = $("#txtCodeTableNumber").val();
        var txtCodeTableDescription = $("#txtCodeTableDescription").val();
        var txtCodeNumbering = $("#txtCodeNumbering").val();
        var txtCodeDescription = $("#txtCodeDescription").val();
        var txtCodePrice = $("#txtCodePrice").val();
        var dtCodeEffectiveDate = $("#dtCodeEffectiveDate").val();
        var dtCodeExpiryDate = $("#dtCodeExpiryDate").val();
        var txtCodeDrgWeight = $("#txtCodeDRGWeight ").val();
        var chkIsActive = $("#chkIsActive").is(':checked');
        var txtApplication = $("#txtApplicationRule").val();
        var txtAlos = $("#txtAlos").val();

        var jsonData = JSON.stringify({
            DRGCodesId: hdDrgCodesId,
            //CodeTableNumber: txtCodeTableNumber,
            CodeTableDescription: txtCodeTableDescription,
            CodeNumbering: txtCodeNumbering,
            CodeDescription: txtCodeDescription,
            CodePrice: txtCodePrice,
            CodeEffectiveDate: dtCodeEffectiveDate,
            CodeExpiryDate: dtCodeExpiryDate,
            CodeDRGWeight: txtCodeDrgWeight,
            IsActive: chkIsActive,
            ApplicationRule: txtApplication,
            Alos: txtAlos

        });
        $.ajax({
            type: "POST",
            url: '/DRGCodes/SaveDrgDetails',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                ClearDrgFrom();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";

                ShowMessage(msg, "Success", "success", true);
                BindDRGCodesGrid(blockNumber);
            },
            error: function (msg) {
                ShowMessage("Failed to save the Drg Codes!", "Alert", "warning", true);
            }
        });

        /*var formData = $("#form12").serializeArray();
        $.post("/DRGCodes/SaveDrgDetails", formData, function (data) {
            if (data > 0) {
                ClearAll();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";

                ShowMessage(msg, "Success", "success", true);
                BindDRGCodesGrid(blockNumber);
            } else
                ShowMessage("Failed to save the Drg Codes!", "Alert", "warning", true);
        });*/
    }
    return false;
}

function editDetails(e) {

    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.DRGCodesId;
    EditDRGCodes(id);

}

function deleteDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.DRGCodesId;
    DeleteDRGCodes(id);
}

function EditDRGCodes(id) {

    var jsonData = JSON.stringify({
        DRGCodesId: id
    });
    $.ajax({
        type: "POST",
        url: '/DRGCodes/GetDRGCodes',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#DRGCodesFormDiv').empty();
            $('#DRGCodesFormDiv').html(data);
            $('#collapseOne').addClass('in');
            //JsCalls();
            InitializeDateTimePicker();//initialize the datepicker by ashwani
            $('html,body').animate({ scrollTop: $("#collapseOne").offset().top }, 'fast');
        },
        error: function (msg) {
        }
    });
}

function ViewDRGCodes(id) {

    var txtDRGCodesId = id;
    var jsonData = JSON.stringify({
        Id: txtServiceCodeId,
        ViewOnly: 'true'
    });
    $.ajax({
        type: "POST",
        url: '/DRGCodes/GetDRGCodes',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {

            if (data) {
                $('#DRGCodesDiv').empty();
                $('#DRGCodesDiv').html(data);
                $('#collapseOne').addClass('in');
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function DeleteDRGCodes() {
    if ($("#hfGlobalConfirmId").val() > 0) {
       var jsonData = JSON.stringify({
            Id: $("#hfGlobalConfirmId").val(),
            IsDeleted: true,
            DeletedBy: 1,//Put logged in user id here
            DeletedDate: new Date(),
            IsActive: false
        });
        $.ajax({
            type: "POST",
            url: '/DRGCodes/DeleteDRGCodes',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data) {
                    BindDRGCodesGrid(blockNumber);
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

//function DeleteDRGCodes(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var txtDRGCodesId = id;
//        var jsonData = JSON.stringify({
//            Id: txtDRGCodesId,
//            IsDeleted: true,
//            DeletedBy: 1,//Put logged in user id here
//            DeletedDate: new Date(),
//            IsActive: false
//        });
//        $.ajax({
//            type: "POST",
//            url: '/DRGCodes/DeleteDRGCodes',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data) {
//                    BindDRGCodesGrid(blockNumber);
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
    BindSubCategories(categoryId);
    return false;
}

function BindSubCategories(categoryId) {
    var jsonData = JSON.stringify({ categoryId: categoryId });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/ServiceCode/BindSubCategories",
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
        },
        error: function (msg) {
        }
    });
    return false;
}

function BindDRGCodesGrid(bn) {
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
        url: "/DRGCodes/DRGActiveInActiveCodesList",
        dataType: "html",
        async: true,
        data: jsonData,
        success: function (data) {
            $("#DRGCodesListDiv").empty();
            $("#DRGCodesListDiv").html(data);

            SetGridCheckBoxes();
        },
        error: function (msg) {
        }
    });
}


function ClearDrgFrom() {
    $("#DRGCodesFormDiv").clearForm();
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
}

//function ClearAll() {
//    $("#DRGCodesFormDiv").clearForm();
//    $('#collapseOne').removeClass('in');
//    $('#collapseTwo').addClass('in');
//    $.validationEngine.closePrompt(".formError", true);
//    var jsonData = JSON.stringify({
//        Id: 0,
//    });
//    $.ajax({
//        type: "POST",
//        url: '/DRGCodes/ResetDRGCodesForm',
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "html",
//        data: jsonData,
//        success: function (data) {
//            if (data) {
//                BindDRGCodesGrid(blockNumber);
//                $('#DRGCodesFormDiv').empty();
//                $('#DRGCodesFormDiv').html(data);
//                $('#collapseTwo').addClass('in');
//                InitializeDateTimePicker(); //initialize the datepicker by ashwani
//            } else {
//                return false;
//            }
//        },
//        error: function (msg) {
//            return true;
//        }
//    });
//}

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

function AppendDataToDRGCodeGrid(data, userId) {
    var html = "";
    if (data.length > 0) {
        $.each(data, function (i, obj) {
            html += "<tr class=\"gridRow\">";
            //if (userId == 1) {
            html += "<td><input type=\"checkbox\" value=\"" + obj.DRGCodesId + "\" name=\"assignChkBx\" id=\"assignChkBx\" class=\"check-box\"></td>";
            //}
            html += "<td class=\"col1\">" + obj.CodeTableNumber + "</td>";
            html += "<td class=\"col2\">" + obj.CodeNumbering + "</td>";
            html += "<td class=\"col3\">" + obj.CodeDescription + "</td>";
            html += "<td class=\"col4\">" + obj.Alos != null && obj.Alos != '' ? obj.Alos : "" + "</td>";
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
            html += "<td class=\"col6\">" + obj.CodeDRGWeight + "</td>";
            html += "<td class=\"col6\">" + dateCodeEffectiveDate + "</td>";
            html += "<td class=\"col6\">" + dateCodeExpiryDate + "</td>";
            html += "<td class=\"col11\">";
            html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"EditDRGCodes('" + obj.DRGCodesId + "') \" href=\"javascript:;\">";
            html += "<img src=\"/images/edit.png\">";
            html += "</a>";
            //html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"return DeleteDRGCodes('" + obj.DRGCodesId + "'); \" title=\"Remove\" href=\"javascript:;\">";
            html += "<a class=\"unFav\" style=\"float: left; margin-right: 7px; width: 15px;\" onclick=\"return OpenConfirmPopup('" + obj.DRGCodesId + "','Delete CPTCodes','',DeleteDRGCodes,null); \" title=\"Remove\" href=\"javascript:;\">";

            html += "<img src=\"/images/delete.png\">";
            html += "</a>";
            html += "</td>";
            html += "</tr>";
        });
    }
    return html;
}

function ShowInActiveDRGCodes(chkSelector) {
    $("#chkActive").prop("checked", false);
    var active = $(chkSelector)[0].checked;
    var isActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/DRGCodes/DRGActiveInActiveCodesList",
        data: JSON.stringify({blockNumber: blockNumber, showInActive: isActive }),
        dataType: "html",
        success: function (data) {
            if (data != null) {
                $("#DRGCodesListDiv").empty();
                $("#DRGCodesListDiv").html(data);

                SetGridCheckBoxes();
            }
        },
        error: function (msg) {

        }
    });
}

function SortDrgCodeGrid(event) {
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
            url += "?text=" + searchText + "&searchType=" + 9 + "&drugStatus=" + 0 + "&" + event.data.msg;
        }
    } else {
        url = "/DRGCodes/DRGActiveInActiveCodesList";
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
            $("#DRGCodesListDiv").empty();
            $("#DRGCodesListDiv").html(data);
            SetGridCheckBoxes();

        },
        error: function (msg) {
        }
    });
}