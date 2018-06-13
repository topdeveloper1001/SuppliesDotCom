$(BindDataOnPageLoad);

//------------Order Set Events start here-----

function BindDataOnPageLoad() {
    $("#validate").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });
    $("#globalCodeForm").validationEngine();
    BindGlobalCodesCustomWithValue(3113);
    //BindCPTCodesForLabTest();
}

function BindGlobalCodesCustomWithValue(categoryIdval) {
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
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $('.ddlVal').html(items);

                //if ($('#hfCodeExternal2Val1Str') != null && $('#hfCodeExternal2Val1Str').val() > 0)
                //    $('#ddlOrderedType1').val($('#hfCodeExternal2Val1Str').val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function CheckDuplicateLabTestOrderSet() {
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (isValid) {
        var codeValue = $("#txtGlobalCodeCategoryValue").val().trim();
        var jsonData = JSON.stringify({
            GlobalCodeCategoryValue: codeValue,
            GlobalCodeCategoryID: globalCodeCategoryId
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/GlobalCodeCategory/CheckDuplicateRecord",
            data: jsonData,
            dataType: "json",
            beforeSend: function () { },
            success: function (data) {
                if (data) {
                    ShowMessage("Record already exists!", "Alert", "warning", true);
                }
                else {
                    SaveLabTestOrderSet();
                }
            },
            error: function (msg) {
            }
        });
    }
    return false;
}

function SaveLabTestOrderSet() {
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }
    var id = $("#hfGlobalCodeCategoryValue").val();
    var globalCategoryData = JSON.stringify({
        globalCodeCategoryId: id,
        FacilityNumber: 0,
        GlobalCodeCategoryValue: $("#txtGlobalCodeCategoryValue").val().trim(),
        GlobalCodeCategoryName: $("#txtGlobalCodeCategoryName").val().trim(),
        IsActive: true,
        IsDeleted: false,
        ExternalValue1: $("#hdExternalValue1").val(),
    });

    var list = GetListOfValues($("#txtGlobalCodeCategoryValue").val().trim());
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCodeCategory/SaveLabOrderSet",
        data: {
            gccModel: globalCategoryData,
            gcList: list
        },
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            if (data != null) {
                ClearLabTestOrderSet();
                BindList("#DivLabTestOrderSetList", data);
                var msg = "Record Saved successfully !";
                if (id > 0)
                    msg = "Record updated successfully";

                ShowMessage(msg, "Success", "success", true);
            }
        },
        error: function (response) {

        }
    });
    return false;
}

function EditLabTestOrderSet(id) {
    var jsonData = JSON.stringify({ id: id });
    $.ajax({
        type: "POST",
        url: '/GlobalCodeCategory/GetRecordById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindLabTestOrderSetDetailsInEditMode(data);
        },
        error: function (msg) {
        }
    });
}

function DeleteLabTestOrderSet() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var url = '/GlobalCodeCategory/DeleteRecord';
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                gccId: $("#hfGlobalConfirmId").val()
            }),
            success: function (data) {
                ClearLabTestOrderSet();
                BindList("#DivLabTestOrderSetList", data);
                ShowMessage("Record deleted successfully", "Alert", "info", true);
            },
            error: function (msg) {
            }
        });
    }
}

