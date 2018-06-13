$(function () {

    //$("#EquipmentDiv").validationEngine();
    BindNurseAssessmentForm();
    InitializeDateTimePicker();

    //ToggleCheckboxesInOpNurseForm();
    $('.myCheckbox').click(function () {
        $('.myCheckbox').prop('checked', false);
        $(this).prop('checked', true);
    });

    $('.myCheckboxAppointment').click(function () {
        $('.myCheckboxAppointment').prop('checked', false);
        $(this).prop('checked', true);
    });

    $('.appointmentRequired').click(function () {
        $('.appointmentRequired').prop('checked', false);
        $(this).prop('checked', true);
    });
    $('.alcohol').click(function () {
        $('.alcohol').prop('checked', false);
        $(this).prop('checked', true);
    });
    $('.diet').click(function () {
        $('.diet').prop('checked', false);
        $(this).prop('checked', true);
    });
    $('.livingWith').click(function () {
        $('.livingWith').prop('checked', false);
        $(this).prop('checked', true);
    });

    $('.myCheckboxAllergy').click(function () {
        $('.myCheckboxAllergy').prop('checked', false);
        $(this).prop('checked', true);
    });
    $('.myCheckboxRadiation').click(function () {
        $('.myCheckboxRadiation').prop('checked', false);
        $(this).prop('checked', true);
    });
    $('.myCheckboxEsiLevel').click(function () {
        $('.myCheckboxEsiLevel').prop('checked', false);
        $(this).prop('checked', true);
    });
    $('.myCheckboxScreening').click(function () {
        $('.myCheckboxScreening').prop('checked', false);
        $(this).prop('checked', true);
    });
    $('.myCheckScreening').click(function () {
        $('.myCheckScreening').prop('checked', false);
        $(this).prop('checked', true);
    });
    /* 2016 */
    //$('.myCheckPainAssessment').click(function () {
    //    $('.myCheckPainAssessment').prop('checked', false);
    //    $(this).prop('checked', true);
    //});

    $('.myCheckboxPattern').click(function () {
        $('.myCheckboxPattern').prop('checked', false);
        $(this).prop('checked', true);
    });


    $('.myCheckboxTetanus').click(function () {
        $('.myCheckboxTetanus').prop('checked', false);
        $(this).prop('checked', true);
    });

    $('.myCheckboxInfluenza').click(function () {
        $('.myCheckboxInfluenza').prop('checked', false);
        $(this).prop('checked', true);
    });

    $('.myCheckboxPneumococcal').click(function () {
        $('.myCheckboxPneumococcal').prop('checked', false);
        $(this).prop('checked', true);
    });


    $('.myCheckPainBoxNewPatient').click(function () {
        var chkAssessementNo = $("#chkAssessementNo")[0].checked == true ? "1" : "0";
        var chkAppointmentNo = $("#chkAppointmentNo")[0].checked == true ? "1" : "0";
        if (chkAssessementNo == 1|| chkAppointmentNo==1) {
            $('.myCheckPainBoxNewPatient').prop('checked', false);
        }
      });


});

//---------------Pain Assessment face highlight start here--------------------------------//
function chqchecked(sender, faceID) {

    var senderId = $(sender).attr('id');
    $('.face').removeClass();

    $('.myCheckPainAssessment').prop('checked', false);
    $('#' + senderId).prop('checked', true);
    $('[face=yes]').addClass('face');
    $('[face=yes]').each(function (i) {
        var _i = i + 1;
        $(this).addClass('face');
        $(this).addClass('face' + _i);
    })
    if ($(sender).is(':checked')) {

        $("#" + faceID).addClass(faceID + "_active");  // checked
        $(sender).attr('checked', 'checked');
    }


}

//---------------Pain Assessment face highlight end here--------------------------------//


