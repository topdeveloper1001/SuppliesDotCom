function CheckDates(date1, date2, spanid) {
    
    var Date1 = new Date($("#" + date1).val());

    var Date2 = new Date($("#" + date2).val());



    if (Date1 > Date2) {

        $("#" + spanid).text("End date should greater than start date.");
        return false;

    }
    else {
        $("#" + spanid).text("");
        return true;
    }
}