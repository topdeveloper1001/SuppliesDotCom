$(function () {
    $("#DashboardIndicatorsFormDiv").validationEngine();
    BindGlobalCodesWithValue("#ddlFormatType", 4343, "");
    BindGlobalCodesWithValueSelection("#ddlFerquencyType", 4344, "1");
    //BindFacilities('#ddlFacility', '');
    BindFacilitiesWithoutCorporate('#ddlFacility', '');
    BindGlobalCodesWithValue("#ddlSubCategory1", 4347, "");
    BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
    BindGlobalCodesWithValue("#ddlDataType", 4352, "");
    BindGlobalCodesWithValue("#ddlTypeOfData", 4407, "");
    BindDepartmentsDropdown();

    $('#chkSameBudget').change(function () {
        if ($("#chkSameBudget").prop("checked")) {
            $('#divBaseValue').show();
            if ($('#txtExternalValue5').val() === "") {
                $('#txtExternalValue5').val('0.00');
            }
        } else {
            $('#divBaseValue').hide();
            $('#txtExternalValue5').val('0.00');
        }
    });
    $("#ddlSubCategory1").change(function () {
        var selectedValue = $(this).val();
        var descriptionText = "";
        var subCate2Text = "";
        if (selectedValue > 0) {
            RebindSubCategories2(selectedValue, "0");

            // code to concatenate description with subcategory1 using "-"
            var name = $("#txtDashboard").val();
            var subCate1Text = $("#ddlSubCategory1 option:selected").text();
            descriptionText = name + " - " + subCate1Text;
            if ($("#ddlSubCategory2").val() > 0) {
                subCate2Text = $("#ddlSubCategory2 option:selected").text();
                descriptionText += " - " + subCate2Text;
            }

        } else {
            descriptionText = $("#txtDashboard").val();
            BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
        }
        $("#txtDescription").val(descriptionText);
    });
    $("#ddlSubCategory2").change(function () {
        var selectedValue = $(this).val();
        var descriptionText = "";
        var subCate2Text = "";
        var name = $("#txtDashboard").val();
        var subCate1Text = $("#ddlSubCategory1 option:selected").text();
        descriptionText = name + " - " + subCate1Text;
        if (selectedValue > 0) {
            subCate2Text = $("#ddlSubCategory2 option:selected").text();
            descriptionText += " - " + subCate2Text;
        }
        $("#txtDescription").val(descriptionText);
    });
    $('#chkShowInActive').change(function () {
        ClearDashboardIndicatorsForm(0);
        $.validationEngine.closePrompt(".formError", true);
        var showInActive = $("#chkShowInActive").prop("checked");
        $.post("/DashboardIndicators/BindIndicatorsActiveInactive", { showInActive: showInActive ? 0 : 1 }, function (data) {
            BindList("#DashboardIndicatorsListDiv", data);
        });
    });
    //$('#txtExpression').attr('readonly', true);
    //$('#txtExpression').focus(function () {
    //    $('#divExpression').show();
    //    $('.overlay').show();
    //});
    BindIndicatorsFilterDropdown();


    //$("#ddlDataType").change(function () {
    //    var selectedValue = $(this).val();
    //    if (selectedValue == "3") {
    //        $('#divExpression').show();
    //        $("#divExpressionText").show();
    //        $('.overlay').show();
    //    } else {
    //        $('#divExpression').hide();
    //        $("#divExpressionText").hide();
    //        $('.overlay').hide();
    //    }
    //});
});