function SaveOutPatientNusringForm(status, id) {
    var src = $("#signautureImage").attr('src');
    if (src == "" || src == null) {
        ShowMessage("Form must be signed first before it gets saved!", "Warning", "warning", true);
        return false;
    }


    var setID = 0;
    if (id == "" || id == null) {
        setId = 0;
    } else {
        setId = id;
    }

    var patientId = $("#GlobalPatientId").val();
    var encounterId = $("#txtEncounterId").val();
    var VisitDetailList = 6100;
    var MeasurementsList = 6101;
    var AllergyList = 6102;
    var PainAssessmentList = 6103;
    var ESILevel = 6104;
    var IllnessList = 6105;
    var NursingAssessmentList = 6106;
    var EconomicalHistory = 6107;
    var VaccinationHistory = 6108;
    var NutritionalScreening = 6109;
    var FunctionalScreening = 6110;
    var RiskList = 6111;
    var EducationNeeds = 6112;
    var NurseNotes = 6113;
    var NurseSignature = 6114;
    var painAssessmentLevels = 6116;


    var nursingFormInfoArray = new Array();

    //Basic Details
    var txtFormNumber = $("#txtFormNumber").val();
    var txtEncounterId = $("#txtEncounterId").val();
    var txtPatientLastName = $("#txtPatientLastName").val();
    var txtPatientFirstName = $("#txtPatientFirstName").val();
    var txtAdmissionDate = $("#txtAdmissionDate").val();
    var txtDateOfBirth = $("#txtDateOfBirth").val();
    var txtPatientAge = $("#txtPatientAge").val();
    //End Basic Details


    //Appointment-section Or VISIT DETAIl
    var txtCurrentDate = $("#txtCurrentDate").val();
    var txtReasonOfVisit = $("#txtReasonOfVisit").val();
    var chkAppointmentNo = $("#chkAppointmentNo")[0].checked == true ? "1" : "0";
    var chkAppointmentYes = $("#chkAppointmentYes")[0].checked == true ? "1" : "0";
    var chkAssessementNo = $("#chkAssessementNo")[0].checked == true ? "1" : "0";
    var chkNewPatient = $("#chkNewPatient")[0].checked == true ? "1" : "0";
    var chkAssessementYes = $("#chkAssessementYes")[0].checked == true ? "1" : "0";
    var chkCondition = $("#chkCondition")[0].checked == true ? "1" : "0";
    var chkLastVisit = $("#chkLastVisit")[0].checked == true ? "1" : "0";

    nursingFormInfoArray.push(txtCurrentDate + "-2-" + VisitDetailList + "-1"); //controlvalue-globalcodevalue-globalcodecategoryvalue-parentglobalcodevalue

    nursingFormInfoArray.push(txtReasonOfVisit + "-3-" + VisitDetailList + "-1");
    nursingFormInfoArray.push(chkAppointmentNo + "-5-" + VisitDetailList + "-1");
    nursingFormInfoArray.push(chkAppointmentYes + "-6-" + VisitDetailList + "-1");
    nursingFormInfoArray.push(chkAssessementNo + "-8-" + VisitDetailList + "-1");
    nursingFormInfoArray.push(chkAssessementYes + "-9-" + VisitDetailList + "-1");
    nursingFormInfoArray.push(chkNewPatient + "-10-" + VisitDetailList + "-1");
    nursingFormInfoArray.push(chkCondition + "-11-" + VisitDetailList + "-1");
    nursingFormInfoArray.push(chkLastVisit + "-12-" + VisitDetailList + "-9");

    //Apointment-section End



    //Measurements Section
    var txtTemp = $("#txtTemp").val();
    var txtPluse = $("#txtPluse").val();
    var txtBp = $("#txtBp").val();
    var txtResp = $("#txtResp").val();
    var txtSpo = $("#txtSpo").val();
    var txtWeightData = $("#txtWeightData").val();
    var txtHeight = $("#txtHeight").val();
    var txtBmi = $("#txtBmi").val();


    nursingFormInfoArray.push(txtTemp + "-2-" + MeasurementsList + "-1");
    nursingFormInfoArray.push(txtPluse + "-3-" + MeasurementsList + "-1");
    nursingFormInfoArray.push(txtBp + "-4-" + MeasurementsList + "-1");
    nursingFormInfoArray.push(txtResp + "-5-" + MeasurementsList + "-1");
    nursingFormInfoArray.push(txtSpo + "-6-" + MeasurementsList + "-1");
    nursingFormInfoArray.push(txtWeightData + "-7-" + MeasurementsList + "-1");
    nursingFormInfoArray.push(txtHeight + "-8-" + MeasurementsList + "-1");
    nursingFormInfoArray.push(txtBmi + "-9-" + MeasurementsList + "-1");
    //Measurements Section END


    //Allergy-section Start
    var chkNka = $("#chkNka")[0].checked == true ? "1" : "0";
    var chkAllergyYes = $("#chkAllergyYes")[0].checked == true ? "1" : "0";
    var txtAllergySpecification = $("#txtAllergySpecification").val();

    nursingFormInfoArray.push(chkNka + "-2-" + AllergyList + "-1");
    nursingFormInfoArray.push(chkAllergyYes + "-3-" + AllergyList + "-1");
    nursingFormInfoArray.push(txtAllergySpecification + "-4-" + AllergyList + "-1");
    //Allergy-section End



    //Pain-Assessment-section Start
    var amount = $("#amount").val();
    var textLocation = $("#textLocation").val();
    var textFrequency = $("#textFrequency").val();
    var chkConstant = $("#chkConstant")[0].checked == true ? "1" : "0";
    var chkIntermittent = $("#chkIntermittent")[0].checked == true ? "1" : "0";
    var textPainDuration = $("#textPainDuration").val();
    var chkRadiationNo = $("#chkRadiationNo")[0].checked == true ? "1" : "0";
    var chkRadiationYes = $("#chkRadiationYes")[0].checked == true ? "1" : "0";
    var textRadiationDescription = $("#textRadiationDescription").val();

    nursingFormInfoArray.push(amount + "-2-" + PainAssessmentList + "-1");
    nursingFormInfoArray.push(textLocation + "-3-" + PainAssessmentList + "-1");
    nursingFormInfoArray.push(textFrequency + "-4-" + PainAssessmentList + "-1");
    nursingFormInfoArray.push(textPainDuration + "-5-" + PainAssessmentList + "-1");
    nursingFormInfoArray.push(chkConstant + "-7-" + PainAssessmentList + "-6");
    nursingFormInfoArray.push(chkIntermittent + "-8-" + PainAssessmentList + "-6");
    nursingFormInfoArray.push(chkRadiationNo + "-10-" + PainAssessmentList + "-9");
    nursingFormInfoArray.push(chkRadiationYes + "-11-" + PainAssessmentList + "-9");
    nursingFormInfoArray.push(textRadiationDescription + "-12-" + PainAssessmentList + "-11");


    //Charecter Code Start
    var chkSharp = $("#chkSharp")[0].checked == true ? "1" : "0";
    var chkDull = $("#chkDull")[0].checked == true ? "1" : "0";
    var chkStabbing = $("#chkStabbing")[0].checked == true ? "1" : "0";
    var chkBurning = $("#chkBurning")[0].checked == true ? "1" : "0";
    var chkCrushing = $("#chkCrushing")[0].checked == true ? "1" : "0";
    var chkDeep = $("#chkDeep")[0].checked == true ? "1" : "0";
    var chkSore = $("#chkSore")[0].checked == true ? "1" : "0";
    var chkAching = $("#chkAching")[0].checked == true ? "1" : "0";
    var chkColing = $("#chkColing")[0].checked == true ? "1" : "0";
    var chkThrobbing = $("#chkThrobbing")[0].checked == true ? "1" : "0";
    var chkNumb = $("#chkNumb")[0].checked == true ? "1" : "0";
    var chkShooting = $("#chkShooting")[0].checked == true ? "1" : "0";
    var chkPressing = $("#chkPressing")[0].checked == true ? "1" : "0";
    var chkTight = $("#chkTight")[0].checked == true ? "1" : "0";
    var chkPulling = $("#chkPulling")[0].checked == true ? "1" : "0";
    var chkSqueezing = $("#chkSqueezing")[0].checked == true ? "1" : "0";


    nursingFormInfoArray.push(chkSharp + "-14-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkDull + "-15-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkStabbing + "-16-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkBurning + "-17-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkCrushing + "-18-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkDeep + "-19-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkSore + "-20-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkAching + "-21-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkColing + "-22-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkThrobbing + "-23-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkNumb + "-24-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkShooting + "-25-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkPressing + "-26-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkTight + "-27-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkPulling + "-28-" + PainAssessmentList + "-13");
    nursingFormInfoArray.push(chkSqueezing + "-29-" + PainAssessmentList + "-13");
    //Charecter Code End
    //Pain-Assessment-section End


    // ESI Level Start

    var chkEsiLevel1 = $("#chkEsiLevel1")[0].checked == true ? "1" : "0";
    var chkEsiLevel2 = $("#chkEsiLevel2")[0].checked == true ? "1" : "0";
    var chkEsiLevel3 = $("#chkEsiLevel3")[0].checked == true ? "1" : "0";
    var chkEsiLevel4 = $("#chkEsiLevel4")[0].checked == true ? "1" : "0";
    var chkEsiLevel5 = $("#chkEsiLevel5")[0].checked == true ? "1" : "0";
    var txtBadgeNumber = $("#txtBadgeNumber").val();

    nursingFormInfoArray.push(chkEsiLevel1 + "-2-" + ESILevel + "-1");
    nursingFormInfoArray.push(chkEsiLevel2 + "-3-" + ESILevel + "-1");
    nursingFormInfoArray.push(chkEsiLevel3 + "-4-" + ESILevel + "-1");
    nursingFormInfoArray.push(chkEsiLevel4 + "-5-" + ESILevel + "-1");
    nursingFormInfoArray.push(chkEsiLevel5 + "-6-" + ESILevel + "-1");
    nursingFormInfoArray.push(txtBadgeNumber + "-7-" + ESILevel + "-1");
    // ESI Level END


    //Illness-section Start
    var chkSneezNo = $("#chkSneezNo")[0].checked == true ? "1" : "0";
    var chkSneezYes = $("#chkSneezYes")[0].checked == true ? "1" : "0";
    var chkfeverNo = $("#chkfeverNo")[0].checked == true ? "1" : "0";
    var chkFeverYes = $("#chkFeverYes")[0].checked == true ? "1" : "0";

    nursingFormInfoArray.push(chkSneezNo + "-2-" + IllnessList + "-1");
    nursingFormInfoArray.push(chkSneezYes + "-3-" + IllnessList + "-1");
    nursingFormInfoArray.push(chkfeverNo + "-5-" + IllnessList + "-4");
    nursingFormInfoArray.push(chkFeverYes + "-6-" + IllnessList + "-4");
    //Illness-section End

    //FULL OUTPATIENT NURSING ASSESSEMENT
    var chkArabic = $("#chkArabic")[0].checked == true ? "1" : "0";
    var chkEnglish = $("#chkEnglish")[0].checked == true ? "1" : "0";
    var chkOther = $("#chkOther")[0].checked == true ? "1" : "0";
    var txtOtherDetail = $("#txtOtherDetail").val();
    var chkFamiliy = $("#chkFamiliy")[0].checked == true ? "1" : "0";
    var chkFriends = $("#chkFriends")[0].checked == true ? "1" : "0";
    var chkOtherAssessment = $("#chkOtherAssessment")[0].checked == true ? "1" : "0";
    var txtOtherValue = $("#txtOtherValue").val();
    var chkWalk = $("#chkWalk")[0].checked == true ? "1" : "0";
    var chkCarried = $("#chkCarried")[0].checked == true ? "1" : "0";
    var chkOtherArrival = $("#chkOtherArrival")[0].checked == true ? "1" : "0";
    var txtOtherArrivalDetail = $("#txtOtherArrivalDetail").val();

    nursingFormInfoArray.push(chkArabic + "-3-" + NursingAssessmentList + "-2");
    nursingFormInfoArray.push(chkEnglish + "-4-" + NursingAssessmentList + "-2");
    nursingFormInfoArray.push(chkOther + "-5-" + NursingAssessmentList + "-2");
    nursingFormInfoArray.push(txtOtherDetail + "-6-" + NursingAssessmentList + "-5");
    nursingFormInfoArray.push(chkFamiliy + "-8-" + NursingAssessmentList + "-7");
    nursingFormInfoArray.push(chkFriends + "-9-" + NursingAssessmentList + "-7");
    nursingFormInfoArray.push(chkOtherAssessment + "-10-" + NursingAssessmentList + "-7");
    nursingFormInfoArray.push(txtOtherValue + "-11-" + NursingAssessmentList + "-10");
    nursingFormInfoArray.push(chkWalk + "-13-" + NursingAssessmentList + "-12");
    nursingFormInfoArray.push(chkCarried + "-14-" + NursingAssessmentList + "-12");
    nursingFormInfoArray.push(chkOtherArrival + "-15-" + NursingAssessmentList + "-12");
    nursingFormInfoArray.push(txtOtherArrivalDetail + "-16-" + NursingAssessmentList + "-15");
    //FULL OUTPATIENT NURSING ASSESSEMENT

    //Psychosocial Economical Start
    var chkCooperative = $("#chkCooperative")[0].checked == true ? "1" : "0";
    var chkAnxious = $("#chkAnxious")[0].checked == true ? "1" : "0";
    var chkUncooperative = $("#chkUncooperative")[0].checked == true ? "1" : "0";
    var chkDepressed = $("#chkDepressed")[0].checked == true ? "1" : "0";
    var chkAngry = $("#chkAngry")[0].checked == true ? "1" : "0";
    var chkAgitated = $("#chkAgitated")[0].checked == true ? "1" : "0";
    var chkCombative = $("#chkCombative")[0].checked == true ? "1" : "0";
    var chkOthersEconomicalHistory = $("#chkOthersEconomicalHistory")[0].checked == true ? "1" : "0";
    var txtOthersEconomicalHistoryDetail = $("#txtOthersEconomicalHistoryDetail").val();
    var chkNaverUsed = $("#chkNaverUsed")[0].checked == true ? "1" : "0";
    var chkCurrentUsed = $("#chkCurrentUsed")[0].checked == true ? "1" : "0";

    var chkPastUser = $("#chkPastUser")[0].checked == true ? "1" : "0";
    var chkStickConsumedDay = $("#chkStickConsumedDay")[0].checked == true ? "1" : "0";
    var txtConsumedDay = $("#txtConsumedDay").val();
    var chkNaverAlcohol = $("#chkNaverAlcohol")[0].checked == true ? "1" : "0";
    var chkYesAlcohol = $("#chkYesAlcohol")[0].checked == true ? "1" : "0";
    var txtGlassesDay = $("#txtGlassesDay").val();
    var chkLivingWithFamiliy = $("#chkLivingWithFamiliy")[0].checked == true ? "1" : "0";
    var chkLivingWithOther = $("#chkLivingWithOther")[0].checked == true ? "1" : "0";
    var txtLivingDescription = $("#txtLivingDescription").val();


    nursingFormInfoArray.push(chkCooperative + "-2-" + EconomicalHistory + "-1");
    nursingFormInfoArray.push(chkAnxious + "-3-" + EconomicalHistory + "-1");

    nursingFormInfoArray.push(chkDepressed + "-4-" + EconomicalHistory + "-1");
    nursingFormInfoArray.push(chkUncooperative + "-5-" + EconomicalHistory + "-1");
    nursingFormInfoArray.push(chkAngry + "-6-" + EconomicalHistory + "-1");
    nursingFormInfoArray.push(chkAgitated + "-7-" + EconomicalHistory + "-1");
    nursingFormInfoArray.push(chkCombative + "-8-" + EconomicalHistory + "-1");
    nursingFormInfoArray.push(chkOthersEconomicalHistory + "-9-" + EconomicalHistory + "-8");
    nursingFormInfoArray.push(txtOthersEconomicalHistoryDetail + "-10-" + EconomicalHistory + "-1");
    nursingFormInfoArray.push(chkNaverUsed + "-12-" + EconomicalHistory + "-11");
    nursingFormInfoArray.push(chkCurrentUsed + "-13-" + EconomicalHistory + "-11");
    nursingFormInfoArray.push(chkPastUser + "-14-" + EconomicalHistory + "-11");
    nursingFormInfoArray.push(chkStickConsumedDay + "-15-" + EconomicalHistory + "-11");
    nursingFormInfoArray.push(txtConsumedDay + "-16-" + EconomicalHistory + "-15");
    nursingFormInfoArray.push(chkNaverAlcohol + "-18-" + EconomicalHistory + "-17");
    nursingFormInfoArray.push(chkYesAlcohol + "-19-" + EconomicalHistory + "-15");
    nursingFormInfoArray.push(txtGlassesDay + "-20-" + EconomicalHistory + "-19");
    nursingFormInfoArray.push(chkLivingWithFamiliy + "-22-" + EconomicalHistory + "-21");
    nursingFormInfoArray.push(chkLivingWithOther + "-23-" + EconomicalHistory + "-21");
    nursingFormInfoArray.push(txtLivingDescription + "-24-" + EconomicalHistory + "-22");
    //Psychosocial Economical End


    //Vacination History Start
    var chkTetanusUnknown = $("#chkTetanusUnknown")[0].checked == true ? "1" : "0";
    var chkTetanusNo = $("#chkTetanusNo")[0].checked == true ? "1" : "0"; ///////
    var chkTetanusYes = $("#chkTetanusYes")[0].checked == true ? "1" : "0";
    var chkTetanusDate = $("#chkTetanusDate")[0].checked == true ? "1" : "0";
    var txtTetanusDateDetail = $("#txtTetanusDateDetail").val();
    var chkInfluenzaUnknown = $("#chkInfluenzaUnknown")[0].checked == true ? "1" : "0";
    var chkInfluenzaNo = $("#chkInfluenzaNo")[0].checked == true ? "1" : "0";
    var chkInfluenzaYes = $("#chkInfluenzaYes")[0].checked == true ? "1" : "0";
    var chkInfluenzaDate = $("#chkInfluenzaDate")[0].checked == true ? "1" : "0"; //////
    var txtInfluenzaDatedetail = $("#txtInfluenzaDatedetail").val();
    var chkPneumococcalUnknown = $("#chkPneumococcalUnknown")[0].checked == true ? "1" : "0";
    var chkPneumococcalNo = $("#chkPneumococcalNo")[0].checked == true ? "1" : "0";
    var chkPneumococcalYes = $("#chkPneumococcalYes")[0].checked == true ? "1" : "0";
    var chkPneumococcalDate = $("#chkPneumococcalDate")[0].checked == true ? "1" : "0";
    var txtPneumococcalDateDetail = $("#txtPneumococcalDateDetail").val();
    var txtOtherPneumococcal = $("#txtOtherPneumococcal").val();

    nursingFormInfoArray.push(chkTetanusUnknown + "-2-" + VaccinationHistory + "-1");
    nursingFormInfoArray.push(chkTetanusNo + "-3-" + VaccinationHistory + "-1");
    nursingFormInfoArray.push(chkTetanusYes + "-4-" + VaccinationHistory + "-1");
    nursingFormInfoArray.push(chkTetanusDate + "-5-" + VaccinationHistory + "-1");
    nursingFormInfoArray.push(txtTetanusDateDetail + "-6-" + VaccinationHistory + "-5");
    nursingFormInfoArray.push(chkInfluenzaUnknown + "-8-" + VaccinationHistory + "-7");
    nursingFormInfoArray.push(chkInfluenzaNo + "-9-" + VaccinationHistory + "-7");
    nursingFormInfoArray.push(chkInfluenzaYes + "-10-" + VaccinationHistory + "-7");
    nursingFormInfoArray.push(chkInfluenzaDate + "-11-" + VaccinationHistory + "-7");
    nursingFormInfoArray.push(txtInfluenzaDatedetail + "-13-" + VaccinationHistory + "-11");
    nursingFormInfoArray.push(chkPneumococcalUnknown + "-15-" + VaccinationHistory + "-14");
    nursingFormInfoArray.push(chkPneumococcalNo + "-16-" + VaccinationHistory + "-14");
    nursingFormInfoArray.push(chkPneumococcalYes + "-17-" + VaccinationHistory + "-14");
    nursingFormInfoArray.push(chkPneumococcalDate + "-18-" + VaccinationHistory + "-14");
    nursingFormInfoArray.push(txtPneumococcalDateDetail + "-19-" + VaccinationHistory + "-14");
    nursingFormInfoArray.push(txtOtherPneumococcal + "-20-" + VaccinationHistory + "-0");
    //Vacination History ENd

    //Nutritional Screening
    var chkNormalDiet = $("#chkNormalDiet")[0].checked == true ? "1" : "0";
    var chkSpecialDiet = $("#chkSpecialDiet")[0].checked == true ? "1" : "0";
    var txtNutritionalScreeningDetail = $("#txtNutritionalScreeningDetail").val();

    nursingFormInfoArray.push(chkNormalDiet + "-2-" + NutritionalScreening + "-1");
    nursingFormInfoArray.push(chkSpecialDiet + "-3-" + NutritionalScreening + "-1");
    nursingFormInfoArray.push(txtNutritionalScreeningDetail + "-4-" + NutritionalScreening + "-3");
    //Nutritional Screening


    //Functional- Screening Start
    var chkNoneRequired = $("#chkNoneRequired")[0].checked == true ? "1" : "0";
    var txtSelfCareDetail = $("#txtSelfCareDetail").val();
    var chkAssistingEquipmentNotUsed = $("#chkAssistingEquipmentNotUsed")[0].checked == true ? "1" : "0";
    var txtAssistingEquipmentDetail = $("#txtAssistingEquipmentDetail").val();
    var chkNoProblemIdentified = $("#chkNoProblemIdentified")[0].checked == true ? "1" : "0";
    var txtFunctionalDeficitDetail = $("#txtFunctionalDeficitDetail").val();
    nursingFormInfoArray.push(chkNoneRequired + "-2-" + FunctionalScreening + "-1");
    nursingFormInfoArray.push(txtSelfCareDetail + "-4-" + FunctionalScreening + "-3");
    nursingFormInfoArray.push(chkAssistingEquipmentNotUsed + "-6-" + FunctionalScreening + "-5");
    nursingFormInfoArray.push(txtAssistingEquipmentDetail + "-8-" + FunctionalScreening + "-7");
    nursingFormInfoArray.push(chkNoProblemIdentified + "-10-" + FunctionalScreening + "-9");
    nursingFormInfoArray.push(txtFunctionalDeficitDetail + "-11-" + FunctionalScreening + "-9");


    //Functional- Screening Start


    //Risk Start
    var chkPediatricPatient = $("#chkPediatricPatient")[0].checked == true ? "1" : "0";
    var chkAgeOver65Years = $("#chkAgeOver65Years")[0].checked == true ? "1" : "0";
    var chkConfusion = $("#chkConfusion")[0].checked == true ? "1" : "0";
    var chkImpairedJudgment = $("#chkImpairedJudgment")[0].checked == true ? "1" : "0";
    var chkDecreased = $("#chkDecreased")[0].checked == true ? "1" : "0";
    var chkImpaired = $("#chkImpaired")[0].checked == true ? "1" : "0";
    var chkSeizures = $("#chkSeizures")[0].checked == true ? "1" : "0";
    var chkhypnotics = $("#chkhypnotics")[0].checked == true ? "1" : "0";
    var chkUnderInfluence = $("#chkUnderInfluence")[0].checked == true ? "1" : "0";
    var chkImpairedVision = $("#chkImpairedVision")[0].checked == true ? "1" : "0";
    var chkNocturia = $("#chkNocturia")[0].checked == true ? "1" : "0";
    var chkNoRisk = $("#chkNoRisk")[0].checked == true ? "1" : "0";
    var chkAssistPatient = $("#chkAssistPatient")[0].checked == true ? "1" : "0";
    var chkUseOfWheelchair = $("#chkUseOfWheelchair")[0].checked == true ? "1" : "0";
    var chkEncourage = $("#chkEncourage")[0].checked == true ? "1" : "0";
    var chkOrientate = $("#chkOrientate")[0].checked == true ? "1" : "0";
    var chkBedInLowest = $("#chkBedInLowest")[0].checked == true ? "1" : "0";
    var chkIdentify = $("#chkIdentify")[0].checked == true ? "1" : "0";


    nursingFormInfoArray.push(chkPediatricPatient + "-2-" + RiskList + "-1");
    nursingFormInfoArray.push(chkAgeOver65Years + "-3-" + RiskList + "-1");
    nursingFormInfoArray.push(chkConfusion + "-4-" + RiskList + "-1");
    nursingFormInfoArray.push(chkImpairedJudgment + "-5-" + RiskList + "-1");
    nursingFormInfoArray.push(chkDecreased + "-6-" + RiskList + "-1");
    nursingFormInfoArray.push(chkImpaired + "-7-" + RiskList + "-1");
    nursingFormInfoArray.push(chkSeizures + "-8-" + RiskList + "-1");
    nursingFormInfoArray.push(chkhypnotics + "-9-" + RiskList + "-1");
    nursingFormInfoArray.push(chkUnderInfluence + "-10-" + RiskList + "-1");
    nursingFormInfoArray.push(chkImpairedVision + "-11-" + RiskList + "-1");
    nursingFormInfoArray.push(chkNocturia + "-12-" + RiskList + "-1");
    nursingFormInfoArray.push(chkNoRisk + "-13-" + RiskList + "-1");
    nursingFormInfoArray.push(chkAssistPatient + "-15-" + RiskList + "-14");
    nursingFormInfoArray.push(chkUseOfWheelchair + "-16-" + RiskList + "-14");
    nursingFormInfoArray.push(chkEncourage + "-17-" + RiskList + "-14");
    nursingFormInfoArray.push(chkOrientate + "-18-" + RiskList + "-14");
    nursingFormInfoArray.push(chkBedInLowest + "-19-" + RiskList + "-14");
    nursingFormInfoArray.push(chkIdentify + "-20-" + RiskList + "-14");

    //Risk End

    // Educational Needs Start
    var chkNoNeedIdentified = $("#chkNoNeedIdentified")[0].checked == true ? "1" : "0";
    var chkUseOfMedication = $("#chkUseOfMedication")[0].checked == true ? "1" : "0";
    var chkUseOfMedicalEquipment = $("#chkUseOfMedicalEquipment")[0].checked == true ? "1" : "0";
    var chkDietAndNutrician = $("#chkDietAndNutrician")[0].checked == true ? "1" : "0";
    var chkSymptomsManagement = $("#chkSymptomsManagement")[0].checked == true ? "1" : "0";
    var txtOtherSpecification = $("#txtOtherSpecification").val();

    nursingFormInfoArray.push(chkNoNeedIdentified + "-2-" + EducationNeeds + "-1");
    nursingFormInfoArray.push(chkUseOfMedication + "-3-" + EducationNeeds + "-1");
    nursingFormInfoArray.push(chkUseOfMedicalEquipment + "-5-" + EducationNeeds + "-1");
    nursingFormInfoArray.push(chkDietAndNutrician + "-6-" + EducationNeeds + "-1");
    nursingFormInfoArray.push(chkSymptomsManagement + "-7-" + EducationNeeds + "-1");
    nursingFormInfoArray.push(txtOtherSpecification + "-9-" + EducationNeeds + "-1");

    //Educational Need ENd


    //---------------Pain Assessment Levels start here--------------------------------//
    var chkLevel1 = $("#chkLevel1")[0].checked == true ? "1" : "0";
    var chkLevel2 = $("#chkLevel2")[0].checked == true ? "1" : "0";
    var chkLevel3 = $("#chkLevel3")[0].checked == true ? "1" : "0";
    var chkLevel4 = $("#chkLevel4")[0].checked == true ? "1" : "0";
    var chkLevel5 = $("#chkLevel5")[0].checked == true ? "1" : "0";
    var chkLevel6 = $("#chkLevel6")[0].checked == true ? "1" : "0";
    var chkLevel7 = $("#chkLevel7")[0].checked == true ? "1" : "0";
    var chkLevel8 = $("#chkLevel8")[0].checked == true ? "1" : "0";
    var chkLevel9 = $("#chkLevel9")[0].checked == true ? "1" : "0";
    var chkLevel10 = $("#chkLevel10")[0].checked == true ? "1" : "0";
    var chkLevel11 = $("#chkLevel11")[0].checked == true ? "1" : "0";

    nursingFormInfoArray.push(chkLevel1 + "-1-" + painAssessmentLevels + "-0");
    nursingFormInfoArray.push(chkLevel2 + "-2-" + painAssessmentLevels + "-0");
    nursingFormInfoArray.push(chkLevel3 + "-3-" + painAssessmentLevels + "-0");
    nursingFormInfoArray.push(chkLevel4 + "-4-" + painAssessmentLevels + "-0");
    nursingFormInfoArray.push(chkLevel5 + "-5-" + painAssessmentLevels + "-0");
    nursingFormInfoArray.push(chkLevel6 + "-6-" + painAssessmentLevels + "-0");
    nursingFormInfoArray.push(chkLevel7 + "-7-" + painAssessmentLevels + "-0");
    nursingFormInfoArray.push(chkLevel8 + "-8-" + painAssessmentLevels + "-0");
    nursingFormInfoArray.push(chkLevel9 + "-9-" + painAssessmentLevels + "-0");
    nursingFormInfoArray.push(chkLevel10 + "-10-" + painAssessmentLevels + "-0");
    nursingFormInfoArray.push(chkLevel11 + "-11-" + painAssessmentLevels + "-0");
    //---------------Pain Assessment Levels end here--------------------------------//





    //Nurse Notes Start
    var txtNursingNotesFirst = $("#txtNurseNotes1").val();
    var txtNurseNotes = $("#txtNurseNotes").val();
    nursingFormInfoArray.push(txtNurseNotes + "-1-" + NurseNotes + "-0");
    nursingFormInfoArray.push(txtNursingNotesFirst + "-2-" + NurseNotes + "-0");
    //Nurse Notes End


    //Nurse Signature Start
    //var var NurseSignature = 6114;
    //var signautureImage=
    //Nurse Signature End
    var jsonData = JSON.stringify({
        basicInfo: nursingFormInfoArray,
        patientId: patientId,
        encounterId: encounterId,
        setId: setId,
        estatus: status,
        formNumber: txtFormNumber,
        imagePath: src
    });
    $.ajax({
        type: "POST",
        url: '/PDFTemplates/SaveOutPatientNurseAssessment',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data > 0) {
                $('#divNurseAssessmentGrid').hide();
                BindNurseAssessmentForm();
                ShowMessage("Nurse Assessment Form submitted successfully", "Success", "success", true);
            } else if (data == "-1") {
                ShowMessage("Encounter is not started yet", "Oops!!", "warning", true);
            }
            $('#divNurseAssessmentGrid').hide();
            $.validationEngine.closePrompt('.formError', true);
        },
        error: function (msg) {
            ShowMessage("Failed to submit", "Error", "error", true);
        }
    });
}