//function DeleteLabTestOrderSet(id) {
//    if (confirm("Do you want to delete Record?")) {
//        var url = '/GlobalCodeCategory/DeleteRecord';
//        $.ajax({
//            type: "POST",
//            url: url,
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: JSON.stringify({
//                gccId: id
//            }),
//            success: function (data) {
//                ClearLabTestOrderSet();
//                BindList("#DivLabTestOrderSetList", data);
//                ShowMessage("Record deleted successfully", "Alert", "info", true);
//            },
//            error: function (msg) {
//            }
//        });
//    }
//    else {
//        return false;
//    }
//}

function ClearLabTestOrderSet() {
    var categoryParentValue = $("#hdExternalValue1").val();
    $('#GlobalCodeCategoryInfo').clearForm(true);
    $("#hdExternalValue1").val(categoryParentValue);
    $.validationEngine.closePrompt(".formError", true);
    $("#BtnLabTestOrderSetSave").val('Save');
    $('#collapseOne').removeClass('in');
    $('#collapseLabTestCodesAddEdit').removeClass('in');
    $('#colLabTestCodesList').removeClass('in');
    $('#colLabTestOrderSetList').addClass('in');
}

function BindLabTestOrderSetDetailsInEditMode(data) {
    //Fill Values
    $("#txtGlobalCodeCategoryValue").val(data.GlobalCodeCategoryValue);
    $("#txtGlobalCodeCategoryName").val(data.GlobalCodeCategoryName);

    //--Reset Controls and Collapse Divs
    $("#BtnLabTestOrderSetSave").val('Update');
    $('#colLabTestOrderSetList').removeClass('in');
    $('#collapseLabTestCodesAddEdit').removeClass('in');
    $('#colLabTestCodesList').removeClass('in');
    $('#collapseOne').addClass('in');
}

function ViewLabOrderCodes(labTestOrderSetValue) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/GetRecordsByCategoryValue",
        data: JSON.stringify({ categoryValue: labTestOrderSetValue }),
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            BindList("#DivLabTestCodesList", data);
            ShowLabOrdersCodesList(labTestOrderSetValue);
        },
        error: function (msg) {

        }
    });
}

function ShowLabOrdersCodesList(labTestOrderSetValue) {
    $('#collapseOne').removeClass('in');
    $('#colLabTestOrderSetList').removeClass('in');
    $('#collapseLabTestCodesAddEdit').removeClass('in');
    $('#colLabTestCodesList').addClass('in');
    $("#lblOrderSet").text(labTestOrderSetValue);
    $("#lblOrderSet").text(labTestOrderSetValue);
    $("#HeadingWithselectedHeader").show();
    $("#generalHeading").hide();
    $(globalCodeCategoryValueSelector).val(labTestOrderSetValue);
}

function BindCPTCodesForLabTest() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCodeCategory/BindCptCodesForLabOrderSet",
        //data: JSON.stringify({ categoryValue: labTestOrderSetValue }),
        dataType: "json",
        beforeSend: function () { },
        success: function (data) {
            BindDropdownDataV2(data, ".cptCodesDropdown", '', 'Lab Test Code');
        },
        error: function (msg) {

        }
    });
}

function CheckIfCptCodeExistsInRange(txtSelector) {
    var txtValue = $(txtSelector).val();
    if (txtValue != '' && TryParseInt(txtValue, null) != null) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/GlobalCodeCategory/CheckIfCptCodeExistsInRange",
            data: JSON.stringify({ value: txtValue }),
            dataType: "json",
            beforeSend: function () { },
            success: function (data) {
                if (!data) {
                    ShowMessage("Code Value not in the CPT Codes range!", "Not in the list", "warning", true);
                    $(txtSelector).val('');
                    $(txtSelector).focus();
                    return false;
                }
                return data;
            },
            error: function (msg) {

            }
        });
    }
    return true;
}

function GetListOfValues(categoryValue) {
    var list = [];
    for (var i = 1; i <= 15; i++) {
        var codeValueSelector = "#txtCodeValue" + i;
        var codeValue = $(codeValueSelector).val();
        if (codeValue != '') {
            list[i - 1] = {
                'ExternalValue1': $("#ddlOrderedType" + i).val(),
                'GlobalCodeName': codeValue,
                'GlobalCodeValue': codeValue,
                'GlobalCodeCategoryValue': categoryValue,
                'Description': '',
                'FacilityNumber': 0,
                'GlobalCodeID': 0,
                'IsActive': true,
                'IsDeleted': false,
            };
        }
    }
    return JSON.stringify({ list: list });
}



//-------------------Lab Test Order Codes Section starts here----------------------//

var globalCodeValueSelector = "#hfGlobalCodeID";
var globalCodeCategoryValueSelector = "#hfGlobalCodeCategoryValue";

