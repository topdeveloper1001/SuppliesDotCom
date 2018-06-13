$(document).ready(function () {
    jscalls();
});

function jscalls() {
    BindDropDownOnlyWithSelect('#ddlRoles');
    $("#facilityRoleFormDiv").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });
    $('#chkStatus').prop('checked', true);

    $('#AddToAll').prop('checked', true);
    //Bind Corporates
    var corporateId = $("#hdCorporateId").val();
    BindCorporates("#ddlCorporates", corporateId);
    $("#divRoleSlection").show();
    $('input:radio[name=RoleSelect]').removeAttr("disabled");
    ////Bind Roles
    $('input:radio[name=RoleSelect]').click(function () {
        $.validationEngine.closePrompt(".formError", true);
        var val = $('input:radio[name=RoleSelect]:checked').val();
        if (val == "newrole") {
            $("#divNewRole").show();
            $("#txtRoleName").addClass("validate[required]");
            $("#ddlRoles").removeClass("validate[required]");
            $("#divPreviousRole").hide();
            $("#ddlRoles").val('0');
        }
        else if (val == "previousrole") {
            $("#divPreviousRole").show();
            $("#txtRoleName").removeClass("validate[required]");
            $("#ddlRoles").addClass("validate[required]");
            $("#divNewRole").hide();
        }
    });
    BindFacilitiesByCorporateId(corporateId, "#ddlFacilities", "0");
}

//Purpose: Save Facility Role to database
function AddUpdateFacilityRole() {
    var isValid = jQuery("#facilityRoleFormDiv").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return;
    }
    var schedulingApplied = $('#SchedulingApplied:checked').val() ? true : false;
    var carePlanAccessible = $('#CarePlanAccessible:checked').val() ? true : false;
    var facilityRoleId = $("#hdFacilityRoleId").val();
    var roleId = $("#ddlRoles").val();
    var cId = $("#ddlCorporates").val();
    var facilityId = $("#ddlFacilities").val();
    var isActive = true;
    var rolename = $("#txtRoleName").val();
    if (!$('#chkStatus').is(':checked'))
        isActive = false;
    $('#hdIsRefresh').val('');
    CheckIfFacilityRoleExists(facilityRoleId, facilityId, roleId, cId, isActive, rolename, schedulingApplied, carePlanAccessible);
}

function AddUpdateFacilityRoleRefresh() {
    var isValid = jQuery("#facilityRoleFormDiv").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return;
    }
    var schedulingApplied = $('#SchedulingApplied:checked').val() ? true : false;
    var carePlanAccessible = $('#CarePlanAccessible:checked').val() ? true : false;
    var facilityRoleId = $("#hdFacilityRoleId").val();
    var roleId = $("#ddlRoles").val();
    var cId = $("#ddlCorporates").val();
    var facilityId = $("#ddlFacilities").val();
    var isActive = true;
    var rolename = $("#txtRoleName").val();
    if (!$('#chkStatus').is(':checked'))
        isActive = false;
    $('#hdIsRefresh').val('1');
    CheckIfFacilityRoleExists(facilityRoleId, facilityId, roleId, cId, isActive, rolename, schedulingApplied, carePlanAccessible);
}

function BindFacilityRoleList() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Security/GetFacilityRolesList",
        data: null,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            $("#facilityRoleList").empty();
            $("#facilityRoleList").html(data);
        },
        error: function (msg) {

        }
    });
}

