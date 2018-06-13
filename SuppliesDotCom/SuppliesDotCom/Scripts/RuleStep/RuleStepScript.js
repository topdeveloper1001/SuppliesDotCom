$(function () {
    BindAll();
    /*$("#ddlCompareType").change(function (e) {
        var control = $(this);
        var val = parseInt(control.val());
        CompareTypeDDFunction(val);
    });*/
});
var bCount = 1;
function CompareTypeOnChange(e) {
    var control = $(e);
    var val = parseInt(control.val());
    CompareTypeDDFunction(val);
    /*
    Who: Amit Jain
    What: Changes in validations when Comparer Type is set to 'NotLike', it should remove the required validate class.
    When: 08 April, 2016
    Why: Since Direct Value is having empty value 
    while saving other values in case of Comparer Type 'Not Like', so it doesn't allow the user to save / edit the record due to Required Validation.
    And so, now made it optional. 
    */
    ChangeValidationsOnDirectValue();

    $("#divChange").hide();
}
function CompareTypeDDFunction(val) {
    switch (val) {
        case 0:
            ToggleRadioButtons('#rdRhsFromTable', '.rdRhsFrom');
            ShowHideRHSDivs('#rhsFromTable');
            $("#rdRhsFromTable").prop("disabled", false);
            $("#rdRhsFromDirectValue").prop("disabled", false);
            $("#rdRhsFromQueryString").prop("disabled", false);
            break;
        case 12:
        case 14:
            ToggleRadioButtons('#rdRhsFromQueryString', '.rdRhsFrom');
            ShowHideRHSDivs('#rhsFromQueryString');
            $("#rdRhsFromTable").prop("disabled", true);
            $("#rdRhsFromDirectValue").prop("disabled", true);
            $("#rdRhsFromQueryString").prop("disabled", false);
            break;
        case 10:
        case 11:
            ToggleRadioButtons('#rdRhsFromDirectValue', '.rdRhsFrom');
            ShowHideRHSDivs('#rhsFromDirectValue');
            $("#rdRhsFromTable").prop("disabled", true);
            $("#rdRhsFromDirectValue").prop("disabled", false);
            $("#rdRhsFromQueryString").prop("disabled", true);
            break;
        default:
            ToggleRadioButtons('#rdRhsFromTable', '.rdRhsFrom');
            ShowHideRHSDivs('#rhsFromTable');
            $("#rdRhsFromTable").prop("disabled", false);
            $("#rdRhsFromDirectValue").prop("disabled", false);
            $("#rdRhsFromQueryString").prop("disabled", true);
            break;
    }
}

function BindAll() {
    $("#RuleStepFormDiv").validationEngine();
    GetRuleStepDropdownData();
    BindErrorDropdown();
    InitializeDateTimePicker();
    ColorCodeRuleSteps();
    var hfCompareTypeValue = parseInt($("#hdCompareType").val());
    CompareTypeDDFunction(hfCompareTypeValue);
    $('#collapseRuleStepAddEdit').addClass('in');
}

//function GetRuleStepDropdownData() {
//    $.ajax({
//        type: "POST",
//        url: '/RuleStep/GetRuleStepDropdownData',
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        data: JSON.stringify({ startRange: 14000, endRange: 14999 }),
//        success: function (data) {
//            if (data != null) {
//                BindDropdownData(data.DataTypes, "#ddlDataTypes", "#hdDataType");
//                BindDropdownData(data.CompareTypes, "#ddlCompareType", "#hdCompareType");
//                BindDropdownData(data.TablesList, "#ddlLHST", "#hdLHST");
//                BindDropdownData(data.TablesList, "#ddlRHST", "#hdRHST");
//                BindDropdownData(data.conditionStartList, "#ddlConStart", "#hdConStart");
//                BindDropdownData(data.conditionEndList, "#ddlConEnd", "#hdConEnd");
//                //popup
//                BindDropdownData(data.TablesList, "#ddlRHSTPopup", "#hdRHSTPopup");
//                BindDropdownData(data.ExpressionTypes, "#ddlCompareTypePopup", "#hdCompareTypePopup");
//                BindDropdownData(data.ExpressionTypes, "#ddlCompareTypeTSPopup", "#hdCompareTypeTSPopup");
//                BindDropdownData(data.TablesList, "#ddlRHSTPopup", "#hdRHSTPopup");
//                BindDropdownData(data.TablesList, "#ddlLHSTPopup", "#hdLHSTPopup");
//                BindDropdownData(data.ExpressionTypes, "#ddlLhsCompareTypePopup", "#hdLhsCompareTypePopup");
//            }
//        },
//        error: function (msg) {

//        }
//    });
//}



function GetRuleStepDropdownData() {
    $.ajax({
        type: "POST",
        url: '/RuleStep/GetRuleStepDropdownData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data != null) {
                BindDropdownData(data.DataTypes, "#ddlDataTypes", "#hdDataType");
                BindDropdownData(data.CompareTypes, "#ddlCompareType", "#hdCompareType");
                BindDropdownData(data.TablesList, "#ddlLHST", "#hdLHST");
                BindDropdownData(data.TablesList, "#ddlRHST", "#hdRHST");
                BindDropdownData(data.conditionStartList, "#ddlConStart", "#hdConStart");
                BindDropdownData(data.conditionEndList, "#ddlConEnd", "#hdConEnd");
                //popup
                BindDropdownData(data.TablesList, "#ddlRHSTPopup", "#hdRHSTPopup");
                BindDropdownData(data.ExpressionTypes, "#ddlCompareTypePopup", "#hdCompareTypePopup");
                BindDropdownData(data.ExpressionTypes, "#ddlCompareTypeTSPopup", "#hdCompareTypeTSPopup");
                BindDropdownData(data.TablesList, "#ddlRHSTPopup", "#hdRHSTPopup");
                BindDropdownData(data.TablesList, "#ddlLHSTPopup", "#hdLHSTPopup");
                BindDropdownData(data.ExpressionTypes, "#ddlLhsCompareTypePopup", "#hdLhsCompareTypePopup");
            }
        },
        error: function (msg) {

        }
    });
}



