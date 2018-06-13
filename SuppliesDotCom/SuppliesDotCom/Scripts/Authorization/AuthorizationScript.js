var xhrResponse = false;

$(function () {
    JsCalls();

    $("#ddlPayer").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue != '0') {
            $("#lblPayerIDSelected").text(selectedValue);
            $.post("/Insurance/GetInsurancePayerId", { id: selectedValue }, function (rsponse) {
                $("#lblPayerIDSelected").text(rsponse);
            });
            $("#divPayerID").show();
        } else {
            $("#lblPayerIDSelected").text("");
            $("#divPayerID").hide();
        }
    });

    var id = $("#AuthorizationID").val();
    $("#btnGenerateEAuth").attr("disabled", id != null && id > 0 ? false : true);

    $("#btnGenerateEAuth").click(function () {
        var id = $("#AuthorizationID").val();
        GenerateEAuthorizationXml(id);
    });
});

function JsCalls() {
    /// <summary>
    ///     JS the calls.
    /// </summary>
    /// <returns></returns>
    $("#AuthorizationFormDiv").validationEngine();
    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });
    //$("#dtAuthorizationLicenseNumberExpire").datepicker({
    //    yearRange: "-130: +0",
    //    changeMonth: true,
    //    dateFormat: 'dd/mm/yy',
    //    changeYear: true
    //});
    //Filling all DropDown in page.
    BindGlobalCodesWithValue("#ddlAuthorizationType", 1701, "#hdAuthorizationType");
    BindAuthorizationDenialCodes("#ddlAuthorizationDenialCode", "#hdAuthorizationDenialCode");
    BindAuthrozationPayerID("#ddlPayer", "#AuthorizationIDPayer");
    BindServiceCodeDesc();
    // GetServiceCoAndDescList();
}

function SaveAuthorization(id) {

    /// <summary>
    ///     Saves the authorization.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>

    //if ($("#dtAuthorizationEnd").val() < $("#dtAuthorizationStart").val()) {
    //    ShowMessage('End date should be graterthan to start date', "Info", "warning", true);
    //    return false;
    //}/*Update By Krishna on 12082015*/

    var isValid = jQuery("#AuthorizationFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {

        var txtAuthorizationId = id;
        var txtPatientId = $("#hdPatientID").val();
        var txtEncounterId = $("#hdEncounterID").val();
        var dtAuthorizationDateOrdered = $("#hdAuthorizationDateOrdered").val();
        var dtAuthorizationStart = $("#dtAuthorizationStart").val();
        var dtAuthorizationEnd = $("#dtAuthorizationEnd").val();
        var txtAuthorizationCode = $("#txtAuthorizationCode").val();
        var txtAuthorizationType = $("#ddlAuthorizationType").val();
        var txtAuthorizationComments = $("#txtAuthorizationComments").val();
        var txtAuthorizationDenialCode = $("#ddlAuthorizationDenialCode").val();
        var authorizationIdPayer = $("#ddlPayer").val();
        var txtAuthorizationLimit = $("#txtAuthorizationLimit").val();
        var authorizationMemberId = $("#AuthorizationMemberID").val();
        var txtAuthorizationResult = $("#txtAuthorizationResult").val();
        var txtAuthorizedServiceLevel = $("#txtAuthorizedServiceLevel").val();
        //var txtCreatedBy = $("#hdCreatedBy").val();
        //var txtCreatedDate = $("#hdCreatedDate").val();

        var jsonData = JSON.stringify({
            AuthorizationID: txtAuthorizationId,
            PatientID: txtPatientId,
            EncounterID: txtEncounterId,
            AuthorizationDateOrdered: dtAuthorizationDateOrdered,
            AuthorizationStart: dtAuthorizationStart,
            AuthorizationEnd: dtAuthorizationEnd,
            AuthorizationCode: txtAuthorizationCode,
            AuthorizationType: txtAuthorizationType,
            AuthorizationComments: txtAuthorizationComments,
            AuthorizationDenialCode: txtAuthorizationDenialCode,
            AuthorizationIDPayer: authorizationIdPayer,
            AuthorizationLimit: txtAuthorizationLimit,
            AuthorizationMemberID: authorizationMemberId,
            AuthorizationResult: txtAuthorizationResult,
            AuthorizedServiceLevel: txtAuthorizedServiceLevel,
            MissedEncounterId: $("#hfMissAuthEncounterId").length > 0 && $("#hfMissAuthEncounterId").val() > 0 ? $("#hfMissAuthEncounterId").val() : 0,
            //CreatedBy: txtCreatedBy,
            //CreatedDate: txtCreatedDate
        });
        $.ajax({
            type: "POST",
            url: '/Authorization/SaveAuthorization',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data == '-1') {
                    ShowMessage('Unable to Save the record.', "Info", "warning", true);
                } else {
                    var msg = "Records Saved successfully !";

                    /*
                    Below Code is used for UnClosed Encounters Screen
                    */
                    if ($("#hfMissAuthEncounterId").length > 0 && $("#hfMissAuthEncounterId").val() > 0) {
                        var encounterId = $("#hfMissAuthEncounterId").val();
                        $.ajax({
                            type: "POST",
                            url: '/ActiveEncounter/UpdateEncounterEndCheck',
                            async: false,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ encounterId: encounterId }),
                            success: function (response) {
                                if (response > 0) {
                                    ShowMessage(msg, "Success", "success", true);
                                    $("#hfMissAuthEncounterId").val('');
                                    $('#divhidepopup').hide();
                                    $('.hidePopUp').hide();
                                    $('#btnSearch').trigger('click');
                                    location.reload();
                                } else {
                                    msg = "Error while saving authorization!";
                                    ShowMessage(msg, "Authorization Alert", "warning", true);
                                }
                            },
                            error: function () { }
                        });
                    } else {
                        if (id > 0)
                            msg = "Records updated successfully";
                        ShowMessage(msg, "Success", "success", true);
                        $('#divhidepopup').hide();
                        $('.hidePopUp').hide();
                        $('#btnSearch').trigger('click');

                        //Change the Img Source at Active Encounters Screen
                        if ($("#img" + txtPatientId).length > 0) {
                            $("#img" + txtPatientId).attr("src", "../images/Authorization_green.png");
                        }
                    }
                }
            },
            error: function (msg) {

            }
        });
    }
}