function EditFacilityRole(facilityRoleId) {
    
    var jsonData = JSON.stringify({
        facilityRoleId: facilityRoleId
    });

    $.ajax({
        type: "POST",
        url: '/Security/GetFacilityRoleById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                $('#collapseOne').addClass('in').attr('style', 'height:auto;');
                $('#facilityRoleFormDiv').empty();
                $('#facilityRoleFormDiv').html(data);
                $("#divPreviousRole").show();
                $('#SchedulingApplied').prop('checked', data.SchedulingApplied);
                $('#CarePlanAccessible').prop('checked', data.CarePlanAccessible);
                //Bind Corporates
                var corporateId = $("#hdCorporateId").val();
                BindCorporates("#ddlCorporates", corporateId);

                //Bind Facilities
                var selectedFacilityId = $("#hdFacilityId").val();
                BindFacilitiesByCorporateId(corporateId, "#ddlFacilities", selectedFacilityId);

                //Bind Roles
                var roleId = $("#hdRoleId").val();
                //BindRoles(corporateId, "#ddlRoles", roleId);
                //BindRolesByFacility(corporateId, selectedFacilityId, "#ddlRoles", roleId);
               
                BindFacilityRolesByFacilityCorporateId(corporateId, selectedFacilityId, "#ddlRoles", roleId);
                $('input:radio[name=RoleSelect]').attr("disabled", "disabled");



            }
        },
        error: function (msg) {
        }
    });
}

function OnChangeCorporatesDropdown(roleId) {
   
    //Bind Roles
    var corporateId = $('#ddlCorporates').val();
    if (corporateId != '0') {
        //Bind Facilities
        var selectedFacilityId = $("#hdFacilityId").val();
        BindFacilitiesByCorporateId(corporateId, "#ddlFacilities", selectedFacilityId);
        $("#chkShowInActive").prop('checked', false);
        //Bind Roles
        //var selectedRoleId = roleId != '' || roleId < 0 ? $("#hdRoleId").val() : roleId;
        //BindRoles(corporateId, "#ddlRoles", selectedRoleId);
        BindFacilityRoleCustomList();
        //SetGridPaging('Security', 'FacilityRole');
    } else {
        BindDropDownOnlyWithSelect('#ddlFacilities');
    }
}

function OnChangeFacilityDropdown(roleId) {
    //Bind Roles
    
    var facilityId = $('#ddlFacilities').val();
    var corporateId = $('#ddlCorporates').val();
    if (facilityId != '') {
        //Bind Roles
        var selectedRoleId = roleId != '' || roleId < 0 ? $("#hdRoleId").val() : roleId;
        //BindRolesByFacility(corporateId, facilityId, "#ddlRoles", selectedRoleId);
        BindFacilityRolesByFacilityCorporateId(corporateId, facilityId, "#ddlRoles", selectedRoleId);
        BindFacilityRoleCustomList();
        $("#chkShowInActive").prop('checked', false);

        //SetGridPaging('Security', 'FacilityRole');
    }
}

function DeleteFacilityRole(facilityRoleId) {
    if (confirm("Do you want to delete user?")) {
        var url = '/Security/DeleteFacilityRole';
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                id: facilityRoleId
            }),
            success: function (data) {
                if (data != null) {
                    ClearFields();
                    $('#facilityRoleList').empty();
                    $('#facilityRoleList').html(data);
                    $('#collapseTwo').addClass('in');
                    ShowMessage("Facility Role deleted successfully", "Alert", "info", true);
                }
                else {
                }
            },
            error: function (msg) {
            }
        });
    }
}

function CheckDuplicateRole() {
    var roleId = $("#hfRoleID").val();
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (isValid) {
        var roleName = $("#txtRoleName").val();
        var jsonData = JSON.stringify({
            RoleId: roleId, RoleName: roleName,
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Security/CheckDuplicateRole",
            data: jsonData,
            dataType: "",
            beforeSend: function () { },
            success: function (data) {
                //Append Data to grid
                if (data != 'False') {
                    ShowMessage("Role already exist!", "Alert", "info", true);
                }
                else {
                    AddRole();
                    return true;
                }
            },
            error: function (msg) {

            }
        });
    }
    return false;
}

function ClearForm() {
    $("#facilityRoleFormDiv").clearForm();
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
    $("#hdRoleId").val('0');
    $("#hdFacilityRoleId").val('0');
    $('#buttonUpdate').val('Save');
    $('#btnSaveAndUpdate').val('Save And Return');
}

