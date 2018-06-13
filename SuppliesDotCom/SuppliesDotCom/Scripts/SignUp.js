
$(document).ready(function () {
    $("#ddlServices").attr('disabled', true);

    $('select#ddlDivision').change(function () {
       
        var ID = $(this).val();
        if (ID!=0)
        {
            var text = $("#ddlDivision option:selected").text();
            if ($.trim( text.toLowerCase()) == 'government') {
                $("#ddlServices").removeAttr('disabled');
            }
            else {
                $("#ddlServices").attr('disabled', true);
            }
        }
        else {
            $("#ddlServices").attr('disabled', true);
        }



    });


  
    //$("#_EmailAddress").autocomplete({
    //    source: function (request, response) {
    //        $.ajax({

    //            type: "POST",
    //            url: '/Home/GetWindowsID',
    //            async: false,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            data: JSON.stringify({
    //                maxRows: "12",
    //                Email_startsWith: request.term
    //            }),
    //            success: function (data) {

    //                if (isNaN(request.term)) {

    //                    response($.map(data, function (item) {

    //                        return {
    //                            label: item._FirstName,
    //                            value: item._FirstName
    //                        }
    //                    }));
    //                }
    //                else {
    //                }
    //            },
    //            error: function (xhr, ajaxOptions, thrownError) {

    //                alert(thrownError);
    //            }
    //        });
    //    },
    //    minLength: 1,
    //    select: function (event, ui) {

    //        var _EmailID = ui.item.label;
    //        $.ajax({

    //            type: "POST",
    //            url: '/Home/CheckDuplicate',
    //            async: false,
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            data: JSON.stringify({
    //                EmailAddress: _EmailID
    //            }),
    //            success: function (data) {                    
    //                if (data == true) {
    //                }
    //            },
    //            error: function (data) {                  
    //                alert('error');
    //            }
    //        });
    //    },
    //    open: function () {
    //        $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
    //    },
    //    close: function () {
    //        $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
    //    }
    //});
    
    $("#btnOk").bind("click", function () {
        $('#_EmailAddress').focus();
    });

   


});



function clearForm() {
    //$('#_FirstName').val('');
    //$('#_LastName').val('');
    $('#_EmailAddress').val('');
    //$("select#ddlSpecialty")[0].selectedIndex = 0;
    //$("select#ddlRole")[0].selectedIndex = 0;

} 

function clearControls() {
    $('#_FirstName').val('');
    $('#_LastName').val('');
    $('#_EmailAddress').val('');   
    $("select#ddlRole")[0].selectedIndex = 0;

}

//function hideDiv() {
//    document.getElementById('dialog-message').style.display = "none";
//    document.getElementById('overlay').style.display = "none";
//    window.location.href = "/Home/Index";   
//    return true;
//}