function SaveRuleStep() {

    //var item=    CheckDirectValue();
    var isValid = jQuery("#RuleStepFormDiv").validationEngine({ returnIsValid: true });
    //isValid = CheckIsValidDirectValue();
    if (isValid == true) {
        if (true) {
            $.validationEngine.closePrompt(".formError", true);
            var txtRuleMasterID = $("#hdRuleMasterID1").val();
            if (txtRuleMasterID > 0) {
                var txtRuleStepID = $("#hdRuleStepID").val();
                var txtRuleStepNumber = $("#txtRuleStepNumber").val();
                var txtRuleStepDescription = $("#txtRuleStepDescription").val();
                var txtDataType = $("#ddlDataTypes").val();
                var txtLHST = $("#ddlLHST option:selected").text();
                var txtLHSC = $("#ddlLHSC option:selected").text();
                var txtLHSK = $("#ddlLHSK option:selected").text();
                var txtCompareType = $("#ddlCompareType").val();

                var txtRHSFrom = "";
                var rdRHSFromTableSelected = $("#rdRhsFromTable")[0].checked;
                var rdRhsFromDirectValueSelected = $("#rdRhsFromDirectValue")[0].checked;
                var rdRhsFromQueryStringSelected = $("#rdRhsFromQueryString")[0].checked;
                var rdRhsFromCustomQuerySelected = $("#rdRhsFromCustomQuery")[0].checked;
                var txtRHST = "";
                var txtRHSC = "";
                var txtRHSK = "";
                var txtDirectValue = "";
                var txtQueryString = "";
                var createdBy = $("#hdRuleStepCreatedBy").val();
                var createdDate = $("#hdRuleStepCreatedDate").val();

                if (rdRHSFromTableSelected) {
                    txtRHSFrom = 1; //"Table";
                    txtRHST = $("#ddlRHST option:selected").text();
                    txtRHSC = $("#ddlRHSC option:selected").text();
                    txtRHSK = $("#ddlRHSK option:selected").text();
                } else if (rdRhsFromDirectValueSelected) {
                    txtRHSFrom = 2; //"DirectValue";
                    txtDirectValue = $("#txtDirectValue").val();
                } else if (rdRhsFromQueryStringSelected) {
                    txtRHSFrom = 3; //"RangeValue";
                    txtDirectValue = $(".RangeVal").val();
                    txtQueryString = $("#txtQueryString").val();
                } else if (rdRhsFromCustomQuerySelected) {
                    txtRHSFrom = 4; //"RangeValue";
                }
                var txtErrorID = $("#ddlErrors").val();
                var txtRuleCode = ""; //$("#txtRuleCode").val();

                var ddlConStart = $("#ddlConStart").val();
                var ddlConEnd = $("#ddlConEnd").val();

                //var dtEffectiveStartDate = $("#dtEffectiveStartDate1").val();
                //var dtEffectiveEndDate = $("#dtEffectiveEndDate1").val();
                var isActive = $("#chkIsActive")[0].checked;
                var queryText = $("#txtExpression").val().replace(",", "").replace(" ,", "");
                var queryExpression = $("#hdExpression").val();
                var compareTypePopup = ""; //$("#ddlCompareTypePopup option:selected").text();
                var countValuePopup = ""; //$("#txtCountValue").val();

                if ($('#hfQueryFunctionTypePopup').val() == "2") {
                    compareTypePopup = $("#ddlCompareTypePopup option:selected").text();
                    countValuePopup = $("#txtCountValue").val();
                }
                if ($('#hfQueryFunctionTypePopup').val() == "5") {
                    compareTypePopup = $("#ddlCompareTypeTSPopup option:selected").text();
                    countValuePopup = $("#dtTimePicker").val();
                }
                var lhsQueryValue = $("#hdAdvancedExpression").val();
                var isAdvanced = $("#chkIsAdvanced").prop('checked');
                var txtLHSValue = $("#txtLHSValue").val();
                var lengthCompareType = $("#hfLHSExp").val() == "9" ? $("#ddlLhsCompareTypePopup option:selected").text() : "";
                var lengthCompareValue = $("#hfLHSExp").val() == "9" ? $("#txtLhsCountValue").val() : "";

                var jsonData = JSON.stringify({
                    RuleStepID: txtRuleStepID,
                    RuleStepNumber: txtRuleStepNumber,
                    RuleStepDescription: txtRuleStepDescription,
                    DataType: txtDataType,
                    LHST: txtLHST,
                    LHSC: txtLHSC,
                    LHSK: txtLHSK,
                    CompareType: txtCompareType,
                    RHSFrom: txtRHSFrom,
                    RHST: txtRHST,
                    RHSC: txtRHSC,
                    RHSK: txtRHSK,
                    DirectValue: txtDirectValue,
                    QueryString: txtQueryString,
                    RuleMasterID: txtRuleMasterID,
                    RuleCode: txtRuleCode,
                    ErrorID: txtErrorID,
                    // EffectiveStartDate: new Date(dtEffectiveStartDate),
                    //  EffectiveEndDate: new Date(dtEffectiveEndDate),
                    IsActive: isActive,
                    CreatedBy: createdBy,
                    CreatedDate: new Date(createdDate),
                    ConStart: ddlConStart,
                    ConEnd: ddlConEnd,
                    QueryText: queryText,
                    QueryExpression: queryExpression,
                    ExtValue1: compareTypePopup,
                    ExtValue2: countValuePopup,
                    QueryFunctionType: $("#hfQueryFunctionTypePopup").val(),
                    LhsQueryValue: lhsQueryValue,
                    IsAdvanced: isAdvanced,
                    ExtValue3: txtLHSValue,
                    LhsCompareType: lengthCompareType,
                    LhsComparerValue: lengthCompareValue
                });

                $.ajax({
                    type: "POST",
                    url: '/RuleStep/SaveRuleStep',
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    dataType: "html",
                    data: jsonData,
                    success: function (data) {
                        ClearRuleStepForm();
                        var msg = "Records Saved successfully !";
                        if (txtRuleMasterID > 0)
                            msg = "Records updated successfully";
                        BindRuleStepList("#RuleStepListDiv", data);
                        ShowMessage(msg, "Success", "success", true);
                        $("#lhsFromCustomQuery").html('');
                        bCount = 1;
                    },
                    error: function (msg) {

                    }
                });
            } else {
                ShowMessage("Select the rule first from Rule Master list!", "Alert", "warning", true);
                return false;
            }
        }
    }
}

