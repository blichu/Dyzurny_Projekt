const daysInCalendar = 42;

var currentDay;
var currentDayOfTheWeek;
var currentMonth;
var currentYear;
var daysInMonth;
var firstMonthDay;
var actualMonth;

var dt = new Date();

jQuery(document).ready(function (){
    currentDay = dt.getDate();
    currentDayOfTheWeek = dt.getDay();
    currentMonth = dt.getMonth() + 1;
    actualMonth = currentMonth;
    currentYear = dt.getFullYear();
    initMonth();
    set_MonthName(currentMonth);
    daysInMonth = set_daysInMonth(currentMonth);
    insertDaysToCalendar();
    getDutys().done(function (json) {
        addDutysToCalendar(json);
    });
});

function isLeapYear(year){
    return ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0)));
}

function initMonth() {
    var tempDate = new Date(currentYear, currentMonth - 1, 1);
    firstMonthDay = tempDate.getDay();
    if(currentDayOfTheWeek == 0) currentDayOfTheWeek = 7;
    if(firstMonthDay == 0) firstMonthDay = 7;
}

function changeMonthName(string) {
    var element = document.getElementById('monthNameText');
    element.innerText = string;
}

function set_MonthName(month){
    switch (month) {
        case 1:
            changeMonthName("Styczeń " + currentYear);
            break;
        case 2:
            changeMonthName("Luty " + currentYear);
            break;
        case 3:
            changeMonthName("Marzec " + currentYear);
            break;
        case 4:
            changeMonthName("Kwiecień " + currentYear);
            break;
        case 5:
            changeMonthName("Maj " + currentYear);
            break;
        case 6:
            changeMonthName("Czerwiec " + currentYear);
            break;
        case 7:
            changeMonthName("Lipiec " + currentYear);
            break;
        case 8:
            changeMonthName("Sierpień " + currentYear);
            break;
        case 9:
            changeMonthName("Wrzesień " + currentYear);
            break;
        case 10:
            changeMonthName("Październik " + currentYear);
            break;
        case 11:
            changeMonthName("Listopad " + currentYear);
            break;
        case 12:
            changeMonthName("Grudzień " + currentYear);
            break;
    }
}

function set_daysInMonth(month){
    var daysAmount;
    switch (month){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            daysAmount = 31;
            break;
        case 2:
            daysAmount = isLeapYear(currentYear)?29:28;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            daysAmount = 30;
            break;
    }
    return daysAmount;
}

function buttonLeftAction(){
    --currentMonth;
    if(currentMonth === 0) {
        currentMonth = 12;
        --currentYear;
    }
    set_MonthName(currentMonth);
    daysInMonth = set_daysInMonth(currentMonth);
    initMonth();
    insertDaysToCalendar();
    set_calendarDefault();
    getDutys().done(function (json) {
        addDutysToCalendar(json);
    });
}

function buttonRightAction() {
    currentMonth++;
    if (currentMonth === 13) {
        currentMonth = 1;
        currentYear++;
    }
    set_MonthName(currentMonth);
    daysInMonth = set_daysInMonth(currentMonth);
    initMonth();
    insertDaysToCalendar();
    set_calendarDefault();
    getDutys().done(function (json) {
        addDutysToCalendar(json);
    });
}

function set_calendarDefault(){
    var element;
    for(i = 1; i <= daysInCalendar; i++){
        element = document.getElementById("day" + (i) + "Frame");
        element.className = "daysLayout";
    }
    for(i = 1; i <= (daysInCalendar / 7); i++){
        element = document.getElementById("week" + (i));
        element.innerHTML = "";
    }
}

function insertDaysToCalendar() {
    var element = null;
    var temp = daysInMonth + firstMonthDay - 1;
    var dayNumberOfCurrentMonth = 1;
    var dayNumberOfNextMonth = 1;
    var daysInPreviousMonth;
    if (currentMonth == 1) daysInPreviousMonth = set_daysInMonth(12);
    else daysInPreviousMonth = set_daysInMonth(currentMonth - 1);
    var daysOfPreviousMonthInCalendar = firstMonthDay - 1;
    for (var index = 0; index < daysInCalendar; index++) {
        if (index < firstMonthDay - 1) {
            --daysOfPreviousMonthInCalendar;
            element = document.getElementById('day' + (index + 1));
            element.className = "otherMonthDaysLayout"
            element = document.getElementById('day' + (index + 1) + 'text');
            element.innerText = daysInPreviousMonth - daysOfPreviousMonthInCalendar;
        }
        else if ((index - firstMonthDay + 2) == currentDay && currentMonth == actualMonth) {
            element = document.getElementById('day' + (index + 1));
            element.className = "actualDayInLayout"
            element = document.getElementById('day' + (index + 1) + 'text');
            element.innerText = dayNumberOfCurrentMonth;
            --daysInMonth;
            dayNumberOfCurrentMonth++;
        }
        else if (daysInMonth > 0) {
            element = document.getElementById('day' + (index + 1));
            element.className = "actualMonthDaysLayout";
            element = document.getElementById('day' + (index + 1) + 'text');
            element.innerText = dayNumberOfCurrentMonth;
            --daysInMonth;
            dayNumberOfCurrentMonth++;
        }
        if (index >= temp) {
            element = document.getElementById('day' + (index + 1));
            element.className = "otherMonthDaysLayout"
            element = document.getElementById('day' + (index + 1) + 'text');
            element.innerText = dayNumberOfNextMonth;
            dayNumberOfNextMonth++;
        }
    }
}