//function ViewNurseAssessmentForm() {

//   var patientId = $("#hdPatientId").val();
//    var jsonData = JSON.stringify({
//        pId: patientId,
//      });
//    $.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: "/PDFTemplates/PdfTemplatesData",
//        data: jsonData,
//        dataType: "html",
//        success: function (data) {

//            $('#NurseAssessmentDiv').empty();
//            $('#NurseAssessmentDiv').html(data);
//            $('#divNurseAssessmentGrid').show();
//            //BindSignatureData(setId);
//            InitializeDateTimePicker();

//        },
//        error: function (msg) {

//        }
//    });
//}


//function BindNurseAssessmentForm() {
//    var patientId = $("#hdPatientId").val();
//    var encounterId = $("#hdCurrentEncounterId").val();
//    var jsonData = JSON.stringify({
//        ecounterId: encounterId,
//        patinetId: patientId
//    });
//    $.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: "/Summary/GetNurseAssessmentList",
//        data: jsonData,
//        dataType: "html",
//        success: function (data) {
//            //$('#PreEvaluationList').empty();
//            $('#PreEvaluationList').html(data);
//            InitializeDateTimePicker();
//        },
//        error: function (msg) {

//        }
//    });
//}



function BindNurseAssessmentForm() {

    var patientId = $("#hdPatientId").val();
    var encounterId = $("#hdCurrentEncounterId").val();
    var jsonData = JSON.stringify({
        ecounterId: encounterId,
        patinetId: patientId
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Summary/GetPreENcounterList",
        data: jsonData,
        dataType: "html",
        success: function (data) {
            $('#PreEvaluationList').empty();
            $('#PreEvaluationList').html(data);
            InitializeDateTimePicker();
        },
        error: function (msg) {

        }
    });
}



