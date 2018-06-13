

  $(function () {
        //$('.add').click(function () {
           
        //    $(window).scrollTop(700);
        //    var existrow = $('.save').length;
            
        //    
        //    if (existrow == 0) {
        //        var index = $("#grid tbody tr").length + 1;
        //        var EncounterAccidentDate = "EncounterAccidentDate_" + index;
        //        var EncounterAttendingPhysician = "EncounterAttendingPhysician_" + index;
        //        var EncounterFacility = "EncounterFacility_" + index;

        //        var EncounterPatientType = "EncounterPatientType_" + index;
        //        var EncounterServiceCategory = "EncounterServiceCategory_" + index;
        //        var Payment = "Payment_" + index;

        //        var Charges = "Charges_" + index;
        //        var EncounterMedicalService = "EncounterMedicalService_" + index;


        //        var Save = "Save_" + index;
        //        var Cancel = "Cancel_" + index;
        //        var tr = '<tr class="alternate-row"><td><span> <input id="' + EncounterAccidentDate + '" class="EncounterAccidentDate" maxlength="12" type="text" style="width: 100px !important;" /></span></td>' +

        //        '<td><span> <input id="' + EncounterFacility + '" type="text" style="width: 100px !important;" maxlength="20"/></span></td>' +

        //        '<td><span> <input id="' + EncounterAttendingPhysician + '" type="text" style="width: 100px !important;" maxlength="20" /></span></td>' +

        //        '<td><span> <input id="' + EncounterPatientType + '" type="text" style="width: 100px !important;" maxlength="20" /></span></td>' +
        //        '<td><span> <input id="' + EncounterMedicalService + '" type="text" style="width: 100px !important;" maxlength="20" /></span></td>' +

        //        '<td><span> <input id="' + EncounterServiceCategory + '" type="text" style="width: 100px !important;" maxlength="20" /></span></td>' +
        //        '<td><span> <input id="' + Charges + '" type="text" onchange="checkInt(this)" style="width: 70px !important;" maxlength="8" /></span></td>' +

        //            '<td><span> <input id="' + Payment + '" type="text" onchange="checkInt(this)" style="width: 70px !important;" maxlength="8" /></span> </td>' +


        //        '<td> <a href="javascript://" id="' + Save + '" onclick="SaveEncounter()" class="save">Save</a>&nbsp;<a href="javascript://" id="' + Cancel + '" class="icancel">Cancel</a> </td>' +
        //        '</tr>';
        //        $("#grid").append(tr);

        //        $(this).hide();


        //        $(".EncounterAccidentDate").datepicker({
        //            changeMonth: true,
        //            changeYear: true
        //        });
        //        $(".icancel").click(function () {
        //            
        //            var flag = confirm('Are you sure to cancel');
        //            if (flag) {
        //                $(this).parents("tr").remove();
        //                $(".add").show();
        //            }
        //        });


        //    }
        //    else {
        //        alert('First Save your previous record !!');
        //    }
        //});
        //$(".icancel").click(function () {
        //    
        //    var flag = confirm('Are you sure to cancel');
        //    if (flag) {
        //        $(this).parents("tr").remove();
        //    }
        //});
    });

    function checkInt(id) {
        

        total = parseInt($("#" + id.id).val());
        if (isNaN(total) == true) {

            $("#" + id.id).css("border", "1px solid red");
        }
    }


    //function SaveEncounter() {
    //    
    //    $(window).scrollTop(700);
    //    var id = $("#grid tbody tr").length;
    //    var EncounterAccidentDate = $("#EncounterAccidentDate_" + id).val();
    //    var EncounterFacility = $("#EncounterFacility_" + id).val();
    //    var EncounterAttendingPhysician = $("#EncounterAttendingPhysician_" + id).val();
    //    var EncounterPatientType = $("#EncounterPatientType_" + id).val();
    //    var EncounterMedicalService = $("#EncounterMedicalService_" + id).val();
    //    var EncounterServiceCategory = $("#EncounterServiceCategory_" + id).val();

    //    var Charges = $("#Charges_" + id).val();
    //    var Payment = $("#Payment_" + id).val();

    //    var flag = true;
    //    if (EncounterAccidentDate == "") {
    //        $("#EncounterAccidentDate_" + id).css("border", "1px solid red");
    //        flag = false;
    //    }
    //    else {
    //        $("#EncounterAccidentDate_" + id).css("border", "0px solid red");
    //    }
    //    if (EncounterFacility == "") {
    //        $("#EncounterFacility_" + id).css("border", "1px solid red");
    //        flag = false;
    //    }
    //    else {
    //        $("#EncounterFacility_" + id).css("border", "0px solid red");
    //    }
    //    if (EncounterAttendingPhysician == "") {
    //        $("#EncounterAttendingPhysician_" + id).css("border", "1px solid red");
    //        flag = false;
    //    }
    //    else {
    //        $("#EncounterAttendingPhysician_" + id).css("border", "0px solid red");
    //    }
    //    if (EncounterPatientType == "") {
    //        $("#EncounterPatientType_" + id).css("border", "1px solid red");
    //        flag = false;
    //    }
    //    else {
    //        $("#EncounterPatientType_" + id).css("border", "0px solid red");
    //    }

    //    if (EncounterMedicalService == "") {
    //        $("#EncounterMedicalService_" + id).css("border", "1px solid red");
    //        flag = false;
    //    }
    //    else {
    //        $("#EncounterMedicalService_" + id).css("border", "0px solid red");
    //    }
    //    if (EncounterServiceCategory == "") {
    //        $("#EncounterServiceCategory_" + id).css("border", "1px solid red");
    //        flag = false;
    //    }
    //    else {
    //        $("#EncounterServiceCategory_" + id).css("border", "0px solid red");
    //    }
    //    if (Charges == "" || isNaN(parseInt(Charges)) == true) {
    //        $("#Charges_" + id).css("border", "1px solid red");
    //        flag = false;
    //    }
    //    else {
    //        $("#Charges_" + id).css("border", "0px solid red");
    //    }
    //    if (Payment == "" || isNaN(parseInt(Payment)) == true) {
    //        $("#Payment_" + id).css("border", "1px solid red");
    //        flag = false;
    //    }
    //    else {
    //        $("#Payment_" + id).css("border", "0px solid red");
    //    }

    //    if (flag == false) {
    //        return false;
    //    }

    //    if (id != "") {

    //        var model = {
    //            EncounterAccidentDate: EncounterAccidentDate,
    //            EncounterFacility: EncounterFacility,
    //            EncounterAttendingPhysician: EncounterAttendingPhysician,
    //            EncounterPatientType: EncounterPatientType,
    //            EncounterMedicalService: EncounterMedicalService,
    //            EncounterServiceCategory: EncounterServiceCategory,
    //            Charges: Charges,
    //            Payment: Payment

    //        };

    //        $.ajax({
    //            type: "POST",
    //            contentType: "application/json; charset=utf-8",
    //            url: '/Home/SaveEncounterInfo',               
    //            data: JSON.stringify(model),
    //            dataType: "json",
    //            beforeSend: function () { },
    //            success: function (data) {
    //                if (data == true) {
    //                    $("#divmsg").html("Record has been saved successfully !!");
    //                    $(".add").show();

    //                    $.ajax({
    //                        type: "POST",
    //                        contentType: "application/json; charset=utf-8",
    //                        url: '/Home/_Encounter',
    //                        data: "",
    //                        dataType: "json",
    //                        beforeSend: function () { },
    //                        success: function (data) {
                                

    //                        },
    //                        error: function (msg) {
                              
                               
    //                            
    //                            $("#encounter").html("");
    //                            $("#encounter").html(msg.responseText);
    //                    }
    //                      });
    //                   // setTimeout(function () { window.location.replace("/Home/Register"); }, 100);
                      
    //                }
    //                else {
    //                    alert('There is some error');
    //                }
    //            }
    //        });
    //    }

    //}


    $(function () {
        //$('.edit').click(function () {

        //    var str = $(this).attr("id").split("_");
        //    id = str[1];

        //    var EncounterAccidentDate = "#EncounterAccidentDate_" + id;
        //    var EncounterAttendingPhysician = "#EncounterAttendingPhysician_" + id;
        //    var EncounterFacility = "#EncounterFacility_" + id;
        //    var EncounterPatientType = "#EncounterPatientType_" + id;
        //    var EncounterServiceCategory = "#EncounterServiceCategory_" + id;
        //    var Payment = "#Payment_" + id;
        //    var Charges = "#Charges_" + id;
        //    var EncounterMedicalService = "#EncounterMedicalService_" + id;


        //    var spanEncounterAccidentDate = "#spanEncounterAccidentDate_" + id;
        //    var spanEncounterAttendingPhysician = "#spanEncounterAttendingPhysician_" + id;
        //    var spanEncounterFacility = "#spanEncounterFacility_" + id;
        //    var spanEncounterPatientType = "#spanEncounterPatientType_" + id;
        //    var spanEncounterServiceCategory = "#spanEncounterServiceCategory_" + id;
        //    var spanPayment = "#spanPayment_" + id;
        //    var spanCharges = "#spanCharges_" + id;
        //    var spanEncounterMedicalService = "#spanEncounterMedicalService_" + id;

        //    $(EncounterAccidentDate).show();
        //    $(spanEncounterAccidentDate).hide();
        //    $(EncounterAttendingPhysician).show();
        //    $(spanEncounterAttendingPhysician).hide();
        //    $(EncounterFacility).show();
        //    $(spanEncounterFacility).hide();

        //    $(EncounterPatientType).show();
        //    $(spanEncounterPatientType).hide();
        //    $(EncounterServiceCategory).show();
        //    $(spanEncounterServiceCategory).hide();
        //    $(Payment).show();
        //    $(spanPayment).hide();
        //    $(spanCharges).hide();
        //    $(Charges).show();
        //    $(EncounterMedicalService).show();
        //    $(spanEncounterMedicalService).hide();

        //    $(this).hide();
        //    $("#Update_" + id).show();
        //    $("#Cancel_" + id).show();
        //});

        //$('.cancel').click(function () {
        //    var str = $(this).attr("id").split("_");
        //    id = str[1];

        //    var EncounterAccidentDate = "#EncounterAccidentDate_" + id;
        //    var EncounterAttendingPhysician = "#EncounterAttendingPhysician_" + id;
        //    var EncounterFacility = "#EncounterFacility_" + id;
        //    var EncounterPatientType = "#EncounterPatientType_" + id;
        //    var EncounterServiceCategory = "#EncounterServiceCategory_" + id;
        //    var Payment = "#Payment_" + id;
        //    var Charges = "#Charges_" + id;
        //    var EncounterMedicalService = "#EncounterMedicalService_" + id;


        //    var spanEncounterAccidentDate = "#spanEncounterAccidentDate_" + id;
        //    var spanEncounterAttendingPhysician = "#spanEncounterAttendingPhysician_" + id;
        //    var spanEncounterFacility = "#spanEncounterFacility_" + id;
        //    var spanEncounterPatientType = "#spanEncounterPatientType_" + id;
        //    var spanEncounterServiceCategory = "#spanEncounterServiceCategory_" + id;
        //    var spanPayment = "#spanPayment_" + id;
        //    var spanCharges = "#spanCharges_" + id;
        //    var spanEncounterMedicalService = "#spanEncounterMedicalService_" + id;

        //    $(EncounterAccidentDate).hide();
        //    $(spanEncounterAccidentDate).show();
        //    $(EncounterAttendingPhysician).hide();
        //    $(spanEncounterAttendingPhysician).show();
        //    $(EncounterFacility).hide();
        //    $(spanEncounterFacility).show();

        //    $(EncounterPatientType).hide();
        //    $(spanEncounterPatientType).show();
        //    $(EncounterServiceCategory).hide();
        //    $(spanEncounterServiceCategory).show();
        //    $(Payment).hide();
        //    $(spanPayment).show();
        //    $(spanCharges).show();
        //    $(Charges).hide();
        //    $(EncounterMedicalService).hide();
        //    $(spanEncounterMedicalService).show();

        //    $(this).hide();
        //    $("#Edit_" + id).show();
        //    $("#Delete_" + id).show();
        //    $("#Update_" + id).hide();

        //});

        //$('.update').click(function () {
        //    
        //    var str = $(this).attr("id").split("_");
        //    id = str[1];

        //    var EncounterAccidentDate = $("#EncounterAccidentDate_" + id).val();
        //    var EncounterFacility = $("#EncounterFacility_" + id).val();
        //    var EncounterAttendingPhysician = $("#EncounterAttendingPhysician_" + id).val();
        //    var EncounterPatientType = $("#EncounterPatientType_" + id).val();
        //    var EncounterMedicalService = $("#EncounterMedicalService_" + id).val();
        //    var EncounterServiceCategory = $("#EncounterServiceCategory_" + id).val();

        //    var Charges = $("#Charges_" + id).val();
        //    var Payment = $("#Payment_" + id).val();

        //    var flag = true;
        //    if (EncounterAccidentDate == "") {
        //        $("#EncounterAccidentDate_" + id).css("border", "1px solid red");
        //        flag = false;
        //    }
        //    else {
        //        $("#EncounterAccidentDate_" + id).css("border", "0px solid red");
        //    }
        //    if (EncounterFacility == "") {
        //        $("#EncounterFacility_" + id).css("border", "1px solid red");
        //        flag = false;
        //    }
        //    else {
        //        $("#EncounterFacility_" + id).css("border", "0px solid red");
        //    }
        //    if (EncounterAttendingPhysician == "") {
        //        $("#EncounterAttendingPhysician_" + id).css("border", "1px solid red");
        //        flag = false;
        //    }
        //    else {
        //        $("#EncounterAttendingPhysician_" + id).css("border", "0px solid red");
        //    }
        //    if (EncounterPatientType == "") {
        //        $("#EncounterPatientType_" + id).css("border", "1px solid red");
        //        flag = false;
        //    }
        //    else {
        //        $("#EncounterPatientType_" + id).css("border", "0px solid red");
        //    }

        //    if (EncounterMedicalService == "") {
        //        $("#EncounterMedicalService_" + id).css("border", "1px solid red");
        //        flag = false;
        //    }
        //    else {
        //        $("#EncounterMedicalService_" + id).css("border", "0px solid red");
        //    }
        //    if (EncounterServiceCategory == "") {
        //        $("#EncounterServiceCategory_" + id).css("border", "1px solid red");
        //        flag = false;
        //    }
        //    else {
        //        $("#EncounterServiceCategory_" + id).css("border", "0px solid red");
        //    }
        //    if (Charges == "" || isNaN(parseInt(Charges)) == true) {
        //        $("#Charges_" + id).css("border", "1px solid red");
        //        flag = false;
        //    }
        //    else {
        //        $("#Charges_" + id).css("border", "0px solid red");
        //    }
        //    if (Payment == "" || isNaN(parseInt(Payment)) == true) {
        //        $("#Payment_" + id).css("border", "1px solid red");
        //        flag = false;
        //    }
        //    else {
        //        $("#Payment_" + id).css("border", "0px solid red");
        //    }

        //    if (flag == false) {
        //        return false;
        //    }


        //    if (id != "") {
        //        var model = {
        //            EncounterID: id,
        //            EncounterAccidentDate: EncounterAccidentDate,
        //            EncounterFacility: EncounterFacility,
        //            EncounterAttendingPhysician: EncounterAttendingPhysician,
        //            EncounterPatientType: EncounterPatientType,
        //            EncounterMedicalService: EncounterMedicalService,
        //            EncounterServiceCategory: EncounterServiceCategory,
        //            Charges: Charges,
        //            Payment: Payment

        //        };
        //        $.ajax({
        //            type: "POST",
        //            contentType: "application/json; charset=utf-8",
        //            url: '/Home/UpdateEncounterData',
        //            data: JSON.stringify(model),
        //            dataType: "json",
        //            beforeSend: function () {//alert(data);
        //            },
        //            success: function (data) {
        //                if (data == true) {

        //                    $("#Update_" + id).hide();
        //                    $("#Cancel_" + id).hide();
        //                    $("#Edit_" + id).show();

        //                    var EncounterAccidentDate = "#EncounterAccidentDate_" + id;
        //                    var EncounterAttendingPhysician = "#EncounterAttendingPhysician_" + id;
        //                    var EncounterFacility = "#EncounterFacility_" + id;
        //                    var EncounterPatientType = "#EncounterPatientType_" + id;
        //                    var EncounterServiceCategory = "#EncounterServiceCategory_" + id;
        //                    var Payment = "#Payment_" + id;
        //                    var Charges = "#Charges_" + id;
        //                    var EncounterMedicalService = "#EncounterMedicalService_" + id;


        //                    var spanEncounterAccidentDate = "#spanEncounterAccidentDate_" + id;
        //                    var spanEncounterAttendingPhysician = "#spanEncounterAttendingPhysician_" + id;
        //                    var spanEncounterFacility = "#spanEncounterFacility_" + id;
        //                    var spanEncounterPatientType = "#spanEncounterPatientType_" + id;
        //                    var spanEncounterServiceCategory = "#spanEncounterServiceCategory_" + id;
        //                    var spanPayment = "#spanPayment_" + id;
        //                    var spanCharges = "#spanCharges_" + id;
        //                    var spanEncounterMedicalService = "#spanEncounterMedicalService_" + id;

        //                    $(EncounterAccidentDate).hide();
        //                    $(EncounterAttendingPhysician).hide();
        //                    $(EncounterFacility).hide();
        //                    $(EncounterPatientType).hide();
        //                    $(EncounterServiceCategory).hide();
        //                    $(Payment).hide();
        //                    $(Charges).hide();
        //                    $(EncounterMedicalService).hide();

        //                    $(spanEncounterAccidentDate).show();
        //                    $(spanEncounterAttendingPhysician).show();
        //                    $(spanEncounterFacility).show();
        //                    $(spanEncounterPatientType).show();
        //                    $(spanPayment).show();
        //                    $(spanCharges).show();
        //                    $(spanEncounterServiceCategory).show()
        //                    $(spanEncounterMedicalService).show();

        //                    $(spanEncounterAccidentDate).text($(EncounterAccidentDate).val());
        //                    $(spanEncounterAttendingPhysician).text($(EncounterAttendingPhysician).val());
        //                    $(spanEncounterFacility).text($(EncounterFacility).val());
        //                    $(spanEncounterPatientType).text($(EncounterPatientType).val());
        //                    $(spanPayment).text($(Payment).val());
        //                    $(spanCharges).text($(Charges).val());
        //                    $(spanEncounterServiceCategory).text($(EncounterServiceCategory).val());
        //                    $(spanEncounterMedicalService).text($(EncounterMedicalService).val());
        //                }
        //                else {
        //                    alert('There is some error');
        //                }
        //            }
        //        });
        //    }
        //});

    });

    $(function () {
        //$('.delete').click(function () {
        //    
        //    var str = $(this).attr("id").split("_");
        //    id = str[1];

        //    var flag = confirm('Are you sure to delete ??');
        //    if (id != "" && flag) {

        //        var model = { EncounterID: id };
        //        $.ajax({
        //            type: "POST",
        //            contentType: "application/json; charset=utf-8",
        //            url: '/Home/DeleteEncounterData',
        //            data: JSON.stringify(model),

        //            dataType: "json",
        //            beforeSend: function () { },
        //            success: function (data) {
        //                if (data == true) {
        //                    $("#Update_" + id).parents("tr").remove();
        //                }
        //                else {
        //                    alert('There is some error');
        //                }
        //            }
        //        });
        //    }
        //});

    });