function ClearFields() {
    ClearForm();
    $.validationEngine.closePrompt(".formError", true);
    var jsonData = JSON.stringify({
        Id: 0,
    });
    $.ajax({
        type: "POST",
        url: '/Security/ResetFacilityRoleForm',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#facilityRoleFormDiv').empty();
                $('#facilityRoleFormDiv').html(data);
                $('#collapseTwo').addClass('in');
                jscalls();
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

function checkDuplicateRole(id) {
    if ($("#facilityRoleFormDiv").validationEngine({ returnIsValid: true }) == false) {
        return false;
    }
    var model = {
        Id: id,
        UserId: $("#txtRoleName").val(),
    }
    $.ajax({
        type: "POST",
        url: '/Security/CheckDuplicateRole',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(model),
        success: function (data) {

            if (data) {
                $("#spUserId").text("User Name already exist.");
            }
            else {
                $("#spUserId").text("");
            }
        },
        error: function (msg) {
        }
    });
}

function BindFacilitiesByCorporateId(corporateId, selector, selectedId) {
    var jsonData = JSON.stringify({
        corpId: corporateId
    });

    //Bind Facilities
    $.ajax({
        type: "POST",
        url: "/Security/GetFacilityListByCorporateId",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $(selector).empty();

            var items = '<option value="0">--Select--</option>';

            $.each(data, function (i, facility) {
                items += "<option value='" + facility.Value + "'>" + facility.Text + "</option>";
            });
            $(selector).html(items);

            if (selectedId != null && selectedId != '')
                $(selector).val(selectedId);
        },
        error: function (msg) {
        }
    });
}

function CheckIfFacilityRoleAssigned(facilityRoleId, roleId) {
    var jsonData = JSON.stringify({
        roleId: roleId,
        facilityRoleId: facilityRoleId
    });
    //Bind Facilities
    $.ajax({
        type: "POST",
        url: "/Security/CheckIfFacilityRoleAssigned",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                if (!data) {
                    return true;
                }
                else {
                    ShowMessage("Role already assigned to other facility", "Alert", "warning", true);
                    $("#ddlRoles").focus();
                    return false;
                }
            }
        },
        error: function (msg) {
        }
    });
    return false;
}

function CheckIfFacilityRoleExists(facilityRoleId, facilityId, roleId, corporateId, isActive, rolename, schedulingApplied, carePlanAccessible) {
    var jsonData = JSON.stringify({
        corpId: corporateId,
        facilityId: facilityId,
        roleId: roleId,
        facilityRoleId: facilityRoleId,
        schedulingApplied: schedulingApplied,
        CarePlanAccessible: carePlanAccessible,
});

    //Bind Facilities
    $.ajax({
        type: "POST",
        url: "/Security/CheckIfFacilityRoleExists",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data == "-1") {
                ShowMessage("This role already assing to Physician, So you can't make it scheduling not applied..!!!", "Alert", "warning", true);
                return false;
            }
            if (!data) {
                SaveFacilityRole(facilityRoleId, facilityId, roleId, corporateId, isActive, rolename, schedulingApplied, carePlanAccessible);
            }
            else {
                ShowMessage("Records already exists", "Alert", "warning", true);
                $("#ddlRoles").focus();
            }
        },
        error: function (msg) {
        }
    });
    return false;
}

