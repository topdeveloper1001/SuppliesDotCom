var Util = new function () {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
      ? args[number]
      : match
            ;
        });
    };


    this.Wait = function (form) {
        var _form = form ? form : $(document.body);
        $('.wait_layer').remove();
        var w = form.outerWidth ? form.outerWidth() : form.width();
        var h = form.outerHeight ? form.outerHeight() : form.height();
        form.append('<div class="wait_layer"><div stle="margin-top:49%;"><table><tr><td><img src="/Images/loading.gif" /></td><td style="vertical-align:middle;"><span>Please wait while data is processing.....</span></td></tr></table></div></div>');
        var layer = $('.wait_layer');
        if (!form) {
            layer.css({ 'height': '100%', 'width': '100%', 'position': 'fixed', 'z-index': 2002, top: '0px', left: '0px', 'text-align': 'center' }).show();
        } else {
            form.css({ Position: 'relative' });
            layer.css({ 'height': h + 'px', 'width': w + 'px', 'position': 'absolute', 'z-index': 2002, 'background-color': '#fff', top: '2px', left: '2px', 'text-align': 'center' }).show();
        }
        layer.addClass('busy');
    };
    
   

    this.OpenDialogWindow = function (windowname, partialPageUrl, title, okFunction) {

        Util.CallService("POST", partialPageUrl, '', "application/html; charset=utf-8", "json", true,
            function(response) {
                $('#' + windowname).data("kendoWindow").html(response);
                $('#' + windowname).data("kendoWindow").center().open();
                Util.Free();
            },
            function(msg) {

                $('#divContainerForm').html(msg.responseText);
                $('#' + windowname).data("kendoWindow").center().open();
                $("#" + windowname + "_wnd_title").html(title);
                Util.Free();
            });
    };

    this.Free = function (form) {
        if (!form) {
            $(document.body).removeClass('busy');
            $('.wait_layer').remove();
            $('.busy_layer').remove();
        } else {
            form.find('.wait_layer').remove();
        }
    }; 

   
    




    this.CallService = function (type, url, data, contentType, dataType, processData, successFunction, errorFunction) {
        $.ajax({
            type: type, //GET,POST,PUT or DELETE verb
            url: url, // Location of the service
            data: data, //Data to be sent to server
            contentType: contentType, // content type sent to server
            dataType: dataType, //Expected data format from server
            processdata: processData, //True or False
            success: successFunction,
            error: function (result) {//lblMsg
                errorFunction(result);
            }  // function When Service call fails
        });
    };
    

    this.FrezGrid = function freezeheader(gridid) {

        Util.Grid_Frez(gridid);
    };

    this.SaveOrder_Change = function Order_Change(url, data, item) {
        Util.CallService("POST", url, JSON.stringify(data), "application/json; charset=utf-8", "json", true,
                      function (response) {                                                            
                         
                          if (response.item == "DeleteOrder") {                             
                              $('#dialog-message').css("display", "block");
                              $('#overlay').css("display", "block");
                              document.getElementById('mesagedata').innerHTML = "Order is Deleted successfully";

                          }
                          if (response.item == "DeleteUser") {                           
                              $('#dialog-message').css("display", "block");
                              $('#overlay').css("display", "block");
                              if (response.Ok == "Not Allowed")
                              {
                                  document.getElementById('mesagedata').innerHTML = "You can not delete this user as it has acitive orders.";
                                  
                              }
                              else {
                                  document.getElementById('mesagedata').innerHTML = "User is Deleted successfully";                                
                          }                             
                          }
                          if (response.item == "Total") {                            
                            
                              $('#TotalWeight').val(response.Ok);                        

                          }
                          if (response.item == "SaveCriteria") {
                              window.location.href = "/Home/Admin";
                          }

                          if (response.item == "CheckDuplicateOrderID") {
                              if (response.Ok==true)
                              {
                                  return false;
                                  alert("Order ID already exists, please enter different Order ID");
                                
                              }
                              
                          }
                                                  
                        
                          Util.Free();
                      },
                      function (msg) {                         
                          document.getElementById("edituserdiv").innerHTML = msg.responseText;
                          $(window).scrollTop(250);                        
                          Util.Free();
                      });
    }   
    
}

function CommonMessage(messagename) {    
    var url = '/Home/ShowMessage';
    var data = '';
    data = { message: messagename };
    var item = '';
    Util.Save_heat_Changes(url, data, item);
}

function showMessage()
{
    $('#dialog-message').css("display", "block");
    $('#overlay').css("display", "block");
    $('#btnOk').focus();
}






$(document).ready(function () {
    var check = false;
    var url = window.location.href;
    if (url.indexOf("Admin") != -1) {
        $("#admin").css('background-color', '#808080');
        $("#admin").css('color', '#FFFFFF !important');
        check = true;
    }
    if (url.indexOf("LogDetails") != -1) {
        $("#logdet").css('background-color', '#808080');
        $("#logdet").css('color', '#FFFFFF');
        check = true;
    }
    if (url.indexOf("EditUser") != -1) {
        $("#admin").css('background-color', '#808080');
        $("#admin").css('color', '#FFFFFF !important');
        check = true;
    }
    if (url.indexOf("DeleteUsers") != -1) {
        $("#admin").css('background-color', '#808080');
        $("#admin").css('color', '#FFFFFF !important');
        check = true;
    }
    if (url.indexOf("CreateOrder") != -1) {
        $("#Neworder").css('background-color', '#808080');
        $("#Neworder").css('color', '#FFFFFF');
        check = true;
    }
    if (url.indexOf("EditOrder") != -1) {
        $("#Neworder").css('background-color', '#808080');
        $("#Neworder").css('color', '#FFFFFF');
        check = true;
    }
    if (check==false)
    {
        $("#listorder").css('background-color', '#808080');
        $("#listorder").css('color', '#FFFFFF');
    }


   

});






