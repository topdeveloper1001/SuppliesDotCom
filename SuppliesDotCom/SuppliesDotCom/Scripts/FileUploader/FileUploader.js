function SaveFiles(id) {
    
    var ddlDocumentType = $("#ddlDocumentType").val();
    var txtDocumentName = $("#ddlDocumentType :selected").text();
    var txtDocumentNotes = $("#txtDocumentNotes").val();
    var pid = $('#hdPatientId').val();
    var assoicatedTypeid = $('#hfAssociatedType').val();
    var hdPatientId = $("#hdPatientId").val();
    
    //if (assoicatedTypeid != "4") {
    //    var hdCurrentEncounterId = $('#hdCurrentEncounterId').val();
    //    //hdCurrentEncounterId = ''; //$("#ddlOldEncounters").val();
    //}
    var txtExternalValue1 = ''; var txtExternalValue2 = '';
    if (assoicatedTypeid == "2") {
        if ($('#txtOrderType').val() == '') {
            ShowMessage('Please select any order from list to add documents', "Warning", "warning", true);
            return false;
        }
        txtExternalValue1 = $('#txtOrderType').val();
        txtExternalValue2 = $('#hdOrderId').val();
    }

    if (assoicatedTypeid == "4") {
        if ($('#txtReferenceNumber').val() == '') {
            ShowMessage('Please enter the reference number.', "Warning", "warning", true);
            return false;
        }
        txtExternalValue1 = $('#ddlRecordSource').val();
        txtExternalValue2 = $('#txtReferenceNumber').val();
    }
    var txtDocumentCreatedDate = $('#txtDocumentCreatedDate').val();

    var jsonData = JSON.stringify({
        DocumentsTemplatesID: id,
        DocumentTypeID: ddlDocumentType,
        DocumentName: txtDocumentName,
        DocumentNotes: txtDocumentNotes,
        AssociatedID: pid,
        AssociatedType: assoicatedTypeid,// have to change it later
        IsTemplate: false,
        IsRequired: false,
        PatientID: hdPatientId,
        EncounterID: $('#hdCurrentEncounterId').val(),
        CreatedDate: txtDocumentCreatedDate,
        ExternalValue1:txtExternalValue1,
        ExternalValue2:txtExternalValue2
    });

    $.ajax({
        type: "POST",
        url: '/FileUploader/SaveDocuments',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data != '-1') {
                BindFilesGrid(pid);
                ClearDocumentsAll(pid);
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";
                ShowMessage(msg, "Success", "success", true);
            } else {
                ShowMessage('Please upload any document as PDF or as image.', "Warning", "warning", true);
            }
        },
        error: function (msg) {
        }
    });

}

function EditPatientDocument(id) {
    var jsonData = JSON.stringify({
        documentid: id,
    });
    $.ajax({
        type: "POST",
        url: '/PatientInfo/GetPatientDocument',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#divDocumentUpload').empty();
                $('#divDocumentUpload').html(data);
                JsCallsFileUploader();
                InitializeDateTimePicker();
            }
        },
        error: function (msg) {
        }
    });
}

$(function () {
    JsCallsFileUploader();
});

function JsCallsFileUploader() {
    $("#divDocumentsGrid").validationEngine();
    $('#myDocForm').ajaxForm(function () {
        $.validationEngine.closePrompt(".formError", true);
        var d = new Date();
        var location = window.location.protocol + "//" + window.location.host;
        var source = location + "/FileUploader/ImageLoad?a=" + d.getMilliseconds();
        $("#psfimg")[0].src = source;
    });
    if ($("#hfAssociatedType").val() == "") {
        //BindGlobalCode("#ddlDocumentType", 2305, "#hfDocumentTypeId");
    } else if ($("#hfAssociatedType").val() == "2") {
        BindGlobalCodesWithValue("#ddlDocumentType", 2305, "#hfDocumentTypeId");
    }
    else if ($("#hfAssociatedType").val() == "3") {
        BindGlobalCodesWithValue("#ddlDocumentType", 2306, "#hfDocumentTypeId");
    }
    else if ($("#hfAssociatedType").val() == "4") {
        BindGlobalCodesWithValue("#ddlDocumentType", 2307, "#hfDocumentTypeId");
        BindGlobalCodesWithValue('#ddlRecordSource', 2310, '#hdOrderSource');
        $(".OldMedicalRecord").show();
        //$('#txtReferenceNumber').addClass('validate[required,custom[integerdash]]');
    }
    InitializeDateTimePicker();
    $('#hfPatientId').val($('#hdPatientId').val());
}