String.prototype.splice = function (idx, rem, s) {
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};
function ShowExpressionSection() {
    $('#divExpression').show();
    $("#divExpressionText").show();
    $('.overlay').show();
}
function SaveDashboardIndicators(id) {
    var isValid = jQuery("#DashboardIndicatorsFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtIndicatorId = $("#IndicatorID").val();
        var txtIndicatorNumber = $("#txtIndicatorNumber").val();
        var txtDashboard = $("#txtDashboard").val();
        var txtDescription = $("#txtDescription").val();
        var txtDefination = $("#txtDefination").val();
        var subCategory1 = $("#ddlSubCategory1").val();
        var subCategory2 = $("#ddlSubCategory2").val();
        var txtFormatType = $("#ddlFormatType").val();
        var txtDecimalNumbers = $("#txtDecimalNumbers").val();
        var txtFerquencyType = $("#ddlFerquencyType").val();
        var txtOwnerShip = $("#txtOwnerShip").val();
        var txtFacilityId = $("#ddlFacility").val();
        var txtExternalValue1 = $("#ddlDepartment").val();
        var showInActive = $("#chkStatus").prop("checked");
        var chkSameBudget = $("#chkSameBudget").prop("checked");
        var txtExternalValue5 = $("#txtExternalValue5").val();
        var referencedIndicators = $("#hfReferencedIndicators").val();
        var txtExpressionText = $("#txtExpression").val();
        var expressionValue = $("#hdExpression").val();


        /*
        WHO: Amit Jain
        What: Defination is same as that of Dashboard Name
        Why: There was ambiquity happened while working with Dashboards having SubCategory1 and SubCategory2.
        When: 11 March, 2016
        */
        txtDefination = txtDashboard;

        var jsonData = JSON.stringify({
            IndicatorID: txtIndicatorId,
            IndicatorNumber: txtIndicatorNumber,
            Dashboard: txtDashboard,
            Description: txtDescription,
            Defination: txtDefination,
            SubCategory1: subCategory1,
            SubCategory2: subCategory2,
            FormatType: txtFormatType,
            DecimalNumbers: txtDecimalNumbers,
            FerquencyType: txtFerquencyType,
            OwnerShip: txtOwnerShip,
            FacilityId: txtFacilityId,
            ExternalValue1: txtExternalValue1,
            ExternalValue2: $("#ddlDataType").val(),
            ExternalValue4: chkSameBudget,
            IsActive: showInActive == true ? 1 : 0,
            ExternalValue5: txtExternalValue5,
            ExpressionText: txtExpressionText,
            ExpressionValue: expressionValue,
            SortOrder: $("#SortOrder").val(),
            ExternalValue3: $("#ddlTypeOfData").val()
        });
        $.ajax({
            type: "POST",
            url: '/DashboardIndicators/SaveDashboardIndicators',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                var id = $("#IndicatorID").val();
                ClearDashboardIndicatorsForm(1);
                //BindList("#DashboardIndicatorsListDiv", data);
                BindDashboardIndicatorsList();
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

//function BindDashboardIndicatorsList() {

//    ;
//    $.ajax({
//        type: "POST",
//        url: '/DashboardIndicators/BindDashboardIndicatorsList',
//        async: true,
//        contentType: "application/json; charset=utf-8",
//        dataType: "html",
//        success: function (data) {
//            BindList("#DashboardIndicatorsListDiv", data);
//        },
//        error: function (msg) {

//        }
//    });
//}

//Update By Krishna on 13082015
function BindDashboardIndicatorsList() {
    var showInActive = $("#chkShowInActive").prop("checked");
    $.post("/DashboardIndicators/BindIndicatorsActiveInactive", { showInActive: showInActive ? 0 : 1 }, function (data) {
        BindList("#DashboardIndicatorsListDiv", data);
    });
}

function EditDashboardIndicators(id) {
    var jsonData = JSON.stringify({
        Id: id
    });
    $.ajax({
        type: "POST",
        url: '/DashboardIndicators/GetDashboardIndicatorsDetails',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindDashboardIndicatorsDetails(data);
        },
        error: function (msg) {

        }
    });
}

function DeleteDashboardIndicators() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        setTimeout(blockSelectedDiv('DashboardIndicatorsListDiv'), 1000);
        var jsonData = JSON.stringify({
            id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/DashboardIndicators/DeleteDashboardIndicators',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                //BindList("#DashboardIndicatorsListDiv", data);
                //ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
                //UnblockSelectedDiv('DashboardIndicatorsListDiv');
                if (data == true) {
                    ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
                    GetIndicatorsData();
                } else {
                    ShowMessage("Unable to delete record", "Warning", "warning", true);
                }
                UnblockSelectedDiv('DashboardIndicatorsListDiv');
            },
            error: function (msg) {
                return true;
            }
        });
    }
}

//function DeleteDashboardIndicators(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        setTimeout(blockSelectedDiv('DashboardIndicatorsListDiv'), 1000);
//        var jsonData = JSON.stringify({
//            id: id
//        });
//        $.ajax({
//            type: "POST",
//            url: '/DashboardIndicators/DeleteDashboardIndicators',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            data: jsonData,
//            success: function (data) {
//                //BindList("#DashboardIndicatorsListDiv", data);
//                //ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
//                //UnblockSelectedDiv('DashboardIndicatorsListDiv');
//                if (data == true) {
//                    ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
//                    GetIndicatorsData();
//                } else {
//                    ShowMessage("Unable to delete record", "Warning", "warning", true);
//                }
//                UnblockSelectedDiv('DashboardIndicatorsListDiv');
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}

