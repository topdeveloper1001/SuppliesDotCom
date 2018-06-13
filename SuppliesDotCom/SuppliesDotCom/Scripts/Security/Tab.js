
$(document).ready(function () {
    $(".Jqvalidate").validationEngine();
    $("#validate").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });
});

//Purpose: Save user to database
function AddTab() {
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }
    var UserIdLoggedIn = $("#hfLoggedInUserID").val();
    var tabId = $("#hfTabID").val();
    var parentTabID = $("#ddltabs").val();
    var screenID = $("#ddlscreens").val();
    var tabName = $("#txtTitle").val();
    var isActive;
    if ($('#chkActive').is(':checked'))
        isActive = true;
    else
        isActive = false;    
    var jsonData = JSON.stringify({
        TabId: tabId,
        TabName: tabName,  ParentTabId: parentTabID, ScreenID: screenID,       
        IsActive: isActive, CreatedBy: UserIdLoggedIn, CreatedDate: new Date(), IsDeleted: false
    });
    var msg = "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Security/AddTab",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid          
            if (data != null) {              
                if (tabId > 0) {
                    msg = "Record updated successfully.";
                }
                else
                    msg = "Record is saved successfully";
                ShowMessage(msg, "Success", "success", true);
                ClearFields();
                $('#TabList').empty();
                $('#TabList').html(data);
                $('#collapseTwo').addClass('in');
            }
               
        },
        error: function (msg) {

        }
    });
    return false;
}


function GetTabList() {
    
    $.ajax({
        type: "POST",
        url: '/Security/GetTabs',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function (data) {          
            if (data!=null) {
               
                $('#TabList').empty();
                $('#TabList').html(data);
                $('#collapseTwo').addClass('in');
            } else {
            }
        },
        error: function (msg) {
        }
    });
}
function AddUpdateTab() {
    $.ajax({
        type: "POST",
        url: '/Security/GetAddUpdateTab',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        //data: jsonData,
        success: function (data) {
            if (data!=null) {               
                $('#TabInfo').empty();
                $('#TabInfo').html(data);
                $('#TabInfo').addClass('in');
               
            } else {
            }
        },
        error: function (msg) {
        }
    });
}
function EditTab(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var tabID = dataItem.TabId;
    var jsonData = JSON.stringify({ TabID: tabID });
    $.ajax({
        type: "POST",
        url: '/Security/EditTab',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {             
                $('#TabInfo').empty();
                $('#TabInfo').html(data);
                $('#collapseOne').addClass('in');
            } else {
            }
        },
        error: function (msg) {
        }
    });
}


//function to delete the tab
function DeleteTab(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var Tab_ID = dataItem.TabId;
    if (confirm("Do you want to delete Tab?")) {
        this.click;
        var url = '/Security/DeleteTab';
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                TabID: Tab_ID
            }),
            success: function (data) {               
                if (data != null) {                    
                    ShowMessage("Tab deleted successfully", "Alert", "info", true);
                    ClearFields();
                    $('#TabList').empty();
                    $('#TabList').html(data);
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



function ClearFields() {
    $("#hfTabID").val('0');
    $('#TabInfo').clearForm();
    $('#buttonUpdate').val('Save');
}
function checkDuplicateUser(id) {

    if ($(".Jqvalidate").validationEngine({ returnIsValid: true }) == false) {
        return false;
    }


    var model = {

        TabName: $("#TabName").val(),
    }

    $.ajax({
        type: "POST",
        url: '/Security/CheckDuplicateTab',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(model),
        success: function (data) {

            if (data) {
                alert("Tab already exist.");
            }
            else {
                $("#spUserId").text("");
            }
        },
        error: function (msg) {
        }
    });
}