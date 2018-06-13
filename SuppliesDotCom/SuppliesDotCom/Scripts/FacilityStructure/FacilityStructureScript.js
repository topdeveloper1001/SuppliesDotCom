$(function () { LoadFacilityStructureData(true); });

function LoadFacilityStructureData(loadFacilities) {
    InitializeFormData();

    //Filling all DropDown in page.
    //BindFacilityData("#ddlFacility", "#hdFacilityId");
    //BindGlobalCodesWithValue("#ddlFacilityStructure", 5001, "#hdFacilityStructureId");
    //BindGlobalCodesOrderbyName("#ddlBedType", 1001, "#hdBedType");

    //if ($("#ddlFacilityStructure").val() == 85) {
    //    BedOverride();
    //}
    BindGlobalCodesDropdownData(loadFacilities);
}

function SaveFacilityStructureRefresh(id) {
    var isValid = jQuery("#FacilityStructureFormDiv").validationEngine({ returnIsValid: true });
    if (isValid) {
        var ddlFacility = $("#ddlFacility").val();
        var ddlFacilityStructure = $("#ddlFacilityStructure").val();
        var txtFacilityStructureName = $("#txtFacilityStructureName").val();
        var txtDescription = $("#txtDescription").val();
        var ddlParentId = $("#ddlParentId").val();
        var chkStatus = $("#chkStatus").prop("checked");
        var txtCreatedBy = 1;
        var txtCreatedDate = new Date();
        var ddlBedType = $("#ddlBedType").val();
        //var hdBedId = $("#hdBedId").val();
        var checkNonChargeable = $("#chkNonChargeableRoom").length > 0 ? $("#chkNonChargeableRoom")[0].checked : false;

        //var update = $("#btnUpdate");
        //if (update != null && update.val() == "Save" && id > 0) {
        //    id = 0;
        //}

        var txtRevenueGlAccount = "";// for bed type these fields are used to save override values.
        var txtArMasterAccount = "";
        var txtOverridePriority = "";
        if (ddlFacilityStructure === '85') {
            txtRevenueGlAccount = $("#chkCanOverRide").prop("checked") == true ? 1 : 0;
            var selected = '';
            $('#treeview input:checked').each(function () {
                //selected.push($(this)[0].value);
                selected += '' + $(this)[0].value + ',';
            });
            txtArMasterAccount = selected != '' ? selected.slice(0, -1) : '';
        }
        else if (ddlFacilityStructure === '84') {
            txtRevenueGlAccount = checkNonChargeable ? 1 : 0;
        }
        else {
            txtRevenueGlAccount = $("#txtRevenueGLAccount").val();
            txtArMasterAccount = $("#txtARMasterAccount").val();
        }
        var selectedVar = "";
        if (ddlFacilityStructure === '83') {
            $('#divOpeningDaysSection input:checked').each(function () {
                //var idValue = $(this).attr('id').split('_')[1];
                selectedVar = $(this).attr('id') + ",";
            });
            selectedVar = selectedVar.indexOf(',') > 0 ? selectedVar.substring(0, selectedVar.length - 1) : selectedVar;
        }

        var jsonArrayObject = [];
        if (ddlFacilityStructure === '83') {
            $('#divOpeningDaysSection input:checked').each(function () {
                var dayIdtoadd = $(this).attr('id');
                var deptTimmingObj = { OpeningDayId: dayIdtoadd, FacilityStructureID: $('#hdFacilityStructureId').val(), OpeningTime: $('#txtDeptOpeningTime_' + dayIdtoadd).val(), ClosingTime: $('#txtDeptClosingTime_' + dayIdtoadd).val(), TrunAroundTime: $('#txtDeptTurnaroundTime_' + dayIdtoadd).val() };
                jsonArrayObject.push(deptTimmingObj);
            });
        }
        //Added by Amit Jain on 07112014
        var sortOrder = $("#txtSortOrder").val();

        var jsonData = JSON.stringify({
            FacilityStructureId: id,
            GlobalCodeID: ddlFacilityStructure,
            FacilityStructureName: txtFacilityStructureName,
            Description: txtDescription,
            FacilityId: ddlFacility,
            FacilityStructureValue: 0,
            ParentId: ddlParentId,
            IsActive: chkStatus,
            CreatedBy: txtCreatedBy,
            CreatedDate: txtCreatedDate,
            BedTypeId: ddlBedType,
            ExternalValue1: txtRevenueGlAccount,
            ExternalValue2: txtArMasterAccount,
            ExternalValue3: txtOverridePriority,
            SortOrder: sortOrder,
            DeptOpeningTime: ddlFacilityStructure === '83' ? $('#txtDeptOpeningTime').val() : '',
            DeptClosingTime: ddlFacilityStructure === '83' ? $('#txtDeptClosingTime').val() : '',
            DeptTurnaroundTime: ddlFacilityStructure === '83' ? $('#txtDeptTurnaroundTime').val() : '',
            //DeptOpeningDays: ddlFacilityStructure === '83' ? selectedVar : '',
            DeptTimmingsList: jsonArrayObject,
            //EquipmentIds: equipmentList
        });
        $.ajax({
            type: "POST",
            url: '/FacilityStructure/SaveFacilityStructure',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
     
                //RemoveTimingValidation();
                if (data != "isExist") {
                    ClearFacilityStructureForm();
                    $('#collapseOne').removeClass('in');
                    var msg = "Records Saved successfully !";
                    if (id > 0)
                        msg = "Records updated successfully";

                    ShowMessage(msg, "Success", "success", true);
                    //BindFacilityData("#ddlFacility", "#hdFacilityId");
                    //BindGlobalCode("#ddlFacilityStructure", 5001, "#hdFacilityStructureId");
                } else {
                    ShowMessage("Record already exist.", "Error", "warning", true);
                }
            },
            error: function (msg) {

            }
        });
    }
}