function IsValidDcoument(id) {
    var isValid = jQuery("#divDocumentUpload").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        SaveFiles(id);
    }
    return false;
}

function ChangeDoc() {
    $("#div_ImageErrorDoc").html('');
    var imageFile = $("#imageLoadDoc");
    var value = imageFile.val();
    if (value != '') {
        if (!value.match(/\.jpg|gif|png|bmp|jpeg|pdf|JPG|GIF|BMP|PNG|JPEG|PDF$/)) {
            $("#div_ImageErrorDoc").html("This extension is not supported");
            return false;
        }
        $('#myDocForm').submit();
    }
}

function BindFilesGrid(patientId) {
    var assoicatedTypeid = $('#hfAssociatedType').val();
    var jsonData = JSON.stringify({
        patientId: patientId,
        associatedtype: assoicatedTypeid
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/FileUploader/GetDocuments",
        dataType: "html",
        async: true,
        data: jsonData,
        success: function (data) {
            $("#divDocumentsGrid").empty();
            $("#divDocumentsGrid").html(data);
            if (assoicatedTypeid != 2) {
                //hideColumnColorRow(2, 'PatientDocumentsGrid'); // Method to remove the Extra column from the grid.
            } else if (assoicatedTypeid != 4) {
                //hideColumnColorRow(6, 'PatientDocumentsGrid'); // Method to remove the Extra column from the grid.
                //hideColumnColorRow(7, 'PatientDocumentsGrid'); // Method to remove the Extra column from the grid.
            }
            if (assoicatedTypeid == 2) {
                $('.editOpenOrder').hide();
                $('.editRadImagingOrder,.RadOrder').show();
            }
        },
        error: function (msg) {
           
        }

    });
}

function ClearDocumentsForm() {
    $("#divDocumentUpload").clearForm();
}

function ClearDocumentsAll(patientId) {
    ClearDocumentsForm();
    $.validationEngine.closePrompt(".formError", true);
    $.ajax({
        type: "POST",
        url: '/FileUploader/ResetDocumentForm',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            if (data) {
                BindFilesGrid(patientId);
                $('#divDocumentUpload').empty();
                $('#divDocumentUpload').html(data);
                JsCallsFileUploader();
                SetEncounterNumber();
                
            }
            else {
                return false;
            }
        },
        error: function (msg) {
            return true;
        }
    });
}

function ViewDocument(id) {
    var jsonData = JSON.stringify({
        documentid: id,
    });
    $.ajax({
        type: "POST",
        url: '/FileUploader/GetDocumentById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $("#Documentdiv").empty();
                $("#Documentdiv").html(data);
                $("#divhidefile").show();
            }
        },
        error: function (msg) {
        }
    });
}

function DeleteDocument() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            Id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/FileUploader/DeleteFile',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data) {
                    var pid = $('#hdPatientId').val();
                    BindFilesGrid(pid);
                    ShowMessage("Records Deleted Successfully", "Success", "success", true);
                }
            },
            error: function (msg) {
                return true;
            }
        });
    }
}

//function DeleteDocument(id) {
//    if (confirm("Do you want to delete this document? ")) {
//        var jsonData = JSON.stringify({
//            Id: id
//        });
//        $.ajax({
//            type: "POST",
//            url: '/FileUploader/DeleteFile',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data) {
//                    var pid = $('#hdPatientId').val();
//                    BindFilesGrid(pid);
//                    ShowMessage("Records Deleted Successfully", "Success", "success", true);
//                }
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}

function ShowOldMedicalRecordTxt() {
    var recordSource = $('#ddlRecordSource').val();

}
function SortDocumentListGrid(event) {
    var tabvalue = $('#hfTabValue').val();

    var selectedVal = "0";
    switch (tabvalue) {
        case '13':
            selectedVal = "3";
            break;
        case '7':
            selectedVal = "2"; //OrderCodeTypes.Radiology;
            break;
        case '15':
            selectedVal = "4"; //OrderCodeTypes.Surgery;
            break;
        default:
            selectedVal = "0";
    }
    var url = "/FileUploader/PatientDocumentsGrid";

    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?associatedType=" + selectedVal + "&pid=" + $('#hdPatientId').val() + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#divDocumentsGrid").empty();
            $("#divDocumentsGrid").html(data);
        },
        error: function (msg) {
        }
    });
}