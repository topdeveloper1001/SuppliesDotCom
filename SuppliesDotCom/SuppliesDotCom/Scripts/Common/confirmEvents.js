function OpenConfirmPopup(confirmedId, title, msg, confirmEvent, cancelEvent) {
    $("#hfGlobalConfirmId").val(confirmedId);
    $("#h5Globaltitle").html(title);
    if (msg != '')
        $("#h5GlobalMessage").html(msg);

    if (cancelEvent == null)
        cancelEvent = CancelEvent;

    $.blockUI({ message: $('#divConfirmBox'), css: { width: '350px' } });

    //Remove Button Clicks
    $('#divConfirmBox').off('click', '#btnGlobalConfirm', confirmEvent);
    $('#divConfirmBox').off('click', '#btnGlobalCancel', cancelEvent);

    //Add Button Clicks
    $('#divConfirmBox').on('click', '#btnGlobalConfirm', confirmEvent);
    $('#divConfirmBox').on('click', '#btnGlobalCancel', cancelEvent);
}

// Confirm Box With Two Different ID
function OpenConfirmPopupWithTwoId(confirmedFirstId, confirmedSecondId, title, msg, confirmEvent, cancelEvent) {
    $("#hfGlobalConfirmFirstId").val(confirmedFirstId);
    $("#hfGlobalConfirmedSecondId").val(confirmedSecondId);

    $("#h5Globaltitle").html(title);
    if (msg != '')
        $("#h5GlobalMessage").html(msg);

    if (cancelEvent == null)
        cancelEvent = CancelEvent;

    $.blockUI({ message: $('#divConfirmBox'), css: { width: '350px' } });

    //Remove Button Clicks
    $('#divConfirmBox').off('click', '#btnGlobalConfirm', confirmEvent);
    $('#divConfirmBox').off('click', '#btnGlobalCancel', cancelEvent);

    //Add Button Clicks
    $('#divConfirmBox').on('click', '#btnGlobalConfirm', confirmEvent);
    $('#divConfirmBox').on('click', '#btnGlobalCancel', cancelEvent);
}
// Confirm Box With three Different ID
function OpenConfirmPopupWithThreeId(confirmedFirstId, confirmedSecondId,confirmedThirdId, title, msg, confirmEvent, cancelEvent) {
    $("#hfGlobalConfirmFirstId").val(confirmedFirstId);
    $("#hfGlobalConfirmedSecondId").val(confirmedSecondId);
    $("#hfGlobalConfirmedThridId").val(confirmedThirdId);

    $("#h5Globaltitle").html(title);
    if (msg != '')
        $("#h5GlobalMessage").html(msg);

    if (cancelEvent == null)
        cancelEvent = CancelEvent;

    $.blockUI({ message: $('#divConfirmBox'), css: { width: '350px' } });

    //Remove Button Clicks
    $('#divConfirmBox').off('click', '#btnGlobalConfirm', confirmEvent);
    $('#divConfirmBox').off('click', '#btnGlobalCancel', cancelEvent);

    //Add Button Clicks
    $('#divConfirmBox').on('click', '#btnGlobalConfirm', confirmEvent);
    $('#divConfirmBox').on('click', '#btnGlobalCancel', cancelEvent);
}

// Confirm Box With seven Different ID. It is Specially Create For ManualDashbord Screen
function OpenConfirmPopupWithSevenId(confirmedFirstId, confirmedSecondId, confirmedThirdId,confirmedFourthId,confirmedFifthId,confirmedSixthId,confirmedSeventhId ,title, msg, confirmEvent, cancelEvent) {
    $("#hfGlobalConfirmFirstId").val(confirmedFirstId);
    $("#hfGlobalConfirmedSecondId").val(confirmedSecondId);
    $("#hfGlobalConfirmedThridId").val(confirmedThirdId);
    $("#hfGlobalConfirmedFourthId").val(confirmedFourthId);
    $("#hfGlobalConfirmedFifthId").val(confirmedFifthId);
    $("#hfGlobalConfirmedSixthId").val(confirmedSixthId);
    $("#hfGlobalConfirmedSeventhId").val(confirmedSeventhId);


    $("#h5Globaltitle").html(title);
    if (msg != '')
        $("#h5GlobalMessage").html(msg);

    if (cancelEvent == null)
        cancelEvent = CancelEvent;

    $.blockUI({ message: $('#divConfirmBox'), css: { width: '350px' } });

    //Remove Button Clicks
    $('#divConfirmBox').off('click', '#btnGlobalConfirm', confirmEvent);
    $('#divConfirmBox').off('click', '#btnGlobalCancel', cancelEvent);

    //Add Button Clicks
    $('#divConfirmBox').on('click', '#btnGlobalConfirm', confirmEvent);
    $('#divConfirmBox').on('click', '#btnGlobalCancel', cancelEvent);
}

// Confirm Box With seven Different ID. It is Specially Create For ManualDashbord Screen



function CancelEvent() {
    $('#hfGlobalConfirmId').val('');
    $("#hfGlobalConfirmFirstId").val('');
    $("#hfGlobalConfirmedSecondId").val('');
    $("#hfGlobalConfirmedThridId").val('');
    $.unblockUI();
    return false;
}