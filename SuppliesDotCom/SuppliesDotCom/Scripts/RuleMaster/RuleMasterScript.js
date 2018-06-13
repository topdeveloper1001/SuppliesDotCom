$(function () {
    BindAllRuleMasterData();
    $('#ddlCorporates').on('click', function () {
        BindFacilities();
        BindCorporateRoles();
    });

    $('#ddlFacilities').on('click', function () {
        BindFacilityRoles();
    });

    BindTableSetList("19", "#ddlTableSet", "0");

    $("#btnMarkAsInActive").click(function () {
        var stringArray = new Array();
        var checkedItems = $('.check-box:checked');
        for (var i = 0, l = checkedItems.length; i < l; i++) {
            stringArray.push(checkedItems[i].defaultValue);
        }

        if (stringArray.length > 0 && confirm("This action will delete the Bill Edit Rules permanently. Continue?")) {
            var tn = $("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0 ? $("#ddlTableSet").val() : "";
            var jsonData = JSON.stringify({
                codeValues: stringArray,
                orderType: "19"
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
                        BindRuleMasterGrid();
                        ShowMessage("Selected Codes marked as InActive successfully", "Success", "success", true);
                    }
                },
                error: function (msg) {

                }
            });
        } else {
            ShowMessage("Select at least one record to delete!", "warning", "warning", true);
        }
    });


    SetGridCheckBoxes();
});

function BindAllRuleMasterData() {
    $("#RuleMasterFormDiv").validationEngine();
    BindDropDownOnlyWithSelect('#ddlFacilities');
    BindDropDownOnlyWithSelect('#ddlRoles');
    BindCorporates();
    InitializeDateTimePicker();
    SetSelectedRowColor();
    BindFacilityRolesCustom();
    BindGlobalCodesWithValue("#ddlRuleSpecifiedFor", 14103, "#hdRuleSpecifiedFor");
    $('#chkIsActive').prop('checked', true);
}

function SaveRuleMaster() {
    var isValid = jQuery("#RuleMasterFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var id = $("#hdRuleMasterID").val();
        var ddlCorporateID = 0;///$("#ddlCorporates").val();
        var ddlFacilityID = 0;//$("#ddlFacilities").val();
        var txtRuleCode = $("#txtRuleCode").val();
        var txtRuleDescription = $("#txtRuleDescription").val();
        var txtRuleType = $("#ddlRuleTypes").val();
        var ddlRoleid = $("#ddlRoles").val();
        //var txtExtValue1 = $("#txtExtValue1").val();
        //var txtExtValue2 = $("#txtExtValue2").val();
        //var txtExtValue3 = $("#txtExtValue3").val();
        //var txtExtValue4 = $("#txtExtValue4").val();
        var dtEffectiveStartDate = $("#dtEffectiveStartDate").val();
        var dtEffectiveEndDate = $("#dtEffectiveEndDate").val();
        //var txtModifiedBy = $("#txtModifiedBy").val();
        //var dtModifiedDate = $("#dtModifiedDate").val();
        var isActive = $("#chkRuleMasterIsActive")[0].checked;
        var ddlRuleSpecifiedFor = $("#ddlRuleSpecifiedFor").val();
        //var txtCreatedBy = $("#txtCreatedBy").val();
        //var dtCreatedDate = $("#dtCreatedDate").val();

        var jsonData = JSON.stringify({
            RuleMasterID: id,
            CorporateID: ddlCorporateID,
            FacilityID: ddlFacilityID,
            //CorporateID: ddlCorporateID,
            //FacilityID: ddlFacilityID,
            RuleCode: txtRuleCode,
            RuleDescription: txtRuleDescription,
            RuleType: txtRuleType,
            ExtValue1: '', //txtExtValue1,
            ExtValue2: '',
            ExtValue3: '',
            ExtValue4: '',
            EffectiveStartDate: new Date(dtEffectiveStartDate),
            EffectiveEndDate: new Date(dtEffectiveEndDate),
            //ModifiedBy: txtModifiedBy,
            //ModifiedDate: dtModifiedDate,
            IsActive: isActive,
            //CreatedBy: txtCreatedBy,
            //CreatedDate: dtCreatedDate
            RoleId: ddlRoleid,
            RuleSpecifiedFor: ddlRuleSpecifiedFor
        });
        $.ajax({
            type: "POST",
            url: '/RuleMaster/SaveRuleMaster',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                ClearRuleMasterForm();
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

function EditRuleMaster(id) {
    var jsonData = JSON.stringify({
        rmId: id,
    });
    $.ajax({
        type: "POST",
        url: '/RuleMaster/GetRuleMaster',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#RuleMasterFormDiv').empty();
            $('#RuleMasterFormDiv').html(data);
            BindAllRuleMasterData();
            $('#collapseRuleMasterAddEdit').addClass('in');
            $("#RuleMasterFormDiv").validationEngine();
            $('#BtnRuleMasterSave').val('Update');
            $('#chkIsActive').prop('checked', true);
        },
        error: function (msg) {

        }
    });
}

function DeleteRuleMaster() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            RuleMasterID: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/RuleMaster/DeleteRuleMaster',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindRuleMasterGrid();
                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
            },
            error: function (msg) {
            }
        });
    }
}

