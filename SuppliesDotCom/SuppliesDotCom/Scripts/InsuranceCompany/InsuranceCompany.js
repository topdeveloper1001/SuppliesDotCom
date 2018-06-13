$(function () {
    JsCalls();
});

function JsCalls() {
    GetCountryCodesInInsurance();
    $("#InsuranceCompanyFormDiv").validationEngine();
    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });
    $(".PhoneMask").mask("999-9999999");
}

//function to validate insurance company name and insurance company License number
function ValidateInsuranceCompanyNameInsuranceCompanyLicenseNumber(id) {

    var isValid = jQuery("#InsuranceCompanyFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtInsuranceCompanyName = $("#txtInsuranceCompanyName").val();
        var txtInsuranceCompanyLicenseNumber = $("#txtInsuranceCompanyLicenseNumber").val();
        var jsonData = JSON.stringify({
            insuranceCompanyName: txtInsuranceCompanyName,
            insuranceCompanyLicenseNumber: txtInsuranceCompanyLicenseNumber,
            id: id
        });
        $.ajax({
            type: "POST",
            url: '/Insurance/ValidateInsuranceCompanyNameInsuranceCompanyLicenseNumber',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data == 1) {//1 means Insurance Company Name and Insurance Company License Number matched
                    ShowMessage('Insurance Company Name and Insurance Company License Number is already used. Please change!', "Alert", "warning", true);
                }
                else if (data == 2)//2 means Insurance Company Name  matched
                {
                    ShowMessage('Insurance Company Name is already used. Please change!', "Alert", "warning", true);
                }
                else if (data == 3) {//3 means Insurance Company License Number matched
                    ShowMessage('Insurance Company License Number is already used. Please change!', "Alert", "warning", true);
                }
                else {
                    SaveInsuranceCompany(id);
                }
            },
            error: function (msg) {
            }
        });
    }
}