function SaveFacilityStructure() {
    var isValid = jQuery("#FacilityStructureFormDiv").validationEngine({ returnIsValid: true });
    if (isValid) {
        var id = $("#FacilityStructureId").val() != '' && $("#FacilityStructureId").val() > 0 ? $("#FacilityStructureId").val() : 0;
        var ddlFacility = $("#ddlFacility").val();
        var ddlFacilityStructure = $("#ddlFacilityStructure").val();
        var txtFacilityStructureName = $("#txtFacilityStructureName").val();
        var txtDescription = $("#txtDescription").val();
        var ddlParentId = $("#ddlParentId").val();
        var chkStatus = $("#chkStatus").prop("checked");
        var txtCreatedBy = 1;
        var txtCreatedDate = new Date();
        var ddlBedType = $("#ddlBedType").val();
        var hdBedId = $("#hdBedId").val();
        var checkNonChargeable = $("#chkNonChargeableRoom").length > 0 ? $("#chkNonChargeableRoom")[0].checked : false;
        var sortOrder = $("#txtSortOrder").val();
        var txtRevenueGlAccount = "";// for bed type these fields are used to save override values.
        var txtArMasterAccount = "";
        var txtOverridePriority = "";
        if (ddlFacilityStructure === '85') {
            txtRevenueGlAccount = $("#chkCanOverRide").prop("checked") == true ? 1 : 0;
            var selected = '';
            $('#checkBox_BedTypes input:checked').each(function () {
                selected += '' + $(this)[0].value + ',';
            });
            txtArMasterAccount = selected != '' ? selected.slice(0, -1) : '';
        }
        else if (ddlFacilityStructure === '84') {
            txtRevenueGlAccount = checkNonChargeable ? 1 : 0;
        }
        else {
            txtRevenueGlAccount = $("#txtRevenueGLAccount").val();
            txtArMasterAccount = $("#txtARMasterAccount").val();
        }

        //----For Departments
        var jsonArrayObject = [];
        if (ddlFacilityStructure === '83') {
            $("input:checkbox[name=chkDays]:checked").each(function () {
                var dayIdtoadd = $(this).attr('id');
                var deptTimmingObj = {
                    OpeningDayId: dayIdtoadd,
                    FacilityStructureID: $('#hdFacilityStructureId').val(),
                    OpeningTime: $('#txtDeptOpeningTime_' + dayIdtoadd).val(),
                    ClosingTime: $('#txtDeptClosingTime_' + dayIdtoadd).val(),
                    TrunAroundTime: $('#txtDeptTurnaroundTime_' + dayIdtoadd).val()
                };
                jsonArrayObject.push(deptTimmingObj);
            });
        }
        //----For Departments

        // 1MAPCOLUMNSHERE - FacilityStructure
        var jsonData = JSON.stringify({
            FacilityStructureId: id,
            GlobalCodeID: ddlFacilityStructure,
            FacilityStructureName: txtFacilityStructureName,
            Description: txtDescription,
            FacilityId: ddlFacility,
            FacilityStructureValue: 0,
            ParentId: ddlParentId,
            ExternalValue1: txtRevenueGlAccount,
            ExternalValue2: txtArMasterAccount,
            ExternalValue3: txtOverridePriority,
            IsActive: chkStatus,
            CreatedBy: txtCreatedBy,
            CreatedDate: txtCreatedDate,
            BedTypeId: ddlBedType,
            BedId: hdBedId,
            SortOrder: sortOrder,
            DeptOpeningTime: ddlFacilityStructure === '83' ? $('#txtDeptOpeningTime').val() : '',
            DeptClosingTime: ddlFacilityStructure === '83' ? $('#txtDeptClosingTime').val() : '',
            DeptTurnaroundTime: ddlFacilityStructure === '83' ? $('#txtDeptTurnaroundTime').val() : '',
            DeptTimmingsList: jsonArrayObject
        });
        $.ajax({
            type: "POST",
            url: '/FacilityStructure/SaveFacilityStructure',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
               
                if (data == "-1") {
                    ShowMessage("Not possible to inactive this record as it has some dependent records. Kindly delete them first!", "Warning", "warning", true);
                }
                else if (data != "isExist") {
                    var msg = "Records Saved successfully !";
                    if (id > 0) {
                        $('.clearField').val('');
                        msg = "Records updated successfully";
                        $("#hdFacilityId").val(ddlFacility);
                        $("#hdFacilityStructureId").val(ddlFacilityStructure);
                        BindFacilityStructureGridData();
                        //$("#btnUpdate").val("Save");
                        //$("#btnUpdateAndReturn").show();
                        $("#chkCanOverRide").prop("checked", false);
                        $("#chkNonChargeableRoom").prop("checked", false);
                    } else {
                        $("#txtFacilityStructureName").val("");
                        $("#txtDescription").val("");
                        $("#txtOverRidePriority").val("");
                        $("#chkAvailableInOverRideList").val("");
                        $("#chkCanOverRide").val("");
                        $("#txtRevenueGLAccount").val("");
                        $("#txtARMasterAccount").val("");
                        $("#chkCanOverRide").prop("checked", false);
                        $("#chkNonChargeableRoom").prop("checked", false);
                        BindFacilityStructureGridData();
                    }
                    $("#divOverRideWith").hide();
                    //$("#btnUpdate").attr("onclick", "return SaveFacilityStructure('0');");
                    //$("#btnUpdateAndReturn").attr("onclick", "return SaveFacilityStructureRefresh('0');");
                    SetMaxSortOrder();
                    $('#divDepartments input').val('');
                    $('#divOpeningDaysSection input:checked').each(function () {
                        $(this).prop('checked', false);
                    });
                    ClearFacilityStructureForm();
                    ShowMessage(msg, "Success", "success", true);
                } else {
                    ShowMessage("Record already exist.", "Error", "warning", true);
                }
            },
            error: function (response) {

            }
        });
    }
}