//function DeleteRuleMaster(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var jsonData = JSON.stringify({
//            RuleMasterID: id
//        });
//        $.ajax({
//            type: "POST",
//            url: '/RuleMaster/DeleteRuleMaster',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                BindRuleMasterGrid();
//                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
//            },
//            error: function (msg) {
//            }
//        });
//    }
//}

function BindRuleMasterGrid() {
    var tn = $("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0 ? $("#ddlTableSet").val() : "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/RuleMaster/BindRuleMasterList",
        dataType: "html",
        async: true,
        data: JSON.stringify({ tn: tn}),
        success: function (data) {
            BindList("#RuleMasterListDiv", data);
            SetSelectedRowColor();
            SetGridCheckBoxes();
        },
        error: function (msg) {

        }
    });
}

function ClearRuleMasterForm() {
    $.validationEngine.closePrompt(".formError", true);
    $("#RuleMasterFormDiv").clearForm();
    ResetAllDropdowns("#ErrorMasterFormDiv");
    $('#collapseRuleMasterAddEdit').removeClass('in');
    $('#collapseRuleMasterList').addClass('in');
    //BindAllRuleMasterData();
    BindRuleMasterGrid();
    $('#hdRuleMasterID').val('');
    $('#BtnRuleMasterSave').val('Save');
    $('#chkRuleMasterIsActive').prop('checked', true);
    $("#chkShowInActive").prop("checked", false);

}

function BindCorporates() {
    $.ajax({
        type: "POST",
        url: '/Home/GetCorporatesDropdownData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, "#ddlCorporates", "#hdCorporateID");
            if ($("#hdCorporateID").val() != null && $("#hdCorporateID").val() != "") {
                BindFacilities();
            }
        },
        error: function (msg) {
        }
    });
}

function BindFacilities() {
    var ddlCorporateId = $('#ddlCorporates').val();
    var jsonData = JSON.stringify({
        corporateid: ddlCorporateId != null ? ddlCorporateId : 0,
    });
    $.ajax({
        type: "POST",
        url: '/Home/GetFacilitiesbyCorporate',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindDropdownData(data, "#ddlFacilities", "#hdFacilityID");
            if ($("#hdFacilityID").val() != null && $("#hdFacilityID").val() != "") {
                BindFacilityRoles();
            } else if ($("#hdCorporateID").val() != null && $("#hdCorporateID").val() != "") {
                BindCorporateRoles();
            }
        },
        error: function (msg) {
        }
    });
}

