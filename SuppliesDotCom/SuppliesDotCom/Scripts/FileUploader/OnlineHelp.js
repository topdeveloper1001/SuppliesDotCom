var arrayOtherFileTypes = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];

$(function () {
    $("#divDocumentUpload").validationEngine();
    BindGlobalCodesWithValue("#ddlDocumentType", 1018, "");
    $('#File').bind('change', function () {
        var flag = false;
        var file = getNameFromPath($(this).val());
        if (file != null) {
            var extension = file.substr((file.lastIndexOf('.') + 1));
            switch (extension) {
                case 'jpg':
                case 'png':
                case 'gif':
                case 'pdf':
                case 'doc':
                case 'docx':
                case 'ppt':
                case 'pptx':
                case 'xls':
                case 'xlsx':
                    flag = true;
                    break;
                default:
                    flag = false;
            }
        }
        if (flag == false) {
            ShowMessage("You can upload only jpg,png,gif,pdf,doc,docx,ppt or pptx extension files", "Alert", "warning", true);
            //$(".lifile > span").text("You can upload only jpg,png,gif,pdf extension file");
            return false;
        }
        else {
            var filesize = this.files[0].size;
            if (filesize > 5000000) {

                //$(".lifile > span").text("You can upload file up to 3 MB");
                ShowMessage("You can upload file up to 5 MB", "Alert", "warning", true);
                $('.importBillUpload').clearForm();
                return false;
            }
        }
        return true;
        //this.files[0].size gets the size of your file.


    });
});

function DeleteDocument() {
    if ($("#hfGlobalConfirmFirstId").val() > 0) {
        var jsonData = JSON.stringify({
            Id: $("#hfGlobalConfirmFirstId").val(),
            associatedTypeId: $("#hfGlobalConfirmedSecondId").val()
        });
        $.ajax({
            type: "POST",
            url: '/FileUploader/DeleteDocumentTemplate',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#OnlineHelpsDocumentsList", data);
                ShowMessage("Records Deleted Successfully", "Success", "success", true);
            },
            error: function (msg) {
                return false;
            }
        });
    }
}

//function DeleteDocument(id, typeId) {
//    if (confirm("Do you want to delete this document? ")) {
//        var jsonData = JSON.stringify({
//            Id: id,
//            associatedTypeId: typeId
//        });
//        $.ajax({
//            type: "POST",
//            url: '/FileUploader/DeleteDocumentTemplate',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                BindList("#OnlineHelpsDocumentsList", data);
//                ShowMessage("Records Deleted Successfully", "Success", "success", true);
//            },
//            error: function (msg) {
//                return false;
//            }
//        });
//    }
//}

function GetFileSize(fileid) {
    var fileSize = 0;
    try {
        //for IE
        if ($.browser.msie) {
            //before making an object of ActiveXObject, 
            //please make sure ActiveX is enabled in your IE browser
            var objFso = new ActiveXObject("Scripting.FileSystemObject");
            var filePath = $("#" + fileid)[0].value;
            var objFile = objFso.getFile(filePath);
            fileSize = objFile.size; //size in kb
            fileSize = fileSize / 1048576; //size in mb 
        }
            //for FF, Safari, Opeara and Others
        else {
            fileSize = $("#" + fileid)[0].files[0].size //size in kb
            fileSize = fileSize / 1048576; //size in mb 
        }
    }
    catch (e) {
        alert("Error is :" + e);
    }
    return fileSize;
}

//get file path from client system
function getNameFromPath(strFilepath) {
    var objRe = new RegExp(/([^\/\\]+)$/);
    var strName = objRe.exec(strFilepath);

    if (strName == null || strName == '') {
        return null;
    }
    else {
        return strName[0];
    }

}

function ViewOnlineHelpDocument(filePath) {
    if (filePath != "") {
        $("#Documentdiv").empty();
        var fileExt = filePath.substring(filePath.lastIndexOf('.') + 1, filePath.length);
        var headerHeight = $('.header').height();
        var footerHeight = $('.footer').height();
        var heightForFrame = window.innerHeight - headerHeight - footerHeight - 30; // 30 is reduced to have a margin from the footer
        var htmlObjectTag = $.inArray(fileExt, arrayOtherFileTypes) >= 0 ? "<iframe src=\"" + filePath + "\" height=\"0\" id=\"oFrame\" width=\"0\"></iframe>" : "";
        if (htmlObjectTag == "") {
            htmlObjectTag = "<object data=\"" + filePath + "\" height=\"" + heightForFrame + "\" id=\"oFrame\" width=\"100%\" type=\"text/html\"></object>";
            $("#divhidefile").show();
        }
        $("#Documentdiv").append(htmlObjectTag);
    }
    return true;
}