function BindRuleStepList(htmlSelector, data) {
    /// <summary>
    /// Binds the list.
    /// </summary>
    /// <param name="htmlSelector">The HTML selector.</param>
    /// <param name="data">The data.</param>
    /// <returns></returns>
    $(htmlSelector).empty();
    $(htmlSelector).html(data);
}
function EditRuleStep(id) {
    var jsonData = JSON.stringify({
        id: id
    });
    $.ajax({
        type: "POST",
        url: '/RuleStep/GetRuleStep',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#RuleStepFormDiv').empty();
            $('#RuleStepFormDiv').html(data);
            BindAll();
            SetRadioButtonSelected($("#hdRhsFrom").val());
            OnChangeTableDropdown('#ddlLHST', 1);
            OnChangeTableDropdown('#ddlRHST', 2);
            $('#collapseRuleStepAddEdit').addClass('in');
            $('#collapseRuleStepAddEdit').attr("style", "height:auto");
            var textboxControl = $('#txtExpression');
            var hiddenField = $('#hdExpression');
            var hfReferencedIndicator = $("#hfReferencedIndicators");
            textboxControl.val('');
            hiddenField.val('');
            hfReferencedIndicator.val('');
            $("#divShowForCount").hide();
            ColorCodeRuleSteps();

            /*
            Who: Amit Jain
            What: Changes in validations when Comparer Type is set to 'NotLike', it should remove the required validate class.
            When: 08 April, 2016
            Why: Since Direct Value is having empty value 
            while saving other values in case of Comparer Type 'Not Like', so it doesn't allow the user to save / edit the record due to Required Validation.
            And so, now made it optional. 
            */
            ChangeValidationsOnDirectValue();
        },
        error: function (msg) {
        }
    });
}

function DeleteRuleStep() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/RuleStep/DeleteRuleStep',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data) {
                    ClearRuleStepForm();
                    BindRuleStepGrid();
                    ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
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

//function DeleteRuleStep(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var jsonData = JSON.stringify({
//            id: id
//        });
//        $.ajax({
//            type: "POST",
//            url: '/RuleStep/DeleteRuleStep',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data) {
//                    ClearRuleStepForm();
//                    BindRuleStepGrid();
//                    ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
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

function BindRuleStepGrid() {
    var txtRuleMasterID = $("#hdRuleMasterID1").val();
    var jsonData = JSON.stringify({
        ruleMasterId: txtRuleMasterID
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/RuleStep/BindRuleStepList",
        dataType: "html",
        async: true,
        data: jsonData,
        success: function (data) {
            $("#RuleStepListDiv").empty();
            $("#RuleStepListDiv").html(data);
            ColorCodeRuleSteps();
        },
        error: function (msg) {
        }
    });
}

function ClearRuleStepForm() {
    $("#RuleStepFormDiv").clearForm();
    $('#collapseRuleStepAddEdit').removeClass('in');
    $('#collapseRuleStepList').addClass('in');
    $("#RuleStepFormDiv").validationEngine();
    $.validationEngine.closePrompt(".formError", true);
    ResetAllDropdowns("#RuleStepFormDiv");
    $("#BtnRuleStepSave").val("Save");
    $("#hdRuleStepID").val("");
    $("#hdRhsFrom").val("");
    $("#chkIsActive").prop("checked", true);
    ToggleRadioButtons('#rdRhsFromTable', '.rdRhsFrom');
    ShowHideRHSDivs('#rhsFromTable');
    ColorCodeRuleSteps();
    GetMaxStepNumber();
    GetPreviewRuleStepResult();
    CloseExpressionDiv();
    $("#divLeftChange").hide();
}

function BindErrorDropdown() {
    $.ajax({
        type: "POST",
        url: '/RuleStep/GetErrorsList',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, "#ddlErrors", "#hdErrorID");
        },
        error: function (msg) {

        }
    });
}

function ShowHideRHSDivs(divSelector) {

    $("#divLhsShowForCount").hide();
    if (divSelector != "#divLeftExpression") {
        $(".rhsFromDiv").hide();
    }
    $(divSelector).show();
    var datatypeval = $('#ddlDataTypes').val();
    if (datatypeval != '0' || datatypeval != '') {
        var datatypetext = $('#ddlDataTypes :selected').text();
        if (divSelector == "#rhsFromDirectValue") {
            if (datatypetext === 'DATETIME') {
                $('#txtDirectValue').addClass('validate[required, custom[dateTimeFormat]]');
                $('#txtQueryString').removeClass('validate[required, custom[dateTimeFormat]]');
            } else if (datatypetext === 'INT') {
                $('#txtDirectValue').addClass('validate[required, custom[integer]]');
                $('#txtQueryString').removeClass('validate[required, custom[integer]]');
            } else if (datatypetext === 'NUMERIC(18,2)') {
                $('#txtDirectValue').addClass('validate[required, custom[number]]');
                $('#txtQueryString').removeClass('validate[required, custom[number]]');
            } else if (datatypetext === 'NVARCHAR(50)') {
                $('#txtDirectValue').addClass('validate[required]');
                $('#txtQueryString').removeClass('validate[required]');
            }
            $('.RangeVal').hide();
            $('.RangeVal').removeClass('validate[required]');
            $('#txtQueryString').removeClass('validate[required]');
            $("#divChange").hide();
        }
        else if (divSelector == "#rhsFromQueryString") {
            if (datatypetext === 'DATETIME') {
                $('#txtDirectValue').addClass('validate[required, custom[dateTimeFormat]]');
                $('#txtQueryString').removeClass('validate[required, custom[dateTimeFormat]]');
            } else if (datatypetext === 'INT') {
                $('#txtDirectValue').addClass('validate[required, custom[integer]]');
                $('#txtQueryString').removeClass('validate[required, custom[integer]]');
            } else if (datatypetext === 'NUMERIC(18,2)') {
                $('#txtDirectValue').addClass('validate[required, custom[number]]');
                $('#txtQueryString').removeClass('validate[required, custom[number]]');
            } else if (datatypetext === 'NVARCHAR(50)') {
                $('#txtDirectValue').addClass('validate[required]');
                $('#txtQueryString').removeClass('validate[required]');
            }
            $('.RangeVal').show();
            $('.RangeVal').addClass('validate[required]');
            $('#txtQueryString').addClass('validate[required]');
            //$("#divChange").hide();
        }
        else if (divSelector == "#divExpression") {
            $("#divExpression").show();
            $(".overlay").show();
            $("#rhsFromCustomQuery").show();
            $("#divChange").show();
        }
        else if (divSelector == "#divLeftExpression") {
            $("#divLeftExpression").show();
            $(".overlay").show();
            $("#lhsFromCustomQuery").show();
            $("#divLeftChange").show();
        }
        else if (divSelector == "#rdRhsFromCustomQuery") {
            $("#rhsFromCustomQuery").show();
            $("#divChange").show();
        }
        else {
            $('#txtDirectValue').removeClass();
            $('#txtQueryString').removeClass();
            $("#divExpression").hide();
            $(".overlay").hide();
        }
    }
}

