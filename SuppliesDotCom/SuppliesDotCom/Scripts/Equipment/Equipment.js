$(function () {
    $("#EquipmentDiv").validationEngine();
    BindCorporateDataInEquipment();
    $("#ddlFacilityFilter").change(function () {
        var selected = $(this).val();
        $("#hfFacilityId").val(selected > 0 ? selected : "");
    });
    ShowHideTextBox();
    BindFacilityDeapartments('#txtEquipmentBaseLocation', '#hdFacultyDepartment');

    $("#txtEquipmentDisabledDate").prop("disabled", "disabled");
    $("#ChkEquipmentDisabled").change(function () {
        var checked = $(this)[0].checked;
        $("#txtEquipmentDisabledDate").prop("disabled", !checked);
    });

    //$("#ddlRooms").change(function () {
    //    var selected = $(this).val();
    //    if (selected > 0)
    //        GetDepartmentOnRoomSelection(selected);
    //    else
    //        $("#lblDepartment").text('');
    //});
});

// To save and update the equipment
function SaveEquipment() {

    var isValid = jQuery("#EquipmentDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var id = $("#EquipmentMasterId").val();
        var txtCorporateId = $("#ddlCorporate").val();
        var txtFacilityNumber = $("#ddlFacilityFilter").val();
        var txtEquipmentModel = $("#txtEquipmentModel").val();
        var chkEquipmentDisabled = $('#ChkEquipmentDisabled')[0].checked;
        var txtEquipmentName = $("#txtEquipmentName").val();
        //var txtEquipmentDisabledDate = new Date($("#txtEquipmentDisabledDate").val());
        var txtEquipmentDisabledDate = $("#hdDisableDate").val();          //Value From Hidden Field
        var txtEquipmentEnableDate = $("#hdEnableDate").val();              //Value From Hidden Field
        var equipmentSerialNumber = $("#txtEquipmentSerialNumber").val();
        var equipmentAcuistionDate = new Date($("#txtEquipmentAquistionDate").val());
        var chkEquipmentIsInsured = $('#ChkEquipmentIsInsured')[0].checked;
        var chkIsEquipmentFixed = $('#rdBaseLocation').is(':checked');
        var txtTrunAroundTime = $("#txtTrunAroundTime").val();
        var txtEquipmentBaseLocation = $("#txtEquipmentBaseLocation").val();
        var txtRooms = $("#ddlRooms").val();

        var jsonData = JSON.stringify({
            EquipmentMasterId: id,
            CorporateId: txtCorporateId,
            FacilityId: txtFacilityNumber,
            EquipmentName: txtEquipmentName,
            EquipmentType: null,
            EquipmentModel: txtEquipmentModel,
            EquipmentDisabled: chkEquipmentDisabled,
            EquipmentDisabledDate: txtEquipmentDisabledDate,
            EquipmentSerialNumber: equipmentSerialNumber,
            EquipmentIsInsured: chkEquipmentIsInsured,
            EquipmentAquistionDate: equipmentAcuistionDate,
            IsEquipmentFixed: chkIsEquipmentFixed,
            TurnAroundTime: txtTrunAroundTime,
            BaseLocation: txtEquipmentBaseLocation,
            FacilityStructureId: txtRooms,
            EquipmentEnableDate: txtEquipmentEnableDate
        });

        $.ajax({
            type: "POST",
            url: '/Equipment/SaveEquipment',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data) {
                    var facilityId = $("#ddlFacilityFilter").val();
                    ClearAll();
                    BindEquipmentGrid(facilityId);
                    var msg = "Records Saved successfully !";
                    if (id > 0)
                        msg = "Records updated successfully";
                    ShowMessage(msg, "Success", "success", true);
                }
                else {
                }
            },
            error: function (msg) {
            }
        });
    }
    return false;
}

function EditEquipment(id) {
    var jsonData = JSON.stringify({
        Id: id
    });
    $.ajax({
        type: "POST",
        url: '/Equipment/GetEquipmentsData',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                BindEquipmentData(data);
                InitializeDateTimePicker();
                $('#collapseOne').addClass('in').attr('style', 'height:auto;');
            }
        },
        error: function (msg) {
        }
    });
}