function ClearDashboardIndicatorsForm(isUpdated) {
    var indicatorNumber = TryParseInt($("#IndicatorNumber").val(), 0);
    var id = $("#IndicatorID").val();
    if (indicatorNumber > 0 && isUpdated && id == 0) {
        indicatorNumber = indicatorNumber + 1;
    }

    $("#DashboardIndicatorsFormDiv").clearForm(true);
    $('#collapseDashboardIndicatorsAddEdit').removeClass('in');
    $('#collapseDashboardIndicatorsList').addClass('in');
    $("#DashboardIndicatorsFormDiv").validationEngine();
    $("#btnSave").val("Save");

    $("#IndicatorNumber").val(indicatorNumber);
    $("#txtIndicatorNumber").val(indicatorNumber);
    $.validationEngine.closePrompt(".formError", true);
    $("#chkStatus").prop("checked", true);
    $("#txtIndicatorNumber").removeAttr("disabled");
    $("#divExpressionText").hide();
}

var arrayTextBoxControl = [];
var arrayHiddenField = [];
function BindDashboardIndicatorsDetails(data) {
    $("#btnSave").val("Update");
    $("#SortOrder").val(data.SortOrder);
    $("#txtIndicatorNumber").attr("disabled", 'disabled');
    $('#collapseDashboardIndicatorsList').removeClass('in');
    $('#collapseDashboardIndicatorsAddEdit').addClass('in');
    $("#DashboardIndicatorsFormDiv").validationEngine();
    $('#IndicatorID').val(data.IndicatorID);
    $('#txtIndicatorNumber').val(data.IndicatorNumber);
    $('#txtDashboard').val(data.Dashboard);
    $('#txtDescription').val(data.Description);
    $('#txtDefination').val(data.Defination);

    if (data.SubCategory1 != null && data.SubCategory1 > 0) {
        $('#ddlSubCategory1').val(data.SubCategory1);
        RebindSubCategories2(data.SubCategory1, data.SubCategory2);
    } else {
        //BindGlobalCodesWithValue("#ddlSubCategory2", 4351, data.SubCategory2);
        $('#ddlSubCategory2').val(data.SubCategory2);
    }
    
    $('#ddlFormatType').val(data.FormatType);
    $('#txtDecimalNumbers').val(data.DecimalNumbers);
    $('#ddlFerquencyType').val(data.FerquencyType);
    $('#txtOwnerShip').val(data.OwnerShip);
    $('#ddlFacility').val(data.FacilityId);
    $("#ddlDepartment").val(data.ExternalValue1);
    $("#ddlDataType").val(data.ExternalValue2);
    $("#ddlTypeOfData").val(data.ExternalValue3);
    var checkedval = (data.IsActive == 1) ? true : false;
    $("#chkStatus").prop("checked", checkedval);
    var chkSameBudgetVal = (data.ExternalValue4 == "True") ? true : false;
    $("#chkSameBudget").prop("checked", chkSameBudgetVal);
    if (chkSameBudgetVal) {
        $('#divBaseValue').show();
        $('#txtExternalValue5').val(data.ExternalValue5);
    } else {
        $('#divBaseValue').hide();
    }
    if (data.ExpressionValue != null && data.ExpressionValue != "") {
        $("#divExpressionText").show();
        $("#hdExpression").val(data.ExpressionValue);
        $("#hfReferencedIndicators").val(data.ReferencedIndicators);
        $("#txtExpression").val(data.ExpressionText);
        $("#divFormulaSection").html(data.ExpressionText);
        $('#lblExpression').html(data.ExpressionText);
        arrayTextBoxControl.push(data.ExpressionText);
        arrayHiddenField.push(data.ExpressionValue);
    } else {
        $("#divExpressionText").hide();
        $("#hdExpression").val("");
        $("#hfReferencedIndicators").val("");
        $("#txtExpression").val("");
        $("#divFormulaSection").html("No Expression");
        $('#lblExpression').html('');
        arrayTextBoxControl = [];
        arrayHiddenField = [];
    }
}

function CheckIsIndicatorunique() {
    if ($("#txtIndicatorNumber").val() > 0) {
        var indicatorId = $("#IndicatorID").val() == null || $("#IndicatorID").val() == '' ? 0 : $("#IndicatorID").val();
        var sub1 = $("#ddlSubCategory1").val();
        var sub2 = $("#ddlSubCategory2").val();
        $.post("/DashboardIndicators/IsIndicatorNumberExists", {
            indicatorNumber: $("#txtIndicatorNumber").val(),
            id: indicatorId,
            subCategory1: sub1,
            subCategory2: sub2
        }, function (data) {
            if (data) {
                ShowMessage("Indicator number must be unique!", "Info", "warning", true);
                $("#txtIndicatorNumber").focus();
                return;
            }
            SaveDashboardIndicators();
        });
    }
}