function SetRadioButtonSelected(selectedValue) {
    $(".rdRhsFrom").attr("checked", false);
    if (selectedValue == 1) {
        $("#rdRhsFromTable").prop("checked", "checked");
        ShowHideRHSDivs("#rhsFromTable");
    }
    else if (selectedValue == 2) {
        $("#rdRhsFromDirectValue").prop("checked", "checked");
        ShowHideRHSDivs("#rhsFromDirectValue");
    }
    else if (selectedValue == 3) {
        $("#rdRhsFromQueryString").prop("checked", "checked");
        ShowHideRHSDivs("#rhsFromQueryString");
    }
    else if (selectedValue == 4) {
        $("#rdRhsFromCustomQuery").prop("checked", "checked");
        ShowHideRHSDivs("#rhsFromCustomQuery");
    }
    else {
        $("#rdRhsFromTable").prop("checked", "checked");
        ShowHideRHSDivs("#rhsFromTable");
    }
}

function OnChangeTableDropdown(ddlSelector, dropdownType) {
    //var value = $(ddlSelector + " option:selected").text();
    //if (value != null && value != '' && value.indexOf('Select') == -1) {
    //    $.ajax({
    //        type: "POST",
    //        url: '/Home/GetColumnsByTableName',
    //        async: false,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        data: JSON.stringify({ tableName: value }),
    //        success: function (data) {
    //            //For LHS
    //            var items = '<option value="' + data.KeyColumn + '">' + data.KeyColumn + '</option>';
    //            if (dropdownType == 1) {
    //                BindDropdownData(data.List, "#ddlLHSC", "#hdLHSC");
    //                $("#ddlLHSK").html(items);
    //            }
    //                //For RHS
    //            else {
    //                BindDropdownData(data.List, "#ddlRHSC", "#hdRHSC");
    //                $("#ddlRHSK").html(items);
    //            }
    //        },
    //        error: function (msg) {

    //        }
    //    });
    //}
    var value = $(ddlSelector).val();
    if (value != null && value != '') {
        $.ajax({
            type: "POST",
            url: '/Home/GetColumnsForTable',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ tableid: value }),
            success: function (data) {
                //For LHS
                var items = '<option value="' + data.KeyColumn + '">' + data.KeyColumn + '</option>';
                if (dropdownType == 1) {
                    BindDropdownData(data.List, "#ddlLHSC", "#hdLHSC");
                    BindDropdownData(data.KeyColumnList, "#ddlLHSK", "#hdLHSK");
                    //$("#ddlLHSK").html(items);
                    $("#ddlLHSK").removeAttr('disabled');
                    //popup
                    BindDropdownData(data.List, "#ddlLHSCPopup", "#hdLHSCPopup");

                }
                    //For RHS
                else {
                    BindDropdownData(data.List, "#ddlRHSC", "#hdRHSC");
                    BindDropdownData(data.KeyColumnList, "#ddlRHSK", "#hdRHSK");
                    //$("#ddlRHSK").html(items);
                    $("#ddlRHSK").removeAttr('disabled');
                    //popup
                    BindDropdownData(data.List, "#ddlRHSCPopup", "#hdRHSCPopup");
                    BindDropdownData(data.KeyColumnList, "#ddlRHSKPopup", "#hdRHSKPopup");

                }
            },
            error: function (msg) {

            }
        });
    }
}

function SetColumnValueValidation() {
    var datatypeval = $('#ddlDataTypes').val();
    if (datatypeval != '0' || datatypeval != '') {
        if ($('#rdRhsFromDirectValue').prop('checked')) {
            switch (datatypeval) {
                case '1':
                    $('#txtDirectValue').addClass('validate[required]');
                case '2':
                    $('#txtDirectValue').addClass('validate[required]');
                case '3':
                    $('#txtDirectValue').addClass('validate[required]');
                case '4':
                    $('#txtDirectValue').addClass('validate[required]');
                default:
                    $('#txtDirectValue').removeClass('validate[required]');
            }

            /*
            Who: Amit Jain
            What: Changes in validations when Comparer Type is set to 'NotLike', it should remove the required validate class.
            When: 08 April, 2016
            Why: Since Direct Value is having empty value 
            while saving other values in case of Comparer Type 'Not Like', so it doesn't allow the user to save / edit the record due to Required Validation.
            And so, now made it optional. 
            */
            ChangeValidationsOnDirectValue();
        }
    }
}

