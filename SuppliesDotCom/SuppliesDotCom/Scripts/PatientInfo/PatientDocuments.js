$(function () {
    ajaxStartActive = false;
    $("#divPatientAddress").validationEngine();
    var pId = $("#PatientId").val();

    if (pId == 0 || pId == '' || $("#PatientId").length == 0) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/PatientInfo/GetNextPatientId",
            dataType: "json",
            async: true,
            data: null,
            success: function (data) {
                $("#PatientId_Document").val(data);
            },
            error: function (msg) {

            }
        });
    } else {
        $("#PatientId_Document").val($("#PatientId").val());
    }

    BindGlobalCodesWithValue("#ddlDocumentType", 1103, "");
    $('#myDocForm').ajaxForm(function () {
        $.validationEngine.closePrompt(".formError", true);
        var d = new Date();
        var location = window.location.protocol + "//" + window.location.host;
        var source = location + "/PatientInfo/ImageLoad?a=" + d.getMilliseconds();
        $("#psfimg")[0].src = source;
    });


    $("#ddlDocumentType").change(function () {
        if ($(this).val() > 0)
            $("#OtherDocumentTypeId").val($(this).val());
    });
});

function ChangePatientAttachment() {
    $("#div_ImageErrorDoc").html('');
    var value = $("#imageLoadDoc").val();
    if (value != '') {
        if (!value.match(/\.jpg|gif|png|bmp|jpeg|JPG|GIF|BMP|PNG|JPEG$/)) {
            $("#div_ImageErrorDoc").html("This extension is not supported");
            return false;
        }
        else if ($("#ddlDocumentType").val() <= 0) {
            ShowWarningMessage("Select the Document Type first!", true);
            return false;
        }
        else {
            $("#OtherDocumentTypeId").val($("#ddlDocumentType").val());
            $('#myDocForm').submit();
        }
    }
    return true;
}

function ClearDocumentsAll() {
    $("#divDocumentUpload").clearForm();
    $('#psfimg').attr('src', '/images/Noimage.jpg');
    $.validationEngine.closePrompt(".formError", true);
}

function DeletePatientDocument() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var id = $("#hfGlobalConfirmId").val();
        var patientId = $("#PatientId").val();
        if (id > 0 && patientId > 0) {
            $.post("/PatientInfo/DeleteFilePermanently", { id: id, patientId: patientId }, function (data) {
                if (data != null) {
                    BindList("#divDocumentsGrid", data);
                    ShowMessage("Patient Document Deleted successfully", "Success", "success", true);
                } else {
                    ShowErrorMessage("Error while deleting  Patient Documents. Try again later!", true);
                }
                return false;
            });
        }
    }
}

//function DeletePatientDocument(id) {
//    if (confirm("Do you want to perform this action?") == true) {
//        var patientId = $("#PatientId").val();
//        if (id > 0 && patientId > 0) {
//            $.post("/PatientInfo/DeleteFilePermanently", { id: id, patientId: patientId }, function (data) {
//                if (data != null) {
//                    BindList("#divDocumentsGrid", data);
//                    ShowMessage("Patient Document Deleted successfully", "Success", "success", true);
//                } else {
//                    ShowErrorMessage("Error while deleting  Patient Documents. Try again later!", true);
//                }
//                return false;
//            });
//        }
//    }
//}

function SavePatientDocuments() {
    var isValid = jQuery("#divDocumentUpload").validationEngine({ returnIsValid: true });
    //var imgSrc = (elem.getElementsByTagName('img').length > 0);
    //document.getElementById("psfimg").attr('src');


    if (isValid == true) {
        var patientId = $("#PatientId").val();
        var ddlDocumentType = $("#ddlDocumentType").val();
        var txtDocumentName = $("#ddlDocumentType :selected").text();

        var jsonData = {
            DocumentsTemplatesID: 0,
            DocumentTypeID: ddlDocumentType,
            DocumentName: txtDocumentName,
            DocumentNotes: txtDocumentName + " Saved for future reference purposes",
            AssociatedID: patientId,
            //AssociatedType: ddlDocumentType,
            AssociatedType: 1,
            IsTemplate: false,
            IsRequired: false,
            PatientID: patientId,
            IsDeleted: false
        };

        $.post("/PatientInfo/SavePatientDocument", jsonData, function (data) {
            if (data != null) {
                ClearDocumentsAll();
                BindList("#divDocumentsGrid", data);
                //$('img').attr('src', '');

                ShowMessage("Patient Documents saved successfully", "Success", "success", true);
            } else {
                ShowErrorMessage("Error while saving Patient Documents. Try again later!", true);
            }
            return false;
        });
    }
    return false;
}


function BindPatientAttachmentsBySort(event) {
    var url = "/PatientInfo/GetPatientAttachmentsPartialView1";
    var pId = $("#PatientId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?patientId=" + pId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        dataType: "html",
        async: true,
        data: null,
        success: function (data) {
            $("#divDocumentsGrid").empty();
            $("#divDocumentsGrid").html(data);
        },
        error: function (msg) {

        }
    });
    return false;
}
