

/*
    Owner: Vinoth
    On: 17092014
    Purpose: Add CSS style for Search SLider
    */
$(document).ready(function () {
    $("#validate").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });
});


//Purpose: Save user to database
function AddScreen() {
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }
    var UserIdLoggedIn = $("#hfLoggedInUserID").val();
    var screenId = $("#hfScreenID").val();
    var screenTitle = $("#txtTitle").val();
    var screenURL = $("#txtScreenURL").val();
    var tabID = $("#ddltabs").val();
    var screenGroup = $("#txtScreenGroup").val();
    var isActive;
    if ($('#chkActive').is(':checked'))
        isActive = true;
    else
        isActive = false;
    var isDefault;
    if ($('#chkDefault').is(':checked'))
        isDefault = 1;
    else
        isDefault = 0;
    var jsonData = JSON.stringify({
        ScreenId: screenId,
        ScreenTitle: screenTitle, ScreenURL: screenURL, TabID: tabID, ScreenGroup: screenGroup,       
        IsActive: isActive, DefaultPermission: isDefault, CreatedBy: UserIdLoggedIn, CreatedDate: new Date(), IsDeleted: false
    });
    var msg = "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Security/AddScreen",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                if (screenId > 0) {
                    msg = "Record updated successfully.";
                }
                else
                    msg = "Record is saved successfully";               
                ShowMessage(msg, "Success", "success", true);
                ClearFields();
                $('#ScreenList').empty();
                $('#ScreenList').html(data);
                $('#collapseTwo').addClass('in');
            }
               
        },
        error: function (msg) {

        }
    });
    return false;
}


function GetScreenList() {
    
    $.ajax({
        type: "POST",
        url: '/Security/GetScreens',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function (data) {          
            if (data!=null) {               
                $('#ScreenList').empty();
                $('#ScreenList').html(data);
                $('#collapseTwo').addClass('in');
            } else {
            }
        },
        error: function (msg) {
        }
    });
}
function AddUpdateScreen() {

   
    $.ajax({
        type: "POST",
        url: '/Security/GetAddUpdateScreen',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        //data: jsonData,
        success: function (data) {

            if (data!=null) {
               
                $('#ScreenInfo').empty();
                $('#ScreenInfo').html(data);
                $('#ScreenInfo').addClass('in');
               
            } else {
            }
        },
        error: function (msg) {
        }
    });
}
function EditScreen(e) {
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var screenID = dataItem.ScreenId;
    var jsonData = JSON.stringify({ ScreenID: screenID });
    $.ajax({
        type: "POST",
        url: '/Security/EditScreen',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {

            if (data != null) {
               
                $('#ScreenInfo').empty();
                $('#ScreenInfo').html(data);
                $('#collapseOne').addClass('in');
                
               
            } else {
            }
        },
        error: function (msg) {
        }
    });
}



function DeleteScreen(e) {
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var Screen_ID = dataItem.ScreenId;
    if (confirm("Do you want to delete Screen?")) {
        this.click;
        //var data = { userId: User_ID };
        var url = '/Security/DeleteScreen';
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                screenID: Screen_ID
            }),
            success: function (data) {               
                if (data != null) {
                    ShowMessage("Screen deleted successfully", "Alert", "info", true);
                    ClearFields();
                    $('#ScreenList').empty();
                    $('#ScreenList').html(data);
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
    $("#hfScreenID").val('0');
    $('#ScreenInfo').clearForm();
    $('#buttonUpdate').val('Save');
}
function checkDuplicateUser(id) {
    if ($("#validate").validationEngine({ returnIsValid: true }) == false) {
        return false;
    }
    var model = {
        Id: id,
        UserId: $("#UserName").val(),
    }
    $.ajax({
        type: "POST",
        url: '/Security/CheckDuplicateScreen',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(model),
        success: function (data) {
            if (data) {
                $("#spUserId").text("Screen already exist.");
            }
            else {
                $("#spUserId").text("");
            }
        },
        error: function (msg) {
        }
    });
}
