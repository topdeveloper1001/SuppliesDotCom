$(function () {
    $("#DashboardTargetsFormDiv").validationEngine();
    BindAllTargetsData();

    $("#ddlCorporate").on("change", function () {
        var sel = $(this).val();
        if (sel > 0) {
            OnChangeCorporateInTargets(sel);
            EmptyDropdown("#ddlRoles");
        } else {
            EmptyDropdown("#ddlCorporate");
        }
    });

    $("#ddlFacility").on("change", function () {
        var sel = $(this).val();
        if (sel > 0) {
            OnChangeFacilityInTargets(sel);
        } else {
            EmptyDropdown("#ddlFacility");
        }
    });
});

function SaveDashboardTargets(id) {
    var isValid = jQuery("#DashboardTargetsFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var targetId = $("#hdTargetId").val();
        var txtCorporateId = $("#ddlCorporate").val();
        var txtFacilityId = $("#ddlFacility").val();
        var txtRoleId = $("#ddlRoles").val();
        var txtTarget = $("#txtTarget").val();
        var txtTargetDescription = $("#txtTargetDescription").val();
        var unitOfMeasure = $("#ddlUnitOfMeasure").val();
        var timingIncrement = $("#ddlTimingIncrement").val();
        var isActive = $("#chkIsActive")[0].checked;

        var jsonData = JSON.stringify({
            TargetId: targetId,
            TargetDescription: txtTargetDescription,
            RoleId: txtRoleId,
            UnitOfMeasure: unitOfMeasure,
            TimingIncrement: timingIncrement,
            Target: txtTarget,
            CorporateId: txtCorporateId,
            FacilityId: txtFacilityId,
            IsActive: isActive,
        });
        $.ajax({
            type: "POST",
            url: '/DashboardTargets/SaveDashboardTargets',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                $('#collapseDashboardTargetsList').addClass('in').attr('style', 'height:auto;');

                BindList("#DashboardTargetsListDiv", data);
                ClearDashboardTargetsForm();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";
                ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }
}

function EditDashboardTargets(id) {
    var jsonData = JSON.stringify({
        id: id
    });
    $.ajax({
        type: "POST",
        url: '/DashboardTargets/GetDashboardTargetsDetails',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $('#collapseDashboardTargetsAddEdit').addClass('in').attr('style', 'height:auto;');
            BindDashboardTargetsDetails(data);
        },
        error: function (msg) {

        }
    });
}

function DeleteDashboardTargets() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/DashboardTargets/DeleteDashboardTargets',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#DashboardTargetsListDiv", data);
                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
            },
            error: function (msg) {
                return true;
            }
        });
    }
}

function ClearDashboardTargetsForm() {
    var cId = $("#ddlCorporate").val();
    var fId = $("#ddlFacility").val();
    var roleId = $("#ddlRoles").val();
    $("#DashboardTargetsFormDiv").clearForm(true);
    $('#collapseDashboardTargetsAddEdit').removeClass('in');
    $('#collapseDashboardTargetsList').addClass('in');
    $("#DashboardTargetsFormDiv").validationEngine();
    $("#chkIsActive").prop("checked", "checked");
    $("#btnSave").val("Save");
    $.validationEngine.closePrompt(".formError", true);

    $("#ddlCorporate").val(cId);
    $("#ddlFacility").val(fId);
    $("#ddlRoles").val(roleId);
}

function BindDashboardTargetsDetails(data) {
    $("#hdTargetId").val(data.TargetId);
    $("#ddlCorporate").val(data.CorporateId);
    $("#ddlFacility").val(data.FacilityId);
    $("#ddlRoles").val(data.RoleId);
    //BindFacilitiesInTargets(data.FacilityId, data.RoleId);

    $("#txtTarget").val(data.Target);
    $("#txtTargetDescription").val(data.TargetDescription);
    $("#ddlUnitOfMeasure").val(data.UnitOfMeasure);
    $("#ddlTimingIncrement").val(data.TimingIncrement);

    if (data.IsActive == true)
        $("#chkIsActive").prop("checked", "checked");

    $("#btnSave").val("Update");
    $('#collapseDashboardTargetsList').removeClass('in');
    $('#collapseDashboardTargetsAddEdit').addClass('in');
    $("#DashboardTargetsFormDiv").validationEngine();
}