/// <var>bind the accounts dropdown</var>
var BindDepartmentsDropdown = function () {
    $.getJSON("/DashboardIndicators/BindDepartmentDropdownData", {}, function (data) {
        BindDropdownData(data, "#ddlDepartment", "");
    });
};

function RebindSubCategories2(selectedValue, subCategory2SelectedValue) {
    var jsonData = JSON.stringify({
        globalCodeValue: selectedValue,
        parentCategory: "4347"
    });
    $.ajax({
        type: "POST",
        url: '/GlobalCode/GetGlobalCodesDropdownDataByExternalValue1',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (subCategory2SelectedValue == null)
                subCategory2SelectedValue = "";
            BindDropdownData(data, "#ddlSubCategory2", subCategory2SelectedValue);
        },
        error: function (msg) {
            return true;
        }
    });
}

var BindGridByOrder = function (sortby, sortDirection, id) {
    var showInActive = $("#chkShowInActive").prop("checked");
    var jsonData = {
        sort: sortby,
        sortdir: sortDirection,
        showInActive: showInActive ? 0 : 1
    };
    $.post("/DashboardIndicators/BindDataIndicatorsByOrder", jsonData, function (data) {
        BindList("#DashboardIndicatorsListDiv", data);
        var newSortdirection = sortDirection == "DESC" ? "ASC" : "DESC";
        $('#' + id).removeAttr('onclick');
        $('#' + id).attr('onclick', 'BindGridByOrder("' + sortby + '","' + newSortdirection + '","' + id + '");');
    });
};

