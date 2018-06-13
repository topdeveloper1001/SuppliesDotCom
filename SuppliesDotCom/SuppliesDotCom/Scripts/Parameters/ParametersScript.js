

$(function () {
    ParametersJsCalls();
});

function ParametersJsCalls() {

    $("#ParametersFormDiv").validationEngine();

    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });
    InitializeDateTimePicker();
    //Filling all DropDown in page.
    BindGlobalCodes("#ddlParamLevel", 2301, "#hdParamLevel");
    if ($('#hdParamType').val() == "" || $('#hdParamType').val() == "False") {
        $('#ddlParamType').val('0');
    } else {
        $('#ddlParamType').val('1');
    }
    if ($('#hdBitValue').val() == "" || $('#hdBitValue').val() == "false") {
        $('#ddlBitVal').val('0');
    } else {
        $('#ddlBitVal').val('1');
    }
    BindGlobalCodes("#ddlParamDataType", 2303, "#hdParamDataType");
}

function SaveParameters(id) {
    var isValid = jQuery("#ParametersFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var parameterDTText = $("#ddlParamDataType option:selected").text().toLowerCase().trim();

        var ddlParamLevel = $("#ddlParamLevel").val();
        var txtParamName = $("#txtParamName").val();
        var txtParamDescription = $("#txtParamDescription").val();
        var ddlParamType = $("#ddlParamType").val();
        var ddlParamDataType = $("#ddlParamDataType").val();
        var txtIntValue1 = parameterDTText == 'integer' ? $("#ddlParamType").val() == '0' ? $("#txtValue3").val() : $("#txtValue1").val() : null;
        var txtIntValue2 = parameterDTText == 'integer' ? $("#ddlParamType").val() == '1' ? $("#txtValue2").val() : null : null;
        var txtNumValue1 = parameterDTText == 'numeric' ? $("#ddlParamType").val() == '0' ? $("#txtValue3").val() : $("#txtValue1").val() : null;
        var txtNumValue2 = parameterDTText == 'numeric' ? $("#ddlParamType").val() == '1' ? $("#txtValue2").val() : null : null;
        var dtDatValue1 = parameterDTText == 'date' ? $("#ddlParamType").val() == '0' ? $("#txtValue3").val() : $("#txtValue1").val() : null;
        var dtDatValue2 = parameterDTText == 'date' ? $("#ddlParamType").val() == '1' ? $("#txtValue2").val() : null : null;
        var txtStrValue1 = parameterDTText == 'string' ? $("#ddlParamType").val() == '0' ? $("#txtValue3").val() : $("#txtValue1").val() : null;
        var txtStrValue2 = parameterDTText == 'string' ? $("#ddlParamType").val() == '1' ? $("#txtValue2").val() : null : null;
        var txtBitValue = parameterDTText == 'bool' ? $("#ddlBitVal").val() : null;
        var extStrValue1 = parameterDTText == 'time' ? $("#ddlParamType").val() == '0' ? $("#txtValue3").val() : $("#txtValue1").val() : null;
        var extStrValue2 = parameterDTText == 'time' ? $("#ddlParamType").val() == '1' ? $("#txtValue2").val() : null : null;
        var dtEffectiveStartDate = $("#dtEffectiveStartDate").val();
        var dtEffectiveEndDate = $("#dtEffectiveEndDate").val();
        var txtModifiedBy = $("#txtModifiedBy").val();
        var dtModifiedDate = $("#dtModifiedDate").val();
        var txtIsActive = $("#chkStatus").prop("checked");
        var systemCode = $('#ddlSystemCode').val();


        var jsonData = JSON.stringify({
            ParametersID: id == '' ? '0' : id,
            ParamLevel: ddlParamLevel,
            ParamName: txtParamName,
            ParamDescription: txtParamDescription,
            ParamType: ddlParamType == "0" ? false : true,
            ParamDataType: ddlParamDataType,
            IntValue1: txtIntValue1,
            IntValue2: txtIntValue2,
            NumValue1: txtNumValue1,
            NumValue2: txtNumValue2,
            DatValue1: dtDatValue1,
            DatValue2: dtDatValue2,
            StrValue1: txtStrValue1,
            StrValue2: txtStrValue2,
            BitValue: txtBitValue,
            EffectiveStartDate: dtEffectiveStartDate,
            EffectiveEndDate: dtEffectiveEndDate,
            ModifiedBy: txtModifiedBy,
            ModifiedDate: dtModifiedDate,
            IsActive: txtIsActive,
            ExtValue1: extStrValue1,
            ExtValue2: extStrValue2,
            SystemCode: systemCode
        });
        $.ajax({
            type: "POST",
            url: '/Parameters/SaveParameters',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                ClearAll();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";
                ParametersJsCalls();
                ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {

            }
        });
    }
}

function editDetails(e) {

    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.ParametersId;
    EditParameters(id);

}

function deleteDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.ParametersId;
    DeleteParameters(id);
}

function EditParameters(id) {
    var txtParametersId = id;
    var jsonData = JSON.stringify({
        ParametersID: txtParametersId
    });
    $.ajax({
        type: "POST",
        url: '/Parameters/GetParameters',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#ParametersFormDiv').empty();
                $('#ParametersFormDiv').html(data);
                $('#collapseOne').addClass('in');
                ParametersJsCalls();
                BindSystemCodes();
                ShowParameters();
            }
            else {
            }
        },
        error: function (msg) {

        }
    });
}