function SaveFacilityRole(facilityRoleId, facilityId, roleId, cId, isActive, rolename, schedulingApplied, carePlanAccessible) {
    var jsonData = JSON.stringify({
        FacilityRoleId: facilityRoleId,
        FacilityId: facilityId,
        RoleId: roleId,
        CorporateId: cId,
        IsActive: isActive,
        IsDeleted: false,
        RoleName: rolename,
        SchedulingApplied: schedulingApplied,
        CarePlanAccessible:carePlanAccessible,
        AddToAll: $("#AddToAll")[0].checked
    });
    var msg = "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Security/AddUpdateFacilityRoleCustomModel",
        data: jsonData,
        dataType: "json",
        beforeSend: function () { },
        success: function (data) {
            if (data != null) {
                if (data == 0) {
                    ShowMessage('Role Name already exist!', "Alert", "warning", true);
                } else {
                    if (facilityRoleId > 0) {
                        msg = "Record updated successfully.";

                    } else
                        msg = "Record saved successfully";
                    ShowMessage(msg, "Success", "success", true);
                    //BindFacilityRoleCustomList();
                    BindFacilityRoleByfacility();
                    //OnChangeCorporatesDropdown('');
                    //OnChangeFacilityDropdown('');

                    $("#SchedulingApplied").prop('checked', false);
                    $("#CarePlanAccessible").prop('checked', false);
                    

                    var corporateId = $("#hdCorporateId").val();
                    $('#btnSaveAndUpdate').val('Save And Return');


                    //Bind Facilities
                    var selectedFacilityId = $("#hdFacilityId").val();
                    BindFacilitiesByCorporateId(corporateId, "#ddlFacilities", selectedFacilityId);

                    if ($('#hdIsRefresh').val() == '') {
                        var hdcorporateid = $("#ddlCorporates").val();
                        var hdfacilityid = $("#ddlFacilities").val();
                        ClearFields();
                        $("#hdCorporateId").val(hdcorporateid);
                        $('#hdFacilityId').val(hdfacilityid);
                        $("#hdFacilityRoleId").val('0');
                        //OnChangeCorporatesDropdown('');
                        //OnChangeFacilityDropdown('');
                        $('.updateView').hide();
                    }
                    else {
                        $("#hdCorporateId").val($("#ddlCorporates").val());
                        $('#ddlRoles').val('0');
                        $('#txtRoleName').val('');
                        $('#collapseTwo').addClass('in');
                        $("#hdRoleId").val('0');
                        $("#hdFacilityRoleId").val('0');
                        $('#buttonUpdate').val('Save');
                        $('.updateView').show();
                        BindFacilityRoleByfacility();
                    }
                    $('#collapseTwo').addClass('in');
                   jscalls();
                }
            }
        },
        error: function (response) {
        }
    });
}

//Custom Method to bind cascading data for grid
function BindFacilityRoleCustomList() {

    var facilityId = $("#ddlFacilities").val() == null ? 0 : $("#ddlFacilities").val();
    var roleId = $("#ddlRoles").val() == null ? 0 : $("#ddlRoles").val();
    var corporateId = $("#ddlCorporates").val();
    if (corporateId == 0 || corporateId == null) {
        corporateId = $("#hdCorporateId").val() != "0" ? $("#hdCorporateId").val() : corporateId;
    }
    var jsonData = JSON.stringify({
        corpId: corporateId,
        facilityId: facilityId,
        roleId: roleId
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Security/GetFacilityRolesCustomList1",
        data: jsonData,
        dataType: "html",
        success: function (data) {
            $("#facilityRoleList").empty();
            $("#facilityRoleList").html(data);
            //SetGridPaging('GetFacilityRolesCustomList', 'FacilityRole');
            SetGridPaging('?', '?corpId=' + corporateId + '&facilityId=' + facilityId + '&roleId=' + roleId + '&');
        },
        error: function (msg) {

        }
    });
}


//function EditFacilityRole(facilityRoleId) {
//    var jsonData = JSON.stringify({
//        facilityRoleId: facilityRoleId
//    });

//    $.ajax({
//        type: "POST",
//        url: '/Security/GetFacilityRole',
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        data: jsonData,
//        success: function (data) {
//            if (data != null) {
//                BindFacilityRole(data);
//               }
//        },
//        error: function (msg) {
//        }
//    });
//}


//function BindFacilityRole(data) {
//    
//    $("#ddlCorporates").val(data.CorporateId);
//    $("#ddlFacilities").val(data.FacilityId);
//    $("#ddlRoles").val(data.FacilityRoleId);
//    $('#SchedulingApplied').prop('checked', data.SchedulingApplied);
//   $('input:radio[name=RoleSelect]').attr("disabled", "disabled");
//    $('#collapseOne').addClass('in');
//}