function EditNurseAssessmentForm(id) {
    var setId = id;
    var patientId = $("#hdPatientId").val();
    var jsonData = JSON.stringify({
        pId: patientId,
        setId: setId
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/PDFTemplates/PdfTemplatesData",
        data: jsonData,
        dataType: "html",
        success: function (data) {
            BindSignatureDataInNurseForm(id);
            $('#NurseAssessmentDiv').empty();
            $('#NurseAssessmentDiv').html(data);
            $('#divNurseAssessmentGrid').show();
            //BindSignatureData(setId);
            InitializeDateTimePicker();
            //ToggleCheckboxesInOpNurseForm();
        },
        error: function (msg) {

        }
    });
}


function BindSignatureDataInNurseForm(id) {
    var setId = id;
    var patientId = $("#hdPatientId").val();
    var encounterId = $("#hdCurrentEncounterId").val();
    var jsonData = JSON.stringify({
        ecounterId: encounterId,
        patinetId: patientId,
        setId: setId
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/PDFTemplates/GetSignatureData",
        data: jsonData,
        dataType: "json",
        success: function (data) {
            $("#signautureImage").attr('src', data);
        },
        error: function (msg) {

        }
    });
}

//function ToggleCheckboxesInOpNurseForm() {
//    $('.myCheckbox').click(function () {
//        $('.myCheckbox').prop('checked', false);
//        $(this).prop('checked', true);
//    });

