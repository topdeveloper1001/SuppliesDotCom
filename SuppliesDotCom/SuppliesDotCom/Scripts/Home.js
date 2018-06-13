

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
    if (check == false) {
        $("#listorder").css('background-color', '#808080');
        $("#listorder").css('color', '#FFFFFF');
    }
    if(url.indexOf("GetArchiveOrder") != -1 || url.indexOf("ArchivedSorting") != -1) {
        if(document.getElementById("btnShowArchived") != null)
        {
        $("#btnShowArchived").css('background-color', '#808080');
        $("#btnShowArchived").css('color', '#FFFFFF');
        }
        $(window).scrollTop(1050);
    }
    if (url.indexOf("AllOrders") != -1 || url.indexOf("GradeSorting") != -1) {
        if (document.getElementById("btnShowActiveOrders") != null) {
            $("#btnShowActiveOrders").css('background-color', '#808080');
            $("#btnShowActiveOrders").css('color', '#FFFFFF');
            $(window).scrollTop(1050);
        }
    }

});



function CallGoogleMapCode(OrderList) {

    Orders = OrderList;
    $(document).ready(function () {
       
     

        $("#map").click(function () {         

            if ($("#hdnCount").val() == "1") {
                $("#hdnCount").val("2");
            }
            else if ($("#hdnCount").val() == "2") {
                $("#hdnCheckVal").val("");
                if (!infowindow) {
                    infowindow = new google.maps.InfoWindow();
                }
                document.getElementById('lblRecruiterMarketerName').innerHTML = "";
                infowindow.close(map, marker);
            }
        });
    });

    if (Orders == null) {

       // if (Orders.length == 0 || Orders==undefined) {
           
            document.getElementById('MiddleDiv').style.display = "none";
      // }
      //  else {

       //     window.onload = markicons;
       // }
    }
    else {
        if (Orders.length == 0 || Orders == undefined) {
            //
            document.getElementById('MiddleDiv').style.display = "none";
        }
        else {

            window.onload = markicons;
        }
    }
}



function DeleteOrder(Order_ID) {   
    if (confirm("Do you want to delete the order?")) {
        this.click;
        var data = { OrderID: Order_ID };
        var url = '/Home/DeleteOrder';
        var item = 'DeleteOrder';
        Util.SaveOrder_Change(url, data, item);
        return true;
    }
    else {
        return false;
    }
}

function ArchieveFunction() {
    if (confirm("Would you like to make the order archive?")) {
        this.click;
        return true;
    }
    else {
        return false;
    }
}

function ActiveFunction() {
    if (confirm("Would you like to make the order active?")) {
        this.click;
        return true;
    }
    else {
        return false;
    }
}


function Save_PresentNumber(OrderId, PresentNumber, Action) {
    var presentnum = 0;
    if (PresentNumber == null) {
        presentnum = 0;
    }
    else {
        presentnum = PresentNumber;
    }
    var data = {
        'OrderId': OrderId, 'PresentNumber': presentnum, Increase_Or_decrease: Action
    };

    var url = "/Home/SavePresentInfo";

    $.post(url, data,
       function (response) {
           window.location.reload();
       });
}









var Orders;
var map; var infowindow;



function InitializeMap() {
    if (Orders != null) {

        if (Orders.length != 0) {
            var LatitudeAndLongitudearray = Orders;

            var latlng = new google.maps.LatLng(LatitudeAndLongitudearray[0]._Latitude, LatitudeAndLongitudearray[0]._Longitude);
            var myOptions =
            {
                zoom: 4,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map"), myOptions);
        }
    }

}


function markicons() {
    if (Orders != null) {
        if (Orders.length != 0) {
            InitializeMap();

            var ltlng = [];
            var LatitudeAndLongitudearray = Orders;
            for (var i = 0; i < LatitudeAndLongitudearray.length; i++) {
                ltlng.push(new google.maps.LatLng(LatitudeAndLongitudearray[i]._Latitude, LatitudeAndLongitudearray[i]._Longitude));
            }

            map.setCenter(ltlng[0]);

            for (var i = 0; i < ltlng.length; i++) {

                var markercolor = "red-dot.png";
                var check = LatitudeAndLongitudearray[i].OrderGrade;
                switch (check) {
                    case 'A+':
                        markercolor = 'red.png';
                        break;
                    case 'A-':
                        markercolor = 'red.png';
                        break;


                    case 'B+':
                        markercolor = 'orange.png';
                        break;
                    case 'B-':
                        markercolor = 'orange.png';
                        break;
                    case 'C+':
                        markercolor = 'sky-blue.png';
                        break;
                    case 'C-':
                        markercolor = 'sky-blue.png';
                        break;
                    case 'D+':
                        markercolor = 'green.png';
                        break;
                    case 'D-':
                        markercolor = 'green.png';
                        break;
                    case 'F':
                        markercolor = 'grey.png';
                        break;
                    default:
                        markercolor = 'grey.png';
                }
                
                marker = new google.maps.Marker({
                    map: map,
                    position: ltlng[i],
                    icon: "../Images/" + markercolor

                });
                (function (i, marker) {
                    google.maps.event.addListener(marker, 'mouseover', function () {
                       
                        if ($("#hdnCheckVal").val() == "Checked") {
                        }
                        else {
                            if (!infowindow) {
                                infowindow = new google.maps.InfoWindow();
                            }
                            

                            document.getElementById('lblRecruiterMarketerName').innerHTML = LatitudeAndLongitudearray[i].RecruiterMarketerName;
                            var detail = LatitudeAndLongitudearray[i].OrderDetails;
                            detail = detail.replace("\r\n", "<br/>");
                            detail = detail.replace("\r\n", "<br/>");
                            detail = detail.replace("\r\n", "<br/>");
                            detail = detail.replace("\r\n", "<br/>");
                            infowindow.setContent(detail);
                            infowindow.open(map, marker);
                        }

                    });
                    google.maps.event.addListener(marker, 'click', function () {

                        $("#hdnCheckVal").val("Checked");
                        $("#hdnCount").val("1");
                        if (!infowindow) {
                            infowindow = new google.maps.InfoWindow();
                        }
                        var detail = LatitudeAndLongitudearray[i].FullDescription;
                        document.getElementById('lblRecruiterMarketerName').innerHTML = LatitudeAndLongitudearray[i].RecruiterMarketerName;
                        detail = detail.replace("\r\n", "<br/>");
                        detail = detail.replace("\r\n", "<br/>");
                        detail = detail.replace("\r\n", "<br/>");

                        infowindow.setContent(detail);
                        infowindow.open(map, marker);
                        $("#hdnCheckClick").val("Clicked");
                    });

                    google.maps.event.addListener(marker, 'mouseout', function () {
                        if ($("#hdnCheckVal").val() == "Checked") {
                        }
                        else {
                            infowindow.close(map, marker);
                            document.getElementById('lblRecruiterMarketerName').innerHTML = "";
                        }
                    });

                })(i, marker);
            }
        }
    }
}