//function BindFacilityRoleByfacility() {
//    var facilityId = $("#ddlFacilities").val() == null ? 0 : $("#ddlFacilities").val();
//    var roleId = $("#ddlRoles").val() == null ? 0 : $("#ddlRoles").val();
//    var corporateId = $("#ddlCorporates").val();
//    if (corporateId == 0 || corporateId == null) {
//        corporateId = $("#hdCorporateId").val() != "0" ? $("#hdCorporateId").val() : corporateId;
//    }
//    var jsonData = JSON.stringify({
//        corpId: corporateId,
//        facilityId: facilityId,
//        roleId: roleId
//    });
//    $.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: "/Security/GetFacilityRolesCustomList",
//        data: jsonData,
//        dataType: "html",
//        success: function (data) {
//            $("#facilityRoleList").empty();
//            $("#facilityRoleList").html(data);
//            //SetGridPaging('GetFacilityRolesCustomList', 'FacilityRole');
//            //SetGridPaging('?', '?corpId=' + corporateId + '&facilityId=' + facilityId + '&roleId=' + roleId + '&');
//        },
//        error: function (msg) {

//        }
//    });
//}


function BindFacilityRoleByfacility() {
    $("#chkActive").prop("checked", false);
    var active = $("#chkShowInActive")[0].checked;
    var isActive = active == true ? false : true;
    var facilityId = $("#ddlFacilities").val() == null ? 0 : $("#ddlFacilities").val();
    var roleId = $("#ddlRoles").val() == null ? 0 : $("#ddlRoles").val();
    var corporateId = $("#ddlCorporates").val();
    if (corporateId == 0 || corporateId == null) {
        corporateId = $("#hdCorporateId").val() != "0" ? $("#hdCorporateId").val() : corporateId;
    }
    var jsonData = JSON.stringify({
        showInActive:isActive,
        facilityId: facilityId,
        corporateId: corporateId,

    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Security/GetActiveInActiveFacilityRoleList",
        data: jsonData,
        dataType: "html",
        success: function (data) {
            $("#facilityRoleList").empty();
            $("#facilityRoleList").html(data);
            //SetGridPaging('GetFacilityRolesCustomList', 'FacilityRole');
            //SetGridPaging('?', '?corpId=' + corporateId + '&facilityId=' + facilityId + '&roleId=' + roleId + '&');
        },
        error: function (msg) {

        }
    });
}

function ShowActiveInActiveFacilityRole(chkSelector) {
    $("#chkActive").prop("checked", false);
    var active = $(chkSelector)[0].checked;
    var isActive = active == true ? false : true;
    var facilityId = $("#ddlFacilities").val() == null ? 0 : $("#ddlFacilities").val();
    var corporateId = $("#ddlCorporates").val();
    if (corporateId == 0 || corporateId == null) {
        corporateId = $("#hdCorporateId").val() != "0" ? $("#hdCorporateId").val() : corporateId;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/Security/GetActiveInActiveFacilityRoleList',
        data: JSON.stringify({
            showInActive: isActive,
            facilityId: facilityId,
            corporateId: corporateId
            
            }),
        dataType: "html",
        success: function (data) {
            if (data != null) {
                $('#collapseTwo').addClass('in').attr('style', 'height:auto;');
                $("#facilityRoleList").empty();
                $("#facilityRoleList").html(data);
            }
        },
        error: function (msg) {

        }
    });
}



function SortFacilityRoleGrid(event) {
    var activeInActive = $("#chkShowInActive").is(':checked');
    var facilityId = $("#ddlFacilities").val() == null ? 0 : $("#ddlFacilities").val();
    var corporateId = $("#ddlCorporates").val();
    if (corporateId == 0 || corporateId == null) {
        corporateId = $("#hdCorporateId").val() != "0" ? $("#hdCorporateId").val() : corporateId;
    }
    if (activeInActive) {
        activeInActive = false;
    } else {
        activeInActive = true;
    }
    var url = "";
    url = "/Security/GetActiveInActiveFacilityRoleList";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?showInActive=" + activeInActive + "&facilityId=" + facilityId + "&corporateId=" + corporateId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#facilityRoleList").empty();
            $("#facilityRoleList").html(data);
        },
        error: function (msg) {
        }
    });
}