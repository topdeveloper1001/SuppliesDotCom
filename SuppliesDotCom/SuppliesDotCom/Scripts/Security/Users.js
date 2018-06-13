$(LoadUsersData);

function LoadUsersData() {

    BindCountryDropdowns();
    $("#validate").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });
    BindCorporateDataInUserSection();
    //BindGlobalCodesWithValue("#ddlUserType", 2304, "#hdUserType");


    $("#ddlFacility option[text='it\'s me']").attr("selected", "selected");


}

function BindFacilityDropdownByCorporateId() {
    var corporateid = $('#ddlCorporate').val();
    if (corporateid == '') { corporateid = $('#hdCorporateId').val(); }
    if (corporateid == '') { corporateid = '0'; }
    var jsonData = JSON.stringify({
        corporateid: corporateid
    });
    if (corporateid > 0) {
        $.ajax({
            type: "POST",
            url: "/Home/GetFacilitiesbyCorporate",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                BindDropdownData(data, "#ddlFacility", "#hdFacilityId");

                if ($("#ddlFacility").val() > 0 && corporateid > 0) {
                    BindCorporateFacilityRoles();
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    } else {
        BindDropdownData('', "#ddlFacility", $("#hdFacilityId").val());
        $("#ddlFacility")[0].selectedIndex = 0;
    }
}

//start by krishna
function BindFacilityDropdownFilter(cId) {
    if (cId > 0) {
        $.ajax({
            type: "POST",
            url: "/Home/GetFacilitiesbyCorporate",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ corporateid: cId }),
            success: function (data) {
                BindDropdownData(data, "#ddlFacilityFilter", $("#hdFacilityId").val());

                if ($("#ddlFacilityFilter").val() == null)
                    $("#ddlFacilityFilter")[0].selectedIndex = 0;

            },
            error: function (msg) {
                console.log(msg);
            }
        });
    } else {
        BindDropdownData('', "#ddlFacilityFilter", $("#hdFacilityId").val());
        $("#ddlFacilityFilter")[0].selectedIndex = 0;
    }
}
//End


function BindCorporateFacilityRoles() {
    if ($("#hdRoleID").val() == '') {
        $("#hdRoleID").val('0');
    }
    var jsonData = JSON.stringify({
        corporateId: $('#ddlCorporate').val(),
        facilityId: $('#ddlFacility').val()
    });
    //Bind Roles
    $.ajax({
        type: "POST",
        url: "/Home/GetRolesByFacilityDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $("#ddlRoles").empty();

            var items = '<option value="0">--Select--</option>';

            $.each(data, function (i, role) {
                items += "<option value='" + role.Value + "'>" + role.Text + "</option>";
            });

            $("#ddlRoles").html(items);

            if ($("#hdRoleID") != null && $("#hdRoleID") != '')
                $("#ddlRoles").val($("#hdRoleID").val());
        },
        error: function (msg) {
            console.log(msg);
        }
    });
}

function CheckDuplicateUser() {

    var userId = $("#hfUserID").val();
    if (userId == null || userId == '')
        userId = 0;
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (isValid) {
        var username = $("#txtUN").val().trim();
        var email = $("#txtEmail").val().trim();
        var jsonData = JSON.stringify({
            Username: username,
            Email: email,
            UserID: userId
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Security/CheckDuplicateUser",
            data: jsonData,
            dataType: "",
            beforeSend: function () { },
            success: function (data) {

                if (data == "-1") {
                    ShowMessage("Email Id Already Exist", "Warning", "warning", true);
                    return false;
                }
                if (data) {
                    ShowMessage("User already exist!", "Alert", "info", true);
                    return;
                }
                AddUser();
            },
            error: function (msg) {

            }
        });
    }
    return false;
}

function BindCountryDropdowns() {
    BindCountryDataWithCountryCode("#ddlPhone", "#hdPhone", '#lblPhone');
    BindCountryDataWithCountryCode("#ddlHomePhone", "#hdHomePhone", '#lblHomePhone');
}