function DeleteFacilityStructure() {
    if ($("#hfGlobalConfirmFirstId").val() > 0) {
       var jsonData = JSON.stringify({
            facilityStructureId: $("#hfGlobalConfirmFirstId").val(),
            bedid: $("#hfGlobalConfirmedSecondId").val()
        });
        $.ajax({
            type: "POST",
            url: '/FacilityStructure/DeleteFacilityStructure',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                ClearFacilityStructureForm();
                if (data) {
                    if (data == "-1") {
                        // This check is for checking the current structure id have the childrens assoicated with it.
                        ShowMessage("Not possible to delete this record as it has some dependent records. Kindly delete them first!", "Warning", "warning", true);
                    }
                    else if (data == "-2") {
                        // This check is for checking the current bed is occupied or not.
                        ShowMessage("Bed can not be deleted, because it is occupied.", "Warning", "warning", true);
                    }
                    else {
                        BindFacilityStructureGridData();
                        ShowMessage("Records Deleted Successfully", "Success", "success", true);
                    }
                }
            },
            error: function (msg) {
                return true;
            }
        });
    }
}

//function DeleteFacilityStructure(id, bedId) {
//    if (confirm("Do you want to delete this record? ")) {
//        var txtFacilityStructureId = id;
//        var jsonData = JSON.stringify({
//            facilityStructureId: txtFacilityStructureId,
//            bedid: bedId
//        });
//        $.ajax({
//            type: "POST",
//            url: '/FacilityStructure/DeleteFacilityStructure',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data) {
//                    if (data == "-1") {
//                        // This check is for checking the current structure id have the childrens assoicated with it.
//                        ShowMessage("Not possible to delete this record as it has some dependent records. Kindly delete them first!", "Warning", "warning", true);
//                    }
//                    else if (data == "-2") {
//                        // This check is for checking the current bed is occupied or not.
//                        ShowMessage("Bed can not be deleted, because it is occupied.", "Warning", "warning", true);
//                    }
//                    else {
//                        BindFacilityStructureGridData();
//                        ShowMessage("Records Deleted Successfully", "Success", "success", true);
//                    }
//                }
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}

function BindFacilityStructureGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/FacilityStructure/BindFacilityStructureList",
        dataType: "html",
        async: true,
        // data: jsonData,
        success: function (data) {
            $("#FacilityStructureListDiv").empty();
            $("#FacilityStructureListDiv").html(data);
            BindFacilityStructureTreeView();
        },
        error: function (msg) {

        }

    });
}

function ClearFacilityStructureForm() {
    RemoveTimingValidation();
    var selectedFacility = $("#ddlFacility").val();
    var selectedStructure = $("#ddlFacilityStructure").val();
    var shortOrder = $("#txtSortOrder").val();
    $("#FacilityStructureFormDiv").clearForm(true);
    $.validationEngine.closePrompt(".formError", true);
    $('#FacilityStructureListingDiv').addClass('in');
    $('#chkStatus').prop('checked', 'checked');
    $("#hdFacilityId").val(selectedFacility);
    $("#ddlFacilityStructure").val(selectedStructure);
    $("#txtSortOrder").val(shortOrder);
    $("#divOverRideWith").hide();
    BindFacilityData("#ddlFacility", "#hdFacilityId");
    $("#btnSave").val("Save");
    $("#btnSaveAndReturn").show();
    $('.disbaledfield').attr('disabled', 'disabled');
    $("#lblDefaultBedCharges").html('0.00');
    SetMaxSortOrder();
}

function BindFacilityData(selector, hidValueSelector) {
    $.ajax({
        type: "POST",
        url: "/FacilityStructure/BindFacilityData",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {

            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, facility) {
                    items += "<option value='" + facility.Value + "'>" + facility.Text + "</option>";
                });
                $(selector).html(items);
                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
        },
        error: function (msg) {
        }
    });
}

