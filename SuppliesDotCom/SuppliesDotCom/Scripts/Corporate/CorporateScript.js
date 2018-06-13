var table = null;

$(function () {
    JsCalls();
    $('#no').click(function () {
        $.unblockUI();
        $('#hidDeleteCorporate').val('');
        return false;
    });
    $('#yes').click(function () {
        var id = $('#hidDeleteCorporate').val();
        //DeleteCorporateAllData(id);
        $('#hidDeleteCorporate').val('');
        $.blockUI({ message: "<div class='modal-header'><h5 class='modal-title'>Remote call in progress...</h5></div>" });
    });
});

function JsCalls() {
    /// <summary>
    /// Jses the calls.
    /// </summary>
    /// <returns></returns>
    //ajaxStartActive = false;
    //BindCountryForPhones();
    //BindTableSets();
    BindAllCorporateDataOnLoad();
    $("#CorporateFormDiv").validationEngine();
    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });

    table = $("#tbCorporate").dataTable({
        "bJQueryUI": true,
        "bServerSide": true,
        "sAjaxSource": "/Corporate/GetCorporates",
        "bProcessing": true,
        "fnServerData": function (sSource, aoData, fnCallback) {
            //aoData.push({ "name": "CompanyID", "value": MasterRecordID });
            $.getJSON(sSource, null, function (json) {
                fnCallback(json)
            });
        }
    });
}

function CheckDuplicateCorporate(id) {

    /// <summary>
    /// Checks the duplicate corporate.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    var isValid = jQuery("#CorporateFormDiv").validationEngine({ returnIsValid: true });
    if (isValid) {
        //$('#loader_event').show();
        var txtCorporateName = $("#txtCorporateName").val();
        var jsonData = JSON.stringify({
            name: txtCorporateName, id: id
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Corporate/CheckDuplicateCorporate",
            data: jsonData,
            dataType: "",
            cache: false,
            success: function (data) {
                //Append Data to grid
                
                if (data != 'False') {
                    //$('#loader_event').hide();
                    ShowMessage("Corporate already exist with same name!", "Alert", "info", true);
                    return false;
                }
                else {

                    SaveCorporate(id);
                    //$('#loader_event').hide();
                    return true;
                }
            },
            error: function (msg) {
                //$('#loader_event').hide();
            }
        });
    }
    return false;
}

function CheckDefaultTableNumber(cid, controlId) {
    var defaultTableNumber = $("#" + controlId).val();
    var jsonData = JSON.stringify({
        defaultTableNumber: defaultTableNumber,
        corporateId: cid
    });
    $.ajax({
        type: "POST",
        url: '/Corporate/CheckDefaultTableNumber',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "",
        data: jsonData,
        success: function (data) {
            var msg = "";
            if (data == "True") {
                msg = "Default table number is already in the system!";
                ShowMessage(msg, "Warning", "warning", true);
            }
            /*else {
                SaveCorporateAfterDuplicateCheck(cid);
            }*/
        },
        error: function (msg) {
        }
    });
}

function SaveCorporate(id) {
    //ajaxStartActive = true;
    //blockSelectedClassObj('copDiv');
    /// <summary>
    /// Saves the corporate.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    var isValid = jQuery("#CorporateFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        //main-wrap
        //blockSelectedClassObj('main-wrap');
        //CheckDefaultTableNumber(id);
        SaveCorporateAfterDuplicateCheck(id);
    }
}