function AddUser() {
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }
    var corporateId = $('#ddlCorporate').val();
    var facilityId = $('#ddlFacility').val();
    var userId = $("#hfUserID").val();
    var username = $("#txtUN").val().trim();
    var password = $("#txtPassword").val().trim();
    var email = $("#txtEmail").val().trim();
    var firstName = $("#txtFN").val().trim();
    var lastname = $("#txtLN").val().trim();
    var countryId = $("#ddlCountries").val();
    var stateId = $("#ddlStates").val();
    var cityId = $("#ddlCities").val();
    var phone = $("#txtPhone").val().trim();
    var homePhone = $("#txtHomePhone").val().trim();
    var address = $("#txtAddress").val().trim();
    var isActive = $('#chkActive')[0].checked;
    var isAdmin = $('#chkAdmin')[0].checked;
    //var usertype = $('#ddlUserType').val();

    if (phone != '') {
        var lblMainPhone = $('#lblPhone').text();
        phone = lblMainPhone + "-" + phone;
    }
    if (homePhone != '') {
        var lblSecondPhone = $('#lblHomePhone').text();
        homePhone = lblSecondPhone + "-" + homePhone;
    }
    var jsonData = JSON.stringify({
        UserID: userId,
        CountryID: countryId,
        StateID: stateId,
        CityID: cityId,
        UserName: username,
        FirstName: firstName,
        LastName: lastname,
        Password: password,
        Address: address,
        Email: email,
        Phone: phone,
        HomePhone: homePhone,
        AdminUser: isAdmin,
        IsActive: isActive,
        CreatedBy: 1,
        CreatedDate: new Date(),
        IsDeleted: false,
        //UserType: usertype,
        CorporateId: corporateId,
        FacilityId: facilityId,
        roleId: $("#ddlRoles").val(),
        cId: $("#ddlCorporateFilter").val(),
        fId: $("#ddlFacilityFilter").val(),
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Security/AddUser",
        data: jsonData,
        dataType: "html",

        beforeSend: function () { },
        success: function (data) {

            ClearUserForm();
            $('#UserList').empty();
            $('#UserList').html(data);
            $('#collapseTwo').addClass('in');


            var msg = "Record Saved successfully !";
            if (userId > 0)
                msg = "Record updated successfully";
            ShowMessage(msg, "Success", "success", true);
            ReBindGrid();
        },
        error: function (response) {

        }
    });
    return false;
}

function EditUser(userId) {

    // var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var jsonData = JSON.stringify({ UserID: userId });
    $.ajax({
        type: "POST",
        url: '/Security/EditUser',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindUserDetailsInEditMode(data);
            //SetGridPaging('?', '?cId=' + $("#ddlCorporateFilter").val() + '&fId=' + $("#ddlFacilityFilter").val() + '&');
            //ReBindGrid();
            //$('#collapseOne').addClass('in');
            $('#collapseOne').addClass('in').attr('style', 'height:auto;');


        },
        error: function (msg) {
        }
    });
}