function BindParentData() {
    $.validationEngine.closePrompt(".formError", true);
    var structureid = $("#ddlFacilityStructure").val();
    var fId = $("#ddlFacility").val();
    if (fId != "0") {
        var jsonData = JSON.stringify({
            structureId: structureid,
            facilityid: fId
        });
        var update = $("#btnSave");
        if (update != null) {
            $("#btnSave").val('Save');
            $("#btnSaveAndReturn").show();
        }
        if (structureid != null && structureid != "0") {
            $.ajax({
                type: "POST",
                url: "/FacilityStructure/GetParentValue",
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: jsonData,
                success: function (data) {
                    if (data) {
                        $("#btnShowHide").show();
                        var items = '<option value="0">--Select--</option>';
                        $.each(data, function (i, globalCode) {
                            items += "<option value='" + globalCode.FacilityStructureId + "'>" + globalCode.FacilityStructureName + "</option>";
                        });
                        $("#ddlParentId").html(items);
                        $("#divAddUpdateFacilityStructure").show();
                        if ($("#hdParentId") != null && $("#hdParentId").val() > 0)
                            $("#ddlParentId").val($("#hdParentId").val());

                        //GetBreadCrumbs(structureid);
                        var baseStrucutreName = "";
                        var currentStructureName = $("#ddlFacilityStructure :selected").text();
                        switch (structureid) {
                            case "83":
                                baseStrucutreName = "Floor";
                                break;
                            case "84":
                                baseStrucutreName = "Department";
                                break;
                            case "85":
                                baseStrucutreName = "Rooms";
                                break;
                            default:
                                baseStrucutreName = "";
                        }

                        $("#lblParentName").html('<span class="mandatoryStar"></span>' + baseStrucutreName + ':');
                        $("#lblCurrentName").html('<span class="mandatoryStar"></span>' + currentStructureName + ' Name:');
                        $("#lblCurrentDesc").html(currentStructureName + ' Description:');
                        if (structureid == 82) {
                            $("#divParenttype").hide();
                            $("#ddlParentId").removeClass("validate[required]");
                        } else {
                            $("#divParenttype").show();
                            $("#ddlParentId").addClass("validate[required]");
                        }


                        $("#divDepartments").hide();
                        //added by ashwani
                        if (structureid == 83) {
                            $("#divDeptOpeningDays").show();
                            $("#divRevenue").show();
                            $("#divMasterAccount").show();
                            $("#divDepartments").show();
                            BindDepartmentTimmings();
                        } else {
                            $("#divRevenue").hide();
                            $("#divMasterAccount").hide();
                        }

                        //added by ashwani
                        if (structureid == 84) {
                            $(".roomtypescreen").show();
                        } else {
                            $(".roomtypescreen").hide();
                        }

                        // Bed Type
                        $('.bedtypescreen').hide();
                        if (structureid == 85) {
                            $("#divBedType").show();
                            $("#ddlBedType").addClass("validate[required]");
                            $('#divDefaultBedCharges').show();
                            $("#lblDefaultBedCharges").html('0.00');
                        } else {
                            $("#divBedType").hide();
                            $('.bedtypescreen').hide();
                            $('.OverRideSetup').hide();
                            $('.OverRideSetup1').hide();
                            $("#ddlBedType").removeClass("validate[required]");
                            $('#divDefaultBedCharges').hide();
                        }
                        BindFacilityStructureGridData();
                    } else {
                        $("#divAddUpdateFacilityStructure").hide();

                    }
                },
                error: function (msg) {
                }
            });
        } else {
            $("#divAddUpdateFacilityStructure").hide();
            $("#FacilityStructureListDiv").empty();
            $("#divDefaultBedCharges").hide();
            $("#divDeptOpeningDays").hide();
        }
    } else {
        ShowMessage("Please select any Facility.", "Error", "warning", true);
    }
}

function BindFacilityStructureGridData() {
    //$('#FacilityStructureListingDiv').addClass('in');
    $.validationEngine.closePrompt(".formError", true);
    var structureid = $("#ddlFacilityStructure").val();
    var facilityId = $("#ddlFacility").val();

    var showInActive = $("#chkShowInActive").prop("checked");
    if (showInActive == false) {
        showInActive = true;
    } else {
        showInActive = false;
    }
    var jsonData = JSON.stringify({
        facilityid: facilityId,
        structureId: structureid,
        showInActive: showInActive
    });
    if (facilityId > 0) {
        if (ajaxStartActive) {
            ajaxStartActive = false;
        }
        $('#loader_event').show();
        if (structureid != null) {
            $.ajax({
                type: "POST",
                url: "/FacilityStructure/BindFacilityStructureGrid",
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "html",
                data: jsonData,
                success: function (data) {
                    if (data) {
                        $('#FacilityStructureListingDiv').addClass('in').attr('style', 'height:auto;');
                        //$("#divDeptOpeningDays").show();
                        //$("#divDefaultBedCharges").show();
                        //$("#divAddUpdateFacilityStructure").show();
                        //$('#FacilityStructureListingDiv').addClass('in');
                        $("#FacilityStructureListDiv").empty();
                        $("#FacilityStructureListDiv").html(data);
                      

                        //SetGridPaging('?', '?facilityid=' + facilityId + '&structureId=' + structureid + '&showInActive=' + showInActive + '&');
                        $('#loader_event').hide();
                        //if ($('.fht-table.table-grid.table_scroll').length === 0) {
                    //    $('.table_scroll').fixedHeaderTable({ cloneHeadToFoot: true, altClass: 'odd', autoShow: true });
                        //}
                        BindTreeView();
                        //ajaxStartActive = true;
                        //$('#FacilityGrid').Scrollable();
                        if (facilityId == 0) {
                            $("#divAddUpdateFacilityStructure").hide();
                            $("#FacilityStructureListDiv").empty();
                            //$("#divAddUpdateFacilityStructure").empty();
                            $("#divDeptOpeningDays").hide();
                            $("#divDefaultBedCharges").hide();
                            $('#ddlFacilityStructure').val('0');
                        }
                    }
                },
                error: function (msg) {
                }
            });


        }
    }
    //else {
    //    $("#FacilityStructureListDiv").empty();
    //    structureid = -1;
    //}

    /*if (facilityId==0) {
    $("#divAddUpdateFacilityStructure").hide();
     $("#FacilityStructureListDiv").empty();
         //$("#divAddUpdateFacilityStructure").empty();
         $("#divDeptOpeningDays").hide();
         $("#divDefaultBedCharges").hide();
         $('#ddlFacilityStructure').val('0');
    }*/

}

