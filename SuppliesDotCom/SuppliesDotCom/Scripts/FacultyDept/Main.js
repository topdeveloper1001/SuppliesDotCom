$(function () { main(); });

var main = function () {
    $("#globalCodeForm").validationEngine();
    BindCorporates("#ddlCorporate", "#hdCorporateId");

    $('#ddlCorporate').on('click', function() {
        BindFacilityByCoporateId();
    });
    $('#ddlFacility').on('click', function () {
        if ($('#ddlFacility').val() != "0") {
            GetFacilityPhycisian();
            GetFacilityDepartments();
        } else {
            $('#ddlFaculty').val(0);
            $('#divDepartmentList').empty();
            $('#divDepartments').hide();
        }
    });
};

var GetFacilityPhycisian = function () {
    var coporateId = $('#ddlCorporate').val();
    var facilityId = $('#ddlFacility').val();
    var jsonData = JSON.stringify({
        coporateId: coporateId,
        facilityId: facilityId
    });
    $.ajax({
        type: "POST",
        url: "/Home/GetFacilityPhycisian",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $('#ddlFaculty').empty();

            var items = '<option value="0">--Select--</option>';

            $.each(data, function (i, physician) {
                items += "<option value='" + physician.Id + "'>" + physician.PhysicianName + "</option>";
            });
            $('#ddlFaculty').html(items);

            if ($('#hdFacultyId').val() != '' && $('#hdFacultyId').val() != '0') {
                $('#ddlFaculty').val($('#hdFacultyId').val());
            }
        },
        error: function (msg) {
        }
    });
}

var GetFacilityDepartments = function () {
    var coporateId = $('#ddlCorporate').val();
    var facilityId = $('#ddlFacility').val();
    var jsonData = JSON.stringify({
        coporateId: coporateId,
        facilityId: facilityId
    });
    $.ajax({
        type: "POST",
        url: "/FacultyDept/GetFacilityDepartments",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $('#divDepartmentList').empty().html(data);
        },
        error: function (msg) {
        }
    });
}

var onCheckEquipment = function () {

}

var GetRoomAssignedEquipments = function () {
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
                $.each(data.equipments, function (i, rooms) {
                    $('#treeviewFacilityEquipments :CheckBox').each(function () {
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
        var checkedBoxLength = $('#treeviewFacilityDepartment input:CheckBox:checked').length;
        if (checkedBoxLength > 0) {
            var jsonData = [];
            var count = 0;
            $('#treeviewFacilityDepartment input:CheckBox').each(function () {
                if (this.checked) {
                    var text = $(this).parent().next().html();
                    var id = $(this).attr("value");
                    jsonData[count] = ({
                        GlobalCodeId: 0,
                        FacilityNumber: $('#ddlFacility').val(),
                        GlobalCodeCategoryValue: '4911',
                        GlobalCodeValue: $('#ddlFaculty').val(),
                        GlobalCodeName: $('#ddlFaculty :selected').text(),
                        GlobalCodeDesc: text,
                        ExternalValue1: id,
                        ExternalValue2: id,
                        ExternalValue3: id,
                        ExternalValue4: id,
                        ExternalValue5: id,
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

var ClearRoomEquipmentScheduling = function () {
    $("#globalCodeForm").clearForm();
}

var EditFacultyDept = function (roomId, facilityId, corporteId) {
    $('#hdCorporateId').val(corporteId);
    $('#ddlCorporate').val(corporteId);
    $('#hdFacilityId').val(facilityId);
    BindFacilityByCoporateId();
    GetFacilityEquipments();
    $('#hdRoomId').val(roomId);
    GetFacilityRooms();
}

var DeleteFacultyDept = function (id, facilityId) {
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

var AddDeptTimming = function () {
    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (isValid) {
        var checkedBoxLength = $('#treeviewFacilityDepartment input:CheckBox:checked').length;
        if (checkedBoxLength > 0) {
            var htmlStr = "";
            $('#treeviewFacilityDepartment input:CheckBox').each(function() {
                if (this.checked) {
                    var text = $(this).parent().next().html();
                    var id = $(this).attr("value");
                    for (var i = 1; i <= 7; i++) {
                        htmlStr += '<tr class="divDaysSectionShow_' + i + '_' + id + '">' + '<td id="divDaysSection" class="tdCheckboxes">' +
                            '<input type="checkbox" name="chkDays" id="' + i + '_' + id + '" onchange="ShowHideTimming(this.id); ">' + '</td>' +
                            '<td>' + $('#ddlFaculty :selected').text() + '</td>' +
                            '<td>' + text + '</td>' +
                            '<td>' + getWeekDay(i) + '</td>' +
                            '<td><input type="text" id="txtDeptOpeningTime__' + i + '_' + id + '" onchange="BindTextBoxValidation(this.id); " class = "dtGeneralTimeOnly clearField" onchange = "BindTextBoxValidation("' + i + '")" disabled = "disabled"></td>' +
                            '<td><input type="text" id="txtDeptClosingTime__' + i + '' + id + '" class = "dtGeneralTimeOnly clearField" disabled = "disabled"></td>' +
                            '</tr>';
                    }
                    htmlStr += '<tr><td colspan="6">&nbsp;</td>';
                }
            });
            $('#divDepartments').show();
            $('#tbodyOpeningDays').empty().html(htmlStr);
            $('#divSaveButton').show();
            InitializeDateTimePicker();
        } else {
            $('#divDepartments').hide();
            $('#tbodyOpeningDays').empty();
            $('#divSaveButton').hide();
        }
    }
}

var getWeekDay =function(number) {
    var weekday = new Array(8);
    weekday[0] = "NA";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[7] = "Sunday";
    return weekday[number];
}

var ShowHideTimming = function (id) {
    var checked = $('#' + id).prop('checked');;
    if (checked) {
        $('.divDaysSectionShow_' + id + ' input').removeAttr('disabled');
        $('.divDaysSectionShow_ ' + id + ' input').val('');
        $('.divDaysSectionShow_' + id + ' input').addClass('validate[required]');

    } else {
        $('.divDaysSectionShow_' + id + ' input').attr('disabled', true);
        $('.divDaysSectionShow_' + id + ' input').val('');
        $('.divDaysSectionShow_' + id + ' input').removeClass('validate[required]');
    }
}

var BindTextBoxValidation = function (id) {
    var minvalue = $("#txtDeptOpeningTime_" + id).val();
    if (minvalue.indexOf(':') > 0) {
        var minvalueInterval = minvalue.split(':')[1];
        minvalue = minvalueInterval == "00" ? minvalue.split(':')[0] + ":30" : (parseInt(minvalue.split(':')[0], 10) + 1) + ":00";
    }
    $("#txtDeptClosingTime_" + id).datetimepicker({
        datepicker: false,
        format: 'H:i',
        step: 30,
        mask: true,
        minTime: minvalue
    });
}