function ClearLabTestCodeForm() {
    var categoryParentValue = $("#hdExternalValue1").val();
    var category = $(globalCodeCategoryValueSelector).val();
    $('#globalCodeForm').clearForm(true);
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseOne').removeClass('in');
    $('#colLabTestOrderSetList').removeClass('in');
    $('#collapseLabTestCodesAddEdit').removeClass('in');
    $('#colLabTestCodesList').addClass('in');
    $('.btnGlobalCodeSave').val('Save');
    ResetLabTestCodeValues(category, "", globalCodeValueSelector);

    $(globalCodeCategoryValueSelector).val(category);
    $("#hdExternalValue1").val(categoryParentValue);
}

function CheckIfLabTestCodeExists() {
    var category = $(globalCodeCategoryValueSelector).val();
    var id = $("#hfGlobalCodeID").val();
    if (id == '')
        id = 0;
    var name = $("#txtLabTestCodeName").val();
    var jsonData = JSON.stringify({
        GlobalCodeName: name,
        GlobalCodeId: id,
        GlobalCodeCategoryValue: category
    });

    $.ajax({
        type: "POST",
        url: "/GlobalCode/CheckDuplicateSubCategory",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (isExist) {
            //If Already exist, it will return true otherwise false
            if (isExist) {
                ShowMessage("Record already exists! ", "Alert", "info", true);
            }
            else {
                SaveLabTestCode();
            }
        },
        error: function (msg) {
        }
    });
}

var SaveLabTestCodes = function () {
    var isvalid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (!isvalid) {
        return false;
    }
    var jsonData = [];
    var globalCodeId = $(globalCodeValueSelector).val();
    var txtGlobalCodeCategoryValue = $('#txtGlobalCodeCategoryValue').val();
    var txtOrderSetTableNumber = $('#txtOrderSetTableNumber').val();
    var txtOrderSetTableName = $('#txtOrderSetTableName').val();
    var txtGlobalCodeCategoryName = $('#txtGlobalCodeCategoryName').val();
    var hdExternalValue5 = $('#hdExternalValue5').val();
    var a = 0;
    for (var i = 1; i <= 15; i++) {
        var codeValue = $('#txtCodeValue' + i).val();
        if (codeValue != "") {
            var codename = $('#txtCodeValue' + i).val();
            //var codeTime = $('#txtCodeExternal1Val' + i + 'Str').val();
            var codetimeType = $('#ddlOrderedType' + i).val();
            jsonData[a] = {
                GlobalCodeID: globalCodeId,
                GlobalCodeCategoryValue: txtGlobalCodeCategoryValue,
                GlobalCodeName: codename,
                GlobalCodeValue: codename,
                Description: txtGlobalCodeCategoryName,
                FacilityNumber: 0,
                ExternalValue1: codetimeType,
                ExternalValue2: txtOrderSetTableNumber,
                IsActive: true,
                IsDeleted: false,
                GlobalCodeCategoryDesc: txtGlobalCodeCategoryName,
                ExternalValue3: txtOrderSetTableName,
                ExternalValue5: hdExternalValue5,
                SortOrder:i
            };
            a++;
        }
    }
    var jsonD = JSON.stringify(jsonData);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/AddUpdateLabTestCodeCustom",
        data: jsonD,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                //BindList("#DivLabTestCodesList", data);
                //ClearLabTestCodeForm(globalCodeCategory);
                var msg = "Record Saved successfully !";
                if (globalCodeId > 0)
                    msg = "Record updated successfully";

                ShowMessage(msg, "Success", "success", true);
            }
        },
        error: function (msg) {
        }
    });
    return false;
};


