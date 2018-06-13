



      function hideDiv1() {
          document.getElementById('dialog-message1').style.display = "none";
          document.getElementById('overlay1').style.display = "none";
        
          return true;

      }


      function DeleteUser(UserID) {
          if (confirm("Do you want to delete user?")) {
              this.click;
              var data = { UserID: UserID };
              var url = '/Home/DeleteUser';
              var item = 'DeleteUser';
              Util.SaveOrder_Change(url, data, item);
              return true;
          }
          else {
              return false;
          }
      }

      $(function () {      
          
          $("#btnOk").bind("click", function () {
              document.getElementById('dialog-message').style.display = "none";
              document.getElementById('overlay').style.display = "none";
              return true;
          });

          $("#tabs").tabs();
          var url = window.location.href;
          $("#tabsUsers").css("height", "auto");
          $("#maincontentdiv").css("height", "auto");
          if (url.indexOf("g1p1") != -1 || url.indexOf("g1sort") != -1 || url.indexOf("EditUser") != -1 || url.indexOf("DeleteUsers") != -1) {
              $("#criteriatab").removeClass('ui-tabs-active');
              $("#usertab").addClass('ui-tabs-active');
              $("#tabsCriteria").css("display", "none");
              $("#tabsUsers").css("display", "block");
              $("#tabsUsers").css("height", "auto");
              if (url.indexOf("EditUser") != -1) {
                  $("#tabsUsers").css("height", "auto");
              }
              if (url.indexOf("g1p1") != -1 && url.indexOf("EditUser") != -1) {
                  //$(".EditUserInfo").css("display", "block");
              }
              if (url.indexOf("g1p1") != -1 && url.indexOf("EditUser") == -1) {
                  //$(".EditUserInfo").css("display", "block");
              }
              if (url.indexOf("g1sort") != -1 && url.indexOf("EditUser") != -1) {
                  //$(".EditUserInfo").css("display", "block");
              }
              $("#criteriatab").removeClass("ui-state-active");
              $("#usertab").addClass("ui-state-active");

          }


          $("#btnClearCriteriaControl").bind("click", function () {
           
              $("input[type='text']").each(function (i) {
                  if (this.name == 'TotalWeight')
                  { }
                  else
                  {
                      $(this).val("");
                  }
              });
              $("label").each(function (i) {                 
                  if (this.innerHTML == 'Enter Numeric Value') {
                      $(this).hide();
                  }
              });
          });


      $("#criteriatab").bind("click", function () {

          $("#tabsCriteria").css("border-bottom-width", "0");
          $("#tabsUsers").css("border-bottom-width", "1");
          $("#usertab").removeClass('ui-state-active');
          $("#usertab").attr('aria-selected', 'false');
          $("#usertab").attr('tabindex', '-1');
          $("#tabsUsers").css("display", "none");
          $("#criteriatab").addClass('ui-state-active');
          $("#criteriatab").addClass('ui-tabs-active');
          $("#usertab").removeClass('ui-tabs-active');
          $("#criteriatab").attr('aria-selected', 'true');
          $("#criteriatab").attr('tabindex', '0');
          $("#tabsCriteria").css("display", "block");

      });
      $("#usertab").bind("click", function () {

          $("#usertab").attr('aria-selected', 'true');
          $("#usertab").attr('tabindex', '0');
          $("#criteriatab").attr('aria-selected', 'false');
          $("#criteriatab").attr('tabindex', '-1');
          $("#criteriatab").removeClass('ui-tabs-active');
          $("#usertab").addClass('ui-tabs-active');
          $("#tabsCriteria").css("display", "none");
          $("#tabsUsers").css("display", "block");
      });
      });

      function OpenPopupControl(CriteriaList) {
          var checkIfcontrolhasvalue = false;
          var checkIfcontrolhasvalue1 = false;
          var total
          if ($("#TotalWeight").val() != "") {
              total = parseInt($("#TotalWeight").val());
              if (total > 100) {
                  alert("Sum of all criteria's greater than 100, it should equal to 100");
                  return false;
              }
              else if (total < 100) {
                  alert("Sum of all criteria's less than 100, it should equal to 100");
                  return false;
              }
              else if (total == 100) {
                  if (CriteriaList == null) {
                      if (CriteriaList.length == 0) {
                      }
                      else {
                      }
                  }
                  else {
                      if (CriteriaList.length == 0) {
                      }
                      else {
                          var _criterias = new Array();
                          for (var i = 0; i < CriteriaList.length; i++) {
                              var criteria = document.getElementById('Criteria' + CriteriaList[i]._Criteria_ID);
                              _criteria = 0;
                              if (criteria.value != "") {
                                  _criteria = parseInt(criteria.value);
                                  if (isNaN(_criteria) == true) {
                                      checkIfcontrolhasvalue1 = true;
                                      _criteria = 0;
                                  }
                                  else {
                                  }
                                  _criterias.push(_criteria);
                                  checkIfcontrolhasvalue = true;
                              }
                              else {
                                  _criterias.push("");
                              }
                          }
                      }
                  }

                  if (checkIfcontrolhasvalue == false) {

                      return false;
                  }
                  if (checkIfcontrolhasvalue1 == true) {

                      return false;
                  }
                  document.getElementById('dialog-message').style.display = "block";
                  document.getElementById('overlay').style.display = "block";
                  document.getElementById('divUpdateOrders').style.display = "block";
                  document.getElementById('CloseImgForCriteria').style.display = "block";
                  document.getElementById('mesagedata').innerHTML = "Would like to apply changes to all active orders?";
                  document.getElementById('divOkay').style.display = "none";
                  document.getElementById('CloseImg').style.display = "none";
                  return true;
              }
          }
          else {

              return false;
          }
      }


      function HidePopUp() {
          document.getElementById('dialog-message').style.display = "none";
          document.getElementById('overlay').style.display = "none";
          document.getElementById('divOkay').style.display = "block";
          document.getElementById('CloseImg').style.display = "block";
      }


      function EditUser(UserID)
      {
         
          var data = '';
          var item = "EditUser";
          var url = "/Home/_EditUser";
          data = { UserID: UserID};
          Util.SaveOrder_Change(url, data, item);

      }


      function Save_Notifications() {
          
          if ($("#timehour").val() == "") {
              $("#errormsg").text("Please enter send email notification time in (hour)");
              return false;
          }
          var time = $("#Timehour").val();
          if ($("#Timehour").val() != "") {

              if (parseInt($("#Timehour").val()) > 0) {

                  var data = {
                      timehour: time
                  };

                  var url = "/Home/SendNotification";

                  $.post(url, data,
                     function (response) {
                         window.location.reload();
                     });

              }
              else {
                  if (parseInt($("#Timehour").val() == 0)) {
                      $("#errormsg").text("Time should greater than 0.");
                  }
                  else {
                      $("#errormsg").text("Please enter numeric value.");
                  }                
                  return false;
              }

          }
      }


      function CheckTotal(CriteriaList, UpdateOrdersOrNot)
      {
          var checkIfcontrolhasvalue = false;
          var checkIfcontrolhasvalue1= false;
    var total
    if ($("#TotalWeight").val() != "") {
        total = parseInt($("#TotalWeight").val());
        if (total > 100) {
            alert("Sum of all criteria's greater than 100, it should equal to 100");
            return false;
        }
        else if (total < 100) {
            alert("Sum of all criteria's less than 100, it should equal to 100");
            return false;
        }
        else if (total==100)
        {
            var item = "total";
            var url = "/Home/SaveCriteria";
            if (CriteriaList == null) {
                if (CriteriaList.length == 0) {
                }
                else {
                }
            }
            else {
                if (CriteriaList.length == 0) {
                }
                else {
                    
                  
                    var _criterias = new Array();
                    for (var i = 0; i < CriteriaList.length; i++) {
                        var criteria = document.getElementById('Criteria' + CriteriaList[i]._Criteria_ID);
                        _criteria = 0;
                        if (criteria.value != "") {
                            _criteria = parseInt(criteria.value);
                            if (isNaN(_criteria) == true) {
                                checkIfcontrolhasvalue1 = true;
                                _criteria = 0;
                            }
                            else {
                            }
                            _criterias.push(_criteria);
                            checkIfcontrolhasvalue = true;
                        }
                        else {
                            _criterias.push("");
                        }
                    }
                }
            }
            
            if (checkIfcontrolhasvalue==false)
            {
                
                return false;
            }
            if (checkIfcontrolhasvalue1 == true) {
               
                return false;
            }
           
            if (UpdateOrdersOrNot==true)
            {
                var data = {
                    criterias: _criterias,
                    UpdateOrders: true
                };
                document.getElementById('dialog-message').style.display = "none";
                document.getElementById('overlay').style.display = "none";
                document.getElementById('showprocesstext').style.display = "block";
                document.getElementById('overlayforprocess').style.display = "block";
               
                $.post(url, data,
             function (response) {
                 if (response.Ok == true) {
                     document.getElementById('showprocesstext').style.display = "none";
                     document.getElementById('overlayforprocess').style.display = "none";
                 }
                 if (response.Ok == true) {                    
                     alert("Criteria weight have been updated successfully.");
                     window.location.href = "/Home/Admin";
                     return true;
                 }
             });
            }
            else {
                var data = {
                    criterias: _criterias,
                    UpdateOrders: false
                };
                document.getElementById('dialog-message').style.display = "none";
                document.getElementById('overlay').style.display = "none";
                $.post(url, data,
           function (response) {
               if (response.Ok == true) {
                   alert("Criteria weight have been updated successfully.");
                   window.location.href = "/Home/Admin";
                   return true;
               }
           });       
        }          
             
        }
    }
    else {
      
        return false;
    }
      
}