function ViewRuleSteps(ruleMasterId) {
    $("#RuleStepFormDiv").clearForm(true);
    $('#divLeftChange').hide();
    ToggleRadioButtons('#rdRhsFromTable', '.rdRhsFrom');
    $('#divChange').hide();
    $('#lblPreviewRule').html('');
    var jsonData = JSON.stringify({
        ruleMasterId: ruleMasterId,
    });
    $.ajax({
        type: "POST",
        url: '/RuleStep/BindRuleStepList',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#hdRuleMasterID1').val(ruleMasterId);
            BindList("#RuleStepListDiv", data);
            BindListHeaderDetails(ruleMasterId);
            GetMaxStepNumber();
            ColorCodeRuleSteps();
            GetPreviewRuleStepResult();
            $("#chkIsActive").prop("checked", true);
            //ClearRuleStepFormOnMasterClick();
        },
        error: function (msg) {

        }
    });
}
function ClearRuleStepFormOnMasterClick() {
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
var BindListHeaderDetails = function (ruleMasterId) {
    var jsonData = JSON.stringify({
        ruleMasterId: ruleMasterId,
    });
    $.ajax({
        type: "POST",
        url: '/RuleStep/GetRuleMasterById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $('.spnRuleMasterDesc').text('(' + data.RuleCode + " " + data.RuleDescription + ' )');
        },
        error: function (msg) {

        }
    });
};

var SetSelectedRowColor = function () {
    $('.ViewRulestep').on('click', function () {
        var tr = $(this).parents('tr:first');
        tr.css('background', '#ffff00');
        tr.siblings().css('background', 'none');
    });
};

var BindFacilityRoles = function () {
    var ddlCorporateId = $('#ddlCorporates').val();
    var ddlFacilityId = $('#ddlFacilities').val();
    var jsonData = JSON.stringify({
        corporateId: ddlCorporateId != null ? ddlCorporateId : 0,
        facilityId: ddlFacilityId != null ? ddlFacilityId : 0,
    });
    $.ajax({
        type: "POST",
        url: '/Home/GetRolesByFacilityDropdownData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                BindDropdownData(data, "#ddlRoles", "#hdRoleId");
            }
        },
        error: function (msg) {

        }
    });
};

var BindCorporateRoles = function () {
    var ddlCorporateId = $('#ddlCorporates').val();
    var jsonData = JSON.stringify({
        corporateId: ddlCorporateId != null ? ddlCorporateId : 0,
    });
    $.ajax({
        type: "POST",
        url: '/Home/GetDistinctRolesDropdownData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                BindDropdownData(data, "#ddlRoles", "#hdRoleId");
            }
        },
        error: function (msg) {

        }
    });
};

function ViewRuleMasterList(typeid) {
    if ($("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0) {
        var jsonData = JSON.stringify({
            tableNumber: $("#ddlTableSet").val() == 100000 ? "0" : $("#ddlTableSet").val(),
            type: typeid
        });

        $.ajax({
            type: "POST",
            url: '/Home/GetCodesByFacility',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#RuleMasterListDiv", data);
                $("#RuleStepFormDiv").clearForm();
                BindList("#RuleStepListDiv", "No Records Found!");
                SetGridCheckBoxes();
            },
            error: function (msg) {
                ShowMessage("Error while Coping the records!", "Warning", "warning", true);
            }
        });
    }
}
function ShowInActiveRuleMaster(chkSelector) {
    var tn = $("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0 ? $("#ddlTableSet").val() : "";
    var active = $(chkSelector)[0].checked;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/RuleMaster/BindRuleMasterList",
        dataType: "html",
        async: true,
        data: JSON.stringify({ tn: tn, notActive: active}),
        success: function (data) {
            BindList("#RuleMasterListDiv", data);
            SetSelectedRowColor();
            SetGridCheckBoxes();
        },
        error: function (msg) {

        }
    });
}

var BindFacilityRolesCustom = function () {
    $.ajax({
        type: "POST",
        url: '/Home/GetRolesByFacilityDropdownDataCustom',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data) {
                BindDropdownData(data, "#ddlRoles", "#hdRoleId");
            }
        },
        error: function (msg) {

        }
    });
};


function SortRuleMasterGridData(event) {
    var tn = $("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0 ? $("#ddlTableSet").val() : "";
    var chk = $("#chkShowInActive")[0].checked;
    var url = "/RuleMaster/BindRuleMasterList";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?tn=" + tn + "&notActive=" + chk + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
 
            BindList("#RuleMasterListDiv", data);
            SetSelectedRowColor();
            SetGridCheckBoxes();
        },
        error: function (msg) {
        }
    });
}