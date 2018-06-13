
$(document).ready(function () {
    $("#validatePermission").validationEngine();
    $("#validate").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });

    //Bind Corporates
    var selectedId = $("#hdCorporateId").val();
    BindCorporates("#ddlCorporates", selectedId);
});
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
//Purpose: Save Role to database
function AddRole() {
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }
    var roleId = $("#hfRoleID").val();
    var corporateId = $("#ddlCorporates").val();
    var UserIdLoggedIn = $("#hfLoggedInUserID").val();
    var roleName = $("#txtRoleName").val();
    var isActive;
    if ($('#chkActive').is(':checked'))
        isActive = true;
    else
        isActive = false;
    var jsonData = JSON.stringify({
        RoleID: roleId,
        RoleName: roleName,
        IsActive: isActive,
        CreatedBy: UserIdLoggedIn,
        CreatedDate: new Date(),
        IsDeleted: false,
        CorporateId: corporateId
    });

    var msg = "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Security/AddRole",
        data: jsonData,
        dataType: "json",
        beforeSend: function () { },
        success: function (data) {
            if (data != null) {
                if (roleId > 0) {
                    msg = "Record updated successfully.";
                }
                else
                    msg = "Record is saved successfully";
                ShowMessage(msg, "Success", "success", true);
                ClearFields();
                GetRoleList();
                //$('#RoleList').empty();
                // $('#RoleList').html(data);
                $('#collapseTwo').addClass('in');
            }

        },
        error: function (msg) {

        }
    });
    return false;
}


function GetRoleList() {
    $.ajax({
        type: "POST",
        url: '/Security/GetRoles',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        //data: jsonData,
        success: function (data) {
            if (data != null) {
                $('#RoleList').empty();
                $('#RoleList').html(data);
                $('#collapseTwo').addClass('in');
            } else {
            }
        },
        error: function (msg) {
        }
    });
}

function AddUpdateRole() {


    $.ajax({
        type: "POST",
        url: '/Security/GetAddUpdateRole',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        //data: jsonData,
        success: function (data) {

            if (data != null) {
                ClearFields();
                //$('#RoleInfo').empty();
                // $('#RoleInfo').html(data);
                $('#collapseTwo').addClass('in');
            } else {
            }
        },
        error: function (msg) {
        }
    });
}

function EditRole(roleId) {

    var jsonData = JSON.stringify({ RoleID: roleId });
    $.ajax({
        type: "POST",
        url: '/Security/EditRole',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                $('#RoleInfo').empty();
                $('#RoleInfo').html(data);

                //Bind Corporates
                var selectedId = $("#hdCorporateId").val();
                BindCorporates("#ddlCorporates", selectedId);

                $('#collapseOne').addClass('in');
            } else {
            }
        },
        error: function (msg) {
        }
    });
}

function DeleteRole() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonDataId = JSON.stringify({
            Id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/Security/CheckRoleExist',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonDataId,
            success: function (data) {
                if (!data) {
                    var role_ID = RoleID;//dataItem.RoleID;
                    if (confirm("Do you want to delete selected role?")) {
                        this.click;
                        var url = '/Security/DeleteRole';
                        $.ajax({
                            type: "POST",
                            url: url,
                            async: false,
                            contentType: "application/json; charset=utf-8",
                            dataType: "html",
                            data: JSON.stringify({
                                RoleId: role_ID
                            }),
                            success: function (data) {
                                if (data != null) {
                                    ShowMessage("Role deleted successfully", "Alert", "info", true);
                                    ClearFields();
                                    $('#RoleList').empty();
                                    $('#RoleList').html(data);
                                    $('#collapseTwo').addClass('in');
                                }
                                else {
                                }
                            },
                            error: function (msg) {
                            }
                        });
                    }
                    else {
                        return false;
                    }

                }
                else {
                    ShowMessage('you cannot delete role, It is associated with user.', "Alert", "warning", true);
                    return false;
                }
            },
            error: function (msg) {
                return true;
            }
        });

    }
}

//function DeleteRole(RoleID) {
//    //  e.preventDefault();