var GetMaxStepNumber = function () {
    var txtRuleMasterId = $("#hdRuleMasterID1").val();
    var jsonData = JSON.stringify({
        ruleMasterId: txtRuleMasterId
    });
    $.ajax({
        type: "POST",
        url: '/RuleStep/GetRuleStepNumber',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $('#txtRuleStepNumber').val(data);
        },
        error: function (msg) {

        }
    });
};

var GetFieldDataType = function () {
    var selectedColumnvalue = $('#ddlLHSC :selected').text();
    var selectedtablevalue = $('#ddlLHST :selected').text();
    if (selectedColumnvalue != '' || selectedColumnvalue != '0') {
        var jsonData = JSON.stringify({
            tableName: selectedtablevalue,
            columnName: selectedColumnvalue
        });
        $.ajax({
            type: "POST",
            url: '/Home/GetColumnDataType',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                $('#ddlDataTypes option:contains(' + data + ')').attr("selected", "selected");
            },
            error: function (msg) {

            }
        });
    }
};

var ShowHidePreviewDiv = function () {
    //var selectedClass = $('#divPreview').hasClass('previewHide');
    //if (selectedClass) {
    //    $('#divPreview').removeClass('previewHide');
    //    $('#divPreview').addClass('previewShow');
    //} else {
    //    $('#divPreview').addClass('previewHide');
    //    $('#divPreview').removeClass('previewShow');
    //}
    GetPreviewRuleStepResult();
};

var ColorCodeRuleSteps = function () {

    $("#gridContentRuleStep tbody tr").each(function (i, row) {
        var $actualRow = $(row);
        if ($actualRow.find('.col3').html().indexOf("IF") != -1) {
            $actualRow.addClass('rowColor3');
        }
        else if ($actualRow.find('.col3').html().indexOf('THEN') != -1) {
            $actualRow.addClass('rowColor5');
        }
        else {
            $actualRow.removeClass('rowColor3');
            $actualRow.removeClass('rowColor5');
        }
    });
};

var GetPreviewRuleStepResult = function () {
    var txtRuleMasterId = $("#hdRuleMasterID1").val();
    var jsonData = JSON.stringify({
        ruleMasterId: txtRuleMasterId
    });
    $.ajax({
        type: "POST",
        url: '/RuleStep/GetPreviewRuleStepResult',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $('#divPreviewRule').show();
            $('#lblPreviewRule').empty();
            $('#lblPreviewRule').html(data);
        },
        error: function (msg) {

        }
    });
};

var CheckIsValidDirectValue = function () {
    var datatypeval = $('#ddlDataTypes').val();
    var isValid = false;
    if (datatypeval != '0' || datatypeval != '') {
        var datatypetext = $('#ddlDataTypes :selected').text();
        if ($("#rdRhsFromDirectValue").prop('checked')) {
            var directValue = $('#txtDirectValue').val();
            if (datatypetext === 'DATETIME') {
                if (Date.parse(directValue)) {
                    isValid = true;
                } else {
                    if (directValue == 'NULL') {
                        isValid = true;
                    }
                    isValid = false;
                }
            } else if (datatypetext === 'INT') {
                if (isInt(directValue)) {
                    isValid = true;
                } else {
                    isValid = false;
                }
            } else if (datatypetext === 'NUMERIC(18,2)') {
                if (isFloat(directValue)) {
                    isValid = true;
                } else {
                    if (isInt(directValue)) {
                        isValid = true;
                    } else {
                        isValid = false;
                    }
                }
            } else if (datatypetext === 'NVARCHAR(50)') {
                if (directValue != '') {
                    isValid = true;
                }
                else {
                    isValid = false;
                }
            }
        }
    }
    if (!isValid) {
        ShowMessage("Datatype does not match.", "Alert", "warning", true);
    }
    return isValid;
};

function isFloat(x) {
    return (typeof x === "number" && Math.abs(x % 1) > 0);
}

