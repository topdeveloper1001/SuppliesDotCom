/*
* Owner: Shashank Awasthy
* On: 06092014
* Purpose: Js Events associated with the PatientBed.cshtml to filter the grid view
*/
function OpenPatientsBedPopupView() {
    $('#patientBedsDiv').empty();
    $('#patientBedsDiv').load("/Admin/PatientBed", function () {
        $('#patientBedsDiv').show();
        });
    return false;
}
/*
* Owner: Shashank Awasthy
* On: 06092014
* Purpose: Js Events associated with the PatientBed.cshtml to filter the grid view
*/
function closeThis() {
    $('#patientBedsDiv').hide();
    return false;
}
/*
* Owner: Shashank Awasthy
* On: 11092014
* Purpose: Js Events associated with the dropdown list encountertype to add check for Encounter start type
*/
function ValidateEncounterTypeSelection() {
    
    if ($('#EncounterType :selected').val() == '4')
        $('#EncounterStartType').val('2');
}

/*
* Owner: Shashank Awasthy
* On: 11092014
* Purpose: Js Events associated with the dropdown list encounterstarttype to add check for Encounter type
*/
function ValidateEncounterStartTypeSelection() {
    
    if ($('#EncounterType :selected').val() == '4') {
        if ($('#EncounterStartType :selected').val() !== '2') {
            alert("If Encounter Type is selected as emergency room; then Encounter Start Type should be selected as emergency.");
            $('#EncounterStartType').val('2');
        }
    }
}

