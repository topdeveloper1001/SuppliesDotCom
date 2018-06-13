$(function () {
    JsCalls();
});

function JsCalls() {
    $("#ModuleAccessFormDiv").validationEngine();
    var selectedId = $("#hdCorporateID").val();
    BindCorporates("#ddlCorporate", selectedId);
}

function SaveModuleAccess(id) {
    $('#loader_event').show();

    var isValid = jQuery("#ModuleAccessFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {

        //Processing.showPleaseWait();
        var ddlCorporate = $("#ddlCorporate").val();
        var ddlFacility = $("#ddlFacility").val();
        var Selected = [];



        if ($('#treeview input:checked').length == 0) {
            ShowMessage("Please select modules.", "Alert", "info", true);
            return;
        } else {
            $('#treeview :checkbox').each(function () {
                if (this.indeterminate || this.checked) {
                    this.checked = true;
                    Selected.push($(this)[0].value);
                }
            });

            //$('#treeview input:checked').each(function () {
            //    Selected.push($(this)[0].value);
            //});
        }
        var jsonData = [];
        for (var i = 0; i < Selected.length; i++) {
            jsonData[i] = {
                'CorporateID': ddlCorporate,
                'FacilityID': ddlFacility,
                'TabID': Selected[i]
            };
        };
        var jsonD = JSON.stringify(jsonData);
        $.ajax({
            type: "POST",
            url: '/ModuleAccess/SaveModuleAccess',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonD,
            success: function (data) {
                if (data > 0) {
                    $('#loader_event').hide();

                    var msg = "Records Saved successfully !";
                    if (id > 0)
                        msg = "Records updated successfully";
                    ShowMessage(msg, "Success", "success", true);
                }
            },
            error: function (msg) {

            }
        });
    }
}

function EditModuleAccess(id) {
    var txtModuleAccessId = id;
    var jsonData = JSON.stringify({
        ModuleAccessID: txtModuleAccessId
    });
    $.ajax({
        type: "POST",
        url: '/ModuleAccess/GetModuleAccess',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#ModuleAccessFormDiv').empty();
                $('#ModuleAccessFormDiv').html(data);
                $('#collapseOne').addClass('in');
                JsCalls();
            }
            else {
            }
        },
        error: function (msg) {

        }
    });
}

function ViewModuleAccess(id) {
    var jsonData = JSON.stringify({
        ModuleAccessID: id,
    });
    $.ajax({
        type: "POST",
        url: '/ModuleAccess/GetModuleAccess',
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

function DeleteModuleAccess(id) {
    if (confirm("Do you want to delete this record? ")) {
        var txtModuleAccessId = id;
        var jsonData = JSON.stringify({
            ModuleAccessID: txtModuleAccessId,
        });
        $.ajax({
            type: "POST",
            url: '/ModuleAccess/DeleteModuleAccess',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data) {
                    BindModuleAccessGrid();
                    ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
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
}

function BindModuleAccessGrid() {
    $('#loader_event').show();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/ModuleAccess/BindModuleAccessList",
        dataType: "html",
        async: false,
        // data: jsonData,
        success: function (data) {
            $('#loader_event').hide();
            $("#checkBox_ModuleAccess").empty();
            $("#checkBox_ModuleAccess").html(data);
        },
        error: function (msg) {

        }
    });
}

function BindFacilityByCoporate() {
    $('#loader_event').show();
    toggleModuleAccess();
    var coporateId = $('#ddlCorporate').val();
    var jsonData = JSON.stringify({
        Id: coporateId
    });
    BindModuleAccessGrid();
    $.ajax({
        type: "POST",
        url: '/Facility/GetCorporateFacilities',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#loader_event').hide();

                $("#ddlFacility").empty();
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, item) {
                    items += "<option value='" + item.FacilityId + "'>" + item.FacilityName + "</option>";
                });
                $("#ddlFacility").html(items);

                if ($("#hdFacilityID") != null && $("#hdFacilityID").val() > 0)
                    $(selector).val($("#hdFacilityID").val());

                GetModuleAccesByCorporateIdFacilityId();
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function GetModuleAccesByCorporateIdFacilityId() {
    toggleModuleAccess();
    var ddlCorporate = $("#ddlCorporate").val();
    var ddlFacility = $("#ddlFacility").val();
    var jsonData = JSON.stringify({ CoporateId: ddlCorporate, FacilityId: ddlFacility });
    $.ajax({
        type: "POST",
        url: '/ModuleAccess/GetModulesAccessByCorporateIDFacilityID',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (obj) {
            if (obj != null) {
                $.each(obj, function (i, tabRole) {
                    $(":checkbox[value=" + tabRole.TabID + "]").prop("checked", "true");
                });
            }
        },
        error: function (msg) {
            var ctx = msg;
        }
    });
}

function GetParentModuleAccesByCorporateIdFacilityId() {
    $('#loader_event').show();

    toggleModuleAccess();
    var ddlCorporate = $("#ddlCorporate").val();
    var jsonData = JSON.stringify({ CoporateId: ddlCorporate });
    if ($("#ddlFacility").val() == "0") {
        BindModuleAccessGrid();
        GetModuleAccesByCorporateIdFacilityId();
    } else {
        $.ajax({
            type: "POST",
            url: '/ModuleAccess/GetCorporateModulesByCorporateID',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (obj) {
                if (obj != null) {
                    $('#loader_event').hide();

                    $("#checkBox_ModuleAccess").empty();
                    $("#checkBox_ModuleAccess").html(obj);
                    GetModuleAccesByCorporateIdFacilityId();
                } else {
                }
            },
            error: function (msg) {
            }
        });
    }
}

function toggleModuleAccess() {
    //$(".second").prop("checked", $("#selectall").prop("checked"))
    $('.k-checkbox input[type=checkbox]').attr('checked', false);
}

function ClearModuleAccessAll() {
    toggleModuleAccess();
    $("#ddlCorporate").get(0).selectedIndex = 0;
    $("#ddlFacility").get(0).selectedIndex = 0;

}