var BindBedBaseRate = function () {
    var bedTypeId = $("#ddlBedType").val();
    $('.bedtypescreen').show();
    bedTypeId = bedTypeId != null ? bedTypeId : $("#hdBedType").val();
    if (bedTypeId != null) {
        var jsonData = JSON.stringify({
            bedType: bedTypeId,
        });
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/FacilityStructure/GetBedChargesByBedType",
            dataType: "Json",
            async: true,
            data: jsonData,
            success: function (data) {
                $("#lblDefaultBedCharges").html(data);
            },
            error: function (msg) {

            }
        });
    }
};

function BedOverride() {
    var bedTypeId = $("#ddlBedType").val();
    $('.bedtypescreen').show();
    setTimeout(BindBedBaseRate, 1000);
    //if (bedTypeId != null) {
    //    var jsonData = JSON.stringify({
    //        bedType: bedTypeId,
    //    });
    //    $.ajax({
    //        type: "POST",
    //        contentType: "application/json; charset=utf-8",
    //        url: "/FacilityStructure/GetBedChargesByBedType",
    //        dataType: "Json",
    //        async: true,
    //        data: jsonData,
    //        success: function(data) {
    //            $("#lblDefaultBedCharges").html(data);
    //        },
    //        error: function(msg) {

    //        }
    //    });
    //}
};

function BindBedOverRideDropDown() {
    var bedType = $("#ddlBedType").val();
    var jsonData = JSON.stringify({
        bedTypeId: bedType,
    });
    $.ajax({
        type: "POST",
        url: '/FacilityStructure/GetBedOverrideDropdownData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#ddlOverRidePriority').empty();
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.SortOrder + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $('#ddlOverRidePriority').html(items);

                if ($("#hdOverRidePriority") != null && $("#hdOverRidePriority").val() > 0)
                    $('#ddlOverRidePriority').val($("#hdOverRidePriority").val());
            }
        },
        error: function (msg) {
        }
    });
}

///Shashank: 20141028,  Empty this Method for time being , Will work on this
GetBreadCrumbs = function (structureid) {
    var facilityId = $("#ddlFacility").val();
    var parentId = $("#ddlParentId").val();
    var jsonData = JSON.stringify({
        structureId: structureid,
        facilityid: facilityId,
        parentId: parentId
    });
    $.ajax({
        type: "POST",
        url: '/FacilityStructure/GetBreadCrumbs',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#divBreadCurmbs').empty();
                // $('#divBreadCurmbs').html(data);
            }
        },
        error: function (msg) {
        }
    });
};

//ashwani tree code
function BindFacilityStructureTreeView() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/FacilityStructure/GetFacilityStuctureListTreeView",
        dataType: "html",
        async: true,
        // data: jsonData,
        success: function (data) {

            $("#FacilityStructureTreeViewDiv").empty();
            $("#FacilityStructureTreeViewDiv").html(data);
        },
        error: function (msg) {

        }

    });
}


//Tree code end
function BindTreeView() {
   $.validationEngine.closePrompt(".formError", true);
    var facilityId = $("#ddlFacility").val();
    $('#spnFacilityName').html('( ' + $("#ddlFacility :selected").text() + ' )');
    $.ajax({
        type: "POST",
        url: "/FacilityStructure/BindFacilityStructureGridTreeView",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: JSON.stringify({
            facilityid: facilityId,
        }),
        success: function (data) {
            if (data) {
                $("#FacilityStructureTreeViewDiv").empty();
                $("#FacilityStructureTreeViewDiv").html(data);
            }
        },
        error: function (msg) {
        }
    });
}

function ClearFieldBoxes() {
    $('.clearField').val('');
    $('.clearFieldddl').val('0');
}

//Added by Amit Jain on 07112014
function GetMaxSortOrder(fId, structureTypeId) {
    var jsonData = JSON.stringify({
        facilityId: fId,
        structureType: structureTypeId
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/FacilityStructure/GetMaxSortOrder",
        dataType: "Json",
        async: true,
        data: jsonData,
        success: function (data) {
            $("#txtSortOrder").val(data);
        },
        error: function (msg) {

        }

    });

}

function SetMaxSortOrder() {
    var structureid = $("#ddlFacilityStructure").val();
    var fId = $("#ddlFacility").val();
    if (structureid != '' && fId != '') {
        GetMaxSortOrder(fId, structureid);
    }
}