function get_day(div){
    var month = currentMonth;
    var year = currentYear;
    var firstDay = firstMonthDay;
    var idDiv = div.substring(3, 5);
    var day = idDiv - (firstDay - 1);
    if (day < 1) {
        var daysInPreviousMonth = set_daysInMonth(month - 1);
        day = daysInPreviousMonth + day;
        --month;
    }
    var dayNumberOfCurrentMonth = set_daysInMonth(month);
    if (day > dayNumberOfCurrentMonth){
        day -= dayNumberOfCurrentMonth;
        month++;
    }
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return (day + "." + month + "." + year);
}

function get_week(div){
    var week = new Array(7);
    for (var index = 0; index < week.length; index++) week[index] = 0;
    var numberOfWeek = div.substring(4, 5);
    var temp = ((numberOfWeek - 1) * 7) + 1;
    for (var index = 0; index < week.length; index++){
        week[index] = get_day("day" + temp);
        temp++;
    }
    var correctDays = 0;
    for (var index = 0; index < week.length; index++){
        if (week[index] != 0) correctDays++;
    }
    if (correctDays == 7){
        return week;
    }
    else{
        alert("Taki tydzień nie istnieje!");
    }
}

function get_actualDayDiv() {
    return "day" + ((firstMonthDay - 1) + currentDay);
}

function insertPicture(div, imageURL) {
    var element = document.getElementById(div);
    element.innerHTML = "<img src='" + imageURL + "' width='100%' heigth='100%'/>";
}

function getDateStringToArray(date){
    var dateArray = [3];
    dateArray[0] = date.substring(0, 2);
    dateArray[1] = date.substring(3, 5);
    dateArray[2] = date.substring(6, 10);
    return dateArray;
}

function addDutysToCalendar(data) {
    var dateArray = new Array();
    for (i = 0; i < 7; i++) {
        dateArray[i] = new Array(3);
    }
    for(var index in data){
        var name = data[index].name;
        var surname = data[index].surname;
        var avatarURL = data[index].avatarLink;
        for(var dutyIndex in data[index].duty){
            if (data[index].duty[dutyIndex].replacement == "0") {
                for(var dateIndex in data[index].duty[dutyIndex].dates){
                    var tempIndex = 0;
                    for(var date in data[index].duty[dutyIndex].dates[dateIndex]){
                        var temp = date;
                        var tempArray = new Array(3);
                        tempArray = getDateStringToArray(data[index].duty[dutyIndex].dates[dateIndex][temp]);
                        dateArray[tempIndex] = tempArray;
                        tempIndex++;
                    }
                }
                var processDate = dateArray[0][0] + "." + dateArray[0][1] + "." + dateArray[0][2];
                for (numberOfWeek = 1; numberOfWeek <= 6; numberOfWeek++){
                    var temp = ((numberOfWeek - 1) * 7) + 1;
                    if (processDate == get_day("day" + temp)){
                        insertPicture("week" + numberOfWeek, avatarURL);
                        for (i = 0; i < 7; i++){
                            var element = document.getElementById("day" + (temp) + "Frame");
                            element.className = "daysLayoutDuty";
                            temp++;
                        }
                        break;
                    }
                }
            }
            else {
                for(var dateIndex in data[index].duty[dutyIndex].dates){
                    var tempIndex = 0;
                    for(var date in data[index].duty[dutyIndex].dates[dateIndex]){
                        var temp = date;
                        var tempArray = new Array(3);
                        tempArray = getDateStringToArray(data[index].duty[dutyIndex].dates[dateIndex][temp]);
                        dateArray[tempIndex] = tempArray;
                        tempIndex++;
                    }
                }
                var processDate = dateArray[0][0] + "." + dateArray[0][1] + "." + dateArray[0][2];
                var tempDiv = get_actualDayDiv();
                var tempDay = get_day(tempDiv);
                if (processDate == tempDay) {
                    insertPicture(tempDiv, avatarURL);
                }
                else {
                    tempDay = getDateStringToArray(tempDay);
                    var tempProcessDate = getDateStringToArray(processDate);
                    var temp = tempDay[0] - tempProcessDate[0];
                    alert(temp);
                }
            }
        }
    }
}

function getDutys(){
    return $.get("http://localhost:3000/lol");
}