function SaveCorporateAfterDuplicateCheck(id) {
    var txtCorporateId = id;
    var txtCorporateNumber = $("#txtCorporateNumber").val();
    var txtCorporateName = $("#txtCorporateName").val();
    var txtCorporateStreetAddress = $("#txtCorporateStreetAddress").val();
    var txtStreetAddress2 = $("#txtCorporateStreetAddress2").val();
    var txtCityID = $("#ddlCities").val();
    var txtStateID = $("#ddlStates").val();
    var txtCountryID = $("#ddlCountries").val();
    var txtCorporateZipCode = $("#txtCorporateZipCode").val();
    var txtCorporateMainPhone = $("#txtCorporateMainPhone").val();
    var txtCorporateFax = $("#txtCorporateFax").val();
    var txtCorporateSecondPhone = $("#txtCorporateSecondPhone").val();
    var txtCorporatePOBox = $("#txtCorporatePOBox").val();
    var txtEmail = $("#txtCorporateEmailAddress").val();
    var txtCreatedBy = 1;
    var txtCreatedDate = new Date();
    var txtDefaultHCPCSTableNumber = $("#ddlHcpcsTablSet").val();
    var txtDefaultDRUGTableNumber = $("#ddlDrugTablSet").val();
    var txtDefaultDRGTableNumber = $("#ddlDrgTablSet").val();
    var txtDefaultDiagnosisTableNumber = $("#ddlDiagnosisTablSet").val();
    var txtDefaultCPTTableNumber = $("#ddlCptTablSet").val();
    var txtDefaultServiceCodeTableNumber = $("#ddlServiceCodeTablSet").val();
    var ddlBillEditRuleTablSet = $("#ddlBillEditRuleTablSet").val();

    if (txtCorporateMainPhone != '') {
        var lblMainPhone = $('#lblMainPhone').text();
        txtCorporateMainPhone = lblMainPhone + "-" + txtCorporateMainPhone;
    }
    if (txtCorporateSecondPhone != '') {
        var lblSecondPhone = $('#lblSecondPhone').text();
        txtCorporateSecondPhone = lblSecondPhone + "-" + txtCorporateSecondPhone;
    }
    if (txtCorporateFax != '') {
        var lblFax = $('#lblFax').text();
        txtCorporateFax = lblFax + "-" + txtCorporateFax;
    }

    // 1MAPCOLUMNSHERE - Corporate
    var jsonData = JSON.stringify({
        CorporateID: txtCorporateId,
        CorporateNumber: txtCorporateNumber,
        CorporateName: txtCorporateName,
        StreetAddress: txtCorporateStreetAddress,
        StreetAddress2: txtStreetAddress2,
        CityID: txtCityID,
        StateID: txtStateID,
        CountryID: txtCountryID,
        CorporateZipCode: txtCorporateZipCode,
        CorporateMainPhone: txtCorporateMainPhone,
        CorporateFax: txtCorporateFax,
        CorporateSecondPhone: txtCorporateSecondPhone,
        CorporatePOBox: txtCorporatePOBox,
        Email: txtEmail,
        CreatedBy: txtCreatedBy,
        CreatedDate: txtCreatedDate,
        DefaultCPTTableNumber: txtDefaultCPTTableNumber,
        DefaultServiceCodeTableNumber: txtDefaultServiceCodeTableNumber,
        DefaultDiagnosisTableNumber: txtDefaultDiagnosisTableNumber,
        DefaultDRGTableNumber: txtDefaultDRGTableNumber,
        DefaultHCPCSTableNumber: txtDefaultHCPCSTableNumber,
        DefaultDRUGTableNumber: txtDefaultDRUGTableNumber,
        BillEditRuleTableNumber: ddlBillEditRuleTablSet
    });


    $.ajax({
        type: "POST",
        url: '/Corporate/SaveCorporate',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data == "1") {
                //$('#loader_event').hide();

                ShowMessage("Corporate Number Already Exist", "Warning", "warning", true);
                UnblockSelectedClassObj('main-wrap');
                return;
            }
            ClearAll();
            var msg = "Records Saved successfully !";
            if (id > 0)
                msg = "Records updated successfully";

            ShowMessage(msg, "Success", "success", true);
            UnblockSelectedClassObj('main-wrap');
            //ajaxStartActive = true;
        },
        error: function (msg) {
            UnblockSelectedClassObj('main-wrap');
        }
    });
}

function editDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.CorporateId;
    EditCorporate(id);
}

function deleteDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.CorporateId;
    DeleteCorporate(id);
}

function EditCorporate(id) {
    var txtCorporateId = id;
    var jsonData = JSON.stringify({
        Id: txtCorporateId
    });
    $.ajax({
        type: "POST",
        url: '/Corporate/GetCorporate',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#CorporateFormDiv').empty();
                $('#CorporateFormDiv').html(data);
                $('#collapseOne').addClass('in');
                JsCalls();
                SetCountryStateCity();
                FormatMaskedPhone("#lblMainPhone", "#ddlMainPhone", "#txtCorporateMainPhone");
                FormatMaskedPhone("#lblSecondPhone", "#ddlSecondPhone", "#txtCorporateSecondPhone");
                FormatMaskedPhone("#lblFax", "#ddlFax", "#txtCorporateFax");
                $(".PhoneMask").mask("999-9999999");
                $('#collapseOne').addClass('in').attr('style', 'height:auto;');
            }
            else {
            }
        },
        error: function (msg) {

        }
    });
}

function ViewCorporate(id) {

    var txtServiceCodeId = id;
    var jsonData = JSON.stringify({
        Id: txtServiceCodeId,
        ViewOnly: 'true'
    });
    $.ajax({
        type: "POST",
        url: '/Corporate/GetCorporate',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {

            if (data) {
                $('#serviceCodeDiv').empty();
                $('#serviceCodeDiv').html(data);
                $('#collapseOne').addClass('in');
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function DeleteCorporate() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonDataId = JSON.stringify({
            id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/Corporate/CheckUserExistForCorporate',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonDataId,
            success: function (data) {
                if (!data) {
                    var jsonData = JSON.stringify({
                        corporateId: $("#hfGlobalConfirmId").val()
                    });
                    $.ajax({
                        type: "POST",
                        url: '/Corporate/DeleteCorporateData',
                        async: false,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: jsonData,
                        success: function (data1) {
                            if (data1 == "1") {
                                BindCorporateGrid();
                                ShowMessage("Records Deleted Successfully", "Success", "success", true);
                            }
                            else {
                                if (data1 == "-1") {
                                    ShowMessage('Main Corporate cannot be deleted. Contact Administrator for details!', "Alert", "warning", true);
                                }
                            }
                            return false;
                        },
                        error: function (msg) {
                            return true;
                        }
                    });
                }
                else {
                    ShowMessage('Cannot delete corporate, It is associated with Users.', "Alert", "warning", true);
                    return false;
                }
            },
            error: function (msg) {
                return true;
            }
        });
    }
}

function DeleteCorporate1(id) {
    $('#hidDeleteCorporate').val(id);
    $.blockUI({ message: $('#question'), css: { width: '357px' } });

}

function BindCorporateGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Corporate/BindCorporateList",
        dataType: "html",
        async: true,
        success: function (data) {
            $("#CorporateListDiv").empty();
            $("#CorporateListDiv").html(data);
        },
        error: function (msg) {

        }

    });
}