function SaveInsuranceCompany(id) {
    var isValid = jQuery("#InsuranceCompanyFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtInsuranceCompanyFax = $("#txtInsuranceCompanyFax").val();
        var txtInsuranceCompanyMainPhone = $("#txtInsuranceCompanyMainPhone").val();
        var txtInsuranceCompanySecondPhone = $("#txtInsuranceCompanySecondPhone").val();
        var txtInsuranceCompanyMainContactPhone = $("#txtInsuranceCompanyMainContactPhone").val();
        var txtInsuranceCompanyClaimsContactPhone = $("#txtInsuranceCompanyClaimsContactPhone").val();
        var txtInsuranceCompanyAuthorizationPhone = $("#txtInsuranceCompanyAuthorizationPhone").val();
        var txtInsuranceCompanyDenialsPhone = $("#txtInsuranceCompanyDenialsPhone").val();

        if (txtInsuranceCompanyFax != '') {
            var countryCodeFax = $('#lblCompanyFaxCode').text();
            txtInsuranceCompanyFax = countryCodeFax + "-" + txtInsuranceCompanyFax;
        }
        if (txtInsuranceCompanyMainPhone != '') {
            var mainPhoneCode = $('#lblInsuranceCompanyMainPhone').text();
            txtInsuranceCompanyMainPhone = mainPhoneCode + "-" + txtInsuranceCompanyMainPhone;
        }
        if (txtInsuranceCompanySecondPhone != '') {
            var secondPhoneCode = $('#lblInsuranceCompanySecondPhone').text();
            txtInsuranceCompanySecondPhone = secondPhoneCode + "-" + txtInsuranceCompanySecondPhone;
        }
        if (txtInsuranceCompanyMainContactPhone != '') {
            var mainContactPhoneCode = $('#lblMainContactPhoneCode').text();
            txtInsuranceCompanyMainContactPhone = mainContactPhoneCode + "-" + txtInsuranceCompanyMainContactPhone;
        }
        if (txtInsuranceCompanyClaimsContactPhone != '') {
            var ddlClaimsContactPhoneCode = $('#lblCompanyClaimsContactPhone').text();
            txtInsuranceCompanyClaimsContactPhone = ddlClaimsContactPhoneCode + "-" + txtInsuranceCompanyClaimsContactPhone;
        }
        if (txtInsuranceCompanyAuthorizationPhone != '') {
            var ddlAuthorizationPhoneCode = $('#lblAuthorizationPhoneCode').text();
            txtInsuranceCompanyAuthorizationPhone = ddlAuthorizationPhoneCode + "-" + txtInsuranceCompanyAuthorizationPhone;
        }
        if (txtInsuranceCompanyDenialsPhone != '') {
            var ddlDenialsPhoneCode = $('#lblInsuranceCompanyDenialsPhone').text();
            txtInsuranceCompanyDenialsPhone = ddlDenialsPhoneCode + "-" + txtInsuranceCompanyDenialsPhone;
        }


        var txtInsuranceCompanyName = $("#txtInsuranceCompanyName").val();
        var txtInsuranceCompanyStreetAddress = $("#txtInsuranceCompanyStreetAddress").val();
        var txtInsuranceCompanyStreetAddress2 = $("#txtInsuranceCompanyStreetAddress2").val();
        var txtInsuranceCompanyCity = $("#txtInsuranceCompanyCity").val();
        var txtInsuranceCompanyState = $("#txtInsuranceCompanyState").val();
        var txtInsuranceCompanyCountry = $("#ddlInsuranceCompanyCountry").val();
        var txtInsuranceCompanyZipCode = $("#txtInsuranceCompanyZipCode").val();
        var txtInsuranceCompanyPoBox = $("#txtInsuranceCompanyPOBox").val();
        var txtInsuranceCompanyLicenseNumber = $("#txtInsuranceCompanyLicenseNumber").val();
        var dtInsuranceCompanyLicenseNumberExpire = $("#dtInsuranceCompanyLicenseNumberExpire").val();
        var txtInsuranceCompanyTypeLicense = $("#txtInsuranceCompanyTypeLicense").val();
        var txtInsuranceCompanyRelated = $("#txtInsuranceCompanyRelated").val();
        var txtInsuranceCompanyMainContact = $("#txtInsuranceCompanyMainContact").val();
        var txtInsuranceCompanyClaimsContact = $("#txtInsuranceCompanyClaimsContact").val();
        var txtInsuranceCompanyAuthorizationContact = $("#txtInsuranceCompanyAuthorizationContact").val();
        var txtInsuranceCompanyDenialsContact = $("#txtInsuranceCompanyDenialsContact").val();
        var txtInsuranceCompanyEmailAddress = $("#txtInsuranceCompanyEmailAddress").val();
        var txtInsuranceCompanyPayerId = $("#txtInsuranceCompanyPayerID").val();
        var txtInsuranceCompanyTableNumber = $("#txtInsuranceCompanyTableNumber").val();
        var txtInsuranceCompanyTableName = $("#txtInsuranceCompanyTableName").val();

        var jsonData = JSON.stringify({
            InsuranceCompanyId: id,
            InsuranceCompanyName: txtInsuranceCompanyName,
            InsuranceCompanyStreetAddress: txtInsuranceCompanyStreetAddress,
            InsuranceCompanyStreetAddress2: txtInsuranceCompanyStreetAddress2,
            InsuranceCompanyCity: txtInsuranceCompanyCity,
            InsuranceCompanyState: txtInsuranceCompanyState,
            InsuranceCompanyCountry: txtInsuranceCompanyCountry,
            InsuranceCompanyZipCode: txtInsuranceCompanyZipCode,
            InsuranceCompanyMainPhone: txtInsuranceCompanyMainPhone,
            InsuranceCompanyFax: txtInsuranceCompanyFax,
            InsuranceCompanySecondPhone: txtInsuranceCompanySecondPhone,
            InsuranceCompanyPOBox: txtInsuranceCompanyPoBox,
            InsuranceCompanyLicenseNumber: txtInsuranceCompanyLicenseNumber,
            InsuranceCompanyLicenseNumberExpire: dtInsuranceCompanyLicenseNumberExpire,
            InsuranceCompanyTypeLicense: txtInsuranceCompanyTypeLicense,
            InsuranceCompanyRelated: txtInsuranceCompanyRelated,
            InsuranceCompanyMainContact: txtInsuranceCompanyMainContact,
            InsuranceCompanyMainContactPhone: txtInsuranceCompanyMainContactPhone,
            InsuranceCompanyClaimsContact: txtInsuranceCompanyClaimsContact,
            InsuranceCompanyClaimsContactPhone: txtInsuranceCompanyClaimsContactPhone,
            InsuranceCompanyAuthorizationContact: txtInsuranceCompanyAuthorizationContact,
            InsuranceCompanyAuthorizationPhone: txtInsuranceCompanyAuthorizationPhone,
            InsuranceCompanyDenialsContact: txtInsuranceCompanyDenialsContact,
            InsuranceCompanyDenialsPhone: txtInsuranceCompanyDenialsPhone,
            InsuranceCompanyEmailAddress: txtInsuranceCompanyEmailAddress,
            InsuranceCompanyPayerID: txtInsuranceCompanyPayerId,
            InsuranceCompanyTableNumber: txtInsuranceCompanyTableNumber,
            InsuranceCompanyTableName: txtInsuranceCompanyTableName,
            IsDeleted: 0,
            IsActive: $("#chkIsActive")[0].checked,
            TPAId: $("#TPAId").val()
        });
        $.ajax({
            type: "POST",
            url: '/Insurance/SaveInsuranceCompany',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                ClearAll();
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

function editDetails(e) {

    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.InsuranceCompanyId;
    EditInsuranceCompany(id);

}

function deleteDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.InsuranceCompanyId;
    DeleteInsuranceCompany(id);
}

function EditInsuranceCompany(id) {

    $.validationEngine.closePrompt(".formError", true);
    var jsonData = JSON.stringify({
        id: id
    });
    $.ajax({
        type: "POST",
        url: '/Insurance/GetInsuranceCompany',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#InsuranceCompanyFormDiv').empty();
                $('#InsuranceCompanyFormDiv').html(data);
                $('#collapseOne').addClass('in').attr('style', 'height:auto');
                JsCalls();
                InitializeDateTimePicker();//initialize the datepicker by ashwani
                SetValuesInEdit();
                $(".PhoneMask").mask("999-9999999");
            }
            else {
            }
        },
        error: function (msg) {

        }
    });
}

function ViewInsuranceCompany(id) {

    var txtServiceCodeId = id;
    var jsonData = JSON.stringify({
        Id: txtServiceCodeId,
        ViewOnly: 'true'
    });
    $.ajax({
        type: "POST",
        url: '/ServiceCode/GetServiceCode',
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

function DeleteInsuranceCompany() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            id: $("#hfGlobalConfirmId").val()
        });

        $.ajax({
            type: "POST",
            url: '/Insurance/DeleteInsuranceCompany',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data == "-1") {
                    ShowMessage("Cannot Continue since this Company contains Insurance Plans or Policies !! ", "Warning", "warning", true);
                    return false;
                }
                if (data == "0") {
                    ShowMessage("Records Can't be Deleted, Already in Use for Patient", "Info", "info", true);
                }
                else {
                    if (data != null) {
                        BindInsuranceCompanyGrid();
                        ShowMessage("Records Deleted Successfully", "Success", "success", true);
                    }
                }
            },
            error: function (msg) {
            }
        });
    }
}