//    // var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
//    var jsonDataId = JSON.stringify({
//        Id: RoleID
//    });
//    $.ajax({
//        type: "POST",
//        url: '/Security/CheckRoleExist',
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        data: jsonDataId,
//        success: function (data) {
//            if (!data) {
//                var role_ID = RoleID;//dataItem.RoleID;
//                if (confirm("Do you want to delete selected role?")) {
//                    this.click;
//                    var url = '/Security/DeleteRole';
//                    $.ajax({
//                        type: "POST",
//                        url: url,
//                        async: false,
//                        contentType: "application/json; charset=utf-8",
//                        dataType: "html",
//                        data: JSON.stringify({
//                            RoleId: role_ID
//                        }),
//                        success: function (data) {
//                            if (data != null) {
//                                ShowMessage("Role deleted successfully", "Alert", "info", true);
//                                ClearFields();
//                                $('#RoleList').empty();
//                                $('#RoleList').html(data);
//                                $('#collapseTwo').addClass('in');
//                            }
//                            else {
//                            }
//                        },
//                        error: function (msg) {
//                        }
//                    });
//                }
//                else {
//                    return false;
//                }

//            }
//            else {
//                ShowMessage('you cannot delete role, It is associated with user.', "Alert", "warning", true);
//                return false;
//            }
//        },
//        error: function (msg) {
//            return true;
//        }
//    });

//    return false;
//}


//method to check all toggle
function toggleChecked(status) {
    $("#checkBox_Screens_ScreenName").find("input[type=checkbox]").each(function () {
        if (!$(this).attr("disabled")) {
            $(this).attr("checked", status);
        }
    })
}

$("#checkBox_Screens_ScreenName").find("input[type=checkbox]").bind("click", function () {
    if ($(this).attr('checked')) {
        if ($("#checkBox_Screens_ScreenName").find("input[type=checkbox]:checked").length == $("#checkBox_Screens_ScreenName").find("input[type=checkbox]").length) {
            $("#CheckAll").attr("checked", true);
        }
    }
    else {
        $("#CheckAll").attr("checked", false);
    }
})
if ($("#checkBox_Screens_ScreenName").find("input[type=checkbox]:checked").length == $("#checkBox_Screens_ScreenName").find("input[type=checkbox]").length) {
    $("#CheckAll").attr("checked", true);
}


function AddPermission() {
    if ($("#validatePermission").validationEngine({ returnIsValid: true }) == false) {
        return false;
    }
    var Selected = [];
    $('#checkBox_Screens_ScreenName input:checked').each(function () {
        Selected.push($(this).attr('id'));
    });
    if (Selected == []) {
        alert('Please select role.');
        return false;
    }
    var jsonData = [];
    for (var i = 0; i < Selected.length; i++) {
        jsonData[i] = {
            'RoleID': $("#ddlRoles").val(),
            'PermissionID': Selected[i]
        };
    };
    var jsonD = JSON.stringify(jsonData);
    $.ajax({
        type: "POST",
        url: '/Security/AddRolePermission',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonD,
        success: function (data) {
            if (data != null) {
                $('#ScreenList').empty();
                $('#ScreenList').html(data);
                ShowMessage("Role Permissions saved successfully", "Success", "success", true);
            } else {
            }
        },
        error: function (msg) {
        }
    });
}
function GetPermissionByRoleID(con) {
    if (con.value == "") {
        return false;
    }
    else {
        toggleChecked(false);
        var jsonData = JSON.stringify({ RoleId: con.value });
        $.ajax({
            type: "POST",
            url: '/Security/GetPermisssionsByRoleID',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (obj) {
                // var obj = data;//JSON.parse(data);
                if (obj != null) {

                    $.each(obj, function (i, Permission) {
                        $('#' + Permission.PermissionID).prop('checked', true);
                    });

                } else {
                }
            },
            error: function (msg) {
                alert('m here');
            }
        });
    }
}
function ClearFields() {
    $("#hfRoleID").val('0');
    $('#RoleInfo').clearForm();
    $('#buttonUpdate').val('Save');
}

function checkDuplicateRole(id) {
    if ($("#AddUpdateRole").validationEngine({ returnIsValid: true }) == false) {
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

function ClearPermissionFields() {
    $('#validatePermission').clearForm();
}