function isInt(n) {
    return (typeof n == 'number' && n % 1 == 0);
}
function SetValueInTextBox(givenval) {
    var textboxControl = $('#txtExpression');
    var hiddenField = $('#hdExpression');
    var lblExpression = $('#lblExpression');

    var hfReferencedIndicator = $("#hfReferencedIndicators");
    $('#dtTimePicker').removeClass("validate[custom[integer]]");
    $('#txtCountValue').removeClass("validate[custom[integer]]");
    if (givenval == 'Add') {
        var ddlRHSTPopup = $('#ddlRHSTPopup option:selected');
        var ddlRHSCPopup = $('#ddlRHSCPopup option:selected');
        var ddlRHSKPopup = $('#ddlRHSKPopup option:selected');

        if ((ddlRHSTPopup != null && ddlRHSTPopup.length > 0 && ddlRHSTPopup.val() != "0" && ddlRHSCPopup != null
            && ddlRHSCPopup.length > 0 && ddlRHSCPopup.val() != "0" && ddlRHSKPopup != null && ddlRHSKPopup.length > 0
            && ddlRHSKPopup.val() != "0") || $("#hfQueryFunctionTypePopup").val() == "10") {
            var propertyType = "(" + ddlRHSTPopup.text() + " - " + ddlRHSCPopup.text() + " - " + ddlRHSKPopup.text() + ")";
            var value = ddlRHSTPopup.text() + "," + ddlRHSCPopup.text() + "," + ddlRHSKPopup.text();
            if (textboxControl.val().length > 0) {
                var totalLength = textboxControl.val().length;
                var givenval = textboxControl.val().charAt(totalLength - 1);

                if ($("#hfQueryFunctionTypePopup").val() == "2") {
                    givenval = 'c';
                } else if ($("#hfQueryFunctionTypePopup").val() == "3") {
                    givenval = 's';
                } else if ($("#hfQueryFunctionTypePopup").val() == "4") {
                    givenval = 'm';
                } else if ($("#hfQueryFunctionTypePopup").val() == "5") {
                    givenval = 'ts';
                } else if ($("#hfQueryFunctionTypePopup").val() == "8") {
                    givenval = 'l';
                } else if ($("#hfQueryFunctionTypePopup").val() == "10") {
                    givenval = 'mr';
                }
                if (givenval == '+') {
                    textboxControl.val(textboxControl.val() + propertyType);
                    lblExpression.html(textboxControl.val());
                    hiddenField.val(hiddenField.val() + "," + value);
                    return false;
                } else if (givenval == 'c' || givenval == 's' || givenval == 'm' || givenval == 'ts' || givenval == 'l') {
                    textboxControl.val('');
                    hiddenField.val('');
                    var fn = "";
                    if (givenval == 'c') {
                        fn = "Count";
                    } else if (givenval == 's') {
                        fn = "Sum";
                    } else if (givenval == 'm') {

                        fn = "Max";
                    } else if (givenval == 'ts') {
                        //$('#divBetween').show();

                        fn = "TimeSpan";
                    } else if (givenval == 'l') {
                        fn = "Latest";
                    }
                    textboxControl.val(fn + textboxControl.val() + propertyType);
                    lblExpression.html(textboxControl.val());
                    hiddenField.val(fn + hiddenField.val() + "," + value);
                    return false;
                } else if (givenval == 'mr') {
                    var loop = bCount;
                    var htxt = "";
                    for (var i = 1; i <= loop; i++) {
                        if ($("#blhs" + i).val() != "") {
                            var blhs = $("#blhs" + i).val();
                            if ($("#brhs" + i).val() != "") {
                                var brhs = $("#brhs" + i).val();
                                var selmr = "";
                                if ($("#selmr" + i).val() != "0") {
                                    selmr = $("#selmr" + i + " option:selected").text();
                                }
                                htxt += " Between '" + blhs + "' AND '" + brhs + "' " + selmr + ",";
                            }
                        }
                    }
                    textboxControl.val(htxt);
                    lblExpression.html(textboxControl.val().replace(",", "").replace(" ,", " "));
                    hiddenField.val(textboxControl.val().substring(0, textboxControl.val().length - 1));
                    return false;
                }
            } else if (textboxControl.val() === "") {
                ShowMessage("Please select the Expression first!", "Warning", "warning", true);
            } else {
                textboxControl.val(textboxControl.val() + propertyType);
                lblExpression.html(textboxControl.val());
                hiddenField.val(hiddenField.val() + value);
                $('#ddlRHSTPopup').val("0");
                $('#ddlRHSCPopup').val("0");
                $('#ddlRHSKPopup').val("0");
            }
        }
    }
    else if (givenval == 'done') {
        var jsonData = JSON.stringify({
            FormulaExpression: textboxControl.val()
        });
        /*$.ajax({
            type: "POST",
            url: '/GlobalCode/ValidateFormulaExpression',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {*/
        var expValue = textboxControl.val();
        var lastChar = expValue.slice(expValue.length - 1, expValue.length);
        if (lastChar == ")" || lastChar == ",") {
            var newVal;
            if ($("#hfQueryFunctionTypePopup").val() == "5") {
                if ($("#ddlCompareTypeTSPopup option:selected").text() !== '--Select--') {
                    if ($("#dtTimePicker").val() !== "") {
                        newVal = textboxControl.val() + " " + $("#ddlCompareTypeTSPopup option:selected").text() + " " + $("#dtTimePicker").val();
                        $("#rhsFromCustomQuery").html(newVal);
                    } else {
                        ShowMessage("Please fill TimeSpan value!", "Warning", "warning", true);
                        return false;
                    }
                } else {
                    ShowMessage("Please select Compare Type!", "Warning", "warning", true);
                    return false;
                }
            } else if ($("#hfQueryFunctionTypePopup").val() == "2") {
                if ($("#ddlCompareTypePopup option:selected").text() != '--Select--') {
                    if ($("#txtCountValue").val() != "") {
                        newVal = textboxControl.val() + " " + $("#ddlCompareTypePopup option:selected").text() + " " + $("#txtCountValue").val();
                        $("#rhsFromCustomQuery").html(newVal);
                    } else {
                        ShowMessage("Please fill Compare value!", "Warning", "warning", true);
                        return false;
                    }
                } else {
                    ShowMessage("Please select Compare Type!", "Warning", "warning", true);
                    return false;
                }
            }
            else if ($("#hfQueryFunctionTypePopup").val() == "10") {
                newVal = textboxControl.val().substring(0, textboxControl.val().length - 1);
                $("#rhsFromCustomQuery").html(newVal.replace(","));
            }
            else {
                $("#rhsFromCustomQuery").html(textboxControl.val());
            }
            $('#divExpression').hide();
            $('.overlay').hide();
            $("#divShowForCount").hide();
            $("#divShowForTimeSpan").hide();
        } else {
            ShowMessage("Expression is not correct", "Warning", "warning", true);
        }
        /*},
        error: function (msg) {
            msg = msg.responseText.split(':')[1];
            ShowMessage(msg, "Warning", "warning", true);
        }
    });*/
    } else if (givenval == 'clear') {
        textboxControl.val('');
        hiddenField.val('');
        hfReferencedIndicator.val('');
        $("#rhsFromCustomQuery").html('No Expression');
        lblExpression.html('');
        $("#divShowForCount").hide();
    } else if (givenval == 'cancel') {
        CloseExpressionDiv();
    } else if (givenval == '+') {
        $("#pExample").html("(Table-Column-Key Column) + (Table-Column-Key Column)");
        $("#hfQueryFunctionTypePopup").val("1");
        if ($("#hfQueryFunctionTypePopup").val() != "1") {
            textboxControl.val('');
            lblExpression.html(textboxControl.val());
        }
        if (textboxControl.val().length > 0) {
            var totalLength = textboxControl.val().length;
            var space = textboxControl.val().charAt(totalLength - 1);
            if (space != "+") {
                textboxControl.val(textboxControl.val() + " " + givenval);
                lblExpression.html(textboxControl.val());
                hiddenField.val(hiddenField.val() + "," + givenval);
            }
        } else {
            alert('Please Select Table, Column, & Key column first');
        }
        $("#divShowForCount").hide();
        $("#rhsFromTable").show();
        $("#divBetween").hide();
    } else if (givenval == 'c') {
        $("#pExample").html("Count(Table-Column-Key Column)");
        textboxControl.val("Count");
        lblExpression.html(textboxControl.val());
        hiddenField.val("Count,");
        $("#divShowForCount").show();
        $("#divShowForTimeSpan").hide();
        $("#hfQueryFunctionTypePopup").val("2");
        $("#rhsFromTable").show();
        $("#divBetween").hide();
    }
    else if (givenval == 's') {
        $("#pExample").html("Sum(Table-Column-Key Column)");
        textboxControl.val("Sum");
        lblExpression.html(textboxControl.val());
        hiddenField.val("Sum,");
        $("#divShowForCount").hide();
        $("#divShowForTimeSpan").hide();
        $("#hfQueryFunctionTypePopup").val("3");
        $("#rhsFromTable").show();
        $("#divBetween").hide();
    }
    else if (givenval == 'm') {
        $("#pExample").html("Max(Table-Column-Key Column)");
        textboxControl.val("Max");
        lblExpression.html(textboxControl.val());
        hiddenField.val("Max,");
        $("#divShowForCount").hide();
        $("#divShowForTimeSpan").hide();
        $("#hfQueryFunctionTypePopup").val("4");
        $("#rhsFromTable").show();
        $("#divBetween").hide();
    }
    else if (givenval == 'ts') {
        //$("#pExample").html("TimeSpan(Table-Column-Key Column)");
        $("#pExample").html("TimeSpan(Compare-Type Time-Span-In-Hour)");
        textboxControl.val("TimeSpan");
        lblExpression.html(textboxControl.val());
        hiddenField.val("TimeSpan,");
        $("#divShowForCount").hide();
        $("#divShowForTimeSpan").show();
        $("#hfQueryFunctionTypePopup").val("5");
        //$("#rhsFromTable").show();
        $("#rhsFromTable").hide();
        $("#divBetween").hide();
    } else if (givenval == 'l') {
        $("#pExample").html("Latest(Table-Column-Key Column)");
        textboxControl.val("Latest");
        lblExpression.html(textboxControl.val());
        hiddenField.val("Latest,");
        $("#divShowForCount").hide();
        $("#divShowForTimeSpan").hide();
        $("#hfQueryFunctionTypePopup").val("8");
        $("#rhsFromTable").show();
        $("#divBetween").hide();
    } else if (givenval == 'mr') {
        textboxControl.val("Between");
        lblExpression.html(textboxControl.val());
        hiddenField.val("Between");
        $("#divShowForCount").hide();
        $("#divShowForTimeSpan").hide();
        $("#hfQueryFunctionTypePopup").val("10");
        $('#divBetween').show();
        $("#rhsFromTable").hide();
    }
    if ($("#rdRhsFromCustomQuery").is(":checked")) {
        $("#rhsFromTable").hide();
    }
    return false;
}
function SetLeftValueInTextBox(givenval) {

    var textboxControl = $('#txtLeftExpression');
    var hiddenField = $('#hdAdvancedExpression');
    var lblExpression = $('#lblLeftExpression');

    if (givenval == 'Add') {
        var ddlLHSTPopup = $('#ddlLHST option:selected');
        var ddlLHSCPopup = $('#ddlLHSCPopup option:selected');
        var ddlLHSKPopup = $('#ddlLHSKPopup option:selected');
        var txtLHSValue = $("#txtLHSValue");

        if (ddlLHSTPopup != null && ddlLHSTPopup.length > 0 && ddlLHSTPopup.val() != "0" && ddlLHSCPopup != null && ddlLHSCPopup.length > 0 && ddlLHSCPopup.val() != "0") {

            if (textboxControl.val().length > 0 && txtLHSValue.val() != "") {
                var totalLength = textboxControl.val().length;
                var givenval = textboxControl.val().charAt(totalLength - 1);
                if ($("#hfLHSExp").val() == "6") {
                    givenval = "a";
                }
                if ($("#hfLHSExp").val() == "7") {
                    givenval = "o";
                }
                if ($("#hfLHSExp").val() == "9") {
                    givenval = "lg";
                }
                if (givenval == 'a') {
                    var propertyType = " (" + ddlLHSCPopup.text() + " = " + txtLHSValue.val() + ")";
                    textboxControl.val(textboxControl.val() + " " + propertyType);
                    lblExpression.html(textboxControl.val());
                    hiddenField.val(textboxControl.val());
                    return false;
                }
                else if (givenval == 'o') {
                    var propertyType = " (" + ddlLHSCPopup.text() + " = " + txtLHSValue.val() + ")";
                    textboxControl.val(textboxControl.val() + " " + propertyType);
                    lblExpression.html(textboxControl.val());
                    hiddenField.val(textboxControl.val());
                    return false;
                }
                else if (givenval == 'lg') {
                    var propertyType = " (" + ddlLHSCPopup.text() + ")";
                    textboxControl.val("Length" + propertyType);
                    lblExpression.html(textboxControl.val());
                    hiddenField.val(textboxControl.val());
                    return false;
                }
                else if (givenval == 'dis') {
                    $('#divLhsShowForCount').hide();
                    $('#hideTextBox').hide();
                    var propertyType = " (" + ddlLHSCPopup.text() + ")";
                    textboxControl.val("Distinct" + propertyType);
                    lblExpression.html(textboxControl.val());
                    hiddenField.val(textboxControl.val());
                    return false;
                }
            }
            else if (txtLHSValue.val() == "") {
                ShowMessage("Please fill the Value field", "Warning", "warning", true);
            }
        }
    }
    else if (givenval == 'done') {
        var expValue = textboxControl.val();
        var lastChar = expValue.slice(expValue.length - 1, expValue.length);
        if (lastChar == ")") {
            $("#lhsFromCustomQuery").html(textboxControl.val());
            $('#divLeftExpression').hide();
            $('.overlay').hide();
        } else {
            ShowMessage("Expression is not correct", "Warning", "warning", true);
        }
    } else if (givenval == 'clear') {
        textboxControl.val('');
        hiddenField.val('');
        $("#lhsFromCustomQuery").html('No Expression');
        lblExpression.html('');
    } else if (givenval == 'cancel') {
        CloseAdvancedPopup();
    } else if (givenval == 'a') {
        if ($("#hfLHSExp").val() == "9") {
            textboxControl.val('');
            lblExpression.html(textboxControl.val());
            hiddenField.val('');
        }
        $("#divLhsShowForCount").hide();
        var expValue = textboxControl.val();
        var lastChar = expValue.slice(expValue.length - 1, expValue.length);
        if (lastChar == ")" && expValue != "") {
            textboxControl.val(textboxControl.val() + " AND");
            lblExpression.html(textboxControl.val());
            hiddenField.val(hiddenField.val() + " AND");
            $("#hfLHSExp").val("6");
        }
        else if (expValue == "") {
            textboxControl.val(textboxControl.val() + " AND");
            lblExpression.html(textboxControl.val());
            hiddenField.val(hiddenField.val() + " AND");
            $("#hfLHSExp").val("6");
        }
        else {
            ShowMessage("Expression is not correct", "Warning", "warning", true);
        }
    } else if (givenval == 'o') {
        if ($("#hfLHSExp").val() == "9") {
            textboxControl.val('');
            lblExpression.html(textboxControl.val());
            hiddenField.val('');
        }
        $("#divLhsShowForCount").hide();
        var expValue = textboxControl.val();
        var lastChar = expValue.slice(expValue.length - 1, expValue.length);
        if (lastChar == ")" && expValue != "") {
            textboxControl.val(textboxControl.val() + " OR");
            lblExpression.html(textboxControl.val());
            hiddenField.val(hiddenField.val() + " OR");
            $("#hfLHSExp").val("7");
        }
        else if (expValue == "") {
            textboxControl.val(textboxControl.val() + " OR");
            lblExpression.html(textboxControl.val());
            hiddenField.val(hiddenField.val() + " OR");
            $("#hfLHSExp").val("7");
        } else {
            ShowMessage("Expression is not correct", "Warning", "warning", true);
        }
    }
    else if (givenval == 'lg') {
        var expValue = textboxControl.val();
        var lastChar = expValue.slice(expValue.length - 1, expValue.length);
        textboxControl.val("Length");
        lblExpression.html(textboxControl.val());
        hiddenField.val("Length");
        $("#hfLHSExp").val("9");
        $("#divLhsShowForCount").show();

    }
    else if (givenval == 'dis') {
        var expValue = textboxControl.val();
        var lastChar = expValue.slice(expValue.length - 1, expValue.length);
        textboxControl.val("Distinct");
        lblExpression.html(textboxControl.val());
        hiddenField.val("Distinct");
        $("#hfLHSExp").val("9");

    }
    return false;
}
function CloseExpressionDiv() {
    $('#divExpression').hide();
    $('.overlay').hide();
    $("#divShowForCount").hide();
    $("#divShowForTimeSpan").hide();
    if ($("#hdRuleStepID").val() == "0" && $("#rhsFromCustomQuery").html == "") {
        $('#txtExpression').val('');
        $('#lblExpression').html('');
        $('#hdExpression').val('');
        $("#rhsFromCustomQuery").html('');
    }
}
function OpenAdvancedPopup(e) {
    if ($(e).prop("checked")) {
        //$('#divLeftExpression').show();
        //$('.overlay').show();
        $("#divLeftChange").show();
    } else {
        $("#divLeftChange").hide();
    }
}
function CloseAdvancedPopup() {
    $('#divLeftExpression').hide();
    $('.overlay').hide();
    /*$('#txtLeftExpression').val('');
    $('#lblLeftExpression').html('');
    $('#hdAdvancedExpression').val('');
    $("#lhsFromCustomQuery").html('');
    $("#hfLHSExp").val("0");*/
}