function SaveLabTestCode() {
    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }

    var globalCodeId = $(globalCodeValueSelector).val();
    var globalCodeCategory = $(globalCodeCategoryValueSelector).val();
    var globalCodeName = $("#txtLabTestCodeName").val();
    var description = $("#txtLabTestCodeDescription").val();
    var globalCodeValue = globalCodeName;
    var jsonData = JSON.stringify({
        GlobalCodeID: globalCodeId,
        GlobalCodeCategoryValue: globalCodeCategory,
        GlobalCodeName: globalCodeName,
        SortOrder: 0,
        Description: description,
        FacilityNumber: 0,
        GlobalCodeValue: globalCodeValue,
        IsActive: true,
        IsDeleted: false
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/AddUpdateLabTestCode",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                BindList("#DivLabTestCodesList", data);
                ClearLabTestCodeForm(globalCodeCategory);
                var msg = "Record Saved successfully !";
                if (globalCodeId > 0)
                    msg = "Record updated successfully";

                ShowMessage(msg, "Success", "success", true);
            }
        },
        error: function (msg) {

        }
    });
    return false;
}

function EditRecordInLabTestCode(id) {
    var jsonData = JSON.stringify({ id: id });
    $.ajax({
        type: "POST",
        url: '/GlobalCode/GetGlobaCodeById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindLabTestCodeDetailsInEditMode(data);
        },
        error: function (msg) {
        }
    });
}

function DeleteRecordInLabTestCode() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var categoryId = $(globalCodeCategoryValueSelector).val();
        if (categoryId != '') {
            if (confirm("Do you want to delete GlobalCode?")) {
                var url = '/GlobalCode/DeleteLabTestCode';
                $.ajax({
                    type: "POST",
                    url: url,
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    dataType: "html",
                    data: JSON.stringify({
                        globalCodeId: $("#hfGlobalConfirmId").val(),
                        category: categoryId
                    }),
                    success: function (data) {
                        if (data != null) {
                            var globalCodeCategory = $(globalCodeCategoryValueSelector).val();
                            ClearLabTestCodeForm(globalCodeCategory);
                            BindList("#DivLabTestCodesList", data);
                            ShowMessage("Record deleted successfully", "Deleted!", "info", true);
                        }
                    },
                    error: function (msg) {
                    }
                });
            }
        }

    }
}

//function DeleteRecordInLabTestCode(id) {
//    var categoryId = $(globalCodeCategoryValueSelector).val();
//    if (categoryId != '') {
//        if (confirm("Do you want to delete GlobalCode?")) {
//            var url = '/GlobalCode/DeleteLabTestCode';
//            $.ajax({
//                type: "POST",
//                url: url,
//                async: false,
//                contentType: "application/json; charset=utf-8",
//                dataType: "html",
//                data: JSON.stringify({
//                    globalCodeId: id,
//                    category: categoryId
//                }),
//                success: function (data) {
//                    if (data != null) {
//                        var globalCodeCategory = $(globalCodeCategoryValueSelector).val();
//                        ClearLabTestCodeForm(globalCodeCategory);
//                        BindList("#DivLabTestCodesList", data);
//                        ShowMessage("Record deleted successfully", "Deleted!", "info", true);
//                    }
//                },
//                error: function (msg) {
//                }
//            });
//        }
//    }
//}

function BindLabTestCodeDetailsInEditMode(data) {
    $('#collapseGlobalCodeAddEdit').addClass('in');
    $(globalCodeValueSelector).val(data.Id);
    $(globalCodeCategoryValueSelector).val(data.Category);
    $("#txtLabTestCodeName").val(data.Name);
    $("#txtLabTestCodeDescription").val(data.Description);

    $('.btnGlobalCodeSave').val('Update');
    $('#collapseOne').removeClass('in');
    $('#colLabTestOrderSetList').removeClass('in');
    $('#colLabTestCodesList').removeClass('in');
    $('#collapseLabTestCodesAddEdit').addClass('in');
}

function ResetLabTestCodeValues(categoryId, chkActive, codeValueSelector) {
    $.ajax({
        type: "POST",
        url: "/GlobalCode/SetMaxGlobalCodeValue",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ category: categoryId }),
        success: function (maxValue) {
            ResetControls(chkActive, codeValueSelector, maxValue);
        },
        error: function (msg) {
        }
    });
}

//----------------Lab Test Order Codes Section ends here-----------------------//