//    $('.myCheckboxAppointment').click(function () {
//        $('.myCheckboxAppointment').prop('checked', false);
//        $(this).prop('checked', true);
//    });

//    $('.appointmentRequired').click(function () {
//        $('.appointmentRequired').prop('checked', false);
//        $(this).prop('checked', true);
//    });
//    $('.alcohol').click(function () {
//        $('.alcohol').prop('checked', false);
//        $(this).prop('checked', true);
//    });
//    $('.diet').click(function () {
//        $('.diet').prop('checked', false);
//        $(this).prop('checked', true);
//    });
//    $('.livingWith').click(function () {
//        $('.livingWith').prop('checked', false);
//        $(this).prop('checked', true);
//    });

//    $('.myCheckboxAllergy').click(function () {
//        $('.myCheckboxAllergy').prop('checked', false);
//        $(this).prop('checked', true);
//    });
//    $('.myCheckboxRadiation').click(function () {
//        $('.myCheckboxRadiation').prop('checked', false);
//        $(this).prop('checked', true);
//    });
//    $('.myCheckboxEsiLevel').click(function () {
//        $('.myCheckboxEsiLevel').prop('checked', false);
//        $(this).prop('checked', true);
//    });
//    $('.myCheckboxScreening').click(function () {
//        $('.myCheckboxScreening').prop('checked', false);
//        $(this).prop('checked', true);
//    });
//    $('.myCheckScreening').click(function () {
//        $('.myCheckScreening').prop('checked', false);
//        $(this).prop('checked', true);
//    });
//    /* 2016 */
//    $('.myCheckPainAssessment').click(function () {
//        $('.myCheckPainAssessment').prop('checked', false);
//        $(this).prop('checked', true);
//    });
//}



function UncheckNewPatientCheckBox() {
   $('#chkAssessementYes').prop('checked', false);
    $('#chkNewPatient').prop('checked', false);
    $('#chkCondition').prop('checked', false);
    $('#chkLastVisit').prop('checked', false);
}