function CreateDynamicBetween() {
    bCount += 1;
    var lblCreation = '<label class="between_lbl">Between</label>';
    var txtCreation = '<input type="text" id="blhs' + bCount + '" /> <label class="and_lbl">AND</label> <input type="text" id="brhs' + bCount + '"/>';
    //var minusCreation = '<input type="button" value="Minus" onclick="CreateDynamicBetween();"/>';
    var selCreation = '<select id="selmr' + bCount + '"><option value="0">--Select--</option><option value="1">AND</option><option value="2">OR</option></select>';
    var html = '<div id="dmr' + bCount + '" class="between_clause">';
    html += lblCreation + txtCreation + selCreation;
    html += '</div>';
    $("#divMultiRange").append(html);
}


function CheckDirectValue() {
    var directValue = $('#txtDirectValue').val();
    if ($("#rdRhsFromDirectValue").prop("checked")) {
        if (directValue != "") {
            return true;
        } else {
            ShowMessage("Please Enter Direct value", "Warning", "warning", true);
            return false;
        }
    }
    return false;
};

function ChangeValidationsOnDirectValue() {
    var datatypetext = $('#ddlDataTypes :selected').text();
    var compareTypetext = $('#ddlCompareType :selected').text();

    var dtValue = $("#ddlDataTypes").val();
    if (compareTypetext == 'Not Like' && dtValue > 0) {
        if (datatypetext != '') {
            datatypetext = datatypetext.toLowerCase();
            if (datatypetext.indexOf('date') != -1) {
                $('#txtDirectValue').removeClass('validate[required, custom[dateTimeFormat]]');
                $('#txtDirectValue').addClass('validate[optional[dateFormat]]');
            }
            else if (datatypetext.indexOf('int') != -1) {
                $('#txtDirectValue').removeClass('validate[required, custom[integer]]');
                $('#txtDirectValue').addClass('validate[optional[integer]]');
            }
            else if (datatypetext.indexOf('numeric') != -1) {
                $('#txtDirectValue').removeClass('validate[required, custom[number]]');
                $('#txtDirectValue').addClass('validate[optional[number]]');
            } else {
                $('#txtDirectValue').removeClass('validate[required]');
            }
        }
    }
}