function BindInsuranceCompanyGrid() {
    var active = $("#chkShowInActive").is(':checked');
    var isActive = active == true ? false : true;
    var jsonData = JSON.stringify({
        showIsActive: isActive
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Insurance/BindInsuranceCompanyList",
        dataType: "html",
        async: true,
        data: jsonData,
        success: function (data) {

            $("#InsuranceCompanyListDiv").empty();
            $("#InsuranceCompanyListDiv").html(data);
        },
        error: function (msg) {

        }

    });
}

function ClearAll() {
    $("#InsuranceCompanyFormDiv").clearForm();
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
    $.validationEngine.closePrompt(".formError", true);
    var jsonData = JSON.stringify({
        Id: 0,
    });
    $.ajax({
        type: "POST",
        url: '/Insurance/ResetInsuranceCompanyForm',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                $('#InsuranceCompanyFormDiv').empty();
                $('#InsuranceCompanyFormDiv').html(data);
                $('#collapseTwo').addClass('in');
                BindInsuranceCompanyGrid();
                JsCalls();
                InitializeDateTimePicker(); //initialize the datepicker by ashwani
                $(".PhoneMask").mask("999-9999999");
            }
        },
        error: function (msg) {


            return true;
        }
    });

}

function AddValidation(txtId, dropdownId) {
    $.validationEngine.closePrompt(".formError", true);
    var txtValue = $("#" + txtId).val();
    $("#" + dropdownId).removeClass('validate[required]');

    if (txtValue != '') {
        $("#" + dropdownId).addClass('validate[required]');
    }
    $("#InsuranceCompanyFormDiv").validationEngine();
}