var ShowHideTimming = function (id) {
   var checked = $('#' + id).is(':checked');
    if (checked) {
        $('.divDaysSectionShow_' + id + ' input').removeAttr('disabled');
        $('.divDaysSectionShow_ ' + id + ' input').val('');
        $('.divDaysSectionShow_' + id + ' input').addClass('validate[required]');
        $('.divFullDaysSectionShow_' + id + ' input').removeAttr('disabled');

    } else {
        $('.divDaysSectionShow_' + id + ' input').attr('disabled', true);
        $('.divDaysSectionShow_' + id + ' input').val('');
        $('.divDaysSectionShow_' + id + ' input').removeClass('validate[required]');
        $('.divFullDaysSectionShow_' + id + ' input').attr('disabled', true);
        $('.divFullDaysSectionShow_' + id + ' input').attr('checked', false);
    }
}
var SetFullDay = function (id) {

    var checked = $('#chkFullDay_' + id).prop('checked');;
    if (checked) {
        $('#txtDeptOpeningTime_' + id).val('00:00');
        $('#txtDeptClosingTime_' + id).val('23:30');
        $('#txtDeptTurnaroundTime_' + id).val('10');
        $('#txtDeptTurnaroundTime_' + id).removeAttr('disabled');
    } else {
        $('#txtDeptOpeningTime_' + id).val('');
        $('#txtDeptClosingTime_' + id).val('');
        $('#txtDeptTurnaroundTime_' + id).val('');
        //$('#txtDeptTurnaroundTime_'+id).attr('disabled', true);
    }
}


function BindTextBoxValidation(id) {
    var srtime = $("#txtDeptOpeningTime_"+ id).val();
    var edtime = $("#txtDeptClosingTime_" + id).val();
    if (edtime != null && edtime != "") {
         if (srtime > edtime) {
        $("#txtDeptClosingTime_" + id).val("");
        ShowMessage('Start time should not be greater than end time.', "Alert", "warning", true);
        edtime.focus();
        return false;
    }
    else {
        return true;
    }
    }
   
}


//var BindTextBoxValidation = function (id) {
//    var minvalue = $("#txtDeptOpeningTime_" + id).val();
//    if (minvalue.indexOf(':') > 0) {
//        var minvalueInterval = minvalue.split(':')[1];
//        minvalue = minvalueInterval == "00" ? minvalue.split(':')[0] + ":30" : (parseInt(minvalue.split(':')[0], 10) + 1) + ":00";
//    }

//    $("#txtDeptClosingTime_" + id).datetimepicker({
//        datepicker: false,
//        format: 'H:i',
//        step: 30,
//        mask: false,
//        minTime: minvalue
//    });
//}

var BindDepartmentTimmings = function () {
    var jsonData = JSON.stringify({
        facilityStructureId: $('#FacilityStructureId').val()
    });
    $.ajax({
        type: "POST",
        url: "/FacilityStructure/BindDepartmentTimmings",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                $.each(data, function (i, timmingdata) {
                    $('#' + timmingdata.OpeningDayId).prop('checked', true);
                    $('.divDaysSectionShow_' + timmingdata.OpeningDayId + ' input').removeAttr('disabled');
                    $('#txtDeptOpeningTime_' + timmingdata.OpeningDayId).val(timmingdata.OpeningTime);
                    $('#txtDeptClosingTime_' + timmingdata.OpeningDayId).val(timmingdata.ClosingTime);
                    $('#txtDeptTurnaroundTime_' + timmingdata.OpeningDayId).val(timmingdata.TrunAroundTime);
                });
            }
        },
        error: function (msg) {
        }
    });
}


function SortFacilityStructureGrid(event) {
    var structureid = $("#ddlFacilityStructure").val();
    var facilityId = $("#ddlFacility").val();
    var showInActive = $("#chkShowInActive").prop("checked");
    if (showInActive == false) {
        showInActive = true;
    } else {
        showInActive = false;
    }
    var url = "/FacilityStructure/BindFacilityStructureGrid";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?facilityid=" + facilityId + "&structureid=" + structureid + "&showInActive=" + showInActive + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#FacilityStructureListDiv").empty();
            $("#FacilityStructureListDiv").html(data);
        },
        error: function (msg) {
        }
    });
}

var showTreeviewData = function () {
    if ($('.k-group').closest('li').length > 0) {
        $('#FacilityStructureTreeDiv').toggleClass('in');
    }
}


function BindGlobalCodesDropdownData(loadFacilities) {
    var bedTypeId = $("#ddlBedType").val();
    $('.bedtypescreen').show();
    bedTypeId = bedTypeId != null ? bedTypeId : $("#hdBedType").val();

    if (bedTypeId == '')
        bedTypeId = 0;

    var structureId = $("#ddlFacilityStructure").length > 0 && $("#ddlFacilityStructure").val() != null && $("#ddlFacilityStructure").val() != 0 ? $("#ddlFacilityStructure").val() : "0";
    $.ajax({
        type: "POST",
        url: "/FacilityStructure/BindGlobalCodesDropdownData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ structureId: structureId, bedType: bedTypeId, loadFacilities: loadFacilities }),
        success: function (data) {
            if (data != null) {
                BindDropdownData(data.listFacilityStructure, '#ddlFacilityStructure', '#hdFacilityStructureId');
                BindDropdownData(data.listBedTypes, "#ddlBedType", "#hdBedType");

                BindDropdownData(data.listParentStructure, "#ddlParentId", "#hdParentId");

                if (loadFacilities)
                    BindDropdownData(data.listFacilities, "#ddlFacility", "#hdFacilityId");

                if (structureId == 85 && bedTypeId > 0) {
                    BindList("#lblDefaultBedCharges", data.bedRate);
                }
            }
        },
        error: function (msg) {
        }
    });
}