function bindRoles() {
    $.ajax({
        type: "POST",
        url: "/Security/GetRolesUsers",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, role) {
                    items += "<option value='" + role.RoleID + "'>" + role.RoleName + "</option>";
                });

                $('#ddlRoles').html(items);

            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function DeleteUser(userId) {
    if (confirm("Do you want to delete user?")) {
        $.ajax({
            type: "POST",
            url: "/Security/DeleteUser",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                userId: userId,
                cId: $("#ddlCorporateFilter").val(),
                fId: $("#ddlFacilityFilter").val(),
            }),
            success: function (data) {
                if (data != null) {
                    ShowMessage("User deleted successfully", "Alert", "info", true);
                    ClearUserForm();
                    $('#UserList').empty();
                    $('#UserList').html(data);
                    SetGridPaging('?', '?cId=' + $("#ddlCorporateFilter").val() + '&fId=' + $("#ddlFacilityFilter").val() + '&');

                    $('#collapseTwo').addClass('in');
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

function ClearUserForm() {
    var cId = $("#ddlCorporateFilter").val();
    var fId = $("#ddlFacilityFilter").val();
    $('#UserInfo').clearForm(true);
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseOne').removeClass('in');
    $('.emptyTxt').val('');
    $('.ddlempty').val('0');
    $('#btnSave').val('Save');

    $("#ddlPhone").val(CountryCode.UnitedArabAmiratesNumber);
    $("#ddlHomePhone").val(CountryCode.UnitedArabAmiratesNumber);
    $("#ddlCountries").val(CountryCode.UnitedArabAmirates);
    var countryId = $("#ddlCountries").val();
    if (countryId > 0) {
        $("#hdCountry").val(countryId);
        GetStates(countryId, "#ddlStates", "#hdState");
    }

    $("#ddlCorporateFilter").val(cId);
    $("#ddlFacilityFilter").val(fId);
}

function BindGenericType(selector, categoryIdval, hidValueSelector) {
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

function BindUserDetailsInEditMode(data) {
    $('#hdCorporateId').val(data.CurrentUser.CorporateId);
    $('#ddlCorporate').val(data.CurrentUser.CorporateId);
    $('#hdFacilityId').val(data.CurrentUser.FacilityId);
    BindFacilityDropdownByCorporateId();

    $('#txtUN').val(data.CurrentUser.UserName);
    $('#txtEmail').val(data.CurrentUser.Email);
    $('#txtPassword').val(data.CurrentUser.Password);
    $('#txtConfirmPassword').val(data.CurrentUser.Password);
    $('#chkActive').prop('checked', data.CurrentUser.IsActive);
    $('#chkAdmin').prop('checked', data.CurrentUser.AdminUser);
    $('#txtFN').val(data.CurrentUser.FirstName);
    $('#txtLN').val(data.CurrentUser.LastName);
    $('#hdRoleID').val(data.RoleId);
    $('#hdUserType').val(data.CurrentUser.UserType);
    //$('#ddlUserType').val(data.CurrentUser.UserType);
    $('#hdPhone').val(data.CurrentUser.Phone);
    $('#txtPhone').val(data.CurrentUser.Phone);
    $('#hdHomePhone').val(data.CurrentUser.HomePhone);
    $('#txtHomePhone').val(data.CurrentUser.HomePhone);
    $("#ddlCountries").val(data.CurrentUser.CountryID);
    $('#hdCountry').val(data.CurrentUser.CountryID);
    $('#hdState').val(data.CurrentUser.StateID);
    $('#hdCity').val(data.CurrentUser.CityID);
    SetCountryStateCity();

    $('#txtAddress').val(data.CurrentUser.Address);

    FormatMaskedPhone("#lblPhone", "#ddlPhone", "#txtPhone");
    FormatMaskedPhone("#lblHomePhone", "#ddlHomePhone", "#txtHomePhone");

    $("#ddlPhone").val(data.CurrentUser.CountryID);
    $("#ddlHomePhone").val(data.CurrentUser.CountryID);
    $("#validate").validationEngine();
    $('#collapseOne').addClass('in');

    $('#hfUserID').val(data.CurrentUser.UserID);
    $('#btnSave').val('Update');
    $(".PhoneMask").mask("999-9999999");
}

function BindCorporateDataInUserSection() {
    //Bind Corporates
    /// <summary>
    /// Binds the corporates.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: "/Home/GetCorporatesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, "#ddlCorporate", "");
            BindDropdownData(data, "#ddlCorporateFilter", $("#hdCorporateId").val());
            var corporaeIdFilter = $("#ddlCorporateFilter").val();
            if (corporaeIdFilter > 0) {
                BindFacilityDropdownFilter(corporaeIdFilter);
            }
        },
        error: function (msg) {
        }
    });
}

function ReBindGrid() {
    if ($("#ddlCorporateFilter").val() != null && $("#ddlCorporateFilter").val() != 0) {
        $.ajax({
            type: "POST",
            url: "/Security/RebindUsersList",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                cId: $("#ddlCorporateFilter").val() == null ? 0 : $("#ddlCorporateFilter").val(),
                fId: $("#ddlFacilityFilter").val() == null ? 0 : $("#ddlFacilityFilter").val(),
            }),
            success: function (data) {
                if (data != null) {
                    BindList("#UserList", data);
                    //SetGridPaging('?', '?cId=' + $("#ddlCorporateFilter").val() + '&fId=' + $("#ddlFacilityFilter").val() + '&');
                }
            },
            error: function (msg) {
            }
        });
    } else {
        ShowMessage("Select the Corporate First!", "Alert", "warning", true);
    }
}


function DeleteUserItem() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        $.ajax({
            type: "POST",
            url: "/Security/DeleteUser",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                userId: $("#hfGlobalConfirmId").val(),
                cId: $("#ddlCorporateFilter").val(),
                fId: $("#ddlFacilityFilter").val(),
            }),
            success: function (data) {
                if (data != null) {
                    ShowMessage("User deleted successfully", "Alert", "info", true);
                    ClearUserForm();
                    $('#UserList').empty();
                    $('#UserList').html(data);
                    SetGridPaging('?', '?cId=' + $("#ddlCorporateFilter").val() + '&fId=' + $("#ddlFacilityFilter").val() + '&');

                    $('#collapseTwo').addClass('in');
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


function SortUserListGrid(event) {
    var cId = $("#ddlCorporateFilter").val() == null ? 0 : $("#ddlCorporateFilter").val();
    var fId = $("#ddlFacilityFilter").val() == null ? 0 : $("#ddlFacilityFilter").val();
    var url = "";
    url = "/Security/RebindUsersList";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?cId=" + cId + "&fId=" + fId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            BindList("#UserList", data);
        },
        error: function (msg) {
        }
    });
}