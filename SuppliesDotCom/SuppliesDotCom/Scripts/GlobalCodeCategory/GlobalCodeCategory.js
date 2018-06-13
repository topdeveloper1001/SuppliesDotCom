function SaveGlobalCodeCategory(globalCodeCategoryId) {
    var isValid = jQuery("#GlobalCodeCategoryDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var ddlFacilityNumber = $("#ddlFacilityNumber").val();
        if (ddlFacilityNumber == "" || ddlFacilityNumber == null) {
            alert("Please select facility");
            return false;
        }
        var realvalues = [];
        var textvalues = [];
        $('#SelectRight option').each(function (i, selected) {
            realvalues[i] = $(selected).val();
            textvalues[i] = $(selected).text();
        });
        var txtCreatedBy = 1;
        var dNow = new Date();
        var txtCreatedDate = (dNow.getMonth() + 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
        var jsonData = [];
        for (var i = 0; i < realvalues.length; i++) {
            jsonData[i] = {
                'FacilityNumber': ddlFacilityNumber,
                'GlobalCodeCategoryValue': realvalues[i],
                'GlobalCodeCategoryName': textvalues[i],
                'CreatedBy': txtCreatedBy,
                'CreatedDate': txtCreatedDate,
                'IsActive': 1,
                'IsDeleted': 0
            };
        };
        var jsond = JSON.stringify(jsonData);
        $.ajax({
            type: "POST",
            url: '/GlobalCodeCategory/SaveCategory',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsond,
            success: function (data) {
                BindFacilityDropdownData('');
                $('#SelectRight').empty();
            },
            error: function (msg) {
                
            }
        });
    }
    return false;
}

$(function () {
    $("#MoveRight,#MoveLeft").click(function (event) {
        var id = $(event.target).attr("id");
        var selectFrom = id == "MoveRight" ? "#SelectLeft" : "#SelectRight";
        var moveTo = id == "MoveRight" ? "#SelectRight" : "#SelectLeft";

        var selectedItems = $(selectFrom + " :selected").toArray();
        $(moveTo).append(selectedItems);
        selectedItems.remove;
        sortDropDownListByText(moveTo);
    });
    $("#GlobalCodeCategoryDiv").validationEngine();
    BindFacilityDropdownData('');
    BindGlobalCodeCategories();
});

function sortDropDownListByText(id) {
    // Loop for each select element on the page.
    $(id).each(function () {

        // Keep track of the selected option.
        var selectedValue = $(this).val();

        // Sort all the options by text. I could easily sort these by val.
        $(this).html($("option", $(this)).sort(function (a, b) {
            return a.text == b.text ? 0 : a.text < b.text ? -1 : 1;
        }));

        // Select one option.
        $(this).val(selectedValue);
    });
}

function OnChangeFacility(ddlFacility) {
    var facilityId = $(ddlFacility).val();
    if (facilityId != '' && facilityId != null) {
        GetGlobalCodeCategoriesByFacilityId(facilityId);
    }
    //alert(val);
    return false;
}

function GetGlobalCodeCategoriesByFacilityId(facilityId) {
    var jsonData = JSON.stringify({
        FacilityNumber: facilityId,
        ViewOnly: ''
    });
    $.ajax({
        type: "POST",
        url: '/GlobalCodeCategory/GetFacilityGlobalCodeCategories',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data1) {
            $("#SelectRight").empty();
            $.each(data1, function (i, code) {
                $("#SelectRight").append('<option value="' + code.GlobalCodeCategoryValue + '">' + code.GlobalCodeCategoryName + '</option>');
                $("#SelectLeft").remove('[value=' + code.GlobalCodeCategoryId + ']');                
            });  
        },
        error: function (msg1) {
        }
    });


}

function BindFacilityDropdownData(facilityId) {
    $.ajax({
        type: "POST",
        url: '/Physician/GetFacilities',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: null,
        success: function (data) {
            $('#ddlFacilityNumber').empty();

            var items = '<option value="0">--Select--</option>';
            $.each(data, function (i, facility) {
                items += "<option value='" + facility.Value + "'>" + facility.Text + "</option>";
            });

            $('#ddlFacilityNumber').html(items);

            if (facilityId != '')
                $('#ddlFacilityNumber').val(facilityId);
        },
        error: function (msg) {
            
        }
    });
}

function BindGlobalCodeCategories() {
    $.ajax({
        type: "POST",
        url: '/GlobalCodeCategory/GetGlobalCodeCategoriesByNullFacility',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: null,
        success: function (data) {
            $('#SelectLeft').empty();
            var items = '';
            $.each(data, function (i, gc) {
                items += "<option value='" + gc.GlobalCodeCategoryValue + "'>" + gc.GlobalCodeCategoryName + "</option>";
            });

            $('#SelectLeft').html(items);
        },
        error: function (msg) {
            
        }
    });
}