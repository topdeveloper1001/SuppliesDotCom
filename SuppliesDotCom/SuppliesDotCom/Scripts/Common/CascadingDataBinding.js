$(function () {
    BindCountryData("#ddlCountries", "#hdCountry");

    //Bind States
    $('#ddlCountries').change(function () {
        var countryId = $('#ddlCountries').val();
        GetStates(countryId, "#ddlStates", "#hdState");
    });

    //Bind Cities
    $('#ddlStates').change(function () {
        var stateId = $('#ddlStates').val();
        GetCities(stateId, "#ddlCities", "#hdCity");
    });
});

function getCountryByID(countryId) {
    if (countryId == 0) {
        $('#PhoneCode').text('');
        $('#HomePhoneCode').text('');
    }
    var id = countryId;
    $.ajax({
        type: "POST",
        url: "/Home/GetCountryInfoByCountryID",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            countryId: id
        }),
        success: function (data) {
            if (data != null) {
                $('#PhoneCode').text('+' + data.CodeValue);
                $('#HomePhoneCode').text('+' + data.CodeValue);
            }
            else {

            }
        },
        error: function (msg) {
        }
    });
}

function SetCountryStateCity() {
    if ($('#hdCountry').val() > 0) {
        GetStates($('#hdCountry').val(), "#ddlStates", "#hdState");
    }
}