function SetValuesInEdit() {
    FormatMaskedPhone("#lblCompanyClaimsContactPhone", "#ddlClaimsContactPhoneCode", "#txtInsuranceCompanyClaimsContactPhone");
    FormatMaskedPhone("#lblInsuranceCompanyDenialsPhone", "#ddlDenialsPhoneCode", "#txtInsuranceCompanyDenialsPhone");
    FormatMaskedPhone("#lblInsuranceCompanyMainPhone", "#ddlMainPhoneCode", "#txtInsuranceCompanyMainPhone");
    FormatMaskedPhone("#lblInsuranceCompanySecondPhone", "#ddlSecondPhoneCode", "#txtInsuranceCompanySecondPhone");
    FormatMaskedPhone("#lblMainContactPhoneCode", "#ddlMainContactPhoneCode", "#txtInsuranceCompanyMainContactPhone");
    FormatMaskedPhone("#lblAuthorizationPhoneCode", "#ddlAuthorizationPhoneCode", "#txtInsuranceCompanyAuthorizationPhone");
    FormatMaskedPhone("#lblCompanyFaxCode", "#ddlCompanyFaxCode", "#txtInsuranceCompanyFax");
}

function OnCountrySelection(lblSelector, dropdownSelector) {
    //var ddlValue = $(dropdownSelector).val();
    var ddlValue = $('option:selected', dropdownSelector).attr('countryCode');
    if (ddlValue != '') {
        $(lblSelector).text("+" + ddlValue);
    }
}


function GetCountryCodesInInsurance() {
    $.ajax({
        type: "POST",
        url: "/Insurance/BindCountriesWithCode",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindCountryCodeData("#ddlClaimsContactPhoneCode", "#hdClaimsContactPhoneCode", '#lblCompanyClaimsContactPhone', data);
            BindCountryCodeData("#ddlDenialsPhoneCode", "#hdDenialsPhoneCode", '#lblInsuranceCompanyDenialsPhone', data);
            BindCountryCodeData("#ddlMainPhoneCode", "#hdMainPhoneCode", "#lblInsuranceCompanyMainPhone", data);
            BindCountryCodeData("#ddlSecondPhoneCode", "#hdSecondPhoneCode", "#lblInsuranceCompanySecondPhone", data);
            BindCountryCodeData("#ddlMainContactPhoneCode", "#hdMainContactPhoneCode", "#lblMainContactPhoneCode", data);
            BindCountryCodeData("#ddlAuthorizationPhoneCode", "#hdAuthorizationPhoneCode", "#lblAuthorizationPhoneCode", data);
            BindCountryCodeData("#ddlCompanyFaxCode", "#hdCompanyFaxCode", "#lblCompanyFaxCode", data);
            BindCountryCodeData("#ddlInsuranceCompanyCountry", "#InsuranceCompanyCountry", '', data);
        },
        error: function (msg) {
        }
    });
}


