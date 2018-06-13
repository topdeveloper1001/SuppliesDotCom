$(function() {
    $("#ATCCodesFormDiv").validationEngine();
});

function SaveATCCodes(id) {
    /// <summary>
    ///     Saves the atc codes.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    var isValid = jQuery("#ATCCodesFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtAtcCodeId = id;
        var txtCode = $("#txtCode").val();
        var txtCodeDescription = $("#txtCodeDescription").val();
        //var txtSubcodeDescription = $("#txtSubcodeDescription").val();
        var txtSubCode = $("#txtSubCode").val();
        var txtAtcCode = $("#txtATCCode").val();
        var txtDrugName = $("#txtDrugName").val();
        var txtPurpose = $("#txtPurpose").val();
        var txtDrugDescription = $("#txtDrugDescription").val();
        var dtCodeEffectiveDate = $("#dtCodeEffectiveDate").val();
        var dtCodeExpiryDate = $("#dtCodeExpiryDate").val();
        var jsonData = JSON.stringify({
            ATCCodeID: txtAtcCodeId,
            Code: txtCode,
            CodeDescription: txtCodeDescription,
            SubcodeDescription: '',
            SubCode: txtSubCode,
            ATCCode: txtCode,
            DrugName: txtDrugName,
            Purpose: txtPurpose,
            DrugDescription: txtDrugDescription,
            CodeEffectiveFrom: dtCodeEffectiveDate,
            CodeEffectiveTill: dtCodeExpiryDate,
        });
        $.ajax({
            type: "POST",
            url: '/ATCCodes/SaveATCCodes',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function() {
                ClearAll();
                BindATCCodesGrid();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";

                ShowMessage(msg, "Success", "success", true);
            },
            error: function() {

            }
        });
    }
}

function EditATCCodes(id) {

    /// <summary>
    ///     Edits the atc codes.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    var jsonData = JSON.stringify({
        id: id
    });
    $.ajax({
        type: "POST",
        url: '/ATCCodes/GetATCCodes',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $.validationEngine.closePrompt(".formError", true);
            $('#ATCCodesFormDiv').empty();
            $('#ATCCodesFormDiv').html(data);
            $('#collapseOne').addClass('in').attr('style', 'height:250px');
            InitializeDateTimePicker();
            $("#ATCCodesFormDiv").validationEngine();
        },
        error: function() {

        }
    });
}


function BindATCCodesGrid() {
    /// <summary>
    ///     Binds the atc codes grid.
    /// </summary>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/ATCCodes/BindATCCodesList",
        dataType: "html",
        async: false,
        data: null,
        success: function(data) {
            $("#ATCCodesListDiv").empty();
            $("#ATCCodesListDiv").html(data);
        },
        error: function() {

        }

    });
}

function ClearForm() {

}

function ClearAll() {
    
    /// <summary>
    /// Clears all.
    /// </summary>
    /// <returns></returns>
    $("#ATCCodesFormDiv").clearForm();
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
    $("#ATCCodesFormDiv").validationEngine();

    $.validationEngine.closePrompt(".formError", true);
    $("#btnSubmit").attr("onclick", "return SaveATCCodes('0');");
    $("#btnSubmit").val("Save");

    //$.ajax({
    //    type: "POST",
    //    url: '/ATCCodes/ResetATCCodesForm',
    //    async: false,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "html",
    //    data: null,
    //    success: function(data) {
    //        if (data) {
    //            // $('#ATCCodesListDiv').empty();
    //            //  $('#ATCCodesListDiv').html(data);
    //            // $('#collapseTwo').addClass('in');
    //            BindATCCodesGrid();
    //        } else {
    //            return false;
    //        }
    //    },
    //    error: function(msg) {


    //        return true;
    //    }
    //});

}

function DeleteATCCodes() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/ATCCodes/DeleteATCCodes',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data) {
                    BindATCCodesGrid();
                    ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
                } else {
                    return false;
                }
                return false;
            },
            error: function () {
                return true;
            }
        });
    }
}


function SortActCodeGrid(event) {
    var url = "/ATCCodes/BindATCCodesList";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?" + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#ATCCodesListDiv").empty();
            $("#ATCCodesListDiv").html(data);
        },
        error: function () {
        }
    });
}