function SetOtherFormDetailsInEditMode() {
    $.validationEngine.closePrompt(".formError", true);
    var structureid = $("#ddlFacilityStructure").val();
    var fId = $("#ddlFacility").val();
    if (fId != "0") {
        $("#btnSave").val('Update');
        if (structureid != null && structureid != "0") {
            $("#btnShowHide").show();
            $("#divAddUpdateFacilityStructure").show();

            var baseStrucutreName = "";
            var currentStructureName = $("#ddlFacilityStructure :selected").text();
            switch (structureid) {
                case "83":
                    baseStrucutreName = "Floor";
                    break;
                case "84":
                    baseStrucutreName = "Department";
                    break;
                case "85":
                    baseStrucutreName = "Rooms";
                    break;
                default:
                    baseStrucutreName = "";
            }

            $("#lblParentName").html('<span class="mandatoryStar"></span>' + baseStrucutreName + ':');
            $("#lblCurrentName").html('<span class="mandatoryStar"></span>' + currentStructureName + ' Name:');
            $("#lblCurrentDesc").html(currentStructureName + ' Description:');

            if (structureid == 82) {
                $("#divParenttype").hide();
                $("#ddlParentId").removeClass("validate[required]");
            } else {
                $("#divParenttype").show();
                $("#ddlParentId").addClass("validate[required]");
            }

            $("#divDepartments").hide();
            if (structureid == 83) {
                $("#divDeptOpeningDays").show();
                $("#divRevenue").show();
                $("#divMasterAccount").show();
                $("#divDepartments").show();

                var arr = $('#hdDeptOpeningDays').val().split(',');
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        $('#' + arr[i]).prop('checked', 'checked');
                    }
                }

            } else {
                $("#divRevenue").hide();
                $("#divMasterAccount").hide();
            }

            if (structureid == 84) {
                $(".roomtypescreen").show();
            } else {
                $(".roomtypescreen").hide();
            }

            // Bed Type
            if (structureid == 85) {
                $("#divBedType").show();
                $('.bedtypescreen').show();
                $("#ddlBedType").addClass("validate[required]");
                $('#divDefaultBedCharges').show();
                //$("#lblDefaultBedCharges").html('0.00');

                var selectedServices = $('#hdServiceCodes').val();
                if (selectedServices != '') {
                    if (selectedServices.indexOf(',') != -1) {
                        var selected = selectedServices.split(',');
                        $("#divOverRideWith").find("input[type=checkbox]").each(function () {
                            if (selected.indexOf($(this).val()) != -1) {
                                $(this).prop("checked", "checked");
                            }
                        });
                    } else {
                        $("#divOverRideWith").find("input[type=checkbox]").each(function () {
                            if (selectedServices.indexOf($(this).val()) != -1) {
                                $(this).prop("checked", "checked");
                            }
                        });
                    }
                }
            }
            else {
                $("#divBedType").hide();
                $('.bedtypescreen').hide();
                $('.OverRideSetup').hide();
                $('.OverRideSetup1').hide();
                $("#ddlBedType").removeClass("validate[required]");
                $('#divDefaultBedCharges').hide();
            }
        }
        else {
            $("#divAddUpdateFacilityStructure").hide();
            $("#FacilityStructureListDiv").empty();
            $("#divDefaultBedCharges").hide();
            $("#divDeptOpeningDays").hide();
        }
    }
    else {
        ShowMessage("Please select any Facility.", "Error", "warning", true);
    }
}