function GetTotal(id, CriteriaList)
{
    
   
    if ($(id).val() !="") {
        total = parseInt($(id).val());
        if (total>100)
        {
            alert("You can not enter more than 100 % for a criteria.");
            var test = id.id;
            var lbl = test.replace("Criteria", "");
            document.getElementById(lbl).innerHTML = "";
            return false;
            id.focus();
        }
        if (isNaN(total) == true) {
           
            var test = id.id;
            var lbl = test.replace("Criteria", "");
            document.getElementById(lbl).innerHTML = "Enter Numeric Value";
            document.getElementById(lbl).style.color = 'red';
            $("#" + lbl).show();
            return false;
        }
        else {
            var test = id.id;
            var lbl = test.replace("Criteria", "");
            document.getElementById(lbl).innerHTML = "";
        }
        
    }
    if (CriteriaList == null) {
        if (CriteriaList.length == 0) {          
           
        }
        else {          
        }
    }
    else {
        if (CriteriaList.length == 0) {  
        }
        else {
          
            var _criterias = new Array();
            for (var i = 0; i < CriteriaList.length; i++) {

                var criteria = document.getElementById('Criteria' + CriteriaList[i]._Criteria_ID);
                _criteria = 0;
                if (criteria.value != "") {
                    _criteria = parseInt(criteria.value);
                    if (isNaN(_criteria) == true) {
                        _criteria = 0;
                    }
                    else {
                    }
                    _criterias.push( _criteria );
                }
                else {
                    _criterias.push("");
                }  
            }            
        }
    }
    var item = "total";
    var url = "/Home/GetCriteriaTotal";    
    var data = {
        criterias: _criterias
    };
    $.post(url, data,
      function (response) {
          $('#TotalWeight').val(response.Ok);        
              return true;             
      });
}