function EditAuthorization(id) {
    /// <summary>
    ///     Edits the authorization.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    var txtAuthorizationId = id;
    var jsonData = JSON.stringify({
        AuthorizationID: txtAuthorizationId
    });
    $.ajax({
        type: "POST",
        url: '/Authorization/GetAuthorization',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#AuthorizationFormDiv').empty();
                $('#AuthorizationFormDiv').html(data);
                $('#collapseOne').addClass('in');
                JsCalls();
            } else {
            }
        },
        error: function (msg) {

        }
    });
}

function ViewAuthorization(id) {
    /// <summary>
    ///     Views the authorization.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    var txtAuthorizationId = id;
    var jsonData = JSON.stringify({
        AuthorizationID: txtAuthorizationId
    });
    $.ajax({
        type: "POST",
        url: '/Authorization/GetAuthorization',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#serviceCodeDiv').empty();
                $('#serviceCodeDiv').html(data);
                $('#collapseOne').addClass('in');
            } else {
            }
        },
        error: function (msg) {
        }
    });
}

//function DeleteAuthorization(id) {
//    /// <summary>
//    ///     Deletes the authorization.
//    /// </summary>
//    /// <param name="id">The identifier.</param>
//    /// <returns></returns>
//    if (confirm("Do you want to delete this record? ")) {
//        var txtAuthorizationId = id;
//        var jsonData = JSON.stringify({
//            AuthorizationID: txtAuthorizationId
//        });
//        $.ajax({
//            type: "POST",
//            url: '/Authorization/DeleteAuthorization',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data) {
//                    BindAuthorizationGrid();
//                    ShowMessage("Records Deleted Successfully", "Success", "success", true);
//                } else {
//                    return false;
//                }
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}

function BindAuthorizationGrid() {
    /// <summary>
    ///     Binds the authorization grid.
    /// </summary>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Authorization/BindAuthorizationList",
        dataType: "html",
        async: true,
        // data: jsonData,
        success: function (data) {
            $("#AuthorizationListDiv").empty();
            $("#AuthorizationListDiv").html(data);
        },
        error: function (msg) {

        }

    });
}

function ClearAuthForm() {
    $("#AuthorizationFormDiv").clearForm();
}

function ClearAuthAll() {
    /// <summary>
    ///     Clears the authentication all.
    /// </summary>
    /// <returns></returns>
    ClearAuthForm();
    $.validationEngine.closePrompt(".formError", true);
    var jsonData = JSON.stringify({
        AuthorizationID: 0,
    });
    $.ajax({
        type: "POST",
        url: '/Authorization/ResetAuthorizationForm',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {

                $('#AuthorizationFormDiv').empty();
                $('#AuthorizationFormDiv').html(data);
                //$('#collapseTwo').addClass('in');
                BindAuthorizationGrid();
            } else {
                return false;
            }
        },
        error: function (msg) {


            return true;
        }
    });

}