function ViewEquipment(id) {
    var txtFacilityId = id;
    var jsonData = JSON.stringify({
        Id: txtFacilityId,
        ViewOnly: 'true'
    });
    $.ajax({
        type: "POST",
        url: '/Equipment/GetEquipment',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#EquipmentDiv').empty();
            $('#EquipmentDiv').html(data);
            $('#collapseOne').addClass('in');
        },
        error: function (msg) {
        }
    });
}


function DeleteEquipment() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var txtFacilityId = $("#hfGlobalConfirmId").val();
        var jsonData = JSON.stringify({
            Id: txtFacilityId,
            IsDeleted: true,
            DeletedBy: 1,//Put logged in user id here
            DeletedDate: new Date(),
            IsActive: false,
            ShowDisabled: $("#chkShowInActive")[0].checked
        });
        $.ajax({
            type: "POST",
            url: '/Equipment/DeleteEquipment',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                if (data == "1") {
                    ShowMessage("Equipment is Schedule, You Can Not Delete It!", "Warning", "warning", true);
                    return false;
                }
                if (data) {
                    $('#EquipmentGrid').empty();
                    $('#EquipmentGrid').html(data);
                    ShowMessage("Equipment Deleted Successfully!", "Warning", "warning", true);
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
}

//function DeleteEquipment(id) {
//    /// <summary>
//    /// Deletes the equipment.
//    /// </summary>
//    /// <param name="id">The identifier.</param>
//    /// <returns></returns>
//    if (confirm("Do you want to delete this record? ")) {
//        var txtFacilityId = id;
//        var jsonData = JSON.stringify({
//            Id: txtFacilityId,
//            IsDeleted: true,
//            DeletedBy: 1,//Put logged in user id here
//            DeletedDate: new Date(),
//            IsActive: false,
//            ShowDisabled: $("#chkShowInActive")[0].checked
//        });
//        $.ajax({
//            type: "POST",
//            url: '/Equipment/DeleteEquipment',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                if (data == "1") {
//                    ShowMessage("Equipment is Schedule, You Can Not Delete It!", "Warning", "warning", true);
//                    return false;
//                } 
//                if (data) {
//                    $('#EquipmentGrid').empty();
//                    $('#EquipmentGrid').html(data);
//                    ShowMessage("Equipment Deleted Successfully!", "Success", "info", true);
//                }
//                else {
//                    return false;
//                }
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//    return false;
//}

function BindEquipmentGrid(facilityId) {
    var jsonData = JSON.stringify({
        facilityId: facilityId
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Equipment/BindEquipmentList",
        dataType: "html",
        async: false,
        data: jsonData,
        success: function (data) {
            $("#EquipmentGrid").empty();
            $("#EquipmentGrid").html(data);
            ShowHideTextBox();
            SetGridPaging("BindEquipmentList", "Index");
            BindCorporateDataInEquipment();
            //BindGlobalCodesWithValue("#ddlGlobalCodeName", 4901, '');
            //BindAppointmentTypes();
            BindFacilityDeapartments('#txtEquipmentBaseLocation', '#hdFacultyDepartment');
        },
        error: function (msg) {
            //alert(msg);
        }

    });
}

function ClearForm() {
    $.validationEngine.closePrompt(".formError", true);
    $("#EquipmentDiv").clearForm();
    $('#collapseOne').removeClass('in');
    $('#collapseTwo').addClass('in');
    $("#lblDepartment").text('');
}

function ClearAll() {
    $.validationEngine.closePrompt(".formError", true);
    var jsonData = JSON.stringify({
        Id: 0,
    });
    $.ajax({
        type: "POST",
        url: '/Equipment/ResetEquipmentForm',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#EquipmentDiv').empty();
            $('#EquipmentDiv').html(data);
            $('#collapseTwo').addClass('in');
            $('#collapseOne').removeClass('in');
            $("#EquipmentDiv").validationEngine();
            InitializeDateTimePicker();//initialize the datepicker by ashwani
            BindCorporateDataInEquipment();

        },
        error: function (msg) {
        }
    });
}

function BindCorporateDataInEquipment() {
    //Bind Corporates
    /// <summary>
    /// Binds the corporates.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: "/Home/GetCorporatesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, "#ddlCorporate", "#hfCorporateId");
            var corporaeIdFilter = $("#ddlCorporate").val();
            if (corporaeIdFilter > 0) {
                BindFacilityDropdownFilterInEquipment(corporaeIdFilter);
            }
        },
        error: function (msg) {
        }
    });
}