var GetIndicatorsData = function () {
    $.post("/DashboardIndicators/GetIndicatorbyCorporate", function (data) {
        BindList("#DashboardIndicatorsListDiv", data);
    });
};
function CloseExpressionDiv() {
    $('#divExpression').hide();
    $('.overlay').hide();
}
function BindIndicatorsFilterDropdown() {
    $.getJSON("/ManualDashboard/GetDashboardIndicatorsList", {}, function (data) {
        BindDropdownData(data, "#ddlIndicatorFilter", "");
    });
}
function SetValueInTextBox(givenval) {
    var textboxControl = $('#txtExpression');
    var hiddenField = $('#hdExpression');
    var lblExpression = $('#lblExpression');

    var hfReferencedIndicator = $("#hfReferencedIndicators");
    if (givenval == 'Add') {
        var ddl = $('#ddlIndicatorFilter option:selected');
        if (ddl != null && ddl.length > 0 && ddl[0].index > 0) {
            var propertyType = ddl.text();
            var value = ddl.val();
            if (textboxControl.val().length > 0) {
                var totalLength = textboxControl.val().length;
                var givenval = textboxControl.val().charAt(totalLength - 1);
                if (givenval == '+' || givenval == '-' || givenval == '/' || givenval == '*') {
                    textboxControl.val(textboxControl.val() + propertyType);
                    lblExpression.html(textboxControl.val());
                    arrayTextBoxControl.push(propertyType);
                    hiddenField.val(hiddenField.val() + value);
                    arrayHiddenField.push(value);
                    if (givenval == "/") {
                        hfReferencedIndicator.val(hfReferencedIndicator.val() + ' ' + 'NULLIF(I' + value + ',0),0)');

                    } else {
                        hfReferencedIndicator.val(hfReferencedIndicator.val() + ' ' + 'I' + value);
                    }
                    $('#ddlIndicatorFilter').val("0");
                    return false;
                }
            }
            textboxControl.val(textboxControl.val() + propertyType);
            lblExpression.html(textboxControl.val());
            arrayTextBoxControl.push(propertyType);
            hiddenField.val(hiddenField.val() + value);
            arrayHiddenField.push(value);
            if (textboxControl.val().charAt(totalLength - 1) == "/") {
                hfReferencedIndicator.val(hfReferencedIndicator.val() + 'NULLIF(I' + value + ',0),0)');
            } else {
                hfReferencedIndicator.val(hfReferencedIndicator.val() + 'I' + value);
            }
        }
        $('#ddlIndicatorFilter').val("0");
    }
    else if (givenval == '(' || givenval == ')') {
        textboxControl.val(textboxControl.val() + givenval);
        lblExpression.html(textboxControl.val());
        arrayTextBoxControl.push(givenval);
        hiddenField.val(hiddenField.val() + givenval);
        arrayHiddenField.push(givenval);
        hfReferencedIndicator.val(hfReferencedIndicator.val() + givenval);
    }
    else if (givenval == 'done') {
        var jsonData = JSON.stringify({
            FormulaExpression: hiddenField.val()
        });
        $.ajax({
            type: "POST",
            url: '/GlobalCode/ValidateFormulaExpression',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                $("#divFormulaSection").html(textboxControl.val());
                CloseExpressionDiv();
            },
            error: function (msg) {
                msg = msg.responseText.split(':')[1];
                ShowMessage(msg, "Warning", "warning", true);
            }
        });
    } else if (givenval == 'clear') {
        textboxControl.val('');
        hiddenField.val('');
        hfReferencedIndicator.val('');
        $("#divFormulaSection").html('No Expression');
        arrayTextBoxControl = [];
        arrayHiddenField = [];
        lblExpression.html('');
    } else if (givenval == 'cancel') {
        CloseExpressionDiv();
    } else if (givenval == 'backspace') {
        var sPath = textboxControl.val();
        var sPath1 = hiddenField.val();
        textboxControl.val(sPath.substring(0, sPath.length - 1));
        lblExpression.html(textboxControl.val());
        hiddenField.val(sPath1.substring(0, sPath1.length - 1));
        hfReferencedIndicator.val(sPath1.substring(0, sPath1.length - 1));
    }
    else if (givenval == 'undo') {
        // text box array
        var arrayTextBoxLen = arrayTextBoxControl.length;
        var arrayTextBoxIndex = parseInt(arrayTextBoxLen - 1);
        arrayTextBoxControl.splice(arrayTextBoxIndex, 1);

        //Hidden field array
        var arrayHiddenFieldLen = arrayHiddenField.length;
        var arrayHiddenFieldIndex = parseInt(arrayHiddenFieldLen - 1);
        arrayHiddenField.splice(arrayHiddenFieldIndex, 1);

        // join array
        var undoTextBoxControlStr = arrayTextBoxControl.join('');
        var undoHiddenFieldStr = arrayHiddenField.join('');
        textboxControl.val(undoTextBoxControlStr);
        hiddenField.val(undoHiddenFieldStr);
        lblExpression.html(textboxControl.val());
    }
    else if (givenval == 'space') {
        if (textboxControl.val().length > 0) {
            textboxControl.val(textboxControl.val());
            hiddenField.val(hiddenField.val());
            lblExpression.html(textboxControl.val());
            hfReferencedIndicator.val(hfReferencedIndicator.val() + ' ');
        } else {
            alert('Please Select the value first');
        }
    } else if (givenval == '+' || givenval == '-' || givenval == '/' || givenval == '*') {
        if (textboxControl.val().length > 0) {
            var totalLength = textboxControl.val().length;
            var space = textboxControl.val().charAt(totalLength - 1);
            if (space == '') {
                textboxControl.val(textboxControl.val() + givenval);
                lblExpression.html(textboxControl.val());
                hiddenField.val(hiddenField.val() + givenval);
                hfReferencedIndicator.val(hfReferencedIndicator.val() + givenval);
                return false;
            }
            textboxControl.val(textboxControl.val() + givenval);
            arrayTextBoxControl.push(givenval);
            lblExpression.html(textboxControl.val());
            hiddenField.val(hiddenField.val() + givenval);
            arrayHiddenField.push(givenval);
            if (givenval == "/") {
                hfReferencedIndicator.val(hfReferencedIndicator.val() + ' ' + givenval);
            } else {
                hfReferencedIndicator.val(hfReferencedIndicator.val() + ' ' + givenval);
            }
        } else {
            alert('Select the Indicator First !');
        }
    }
    return false;
}

$('#btnExportExcelData').click(function () {

    //e.preventDefault();
    var item = $(this);
    var hrefString = item.attr("href");
    var controllerAction = hrefString.split('?')[0];
    //var parametersArray = hrefString.split('?')[1].split('&');
    var showInActive = $("#chkShowInActive").prop("checked");

    var showInActive1 = showInActive == true ? 0 : 1;
    //var facilityid = $('#ddlFacilityFilter').val();
    //var yearFilter = $('#ddlYearFilter').val();
    //var ownerFilter = $('#ddlOwnerFilter').val();
    //var indicatorFilter = $('#ddlIndicatorFilter').val();
    //facilityid = facilityid != null ? facilityid : 0;
    var hrefNew = controllerAction + "?showInActive=" + showInActive1;
    item.removeAttr('href');
    item.attr('href', hrefNew);
    return true;
});