function BindAllTargetsData() {
    $.getJSON("/DashboardTargets/BindAllTargetsData", {}, function (data) {
        BindDropdownData(data.cList, "#ddlCorporate", data.cId);
        BindDropdownData(data.uomList, "#ddlUnitOfMeasure", "");
        BindDropdownData(data.tList, "#ddlTimingIncrement", "");

        BindDropdownData(data.fList, "#ddlFacility", data.fId);
        BindDropdownData(data.rList, "#ddlRoles", "");
    });
}

function OnChangeCorporateInTargets(cId) {
    if (cId > 0) {
        $.ajax({
            type: "POST",
            url: "/DashboardTargets/GetCorporateData",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ cId: $("#ddlCorporate").val() }),
            success: function (data) {
                BindDropdownData(data.fList, "#ddlFacility", '');
                BindList("#DashboardTargetsListDiv", data.tList);
            },
            error: function (msg) {
            }
        });
    }
}

function OnChangeFacilityInTargets(fId) {
    if (fId > 0) {
        $.ajax({
            type: "POST",
            url: "/DashboardTargets/GetFacilityData",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ facilityId: fId }),
            success: function (data) {
                BindDropdownData(data.rList, "#ddlRoles", '');
                BindList("#DashboardTargetsListDiv", data.tList);
            },
            error: function (msg) {
            }
        });

    }
}



//*************$$$$ NOT IN USE $$$***********************
function BindTargetsGrid() {
    $.ajax({
        type: "POST",
        url: "/DashboardTargets/GetAllTargetsData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ cId: $("#ddlCorporate").val(), fId: $("#ddlFacility").val() }),
        success: function (data) {
            BindList("#", data);
        },
        error: function (msg) {
            console.log(msg);
        }
    });
}

function BindFacilitiesInTargets(facilityId, roleId) {
    var ddlSelector = "#ddlFacility";
    var corporateId = $("#ddlCorporate").val();
    if (corporateId > 0) {
        var jsonData = JSON.stringify({
            corporateid: corporateId
        });
        $.ajax({
            type: "POST",
            url: "/Home/GetFacilitiesbyCorporate",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                BindDropdownData(data, ddlSelector, '');

                if (facilityId != '') {
                    $("#ddlFacility").val(facilityId);
                    BindAllRolesByFacilityIdInTargets(roleId);
                }
            },
            error: function (msg) {
            }
        });
    }
}

function BindAllRolesByFacilityIdInTargets(roleId) {
    var cId = $("#ddlCorporate").val();
    var fId = $("#ddlFacility").val();
    var ddlSelector = "#ddlRoles";
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
                $(ddlSelector).empty();
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, obj) {
                    var newItem = "<option id='" + obj.RoleID + "'  value='" + obj.RoleID + "'>" + obj.RoleName + "</option>";
                    items += newItem;
                });
                $(ddlSelector).html(items);

                if (roleId != '')
                    $("#ddlRoles").val(roleId);
            },
            error: function (msg) {
            }
        });
    }
}


//*************$$$$ NOT IN USE $$$***********************



function SortDashboardTargetGrid(event) {
    var corporateId = $("#ddlCorporate").val();
    var facilityId = $("#ddlFacility").val();
    var url = "/DashboardTargets/SortDahboardTarget";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?corporateId=" + corporateId + "&facilityId="+facilityId+ "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            BindList("#DashboardTargetsListDiv", data);
        },
        error: function (msg) {
        }
    });
}