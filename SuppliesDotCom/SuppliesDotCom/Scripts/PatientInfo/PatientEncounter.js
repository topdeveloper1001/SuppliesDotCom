function EditPatientEncounter(id) {
    window.location.href = window.location.protocol + "//" + window.location.host + "/EncounterDetail/Index?encId=" + id;
}

function ViewPatientEncounter(id) {
    var txtFacilityId = id;
    var jsonData = JSON.stringify({
        Id: txtFacilityId,
        ViewOnly: 'true'
    });
}

function RedirectEHR(PatientId) {
    window.location.href = window.location.protocol + "//" + window.location.host + "/Summary/PatientSummary?pId=" + PatientId;
}