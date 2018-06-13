var imageName = '';
var fileName = '';



function ChangeImage(fileId, imageId, imgDivSelector, imgFileSelector, imgUploadSelector) {

    $.validationEngine.closePrompt(".formError", true);

    //setTimeout(function () { alert("Hello"); }, 3000);
  CropImageData(fileId, imageId, imgDivSelector, imgFileSelector, imgUploadSelector);

}

function CropImageData(fileId, imageId, imgDivSelector, imgFileSelector, imgUploadSelector) {
    $('#imageProcessBar').show();
    //$("#div_ImageError").html('');
    $(imgDivSelector).html('');
    //var imageFile = $("#imageLoadPhoto");
    var imageFile = $(imgFileSelector);
    var fileName = fileId;
    var imageName = imageId;
    var value = imageFile.val();
    if (value != '') {
        if (!value.match(/\.jpg|gif|png|bmp|jpeg|JPG|GIF|BMP|PNG|JPEG$/)) {
            $('#imageProcessBar').hide();
            //$("#div_ImageError").html("This extension is not supported");
            $(imgDivSelector).html("This extension is not supported");
            return false;
        }
        //$("#imgsub").click();
        $(imgUploadSelector).click();
    }
    else {
        $('#imageProcessBar').hide();

    }
}

$(document).ready(function () {
    var ajaxStartActive = false;

    $('#myForm').ajaxForm(function () {
        $.post('/ImagePreview/CheckFileSize', function (data) {
            $("#div_ImageError").html('');
            var splitArray = data.split('`');
            var width = parseInt(splitArray[0]) > 200 ? 200 : parseInt(splitArray[0]);
            var height = parseInt(splitArray[1]) > 200 ? 200 : parseInt(splitArray[1]);
            /*if (data == "MinWidth") {
                $("#div_ImageError").html(CommonMessages.ImageMinWidthValidation);
                $('#imageProcessBar').hide();
                $('#divhidepopup1').hide();
                return false;
            }
            else if (data == "MinHeight") {
                $("#div_ImageError").html(CommonMessages.ImageHeightCheck);
                $('#imageProcessBar').hide();
                $('#divhidepopup1').hide();
                return false;
            }
            else if (data == "Height") {
                $("#div_ImageError").html(CommonMessages.ImageHeightCheck);
                $('#imageProcessBar').hide();
                $('#divhidepopup1').hide();
                return false;
            } else if (data == "Width") {
                $("#div_ImageError").html(CommonMessages.ImageValidation);
                $('#imageProcessBar').hide();
                $('#divhidepopup1').hide();
                return false;
            } else {*/
                var d = new Date();
                var location = window.location.protocol + "//" + window.location.host;
                var source = location + "/ImagePreview/ImageLoad?a=" + d.getMilliseconds();
                /***** used for cropping 
                $(imageName)[0].src = source;
                $(imageName).load(function () {
                    $('#imageProcessBar').hide();
                });
                ****/
                /****** used for cropping *****/
                $('#ImgCropImage').replaceWith('<img id="ImgCropImage" src="' + source + '" style="cursor: pointer; vertical-align: middle; text-align: center; flex-align: center;"/>');
                if ($(".jcrop-holder") != undefined)
                    $(".jcrop-holder").remove();
                var jc = $(".jcrop-holder").find('img');
                if (jc.length > 0) {
                    jc[0].src = source;
                    jc[1].src = source;
                }
                jqueryFormSub();
            if (width > 200 && height > 200) {
                if (!UtilityHasTouch()) {
                    $('#ImgCropImage').Jcrop({
                        onChange: setCoords,
                        onSelect: setCoords,
                        setSelect: [0, 0, 200, 200],
                        aspectRatio: 1,
                        allowSelect: false,
                        allowMove: true,
                        allowResize: true,
                        minSize: [200, 200],
                        boxHeight: 400
                    });
                } else {
                    $('#ImgCropImage').Jcrop({
                        onChange: setCoords,
                        onSelect: setCoords,
                        setSelect: [0, 0, 200, 200],
                        aspectRatio: 1,
                        allowSelect: false,
                        allowMove: true,
                        allowResize: true,
                        minSize: [200, 200],
                        boxHeight: 170,
                        boxWidth: 295
                    });
                }
            } else {
                if (!UtilityHasTouch()) {
                    $('#ImgCropImage').Jcrop({
                        onChange: setCoords,
                        onSelect: setCoords,
                        setSelect: [0, 0, width, height],
                        aspectRatio: 1,
                        allowSelect: false,
                        allowMove: true,
                        allowResize: true,
                        //minSize: [200, 200],
                        boxHeight: 400
                    });
                } else {
                    $('#ImgCropImage').Jcrop({
                        onChange: setCoords,
                        onSelect: setCoords,
                        setSelect: [0, 0, width, height],
                        aspectRatio: 1,
                        allowSelect: false,
                        allowMove: true,
                        allowResize: true,
                        //minSize: [200, 200],
                        boxHeight: 170,
                        boxWidth: 295
                    });
                }
            }
            OpenedPopUpDivId = 'CropImage';
                $('#imageProcessBar').hide();
                DisplayPopUp('CropImage');
                $('#divhidepopup1').show();
                /****************************/
           /* }*/
        });
        function setCoords(c) {
            $('#X').val(c.x);
            $('#Y').val(c.y);
            $('#W').val(c.w);
            $('#H').val(c.h);
        };
    });
    $('#imageLoadPhoto').on('click', function () { $.validationEngine.closePrompt(".formError", true); });
});

function UtilityHasTouch() {

    var agent = navigator.userAgent;

    if (agent.match(/(iPhone|iPod|iPad|Blackberry|Android)/)) {
        return true;
    }

    return false;
}

function DisplayPopUp(divId) {

    $.validationEngine.closePrompt(".formError", true);
    var divObject = $('#' + divId);

    var WindowHeight;
    if ((navigator.userAgent.match(/iPad/i))) {
        WindowHeight = 780;
    } else {
        WindowHeight = document.documentElement.clientHeight;
    }
    var WindowWidth = document.documentElement.clientWidth;
    var popupHeight = divObject.height();
    var popupWidth = divObject.width();
    /* $('#divBackgroundPopUp').css({
         "opacity": "0.9",
         "z-index": "9999"
     });*/
    var marginTop = (WindowHeight / 2 - popupHeight / 2) - 80;
    if (marginTop < 10) {
        divObject.css({ top: 30 });
    } else {
        divObject.css({ top: marginTop });
    }
    divObject.css({ left: WindowWidth / 2 - popupWidth / 2 });
    divObject.attr("postion", "fixed");
    divObject.fadeIn('slow');
    //$('#divBackgroundPopUp').fadeIn('slow');
}
//Purpose:Used to close open popup
//Use by pages: edit profile
function CloseCropDiv() {
    $.get("/ImagePreview/RemoveImageByteSession", function () {
        $('#CropImage').fadeOut('slow');
    });
}
//Purpose:Crop image section by passing x,y,w,h values
//Use by pages: edit profile
function cropImage() {
    var number = 1 + Math.floor(Math.random() * 9);
    var numberY = 2 + Math.floor(Math.random() * 9);
    var location = window.location.protocol + "//" + window.location.host;
    var source = location;
    $("#pfimg")[0].src = source + "/ImagePreview/CroppedImageLoad?x=" + parseInt($("#X").val()) + "&y=" + parseInt($("#Y").val()) + "&w=" + parseInt($("#W").val()) + "&h=" + parseInt($("#H").val());
    //$('#divBackgroundPopUp').fadeOut('slow');
    //$('#CropImage').fadeOut('slow');
    return false;

}

