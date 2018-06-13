$(function () {
    $("#FacilityStructureFormDiv").validationEngine();
    $("#ddlRooms").change(function () {
        var selected = $(this).val();
        if (selected > 0)
            GetDepartmentOnRoomSelection(selected);
        else
            $("#lblDepartment").text('');
        EditRoom(selected);
    });
    //BindFacilityDropdownFilterInEquipment();
    BindFacilityData("#ddlFacility", "#CurrentFacilityStructure_FacilityId");
    $("#ddlFacility").change(function () {
        var selected = $(this).val();
        if (selected > 0) {
            BindRoomsInFacilityStructure();
            BindAppointmentList();
            BindAppointmentRoomAssignmentList();
        }
    });


    if ($("#btnSearch").length > 0) {
        $("#btnSearch").click(function () {
            BindAppointmentRoomAssignmentList();
        });
    }
});

function EditFacilityStructure(id) {
    var jsonData = JSON.stringify({
        facilityStructureId: id
    });
    $.ajax({
        type: "POST",
        url: '/FacilityStructure/GetFacilityStructure',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {

                var selectedAppointments = $('#hdAppointments').val();
                if (selectedAppointments != null && selectedAppointments != '') {
                    if (selectedAppointments.indexOf(',') != -1) {
                        var selectAp = selectedAppointments.split(',');
                        $("#divAppointments").find("input[type=checkbox]").each(function () {
                            if (selectAp.indexOf($(this).val()) != -1) {
                                $(this).prop("checked", "checked");
                            }
                        });
                    } else {
                        $("#divAppointments").find("input[type=checkbox]").each(function () {
                            if (selectedAppointments.indexOf($(this).val()) != -1) {
                                $(this).prop("checked", "checked");
                            }
                        });
                    }
                }
            }
        },
        error: function (msg) {

        }
    });
}

function ClearAppointmentRoomsAssForm() {
    var selectedFacility = $("#ddlFacility").val();
    $("#FacilityStructureFormDiv").clearForm(true);
    $.validationEngine.closePrompt(".formError", true);
    $('#FacilityStructureDiv').removeClass('in');
    $('#FacilityStructureListingDiv').addClass('in');
    $("#btnSave").val("Save");
    $("#ddlFacility").val(selectedFacility);
}

function BindFacilityData(selector, hidValueSelector) {
    $.ajax({
        type: "POST",
        url: "/FacilityStructure/BindFacilityData",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, facility) {
                    items += "<option value='" + facility.Value + "'>" + facility.Text + "</option>";
                });
                $(selector).html(items);
                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0) {
                    $(selector).val($(hidValueSelector).val());
                    $(hidValueSelector).val('');
                    BindRoomsInFacilityStructure();
                    BindAppointmentList();
                }
            }
        },
        error: function (msg) {
        }
    });
}

function BindAppointmentList() {
    if ($("#ddlFacility").val() > 0) {
        $.ajax({
            type: "POST",
            url: "/FacilityStructure/BindAppointmentListByFacility",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                facilityId: $("#ddlFacility").val(),
            }),
            success: function (data) {
                BindList("#divAppointments", data);
            },
            error: function (msg) {
            }
        });
    }
}

function BindRoomsInFacilityStructure() {
    if ($("#ddlFacility").val() > 0) {
        $.ajax({
            type: "POST",
            url: "/Equipment/BindRoomsInEquipments",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                facilityId: $("#ddlFacility").val(),
            }),
            success: function (data) {

                if (data) {
                    var items = '<option value="0">--Select--</option>';
                    $.each(data, function (i, appt) {
                        items += "<option value='" + appt.FacilityStructureId + "'>" + appt.FacilityStructureName + "</option>";
                    });
                    $("#ddlRooms").html(items);
                }
                else {
                }
            },
            error: function (msg) {
            }
        });
    }
}