function BindInsuranceCompanyDropdown(data, selector, hiddenFieldSelector, lblSelector) {
    var items = '<option value="0">--Select--</option>';
    $.each(data, function (i, country) {
        items += "<option value='" + country.CodeValue + "'>" + country.CountryName + "</option>";
    });
    $(selector).html(items);

    if ($(hiddenFieldSelector) != null && $(hiddenFieldSelector).val() != '' && $(hiddenFieldSelector).val() != 0 && $(hiddenFieldSelector).length > 0)
        $(selector).val($(hiddenFieldSelector).val());
    else {
        $(selector).val(CountryCode.UnitedArabAmiratesNumber);
    }

    if (lblSelector != '')
        OnCountryDropdownChange(lblSelector, selector);
}

function BindCountryDataWithStates(ddlSelector, hdSelector, data) {
    $(ddlSelector).empty();

    var items = '<option value="0">--Select--</option>';
    $.each(data, function (i, country) {
        items += "<option value='" + country.CountryID + "'>" + country.CountryName + "</option>";
    });
    $(ddlSelector).html(items);

    var selectedValue = $(hdSelector) != null && $(hdSelector).val() != '' && $(hdSelector).val() != '0'
        ? $(hdSelector).val() : CountryCode.UnitedArabAmirates;
    $(ddlSelector).val(selectedValue);

    GetStates(selectedValue, "#ddlStates", "#hdState");
}

function SortInsuranceCompanyGrid(event) {
    var url = "/Insurance/BindInsuranceCompanyList";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?" + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#InsuranceCompanyListDiv").empty();
            $("#InsuranceCompanyListDiv").html(data);
        },
        error: function () {
        }
    });
}


function ShowInActiveRecordsOfInsuranceCompany(chkSelector) {
    var active = $(chkSelector)[0].checked;
    var isActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Insurance/BindInsuranceCompanyList",
        data: JSON.stringify({ showIsActive: isActive }),
        dataType: "html",
        success: function (data) {

            if (data != null) {
                $("#InsuranceCompanyListDiv").empty();
                $("#InsuranceCompanyListDiv").html(data);
            }
        },
        error: function (msg) {

        }
    });
}



var ExportToExcel1 = function () {
    var item = $("#btnExportExcel");
    var hrefString = item.attr("href");
    var controllerAction = hrefString;

    var searchText = $("#SearchCodeOrDesc").val();
    var hrefNew = controllerAction + "?searchText=" + searchText;
    item.removeAttr('href');
    item.attr('href', hrefNew);
    return true;
}




$('#btnExportExcel').click(function () {
    var active = $("#chkShowInActive").is(':checked');
    var isActive = active == true ? false : true;
    var item = $("#btnExportExcel");
    var hrefString = item.attr("href");
    var controllerAction = hrefString;
    var hrefNew = controllerAction + "?showInActive=" + isActive;
    item.removeAttr('href');
    item.attr('href', hrefNew);
    return true;
});

$('#btnExportPdf').click(function () {
    var active = $("#chkShowInActive").is(':checked');
    var isActive = active == true ? false : true;
    var item = $("#btnExportPdf");
    var hrefString = item.attr("href");
    var controllerAction = hrefString;
    var hrefNew = controllerAction + "?showInActive=" + isActive;
    item.removeAttr('href');
    item.attr('href', hrefNew);
    return true;
});