function BindAuthorizationType(selector, categoryIdval, hidValueSelector) {
    /// <summary>
    ///     Binds the type of the authorization.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="categoryIdval">The category idval.</param>
    /// <param name="hidValueSelector">The hid value selector.</param>
    /// <returns></returns>
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: "/Home/GetGlobalCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {

            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeID + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            } else {
            }
        },
        error: function (msg) {
        }
    });
}

function BindAuthorizationDenialCodes(selector, hidValueSelector) {
    /// <summary>
    ///     Binds the authorization denial codes.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="hidValueSelector">The hid value selector.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: "/Denial/GetAuthorizationDenialsCode",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, dataVal) {
                    items += "<option value='" + dataVal.Value + "'>" + dataVal.Text + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
        },
        error: function (msg) {
        }
    });
}

function ClearAuthorizationForm() {
    var text = $("#AuthorizationMemberID").val();
    $("#AuthorizationFormDiv").clearForm();
    $("#AuthorizationFormDiv").validationEngine();
    $("#AuthorizationMemberID").val(text);
    $('#btnUpdate').val('Save');
    $('#btnUpdate').attr('onclick', 'return SaveAuthorization(0);');
}

function BindAuthrozationPayerID(ddlSelector, hfSelector) {
    $.getJSON("/Insurance/GetInsuranceCompaniesDropdownData", null, function (response) {
        BindDropdownData(response, ddlSelector, hfSelector);
        if ($(hfSelector).val() > 0) {
            $.post("/Insurance/GetInsurancePayerId", { id: $(hfSelector).val() }, function (rsponse) {
                $("#lblPayerIDSelected").text(rsponse);
            });
            $("#divPayerID").show();
        }
    });
}

function GenerateEAuthorizationXml(authorizationId) {
    if (authorizationId > 0) {
        $.getJSON("/Authorization/GenerateAuthXml", {}, function (data) {
            if (data != '') {
                $('#txtXmlBillingView').val('');
                $('#txtXmlBillingView').val(data);
                $('#divhidepopup').show();
            } else {
                ShowMessage('Something went wrong in the xml. Please try again later!', "", "warning", true);
            }
        });
    }
}

function BindServiceCodeDesc() {

    $.getJSON("/Home/GetServiceCodeAndDescList", null, function (response) {

        BindDropdownData(response, "#txtAuthorizedServiceLevel", "#AuthorizedServiceLevel");
    });
}



if (typeof window.DOMParser === "undefined") {
    window.DOMParser = function () { };

    window.DOMParser.prototype.parseFromString = function (str, contentType) {
        if (typeof ActiveXObject !== 'undefined') {
            var xmldata = new ActiveXObject('MSXML.DomDocument');
            xmldata.async = false;
            xmldata.loadXML(str);
            return xmldata;
        } else if (typeof XMLHttpRequest !== 'undefined') {
            var xmldata = new XMLHttpRequest;

            if (!contentType) {
                contentType = 'application/xml';
            }

            xmldata.open('GET', 'data:' + contentType + ';charset=utf-8,' + encodeURIComponent(str), false);

            if (xmldata.overrideMimeType) {
                xmldata.overrideMimeType(contentType);
            }

            xmldata.send(null);
            return xmldata.responseXML;
        }
    };
}

function HidePopup() {
    //$('.hidePopUp').hide();
    $.validationEngine.closePrompt('.formError', true);
    $('#divhidepopup').hide();
}

var CheckWithEncounterStartTime = function (startDateid) {
    var srdate = new Date(startDateid.val());
    var encStartdate = new Date($('#hdEncounterStartTime').val());
    if (srdate < encStartdate) {
        startDateid.val("");
        ShowMessage('Authorization Start date should not be less than Encounter Start date.', "Alert", "warning", true);
        startDateid.focus();
        return false;
    }
    else {
        return true;
    }
}

function DeleteAuthorization() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var txtAuthorizationId = $("#hfGlobalConfirmId").val();
        var jsonData = JSON.stringify({
            AuthorizationID: txtAuthorizationId
        });
        $.ajax({
            type: "POST",
            url: '/Authorization/DeleteAuthorization',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data) {
                    BindAuthorizationGrid();
                    ShowMessage("Records Deleted Successfully", "Success", "success", true);
                } else {
                    return false;
                }
            },
            error: function (msg) {
                return true;
            }
        });
    }
}


function ValidateFileAndSaveInAuthorization(sender) {
    var isValid = ValidateFileBeforeUpload(sender, new Array(".xlsx", ".xls", ".doc", ".docx", ".pdf", ".rtf", ".xml", ".ppt", ".pptx"), 5.00);

    if (isValid) {
        UploadDocsInAuthorization(sender);
    }
    return isValid;
}


