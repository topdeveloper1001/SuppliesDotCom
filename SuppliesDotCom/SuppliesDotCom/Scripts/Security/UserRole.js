
$(document).ready(function () {
    $("#validateUserRole").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });

    BindCorporatesDataInUserRole("#ddlCorporate");
});

//method to check all toggle
function UserRoleToggleChecked(status) {
    $("#checkBox_UserRoles").find("input[type=checkbox]").each(function () {
        if (!$(this).attr("disabled")) {
            $(this).attr("checked", status);
        }
    });
}

$("#checkBox_UserRoles").find("input[type=checkbox]").bind("click", function () {
    if ($(this).attr('checked')) {
        if ($("#checkBox_UserRoles").find("input[type=checkbox]:checked").length == $("#checkBox_UserRoles").find("input[type=checkbox]").length) {
            $("#CheckAll").attr("checked", true);
        }
    }
    else {
        $("#CheckAll").attr("checked", false);
    }
})
if ($("#checkBox_UserRoles").find("input[type=checkbox]:checked").length == $("#checkBox_UserRoles").find("input[type=checkbox]").length) {
    $("#CheckAll").attr("checked", true);
}

function AddUserRoles() {
    
    if ($("#validateUserRole").validationEngine({ returnIsValid: true }) == false) {
        return false;
    }
    var Selected = [];
    $('#checkBox_UserRoles input:checked').each(function () {
        Selected.push($(this).attr('id'));
    });
    if (Selected.length === 0) {
        alert('Please select role.');
        return false;
    }
    var jsonData = [];
    for (var i = 0; i < Selected.length; i++) {
        jsonData[i] = {
            'UserID': $("#ddlUsers").val(),
            'RoleID': Selected[i]
        };
    };
    var jsonD = JSON.stringify(jsonData);
    $.ajax({
        type: "POST",
        url: '/Security/AddUserRole',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonD,
        success: function (data) {
            if (data >= 0) {
                ShowMessage("User Role saved successfully", "Success", "success", true);
               
                BindUsersByFacilityId();
                $('#checkBox_UserRoles').find('input[type=checkbox]:checked').removeAttr('checked');
            }
        },
        error: function (msg) {
        }
    });
}

function GetUserRoleByUserID() {

    var userId = $("#ddlUsers").val();
    var corporateId = $("#ddlCorporate").val();
    var facilityId = $("#ddlFacility").val();

    if (userId > 0 && corporateId > 0 && facilityId > 0) {
        UserRoleToggleChecked(false);
        var jsonData = JSON.stringify({ userId: userId, corporateId: corporateId, facilityId: facilityId });
        $.ajax({
            type: "POST",
            url: '/Security/GetUserRolesByUserId',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (obj) {
                if (obj != null) {
                    $.each(obj, function (i, userRole) {
                        $('#' + userRole.RoleID).prop('checked', true);
                    }); 
                }
            },
            error: function (msg) {
            }
        });
    } else {

        UserRoleToggleChecked(false);

    }
}

function ClearUserRoleForm() {
    $('#validateUserRole').clearForm();
}

function BindCorporatesDataInUserRole(selector) {
 
    //Bind Corporates
    $.ajax({
        type: "POST",
        url: "/Home/GetCorporatesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, selector, '');
            if (data.length > 0) {
                $(selector)[0].selectedIndex = 1;
                BindFacilityDropdownData();
            }
        },
        error: function (msg) {
        }
    });
}

function BindFacilityDropdownData() {
  
    var corporateid = $('#ddlCorporate').val();
    if (corporateid == '') { corporateid = $('#hdCorporateId').val(); }
    if (corporateid == '0') {
        //corporateid = '0';
        BindDropDownOnlyWithSelect('#ddlUsers');
        BindDropDownOnlyWithSelect('#ddlFacility');
        UserRoleToggleChecked(false);
    }
    var jsonData = JSON.stringify({
        corporateid: corporateid
    });
    $.ajax({
        type: "POST",
        url: "/Home/GetFacilitiesbyCorporate",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindDropdownData(data, "#ddlFacility", '');
            if (data.length > 0) {
                $("#ddlFacility")[0].selectedIndex = 1;
                OnFacilityChange();
            }
        },
        error: function (msg) {
        }
    });
}

function OnFacilityChange() {
    UserRoleToggleChecked(false);
    BindAllRolesByFacilityId();
    BindUsersByFacilityId();
}

function BindAllRolesByFacilityId() {

    var cId = $("#ddlCorporate").val();
    var fId = $("#ddlFacility").val();
    if (cId > 0 && fId > 0) {
        var jsonData = JSON.stringify({ corporateId: cId, facilityId: fId });
        $.ajax({
            type: "POST",
            url: "/Security/GetAllRolesByCorporateAndFacility",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                $("#checkBox_UserRoles").empty();
                var items = '<ul class="list-inline" id="ulRoles">';
                $.each(data, function (i, obj) {
                    //var items = '<li data-filtertext="' + obj + '"><a href="#">' + item + '</a></li>';
                    var item = '<li style="margin: 5px; float: left; width: 260px;">';
                    item += '<input type="checkbox" id="' + obj.RoleID + '" value="' + obj.RoleID + '" name="' + obj.RoleName + '" />' +
                        '&nbsp;' + obj.RoleName + '</li>';
                    items += item;
                });
                items += '</ul>';
                $("#checkBox_UserRoles").html(items);

                //Bind Users Role Data by Selected User ID
                var userId = $("#ddlUsers").val();
                if (userId > 0) {
                    GetUserRoleByUserID();
                }
            },
            error: function (msg) {
            }
        });
    } else {
        BindDropDownOnlyWithSelect('#ddlUsers');
    }
}

function BindUsersByFacilityId() {

    var facilityId = $("#ddlFacility").val();
    if (facilityId > 0) {
        var jsonData = JSON.stringify({ facilityId: facilityId });
        $.ajax({
            type: "POST",
            url: "/Home/GetUsersByFacilityId",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                BindDropdownData(data, "#ddlUsers", '');
            },
            error: function (msg) {
            }
        });
    }
}

function ClearFields() {
    $('#checkBox_UserRoles').find('input[type=checkbox]:checked').removeAttr('checked');
   $('#ddlUsers').get(0).selectedIndex = 0;
}