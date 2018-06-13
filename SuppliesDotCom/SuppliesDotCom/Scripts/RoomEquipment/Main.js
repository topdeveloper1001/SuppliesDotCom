$(function() { main(); });

var main = function () {
    $("#globalCodeForm").validationEngine();
    BindCorporates("#ddlCorporate", "#hdCorporateId");

    $('#ddlCorporate').on('click', function () { BindFacilityByCoporateId(); });
    $('#ddlFacility').on('click', function() {
        GetFacilityRooms();
        GetFacilityEquipments();
    });
    $('#ddlRooms').on('click', function () { GetRoomAssignedEquipments(); });
};

var GetFacilityRooms = function () {
    var coporateId = $('#ddlCorporate').val();
    var facilityId = $('#ddlFacility').val();
    var jsonData = JSON.stringify({
        coporateId: coporateId,
        facilityId: facilityId
    });
    $.ajax({
        type: "POST",
        url: "/Home/GetFacilityRooms",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $('#ddlRooms').empty();

            var items = '<option value="0">--Select--</option>';

            $.each(data, function (i, rooms) {
                items += "<option value='" + rooms.FacilityStructureId + "'>" + rooms.FacilityStructureName + "</option>";
            });
            $('#ddlRooms').html(items);

            if ($('#hdRoomId').val() != '' && $('#hdRoomId').val() != '0') {
                $('#ddlRooms').val($('#hdRoomId').val());
                setTimeout(GetRoomAssignedEquipments(), 500);
            }
        },
        error: function (msg) {
        }
    });
}

var GetFacilityEquipments = function() {
    var coporateId = $('#ddlCorporate').val();
    var facilityId = $('#ddlFacility').val();
    var jsonData = JSON.stringify({
        coporateId: coporateId,
        facilityId: facilityId
    });
    $.ajax({
        type: "POST",
        url: "/RoomEquipment/GetFacilityEquipments",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#divEquipmentList').empty().html(data);
        },
        error: function (msg) {
        }
    });
}

var onCheckEquipment = function() {
    
}

var GetRoomAssignedEquipments = function() {
    var facilityId = $('#ddlFacility').val();
    var roomId = $('#ddlRooms').val();
    var jsonData = JSON.stringify({
        facilityId: facilityId,
        roomId: roomId
    });
    $.ajax({
        type: "POST",
        url: "/RoomEquipment/GetRoomEquipments",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            var tree = $("#treeviewFacilityEquipments").data("kendoTreeView");
            $('#treeviewFacilityEquipments :CheckBox').each(function () {
                tree.dataItem(this).checked = false;
            });
            if (data.equipments.length > 0) {
                $.each(data.equipments, function(i, rooms) {
                    $('#treeviewFacilityEquipments :CheckBox').each(function() {
                        if ($(this).attr('value') == rooms) {
                            tree.dataItem(this).checked = true;
                            $(this).prop('checked', true);
                        }
                    });
                });
            } 
        },
        error: function (msg) {
        }
    });
}

var ValidateData = function () {
    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (isValid) {
        var checkedBoxLength = $('#treeviewFacilityEquipments input:CheckBox:checked').length;
        if (checkedBoxLength > 0) {
            var jsonData = [];
            var count = 0;
            $('#treeviewFacilityEquipments input:CheckBox').each(function() {
                if (this.checked) {
                    var text = $(this).parent().next().html();
                    var id = $(this).attr("value");
                    jsonData[count] = ({
                        GlobalCodeId: 0,
                        FacilityNumber: $('#ddlFacility').val(),
                        GlobalCodeCategoryValue: '4910',
                        GlobalCodeValue: id,
                        GlobalCodeName: text,
                        ExternalValue1: $('#ddlRooms').val(),
                        IsActive: true,
                    });
                    count++;
                }
            });
            var jsonD = JSON.stringify(jsonData);
            $.ajax({
                type: "POST",
                url: '/RoomEquipment/SaveRoomEquipments',
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "html",
                data: jsonD,
                success: function (data) {
                    //if (data) {
                    //} else {
                    //    ShowMessage('Error while saving record!', "Warning", "warning", true);
                    //}
                    ClearRoomEquipmentScheduling();
                    ShowMessage('Records Saved Successfully!', "Success", "success", true);
                    $('#GlobalCodesList').empty().html(data);
                },
                error: function (msg) {
                    ShowMessage('Error while saving record!', "Warning", "warning", true);
                }
            });
        } else {
            ShowMessage('Select any equipment first!', "Warning", "warning", true);
        }
    }
};

var ClearRoomEquipmentScheduling = function() {
    $("#globalCodeForm").clearForm();
}

var EditRoomEquipment = function(roomId,facilityId,corporteId) {
    $('#hdCorporateId').val(corporteId);
    $('#ddlCorporate').val(corporteId);
    $('#hdFacilityId').val(facilityId);
    BindFacilityByCoporateId();
    GetFacilityEquipments();
    $('#hdRoomId').val(roomId);
    GetFacilityRooms();
}

var DeleteRoomEquipment = function(id,facilityId) {
    var jsonData = JSON.stringify({
        globalCodeid: id,
        facilityNumber: facilityId
    });
    $.ajax({
        type: "POST",
        url: "/RoomEquipment/DeleteEquipment",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            ShowMessage('Records deleted Successfully!', "Success", "success", true);
            $('#GlobalCodesList').empty().html(data);
        },
        error: function (msg) {
            ShowMessage('Error while deleting record!', "Warning", "warning", true);
        }
    });
};