function ClearForm() {
    $("#CorporateFormDiv").clearForm();
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
}

function ClearAll() {
    ClearForm();
    $.validationEngine.closePrompt(".formError", true);
    var jsonData = JSON.stringify({
        Id: 0,
    });
    $.ajax({
        type: "POST",
        url: '/Corporate/ResetCorporateForm',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#CorporateFormDiv').empty();
                $('#CorporateFormDiv').html(data);
                $('#collapseTwo').addClass('in');
                table.fnDraw();
                //BindCorporateGrid();
                JsCalls();
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

function GetFilteredData(typeId, data, selector) {
    $(selector).empty();
    var items = '<option value="-1">--Select--</option>';
    var arr = $.grep(data, function (n) {
        return (n.CodeTableType === typeId);
    });

    $.each(arr, function (i, obj) {
        var newItem = "";
        if (obj.TableNumber == "0") {
            newItem = "<option id='" + obj.TableNumber + "'  value='" + obj.TableNumber + "'>Default</option>";
        } else {
            newItem = "<option id='" + obj.TableNumber + "'  value='" + obj.TableNumber + "'>" + obj.TableNumber + "</option>";
        }
        items += newItem;
    });
    $(selector).html(items);
}

function SortCorporateGrid(event) {

    var url = "/Corporate/BindCorporateList";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?" + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            
            $("#CorporateListDiv").empty();
            $("#CorporateListDiv").html(data);

        },
        error: function (msg) {
        }
    });


};

function BindAllCorporateDataOnLoad() {
    $.ajax({
        type: "POST",
        url: '/Corporate/BindAllCorporateDataOnLoad',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ typeId: "" }),
        success: function (data) {
            if (data.tlist != null && data.tlist.length > 0) {
                GetFilteredData("3", data.tlist, "#ddlCptTablSet");
                GetFilteredData("4", data.tlist, "#ddlHcpcsTablSet");
                GetFilteredData("5", data.tlist, "#ddlDrugTablSet");
                GetFilteredData("8", data.tlist, "#ddlServiceCodeTablSet");
                GetFilteredData("9", data.tlist, "#ddlDrgTablSet");
                GetFilteredData("16", data.tlist, "#ddlDiagnosisTablSet");
                GetFilteredData("19", data.tlist, "#ddlBillEditRuleTablSet");

                if ($("#DefaultCPTTableNumber").val() > 0) {
                    $("#ddlCptTablSet").val($("#DefaultCPTTableNumber").val());
                }
                if ($("#DefaultHCPCSTableNumber").val() > 0) {
                    $("#ddlHcpcsTablSet").val($("#DefaultHCPCSTableNumber").val());
                }
                if ($("#DefaultDRUGTableNumber").val() > 0) {
                    $("#ddlDrugTablSet").val($("#DefaultDRUGTableNumber").val());
                }
                if ($("#DefaultServiceCodeTableNumber").val() > 0) {
                    $("#ddlServiceCodeTablSet").val($("#DefaultServiceCodeTableNumber").val());
                }
                if ($("#DefaultDRGTableNumber").val() > 0) {
                    $("#ddlDrgTablSet").val($("#DefaultDRGTableNumber").val());
                }
                if ($("#DefaultDiagnosisTableNumber").val() > 0) {
                    $("#ddlDiagnosisTablSet").val($("#DefaultDiagnosisTableNumber").val());
                }
                if ($("#BillEditRuleTableNumber").val() > 0) {
                    $("#ddlBillEditRuleTablSet").val($("#BillEditRuleTableNumber").val());
                }
            }
            if (data.plist != null && data.plist.length > 0) {
                BindCountryCodeData("#ddlMainPhone", "#hdMainPhone", "#lblMainPhone", data.plist);
                BindCountryCodeData("#ddlSecondPhone", "#hdSecondPhone", "#lblSecondPhone", data.plist);
                BindCountryCodeData("#ddlFax", "#hdCorporateFax", "#lblFax", data.plist);
            }
        },
        error: function (msg) {

        }
    });
}