function ViewParameters(id) {

    var txtServiceCodeId = id;
    var jsonData = JSON.stringify({
        ParametersID: txtServiceCodeId
    });
    $.ajax({
        type: "POST",
        url: '/Parameters/GetParameters',
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


function DeleteParameters() {
    if ($("#hfGlobalConfirmId").val() > 0) {
    var jsonData = JSON.stringify({
            ParametersID: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/Parameters/DeleteParameters',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data) {
                    BindParametersGrid();
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


//function DeleteParameters(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var txtParametersId = id;
//        var jsonData = JSON.stringify({
//            ParametersID: txtParametersId
//        });
//        $.ajax({
//            type: "POST",
//            url: '/Parameters/DeleteParameters',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data) {
//                    BindParametersGrid();
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

function BindParametersGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Parameters/BindParametersList",
        dataType: "html",
        async: true,
        // data: jsonData,
        success: function (data) {
            BindList("#ParametersListDiv", data);
            $('#collapseTwo').addClass('in');
        },
        error: function (msg) {

        }

    });
}

function ClearForm() {
    $("#ParametersFormDiv").clearForm();
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
}

function ClearAll() {
    ClearForm();
    $.validationEngine.closePrompt(".formError", true);
    $.ajax({
        type: "POST",
        url: '/Parameters/ResetParametersForm',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        //data: jsonData,
        success: function (data) {
            if (data) {
                $('#ParametersFormDiv').empty();
                $('#ParametersFormDiv').html(data);
                $('#collapseTwo').addClass('in');
                BindParametersGrid();
                ParametersJsCalls();
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

function BindGlobalCodesDDL(selector, categoryIdval, hidValueSelector) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: "/Home/GetGlobalCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {

            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeID + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function EmptyTextBoxes() {
    $('.emptyRangeClass1').val('');
    $('.emptyRangeClass2').val('');
    $('.emptySingleClass').val('');
}

function ShowParameters() {
    $.validationEngine.closePrompt(".formError", true);
    var parameterValue = $("#ddlParamType").val().trim();
    var parameterDTText = $("#ddlParamDataType option:selected").text().toLowerCase().trim();
    var parameterDataType = $("#ddlParamDataType").val().trim();
    $('#txtValue1').removeAttr('class');
    $("#txtValue2").removeAttr('class');
    $('#txtValue3').removeAttr('class');
    $('#txtValue1').attr('class', 'txtbox txtRange');
    $('#txtValue2').attr('class', 'txtbox txtRange');
    $('#txtValue3').attr('class', 'txtbox txtSingle');
    $('.txtSingle').attr('readonly', false);
    $('.txtRange').attr('readonly', false);
    $('#divBitValue').hide();
    $('#divRangeParam').hide();
    $('#divSingleParam').hide();
    $('#divOtherSingleParams').show();
    $('.txtSingle').datetimepicker('destroy');
    $('.txtRange').datetimepicker('destroy');
    switch (parameterDTText) {
        case "integer": //Integer
            if (parameterValue == '0') {
                $('#divSingleParam').show();
                $('.txtSingle').addClass('validate[required, custom[integer]]');
            }
            else {
                $('#divRangeParam').show();
                $('.txtRange').addClass('validate[required, custom[integer]]');
            }
            break;
        case "numeric"://Numeric
            if (parameterValue == '0') {
                $('#divSingleParam').show();
                $('.txtSingle').addClass('validate[required, custom[number]]');
            }
            else {
                $('#divRangeParam').show();
                $('.txtRange').addClass('validate[required, custom[number]]');
            }
            break;
        case "date"://Date
            if (parameterValue == '0') {
                $('#divSingleParam').show();
                $('.txtSingle').addClass('validate[required]');
                $(".txtSingle").datetimepicker({
                    minDate: '1950/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
                    maxDate: '2025/12/12',
                    format: 'm/d/Y H:i',
                    mask: false,
                    closeOnDateSelect: false
                });
            }
            else {
                $('#divRangeParam').show();
                $('.txtRange').addClass('validate[required]');
                $(".txtRange").datetimepicker({
                    minDate: '1950/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
                    maxDate: '2025/12/12',
                    format: 'm/d/Y H:i',
                    mask: false,
                    closeOnDateSelect: false
                });
            }
            break;
        case "string"://String
            if (parameterValue == '0') {
                $('#divSingleParam').show();
                $('.txtSingle').addClass('validate[required]');
            }
            else {
                $('#divRangeParam').show();
                $('.txtRange').addClass('validate[required]');
            }
            break;
        case "bool": //Bool   
            $(parameterValue).val('0');
            $('#divSingleParam').show();
            $('#divBitValue').show();
            $('#divOtherSingleParams').hide();
            break;
        case "time":     //Time
            //case "4125":
            if (parameterValue == '0') {
                $('#divSingleParam').show();
                $('.txtSingle').addClass('validate[required] dtGeneralTimeOnly');
                $('.txtSingle').datetimepicker({
                    datepicker: false,
                    format: 'H:i',
                });
            }
            else {
                $('#divRangeParam').show();
                $('.txtRange').addClass('validate[required] dtGeneralTimeOnly');
                $('.txtRange').datetimepicker({
                    datepicker: false,
                    format: 'H:i',
                });
            }
        default:
            break;
    }
    //InitializeDateTimePicker();
    $("#ParametersFormDiv").validationEngine();
}

function BindSystemCodes() {
    var parameteFor = $('#ddlParamLevel').val();
    var jsonData = JSON.stringify({
        globalcodeId: parameteFor
    });
    $.ajax({
        type: "POST",
        url: "/Home/GetGlobalCodesChilds",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $('#ddlSystemCode').html(items);

                if ($('#hdSystemCode') != null && $('#hdSystemCode').val() > 0)
                    $('#ddlSystemCode').val($('#hdSystemCode').val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