function SaveRoomWithEquipment() {

    var isValid = jQuery("#FacilityStructureFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var roomId = $("#ddlRooms").val();
        var selected = '';
        $('#checkBox_AppointmentTypes input:checked').each(function () {
            selected += '' + $(this)[0].value + ',';

        });
        var appList = selected != '' ? selected.slice(0, -1) : '';
        //if (appList != "" && appList.length>0) {

        //  } else {
        //      ShowMessage("Please select Appointment First", "Alert", "error", true);
        //      return false;

        //  }
        var jsonData = JSON.stringify({
            facilityStructureId: roomId,
            appointmentTypeIds: appList
        });
        $.ajax({
            type: "POST",
            url: '/FacilityStructure/SaveAppointmentRooms',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                var msg = "Records updated successfully.";
                if (data) {
                    ShowMessage(msg, "Success", "success", true);
                    ClearAppointmentRoomsAssForm();
                    BindAppointmentList();
                    BindAppointmentRoomAssignmentList();
                } else {
                    msg = "Error while updating records. Please try again later!";
                    ShowMessage(msg, "Alert", "error", true);
                }

            },
            error: function (response) {

            }
        });
    }

}

function BindAppointmentRoomAssignmentList() {
    if ($("#ddlFacility").val() > 0) {
        $.ajax({
            type: "POST",
            url: "/FacilityStructure/BindAppointmentRoomAssignmentList",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                facilityId: $("#ddlFacility").val(),
                txtSearch: $("#txtAppSearch").val()
            }),
            success: function (data) {
                BindList("#FacilityStructureListDiv", data);
            },
            error: function (msg) {
            }
        });
    }
}

function EditRoom(facilityStructureId) {
    //$('#divAppointments').find('input[type=checkbox]:checked').remove();

    $('input[type=checkbox]:checked').each(function () {
        this.checked = false;
    });


    var jsonData = JSON.stringify({
        facilityStructureId: facilityStructureId
    });
    $.ajax({
        type: "POST",
        url: '/FacilityStructure/EditAppointmentTypeRoomStructure',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        async: false,
        success: function (data) {

            if (data != null) {
                $("#btnSave").val("Update");
                $('#FacilityStructureDiv').addClass('in').attr('style', 'height:auto;');
                var selectedAppointments = data.ExternalValue4;
                var selectedFacility = data.FacilityId;
                var roomId = data.FacilityStructureId;
                $("#CurrentFacilityStructure_FacilityId").val(selectedFacility);
                $("#ddlFacility").val(selectedFacility);
                $("#ddlRooms").val(roomId);
                GetDepartmentOnRoomSelection(roomId);
                if (selectedAppointments != null && selectedAppointments != '') {
                    if (selectedAppointments.indexOf(',') != -1) {
                        var selectAp = selectedAppointments.split(',');
                        $("#divAppointments").find("input[type=checkbox]").each(function () {
                            if (selectAp.indexOf($(this).val()) != -1) {
                                $(this).prop("checked", "checked");
                            }
                        });
                    } else {
                        $("#divAppointments").find("input[type=checkbox]").each(function () {
                            if (selectedAppointments.indexOf($(this).val()) != -1) {
                                $(this).prop("checked", "checked");
                            }
                        });

                    }
                } else {
                    $("#btnSave").val('Save');

                }
                $('#FacilityStructureListingDiv').removeClass('in');
                $('#FacilityStructureDiv').addClass('in');
                $('html,body').animate({ scrollTop: $("#FacilityStructureFormDiv").offset().top }, 'fast');
            }
        },
        error: function (msg) {

        }
    });
}



function GetDepartmentOnRoomSelection(roomId) {

    if (roomId > 0) {
        $.ajax({
            type: "POST",
            url: "/Home/GetDepartmentNameByRoomId",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: JSON.stringify({
                roomId: roomId
            }),
            success: function (data) {
                if (data != null && data.length > 0) {
                    $("#lblDepartment").text(data);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
}