function EditFacilityStructure(id) {
    $('#loader_event').show();
    var jsonData = JSON.stringify({
        facilityStructureId: id
    });
    $.ajax({
        type: "POST",
        url: '/FacilityStructure/GetFacilityStructureDetails',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data != null) {
              
                //ClearFacilityStructureForm();
                //var selectedFacility = $("#ddlFacility").val();
                //var selectedStructure = $("#ddlFacilityStructure").val();
                //$("#ddlFacility").val(selectedFacility);
                //$("#ddlFacilityStructure").val(selectedStructure);
                //$("#FacilityStructureFormDiv").clearForm(true);
                $("#divOpeningDaysSection").clearForm(true);
                $('.disbaledfield').attr('disabled', 'disabled');

                var current = data.vm;
                //$('#FacilityStructureFormDiv').empty();
                //$('#FacilityStructureFormDiv').html(data);
                $('#collapseOne').addClass('in');

                var fsTypeId = current.GlobalCodeID;
                $("#hdFacilityStructureId").val(current.GlobalCodeID);
                $("#FacilityStructureId").val(current.FacilityStructureId);
                $("#hdFacilityId").val(current.FacilityId);
                $("#hdParentId").val(current.ParentId);
                $("#txtFacilityStructureName").val(current.FacilityStructureName);
                $("#txtDescription").val(current.Description);

                if (current.IsActive) {
                    $("#chkStatus").prop('checked', true);
                } else {
                    $("#chkStatus").prop('checked', false);

                }

                $("#txtSortOrder").val(current.SortOrder);


                if ($("#ddlFacilityStructure").val() > 0) {
                    $("#ddlParentId").val(current.ParentId);
                } else {
                    $("#ddlFacilityStructure").val(fsTypeId);
                    BindDropdownData(data.listParentStructure, "#ddlParentId", "#hdParentId");
                }


                switch (parseInt(fsTypeId)) {
                    case 82:
                        break;
                    case 83:
                        $("#txtRevenueGLAccount").val(current.ExternalValue1);
                        $("#txtARMasterAccount").val(current.ExternalValue2);
                        if (data.listDepTimings != null && data.listDepTimings.length > 0) {
                            $.each(data.listDepTimings, function (i, timmingdata) {
                                $('#' + timmingdata.OpeningDayId).prop('checked', true);
                                $('.divDaysSectionShow_' + timmingdata.OpeningDayId + ' input').removeAttr('disabled');
                                $('.divFullDaysSectionShow_' + timmingdata.OpeningDayId + ' input').removeAttr('disabled');

                                $('#txtDeptOpeningTime_' + timmingdata.OpeningDayId).val(timmingdata.OpeningTime);
                                $('#txtDeptClosingTime_' + timmingdata.OpeningDayId).val(timmingdata.ClosingTime);
                                $('#txtDeptTurnaroundTime_' + timmingdata.OpeningDayId).val(timmingdata.TrunAroundTime);
                                if (timmingdata.OpeningTime == "00:00" && timmingdata.ClosingTime == "23:30") {
                                    $("#chkFullDay_" + timmingdata.OpeningDayId).prop('checked', true);
                                }
                            });
                        }
                        break;
                    case 84:
                        if (current.NonChargeableRoom == "Yes")
                            $("#chkNonChargeableRoom").prop('checked', true);

                        break;
                    case 85:
                        $("#hdBedType").val(current.BedTypeId);
                        $("#hdBedId").val(current.BedId);
                        BindList("#lblDefaultBedCharges", current.BedCharge);

                        if ($("#ddlFacilityStructure").val() > 0) {
                            $("#ddlBedType").val(current.BedTypeId);
                        } else {
                            BindDropdownData(data.listBedTypes, "#ddlBedType", "#hdBedType");
                        }
                        $("#hdServiceCodes").val(current.ExternalValue2);

                        if (current.CanOverRide) {
                            $("#chkCanOverRide").prop('checked', true);
                        } else {
                            $("#chkCanOverRide").prop('checked', false);
                        }
                            

                        if (current.AvailableInOverRideList)
                            $("#chkAvailableInOverRideList").prop("checked", true);

                        if (data.partialViewServiceCodes != '')
                            BindList("#divOverRideWith", data.partialViewServiceCodes);
                        break;
                    default:
                }

                InitializeFormData();

                SetOtherFormDetailsInEditMode();
                $("#btnSave").val('Update');
                $("#btnSave").show();
                $("#btnSaveAndReturn").hide();
                $('#loader_event').hide();
            }
            else {
            }
        },
        error: function (msg) {

        }
    });
}


function InitializeFormData() {
    InitializeDateTimePicker();
    $("#btnShowHide").hide();
    $("#FacilityStructureFormDiv").validationEngine();
    $('#FacilityStructureDiv').addClass('in');
    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });

    $('#chkCanOverRide').change(function () {
        if ($(this).is(":checked")) {
            $('.OverRideSetup').show();
            $('#divOverRideWith').show();
        } else {
            $('.OverRideSetup').hide();
            $('.OverRideSetup1').val(0);
            $('#divOverRideWith').hide();
        }
        $('.k-checkbox input[type=checkbox]').attr('checked', false);
    });

    $('#chkAvailableInOverRideList').change(function () {
        if ($(this).is(":checked")) {
            $('.OverRideSetup1').show();
            //BindBedOverRideDropDown();
        } else {
            $('.OverRideSetup1').hide();
            $('.OverRideSetup1').val(0);
        }
    });

    $('#chkShowInActive').change(function () {
        BindFacilityStructureGridData();
    });

    if ($("#chkCanOverRide").prop("checked") == true) {
        $('.OverRideSetup').show();
        $('.bedtypescreen').show();
        $('#divOverRideWith').show();
    }
    else {
        $('.bedtypescreen').hide();
        $('.OverRideSetup').hide();
        $('.OverRideSetup1').val(0);
        $('#divOverRideWith').hide();
    }

    if ($("#chkAvailableInOverRideList").prop("checked") == true) {
        $('.OverRideSetup1').show();
    } else {
        $('.OverRideSetup').hide();
        $('.OverRideSetup1').hide();
        $('#ddlOverRidePriority').val('0');
    }
}












/******************************Methods below are NOT IN USE********************************************/

function BindGlobalCode(selector, categoryIdval, hidValueSelector) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: "/Home/GetGlobalCodesOrderBy",
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

function editDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.FacilityStructureId;
    EditFacilityStructure(id);

}

function deleteDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.FacilityStructureId;
    DeleteFacilityStructure(id);
}
/******************************Methods above are NOT IN USE********************************************/




function RemoveTimingValidation() {
  //$('.removeValidation').removeClass('validate[required]');
    $('.divDaysSectionShow_' + 9091 + ' input').removeClass('validate[required]');
    $('.divDaysSectionShow_' + 9092 + ' input').removeClass('validate[required]');
    $('.divDaysSectionShow_' + 9093 + ' input').removeClass('validate[required]');
    $('.divDaysSectionShow_' + 9094 + ' input').removeClass('validate[required]');
    $('.divDaysSectionShow_' + 9095 + ' input').removeClass('validate[required]');
    $('.divDaysSectionShow_' + 9096 + ' input').removeClass('validate[required]');
    $('.divDaysSectionShow_' + 9097 + ' input').removeClass('validate[required]');

}