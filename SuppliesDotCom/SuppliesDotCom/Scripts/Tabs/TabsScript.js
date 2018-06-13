$(LoadMenuTabData);

function LoadMenuTabData() {
    $("#TabsFormDiv").validationEngine();

    var parentId = $("#hdParentId").val();
    if (parentId == null)
        parentId = 0;

    BindParentTabDropdownData("#ddlParentTabs", parentId);
}

function SaveTabs() {
    var isValid = jQuery("#TabsFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var tabName = $("#txtTabName").val();
        var controllerName = $("#txtController").val();
        var txtAction = $("#txtAction").val();
        var txtRouteValues = $("#txtRouteValues").val();
        var txtTabOrder = $("#txtTabOrder").val();
        var txtTabImageUrl = $("#txtTabImageUrl").val();
        var parentTabId = $("#ddlParentTabs").val();
        var chkIsActive = $("#chkIsActive:checked").length;
        //var chkIsVisible = $("#chkIsVisible:checked").length;
        var jsonData = JSON.stringify({
            TabId: $("#TabId").val(),
            TabName: tabName,
            Controller: controllerName,
            Action: txtAction,
            RouteValues: txtRouteValues,
            TabOrder: txtTabOrder,
            TabImageUrl: txtTabImageUrl,
            ParentTabId: parentTabId,
            IsActive: chkIsActive,
            IsVisible: 1,
            ScreenID: 1     //Need to be checked in the Database / to be discussed with Mahesh
        });
        $.ajax({
            type: "POST",
            url: '/Tabs/SaveTabs',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                var status = data.status;
                if (status > 0) {
                    BindList("#divAllTabs", data.pView);
                    ClearMenuTabForm();
                    var msg = "Records Saved successfully !";
                    if ($("#TabId").val() > 0)
                        msg = "Records updated successfully";

                    ShowMessage(msg, "Success", "success", true);
                    return false;
                }
                else if (status == 0) {
                    ShowMessage("Error while saving TAB", "Error", "error", true);
                    return false;
                }
                else if (status == -1) {
                    ShowMessage("Record Aleady Exist!", "Warning", "warning", true);
                    return false;
                }

                //window.location.reload();
                //BindTabsGrid();
                //ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {

            }
        });
    }
}

function EditTabs(id) {
    var jsonData = JSON.stringify({
        tabId: id
    });
    $.ajax({
        type: "POST",
        url: '/Tabs/GetTabById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#TabsFormDiv').empty();
            $('#TabsFormDiv').html(data);
            $('#collapseMenuTabOne').addClass('in').attr('style', 'height:250px');
            LoadMenuTabData();
        },
        error: function (msg) {

        }
    });
}

function DeleteTabs() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            tabId: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/Tabs/DeleteTabs',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                window.location.reload();
                ShowMessage("Records Deleted Successfully", "Success", "success", true);
            },
            error: function (msg) {
            }
        });
    }
}

function ClearMenuTabForm() {
    $.validationEngine.closePrompt(".formError", true);
    $("#TabsFormDiv").clearForm(true);
    $('#collapseMenuTabOne').removeClass('in');
    $("#chkIsActive").prop('checked', true);
    $("#btnSaveTab").val("Save");
}

function BindTabsGrid() {
    var active = $("#chkShowInActive").is(':checked');
    var isActive = active == true ? false : true;

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Tabs/BindTabsList",
        dataType: "html",
        async: true,
        data: JSON.stringify({ showIsActive: isActive }),
        success: function (data) {
            $("#TabsListDiv").empty();
            $("#TabsListDiv").html(data);
        },
        error: function (msg) {
        }

    });
}

function BindParentTabDropdownData(selector, selectedId) {
    $.ajax({
        type: "POST",
        url: '/Tabs/GetParentTabs',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            $(selector).empty();

            var items = '<option value="0">--Select--</option>';

            $.each(data, function (i, tab) {
                items += "<option value='" + tab.TabId + "'>" + tab.TabName + "</option>";
            });

            $(selector).html(items);

            if (selectedId != null && selectedId != '')
                $(selector).val(selectedId);
        },
        error: function (msg) {

        }
    });
}

function CheckIfDuplicateExists(id) {
    var tabName = $("#txtTabName").val();
    var parentTabId = $("#ddlParentTabs").val();
    //var parentId = $("#hdParentId").val();
    //if (parentId == null)
    //    parentId = 0;

    var jsonData = JSON.stringify({
        name: tabName,
        tabId: id,
        parentTabId: parentTabId
    });

    $.ajax({
        type: "POST",
        url: '/Tabs/CheckIfDuplicateRecordExists',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {

            if (data) {
                ShowMessage("Records already exists!", "alert", "warning", true);
            } else {

            }
        },
        error: function (msg) {
        }
    });
    return false;
}

function OnChangeParentTab(ddlSelector) {
    var txtTabOrder = $("#txtTabOrder");
    var selectedValue = $(ddlSelector).val();
    if (selectedValue > 0) {
        $.ajax({
            type: "POST",
            url: '/Tabs/GetTabOrderByParentTabId',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ tabId: selectedValue }),
            success: function (data) {
                txtTabOrder.val(data);
            },
            error: function (msg) {
            }
        });
    }
    else {
        txtTabOrder.val(1);
    }
}


function SortTabsListGrid(event) {
    var url = "";
    url = "/Tabs/BindTabsList";
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
            $("#TabsListDiv").empty();
            $("#TabsListDiv").html(data);
        },
        error: function (msg) {
        }
    });
}



function ShowInActiveRecordsOfMenuTab(chkSelector) {
    var active = $(chkSelector)[0].checked;
    var isActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Tabs/BindTabsList",
        data: JSON.stringify({ showIsActive: isActive }),
        dataType: "html",
        success: function (data) {
            if (data != null) {
                $("#TabsListDiv").empty();
                $("#TabsListDiv").html(data);
            }
        },
        error: function (msg) {

        }
    });
}