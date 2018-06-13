$(function () {
    $("#BillingSystemParametersFormDiv").validationEngine();
    BindNumbersDropdownData(120, "#ddlBillHoldDays");
    BindNumbersDropdownData(120, "#ddlERCloseBillsHours");
    BindNumbersDropdownData(60, "#ddlSmallBalanceWriteoffDays");
    BindCorporateDataInParametersSection();
    BindCountryDataWithCountryCode('#ddlCountry', '0');

    $("#ddlCorporate").change(function () {
        var selectedValue = $(this).val();
        $("#CorporateId").val($(this).val());
        if (selectedValue > 0) {
            BindFacilitiesDropdownDataWithFacilityNumber("#ddlFacility", "");
        } else {
            BindDropdownData("", "#ddlFacility", "");
            $("#bspForm1").clearForm();
        }
    });

    $("#ddlFacility").change(function () {
        //GetCodesByCorporateId();
        var selectedValue = $(this).val();
        $("#FacilityNumber").val($(this).val());
        GetDetailsByFacilityNumber(selectedValue);
    });

    $("#ddlBillHoldDays").change(function () {
        $("#BillHoldDays").val($(this).val());
    });

    $("#ddlSmallBalanceWriteoffDays").change(function () {
        $("#SmallBalanceWriteoffDays").val($(this).val());
    });

    $("#ddlERCloseBillsHours").change(function () {
        $("#ERCloseBillsHours").val($(this).val());
    });

    BindTableSets();
});

function BindBillingSystemParametersDetails(data) {
    $('#collapseBillingSystemParametersAddEdit').addClass('in');
    $("#Id").val(data != null ? data.Id : 0);
    $("#FacilityNumber").val(data.FacilityNumber != null ? data.FacilityNumber : $("#ddlFacility").val());
    $("#ddlBillHoldDays").val(data.BillHoldDays != null ? data.BillHoldDays : '0');
    $("#BillHoldDays").val(data != null ? data.BillHoldDays : '');
    if (data.IsActive)
        $("#IsActive")[0].checked = true;
    $("#ARGLacct").val(data != null ? data.ARGLacct : '');
    $("#MgdCareGLacct").val(data != null ? data.MgdCareGLacct : '');
    $("#BadDebtGLacct").val(data != null ? data.BadDebtGLacct : '');
    $("#SmallBalanceGLacct").val(data != null ? data.SmallBalanceGLacct : '');
    $("#SmallBalanceAmount").val(data != null ? data.SmallBalanceAmount : '');
    $("#ddlSmallBalanceWriteoffDays").val(data != null ? data.SmallBalanceWriteoffDays : '');
    $("#ExternalValue1").val(data != null ? data.ExternalValue1 : '');
    $("#OupatientCloseBillsTime").val(data != null ? data.OupatientCloseBillsTime : '');
    $("#ddlERCloseBillsHours").val(data.ERCloseBillsHours != null ? data.ERCloseBillsHours : '0');
    $("#ERCloseBillsHours").val(data != null ? data.ERCloseBillsHours : '');
    $("#EffectiveDate").val(data != null ? data.EffectiveDate : '');
    $("#EndDate").val(data != null ? data.EndDate : '');
    $("#ExternalValue2").val(data != null ? data.ExternalValue2 : '');
    $("#ddlCptTablSet").val(data.CPTTableNumber);
    $("#ddlServiceCodeTablSet").val(data.ServiceCodeTableNumber);
    $("#ddlDrgTablSet").val(data.DRGTableNumber);
    $("#ddlHcpcsTablSet").val(data.HCPCSTableNumber);
    $("#ddlDiagnosisTablSet").val(data.DiagnosisTableNumber);
    $("#ddlBillEditRuleTablSet").val(data.BillEditRuleTableNumber);
    $("#ddlDrugTablSet").val(data.DrugTableNumber);
    $("#ddlCountry").val(data.DefaultCountry);
    $("#DefaultCountry").val(data.DefaultCountry);

    $("#BillingSystemParametersFormDiv").validationEngine();
}

function GetDetailsByFacilityNumber(selectedValue) {
    if (selectedValue != null && selectedValue != '' && $("#ddlCorporate").val() > 0) {
        $.post("/BillingSystemParameters/GetBillingSystemParametersDetails", { facilityNumber: selectedValue, corporateId: $("#ddlCorporate").val() }, function (data) {
            if (data != null) {
                BindBillingSystemParametersDetails(data);
            }
        });
    }
}

