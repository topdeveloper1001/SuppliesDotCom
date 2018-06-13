function ValidateFile() {
    var value = $('#ImportXMLfile').val();
    if (value == '') {
        ShowMessage('Please select any file.', "Alert", "warning", true);
        return false;
    }
    if (value != '') {
        if (!value.match(/\.xml|XML$/)) {
            ShowMessage('Please select only XML file!', "Alert", "warning", true);
            return false;
        }
    }
    //var isValid = jQuery(".validateUploadExcel").validationEngine({ returnIsValid: true });
    if (true) {
        $.blockUI({
            message: '<img src="/images/ajax-loader-bar.GIF"><p>Please wait...</p>',
            css: {
                border: 'none',
                padding: '15px',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
            }
        });
    }
    else {
        return false;
    }
}

$(function() {
    //jQuery(".validateUploadExcel").validationEngine();
    var hd = $("#hdMessage");
    if (hd != null && hd.val() == '1') {
        ShowMessage("File Upload Succefully!", "Success", "success", true);
    } else if (hd != null && hd.val() == '2') {
        ShowMessage("File with the same Sender Id, Receiver Id and Transaction date already exist!!!", "Duplicate File", "warning", true);
    } else if (hd != null && hd.val() == '3') {
        ShowMessage("Error while parsing the file! Record Count and Claims in XML File does not match.", "Error", "warning", true);
    } else if (hd != null && hd.val() != '') {
        ShowMessage("Error while uploading the file!", "Warning", "warning", true);
    }
});

var ViewRemiitanceFile = function (id) {
    var jsonData = JSON.stringify({
        id: id
    });
    
    $.ajax({
        type: "POST",
        url: '/FileUploader/ViewRemittanceFile',
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        data: jsonData,
        success: function (data) {
            if (data != '') {
                $('#txtXmlRemittanceBillingView').val('');
                $('#txtXmlRemittanceBillingView').val(data);
                $('#divhidepopup').show();
            } else {
                ShowMessage('Something went wrong in the xml. Please try again later!', "", "warning", true);
            }
        },
        error: function (response) {
        }
    });
}

var ViewRemittanceParsedData = function (id) {
    var jsonData = JSON.stringify({
        id: id
    });
    if (!$('#collapseXmlParsedData').hasClass('in'))
        $('#collapseXmlParsedData').addClass('in').attr('style', 'height:auto;');
    $.ajax({
        type: "POST",
        url: '/FileUploader/ViewRemittanceData',
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $('#RemittanceXMLParsedView').empty();
            $('#RemittanceXMLParsedViewNonSystem').empty();
            BindList("#RemittanceXMLParsedView", data.systemClaims);
            BindList("#RemittanceXMLParsedViewNonSystem", data.nonSystemClaims);
        },
        error: function (response) {
        }
    });
}

function ApplyChargesInRemittanceAdvice(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/FileUploader/ApplyChargesInRemittanceAdvice",
        dataType: "json",
        async: true,
        data: JSON.stringify({ fileId: id }),
        success: function (data) {
            if (data.xclaimList) {
                ShowMessage("Charges applied successfully.", "Success", "success", true);
                BindList("#XMLFilesView", data.parsedList);
            } else {
                ShowMessage("Unable to apply charges.", "Warning", "warning", true);
            }
            window.location = window.location.href.split("?")[0];
            //window.location.reload();
        },
        error: function (msg) {

        }
    });
}

