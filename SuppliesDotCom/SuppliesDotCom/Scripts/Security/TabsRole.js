var getTreeviewData = true;
$(function () {
    $("#validateTabsRole").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });

    BindCorporatesDataInTabRole("#ddlCorporate");

    $("#checkBox_TabsRole").find("input[type=checkbox]").bind("click", function () {
        if ($(this).attr('checked')) {
            if ($("#checkBox_TabsRole").find("input[type=checkbox]:checked").length == $("#checkBox_TabsRole").find("input[type=checkbox]").length) {
                $("#CheckAll").attr("checked", true);
            }
        } else {
            $("#CheckAll").attr("checked", false);
        }
    });
});

//method to check all toggle
function toggleChecked(status) {
    $("#checkBox_TabsRole").find("input[type=checkbox]").each(function () {
        if (!$(this).attr("disabled")) {
            $(this).attr("checked", status);
        }
    });
}

function AddTabsRole() {
    if ($("#validateTabsRole").validationEngine({ returnIsValid: true }) == false) {
        return false;
    }
    var Selected = [];
    var isValid = true;

    /*
        This is done to check if users selects only one tab under 'Scheduler'
        In case, User selects multiple tabs under Scheduler, it fails and shows error message
    */
    $('#treeview input:indeterminate').each(function () {
        var text = $("#chk" + $(this)[0].value).attr('value1');
        if (text.toLowerCase() == 'scheduler') {
            isValid = $(this).closest('li').find('input:checked').length == 1;
        }
    });

    $('#treeview input:checked').each(function () {
        var id = $(this)[0].value;
        var text = $("#chk" + id).attr('value1');
        Selected.push({ "id": id, "text": text });
        $(this).closest('ul li').siblings('input:checkbox').attr('checked', true);

        if (text.toLowerCase() == 'scheduler') {
            var count = $(this).closest('ul li').siblings('input:checkbox').attr('checked');
            var aa = count;
        }
    });

    if (Selected.length == 0) {
        ShowMessage("Please select tabs.", "Alert", "info", true);
        return false;
    }

    //var SchedulerArray = $.grep(Selected, function (n) {
    //    return (n.text.toLowerCase().indexOf(' view') != -1);
    //});

    if (!isValid) {
        ShowMessage("Only one view under Scheduler can be assigned to any User Role!", "Alert", "warning", true);
        return false;
    }

    var jsonData = [];
    for (var i = 0; i < Selected.length; i++) {
        jsonData[i] = {
            'RoleID': $("#ddlRoles").val(),
            'TabID': Selected[i].id
        };
    };
    var jsonD = JSON.stringify(jsonData);
    $.ajax({
        type: "POST",
        url: '/Security/AddTabRolePermissions',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonD,
        success: function (data) {
            if (data) {
                ShowMessage("Tabs Role saved successfully", "Success", "success", true);
            }
        },
        error: function (msg) {
        }
    });
}

function GetDefaultTabs() {
    $.ajax({
        type: "POST",
        url: '/Security/GetTabsDefaultToFacility',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        //data: jsonData,
        success: function (obj) {
            if (obj != null) {
                $('#checkBox_TabsRole').empty();
                $('#checkBox_TabsRole').html(obj);
            }
        },
        error: function (msg) {
        }
    });
}

function GetTabsRoleByUserID(con) {
    ajaxStartActive = false;
    $('#loader_event').show();
    toggleChecked(false);
    if (con.value == "") {
        GetDefaultTabs();
    }
    else {
        toggleChecked(false);
        //GetTabsListByRoleID(con);
        var jsonData = JSON.stringify({ RoleId: con.value });
        $.ajax({
            type: "POST",
            url: '/Security/GetTabsPermisssionsByRoleId',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (obj) {
                $('#loader_event').hide();

                if (obj != null) {
                    $.each(obj, function (index, tabRole) {
                        $(":checkbox[value=" + tabRole.TabID + "]").prop("checked", "true");
                    });

                    var checkedNodes = [];
                    var treeView = $("#treeview").data("kendoTreeView");
                    CheckNodesInTabsRole(treeView.dataSource.view(), checkedNodes);
                    ajaxStartActive = true;
                }
            },
            error: function (msg) {

            }
        });
    }
}