function SaveBillingSystemParameters() {
    var isValid = jQuery("#BillingSystemParametersFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var formData = $("#bspForm1").serializeArray();
        formData[11].value = $("#ddlSmallBalanceWriteoffDays").val();
        if (formData != null && formData.length >= 24) {
            formData[18].value = $("#ddlCountry").val();
            formData[19].value = $("#ddlHcpcsTablSet").val();
            formData[20].value = $("#ddlDrugTablSet").val();
            formData[21].value = $("#ddlDrgTablSet").val();
            formData[22].value = $("#ddlDiagnosisTablSet").val();
            formData[23].value = $("#ddlCptTablSet").val();
            formData[24].value = $("#ddlServiceCodeTablSet").val();
            formData[25].value = $("#ddlBillEditRuleTablSet").val();
        }
        $.post("/BillingSystemParameters/SaveBillingSystemParameters", formData, function (data) {
            if (data > 0) {
                //$("#BillingSystemParametersFormDiv").clearForm(true);
                //BindDropdownData("", "#ddlFacility", "");
                //$("#bspForm1").clearForm();
                var msg = "Records Saved successfully !";
                if ($("#Id").val() > 0)
                    msg = "Records updated successfully";
                ShowMessage(msg, "Success", "success", true);
            }
        });
    }
    return false;
}

function BindCorporateDataInParametersSection() {
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
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, "#ddlCorporate", $("#CorporateId").val());
            if ($("#CorporateId").val() > 0) {
                BindFacilitiesDropdownDataWithFacilityNumber("#ddlFacility", $("#FacilityNumber").val());
            }

            //GetCodesByCorporateId();
        },
        error: function (msg) {
        }
    });
}

function BindFacilitiesDropdownDataWithFacilityNumber(ddlSelector, hdSelector) {
    $.ajax({
        type: "POST",
        url: "/Home/GetFacilitiesDropdownDataWithFacilityNumber",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ corporateId: $("#CorporateId").val() }),
        success: function (data) {
            BindDropdownData(data, ddlSelector, hdSelector);
        },
        error: function (errorResponse) {
        }
    });
}

function SetTableNumber(ddlSelector, hdSelector) {
    if ($(ddlSelector).length > 0 && $(ddlSelector).val() > 0) {
        $(hdSelector).val($(ddlSelector).val());
    }
    else { $(hdSelector).val("0"); }
}

function BindTableSets() {
    $.ajax({
        type: "POST",
        url: '/Home/GetTableNumbers',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ typeId: "" }),
        success: function (data) {
            if (data != null && data.length > 0) {
                GetFilteredData("3", data, "#ddlCptTablSet");
                GetFilteredData("4", data, "#ddlHcpcsTablSet");
                GetFilteredData("5", data, "#ddlDrugTablSet");
                GetFilteredData("8", data, "#ddlServiceCodeTablSet");
                GetFilteredData("9", data, "#ddlDrgTablSet");
                GetFilteredData("16", data, "#ddlDiagnosisTablSet");
                GetFilteredData("19", data, "#ddlBillEditRuleTablSet");
            }

            if ($("#DefaultCPTTableNumber").val() > 0) {
                $("#ddlCptTablSet").val($("#DefaultCPTTableNumber").val());
            }
            if ($("#DefaultHCPCSTableNumber").val() > 0) {
                $("#ddlHcpcsTablSet").val($("#DefaultHCPCSTableNumber").val());
            }
            if ($("#DefaultDRUGTableNumber").val() > 0) {
                $("#ddlDrugTablSet").val($("#DefaultDRUGTableNumber").val());
            }
            if ($("#DefaultServiceCodeTableNumber").val() > 0) {
                $("#ddlServiceCodeTablSet").val($("#DefaultServiceCodeTableNumber").val());
            }
            if ($("#DefaultDRGTableNumber").val() > 0) {
                $("#ddlDrgTablSet").val($("#DefaultDRGTableNumber").val());
            }
            if ($("#DefaultDiagnosisTableNumber").val() > 0) {
                $("#ddlDiagnosisTablSet").val($("#DefaultDiagnosisTableNumber").val());
            }
            if ($("#BillEditRuleTableNumber").val() > 0) {
                $("#ddlBillEditRuleTablSet").val($("#BillEditRuleTableNumber").val());
            }
        },
        error: function (msg) {

        }
    });
}

function GetFilteredData(typeId, data, selector) {
    $(selector).empty();
    var items = '<option value="-1">--Select--</option>';
    var arr = $.grep(data, function (n) {
        return (n.CodeTableType === typeId);
    });

    $.each(arr, function (i, obj) {
        var newItem = "";
        if (obj.TableNumber == "0") {
            newItem = "<option id='" + obj.TableNumber + "'  value='" + obj.TableNumber + "'>Default</option>";
        } else {
            newItem = "<option id='" + obj.TableNumber + "'  value='" + obj.TableNumber + "'>" + obj.TableNumber + "</option>";
        }
        items += newItem;
    });
    $(selector).html(items);
}