function BindFacilityDropdownFilterInEquipment(cId) {
    if (cId > 0) {
        $.ajax({
            type: "POST",
            url: "/Home/GetFacilitiesbyCorporate",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ corporateid: cId }),
            success: function (data) {
                BindDropdownData(data, "#ddlFacilityFilter", "#hfFacilityId");
                if ($("#ddlFacilityFilter").val() == null)
                    $("#ddlFacilityFilter")[0].selectedIndex = 0;

                var facilityFilter = $("#ddlFacilityFilter").val();
                if (facilityFilter > 0) {
                    BindRoomsInEquipments();
                    //BindAppointmentTypes(cId, facilityFilter);
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }
    else {
        BindDropdownData('', "#ddlFacilityFilter", "");
        $("#ddlFacilityFilter")[0].selectedIndex = 0;
    }
    $("#hfCorporateId").val(cId > 0 ? cId : "");
}

function ShowBaseLocation(selector) {
    if ($(selector)[0].checked) {
        $("#txtBaseLocation").show();
    } else {

        $("#txtBaseLocation").hide();

    }
}

function ShowInActiveRecordsEquipment(chkSelector) {
    $("#chkShowDeleted").prop('checked', false);
    var facilityId = $("#ddlFacilityFilter").val();
    //$("#chkActive").prop("checked", false);

    //== true ? false : true
    var active = $(chkSelector)[0].checked;
    var isDisabled = active;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Equipment/BindDisabledRecords",
        data: JSON.stringify({
            showIsDisabled: isDisabled,
            facilityId: facilityId
        }),
        dataType: "html",

        success: function (data) {

            if (data != null) {
                $("#EquipmentGrid").empty();
                $("#EquipmentGrid").html(data);
            }
        },
        error: function (msg) {

        }
    });
}

function BindEquipmentData(data) {
    $("#collapseOne").addClass("in");
    $("#EquipmentMasterId").val(data.EquipmentMasterId);
    //$("#ddlGlobalCodeName").val(data.EquipmentType);
    $("#ddlCorporate").val(data.CorporateId);
    $("#txtEquipmentName").val(data.EquipmentName);
    $("#txtEquipmentSerialNumber").val(data.EquipmentSerialNumber);
    $("#ddlFacilityFilter").val(data.FacilityId);
    $("#txtEquipmentAquistionDate").val(data.EquipmentAquistionDate);
    $("#txtEquipmentModel").val(data.EquipmentModel);
    $("#txtEquipmentDisabledDate").val(data.EquipmentDisabledDate);
    $("#txtTrunAroundTime").val(data.TurnAroundTime);
    $("#ChkEquipmentDisabled").prop("checked", data.EquipmentDisabled);
    $('#rdBaseLocation').prop('checked', data.IsEquipmentFixed);
    $('#ChkEquipmentIsInsured').prop('checked', data.EquipmentIsInsured);
    $("#txtEquipmentBaseLocation").val(data.BaseLocation);
    $("#ddlRooms").val(data.FacilityStructureId);
    GetDepartmentOnRoomSelection(data.FacilityStructureId);
    $("#txtEquipmentDisabledDate").prop("disabled", !data.EquipmentDisabled);

    if (data.IsEquipmentFixed) {
        $("#txtBaseLocation").show();
    } else {
        $("#txtBaseLocation").hide();
    }
}

function ShowHideTextBox() {
    if ($('#checkbox').attr('checked')) {
        $("#txtBaseLocation").show();
    } else {
        $("#txtBaseLocation").hide();
    }
}