function GetTabsListByRoleID(con) {
    var cId = $("#ddlCorporate").val();
    var fId = $("#ddlFacility").val();
    if (cId > 0 && fId > 0) {
        toggleChecked(false);
        if (con.value == "") {
            return false;
        }
        else {
            var jsonData = JSON.stringify({ RoleId: con.value });
            //var jsonData = JSON.stringify({ corporateId: cId, facilityId: fId, });
            $.ajax({
                type: "POST",
                url: '/Security/GetTabsAssignedToFacility',
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "html",
                data: jsonData,
                success: function (obj) {
                    if (obj != null) {
                        $('#checkBox_TabsRole').empty();
                        $('#checkBox_TabsRole').html(obj);
                    }
                },
                error: function (msg) {

                }
            });
        }
    }
}

function ClearFields() {
    var cId = $("#ddlCorporate").val();
    var fId = $("#ddlFacility").val();
    $('#validateTabsRole').clearForm();
    $("[name='checkedNodes']").prop('indeterminate', false);
    $("#ddlCorporate").val(cId);
    $("#ddlFacility").val(fId);
    getTreeviewData = true;
}

function BindCorporatesDataInTabRole(selector) {
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
                BindFacilityDropdownDataInTabRole();
            }
        },
        error: function (msg) {
        }
    });

}

function BindFacilityDropdownDataInTabRole() {
    var corporateid = $('#ddlCorporate').val();
    if (corporateid == '') { corporateid = $('#hdCorporateId').val(); }
    if (corporateid == '') { corporateid = '0'; }
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
                OnFacilityChangeInTabRole();
            }
        },
        error: function (msg) {
        }
    });
}

function OnFacilityChangeInTabRole() {
    BindAllRolesByFacilityId();
    if (getTreeviewData)
        BindModulesForFacility();
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
                //BindDropdownData(data, "#ddlRoles", '');
                var ddlSelector = "#ddlRoles";
                $(ddlSelector).empty();
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, obj) {
                    var newItem = "<option id='" + obj.RoleID + "'  value='" + obj.RoleID + "'>" + obj.RoleName + "</option>";
                    items += newItem;
                });

                $(ddlSelector).html(items);
            },
            error: function (msg) {
            }
        });
    }
}

var BindModulesForFacility = function () {
    var cId = $("#ddlCorporate").val();
    var fId = $("#ddlFacility").val();
    if (cId > 0 && fId > 0) {
        toggleChecked(false);
        var jsonData = JSON.stringify({ corporateId: cId, facilityId: fId });
        $.ajax({
            type: "POST",
            url: '/Security/GetModulesAssignedToFacility',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (obj) {
                if (obj != null) {
                    $('#checkBox_TabsRole').empty();
                    $('#checkBox_TabsRole').html(obj);
                }
            },
            error: function (msg) {

            }
        });
    }
}


function CheckNodesInTabsRole(nodes) {
    var count = 0;
    for (var i = 0; i < nodes.length; i++) {
        var currentId = nodes[i].id;
        var currentChecked = $("[name='checkedNodes'][value=" + currentId + "]").prop('checked');
        if (currentChecked) {
            var childNodes = nodes[i].children.view();
            var tChildLength = childNodes.length;
            if (tChildLength > 0) {
                for (var j = 0; j < tChildLength; j++) {
                    var childId = childNodes[j].id;
                    if ($("[name='checkedNodes'][value=" + childId + "]").prop('checked') && !$("[name='checkedNodes'][value=" + currentId + "]").prop('indeterminate'))
                        count++;
                }
                if (count > 0 && tChildLength > 0 && count != tChildLength) {
                    $("[name='checkedNodes'][value=" + currentId + "]").prop('checked', false);
                    $("[name='checkedNodes'][value=" + currentId + "]").prop('indeterminate', true);
                }

                count = 0;
                CheckNodesInTabsRole(childNodes);
            }
        }
    }
}