function AuthorizationSubmission(id) {
    var isValid = jQuery("#AuthorizationFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtAuthorizationId = id;
        var dtAuthorizationDateOrdered = $("#hdAuthorizationDateOrdered").val();
        var dtAuthorizationStart = $("#dtAuthorizationStart").val();
        var dtAuthorizationEnd = $("#dtAuthorizationEnd").val();
        var txtAuthorizationCode = $("#txtAuthorizationCode").val();
        var txtAuthorizationType = $("#ddlAuthorizationType").val();
        var authorizationIdPayer = $("#ddlPayer").val();
        var txtAuthorizationLimit = $("#txtAuthorizationLimit").val();
        var authorizationMemberId = $("#AuthorizationMemberID").val();

        var jsonData = JSON.stringify({
            AuthorizationID: txtAuthorizationId,
            PatientID: $("#hdPatientID").val(),
            EncounterID: $("#hdEncounterID").val(),
            AuthorizationDateOrdered: dtAuthorizationDateOrdered,
            AuthorizationStart: dtAuthorizationStart,
            AuthorizationEnd: dtAuthorizationEnd,
            AuthorizationCode: txtAuthorizationCode,
            AuthorizationType: txtAuthorizationType,
            AuthorizationComments: $("#txtAuthorizationComments").val() == null ? "" : $("#txtAuthorizationComments").val(),
            AuthorizationDenialCode: $("#ddlAuthorizationDenialCode").val() == null ? 0 : $("#ddlAuthorizationDenialCode").val(),
            AuthorizationIDPayer: authorizationIdPayer,
            AuthorizationLimit: txtAuthorizationLimit,
            AuthorizationMemberID: authorizationMemberId,
            AuthorizationResult: $("#txtAuthorizationResult").val() == null ? 0 : $("#txtAuthorizationResult").val(),
            AuthorizedServiceLevel: $("#txtAuthorizedServiceLevel").val() == null ? "" : $("#txtAuthorizedServiceLevel").val(),
            XhrResponse: xhrResponse,
            MissedEncounterId: $("#hfMissAuthEncounterId").length > 0 && $("#hfMissAuthEncounterId").val() > 0 ? $("#hfMissAuthEncounterId").val() : 0,
        });
        $.ajax({
            type: "POST",
            url: '/Authorization/SaveAuthorizationAsync',
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (response) {
                var data = response.Id;
                var authList = data.authListView;
                var docsView = data.docsView;

                GetUnclosedEncounters();
                BindList("#divAuthList", authList);
                BindList("#divAuthDocs", docsView);
                if (data == '-1') {
                    ShowMessage('Unable to Save the record.', "Info", "warning", true);
                } else {
                    var msg = "Records Saved successfully !";
                    if (id > 0)
                        msg = "Records updated successfully";

                    if ($("#hfMissAuthEncounterId").length > 0)
                        $("#hfMissAuthEncounterId").val('');
                    $('#divhidepopup').hide();
                    $('.hidePopUp').hide();
                    $('#btnSearch').trigger('click');

                    //Change the Img Source at Active Encounters Screen
                    if ($("#img" + $("#hdPatientID").val()).length > 0) {
                        $("#img" + $("#hdPatientID").val()).attr("src", "../images/Authorization_green.png");
                    }
                    ShowMessage(msg, "Success", "success", true);
                    
                }
            },
            error: function (msg) {
                

            }
        });
    }
}


function UploadDocsInAuthorization(sender) {
    var url = '/Home/SaveFilesTemporarily';
    var uploadedFiles = $(sender)[0].files;
    if (uploadedFiles.length > 0) {
        var formData = new FormData();
        for (var i = 0; i < uploadedFiles.length; i++) {
            formData.append(uploadedFiles[i].name, uploadedFiles[i]);
        }
    }
    $.ajax({
        type: "POST",
        url: url,
        enctype: "multipart/form-data",
        async: false,
        contentType: false,
        processData: false,
        cache: false,
        data: formData,
        success: function (response) {
            xhrResponse = response;
        },
        complete: function (response) {
            xhrResponse = response;
        },
        error: function (msg, xhr, status) {
            
            console.log(msg);
        }
    });
}


//function ViewPatientDocumentInAuth(id) {
//    $("#divhidepopup1").hide();
//    var jsonData = JSON.stringify({
//        fileId: id,
//    });
//    $.ajax({
//        type: "POST",
//        url: '/Home/Download',
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "File",
//        data: jsonData,
//        success: function (data) {
//            if (data) {
//                $("#viewDocWindow1").empty();
//                $("#viewDocWindow1").html(data);
//                $("#divhidepopup1").show();
//            }
//        },
//        error: function (msg) {
//        }
//    });
//}