function BindFacilityDeapartments(selector, hidValueSelector) {
    $.ajax({
        type: "POST",
        url: "/Home/GetFacilityDeapartments",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, deaprtments) {
                    items += "<option value='" + deaprtments.Value + "'>" + deaprtments.Text + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function BindRoomsInEquipments() {
    if ($("#ddlFacilityFilter").val() > 0) {
        $.ajax({
            type: "POST",
            url: "/Equipment/BindRoomsInEquipments",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                facilityId: $("#ddlFacilityFilter").val(),
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


function GetDepartmentOnRoomSelection(roomId) {
    if (roomId > 0) {
        $.ajax({
            type: "POST",
            url: "/Home/GetDepartmentNameByRoomId",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
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




function ShowDeletedEquipment() {

    var facilityId = $("#ddlFacilityFilter").val();
    //$("#chkActive").prop("checked", false);
    $("#chkShowInActive").prop('checked', false);
    //== true ? false : true
    var active = $("#chkShowDeleted").is(':checked');
    var isDeleted = active;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Equipment/BindDeletedRecords",
        data: JSON.stringify({
            showIsDeleted: isDeleted,
            facilityId: facilityId
        }),
        dataType: "html",

        success: function (data) {

            if (data != null) {
                $("#EquipmentGrid").empty();
                $("#EquipmentGrid").html(data);
            }
        },
        error: function (msg) {

        }
    });
}


function DeactivateActivateEquipment(equipmentId,activeDeactive,e) {
    var id = equipmentId;
    var txtCorporateId = $("#ddlCorporate").val();
    var txtFacilityNumber = $("#ddlFacilityFilter").val();
    var txtEquipmentModel = $("#txtEquipmentModel").val();
    var chkEquipmentDisabled = $('#ChkEquipmentDisabled')[0].checked;
    var txtEquipmentName = $("#txtEquipmentName").val();
    var txtEquipmentDisabledDate = $("#hdDisableDate").val();          //Value From Hidden Field
    var txtEquipmentEnableDate = $("#hdEnableDate").val();              //Value From Hidden Field
    var equipmentSerialNumber = $("#txtEquipmentSerialNumber").val();
    var equipmentAcuistionDate = new Date($("#txtEquipmentAquistionDate").val());
    var chkEquipmentIsInsured = $('#ChkEquipmentIsInsured')[0].checked;
    var chkIsEquipmentFixed = $('#rdBaseLocation').is(':checked');
    var txtTrunAroundTime = $("#txtTrunAroundTime").val();
    var txtEquipmentBaseLocation = $("#txtEquipmentBaseLocation").val();
    var txtRooms = $("#ddlRooms").val();
    var activeDeactiveBit = activeDeactive;

    var jsonData = JSON.stringify({
        EquipmentMasterId: id,
        CorporateId: txtCorporateId,
        FacilityId: txtFacilityNumber,
        EquipmentName: txtEquipmentName,
        EquipmentType: null,
        EquipmentModel: txtEquipmentModel,
        EquipmentDisabled: chkEquipmentDisabled,
        EquipmentDisabledDate: txtEquipmentDisabledDate,
        EquipmentSerialNumber: equipmentSerialNumber,
        EquipmentIsInsured: chkEquipmentIsInsured,
        EquipmentAquistionDate: equipmentAcuistionDate,
        IsEquipmentFixed: chkIsEquipmentFixed,
        TurnAroundTime: txtTrunAroundTime,
        BaseLocation: txtEquipmentBaseLocation,
        FacilityStructureId: txtRooms,
        EquipmentEnableDate: txtEquipmentEnableDate,
        ActiveDeactive: activeDeactiveBit,
});
    $.ajax({
        type: "POST",
        url: '/Equipment/DeactivateActivateEquipment',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data != null) {
             $(e).closest('tr').remove();
            }
        },
        error: function (msg) {
        }
    });
}


function SortEquipmentGrid(event) {
    var url = "";
    $("#chkShowDeleted").prop('checked', false);
    var facilityId = $("#ddlFacilityFilter").val();
    var chkActiveData = $("#chkShowInActive").is(':checked');
    var chkDeleted = $("#chkShowDeleted").is(':checked');
    if (chkDeleted) {
        url = "/Equipment/BindDeletedRecords";
        if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
            url += "?showIsDeleted=" + chkDeleted + "&facilityId=" + facilityId + "&" + event.data.msg;
        }
    } else if (chkActiveData) {
        url = "/Equipment/BindDisabledRecords";
        if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
            url += "?showIsDisabled=" + chkActiveData + "&facilityId=" + facilityId + "&" + event.data.msg;
        }
    } else {
        url = "/Equipment/BindEquipmentList";
        if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
            url += "?facilityId=" + facilityId + "&" + event.data.msg;
        }
    }

   $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#EquipmentGrid").empty();
            $("#EquipmentGrid").html(data);
        },
        error: function () {
        }
    });
}