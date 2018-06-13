$(function () {
    JsModuleAccessCalls();
});


function JsModuleAccessCalls() {
    $("#ModuleAccessList").validationEngine();
    var selectedId = $("#hdCorporateID").val();
    BindCorporates("#ddlCorporate", selectedId);
    BindGenericDDL("#ddlFacility", "/Home/GetPhoneCodes", "#hdFacilityID");
}