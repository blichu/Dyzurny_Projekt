const daysInCalendar = 42;

var currentDay;
var currentDayOfTheWeek;
var currentMonth;
var currentYear;
var daysInMonth;
var firstMonthDay;
var actualMonth;

var dt = new Date();

$(document).ready(function (){
    currentDay = dt.getDate();
    currentDayOfTheWeek = dt.getDay();
    currentMonth = dt.getMonth() + 1;
    actualMonth = currentMonth;
    currentYear = dt.getFullYear();
    initMonth();
    set_MonthName(currentMonth);
    daysInMonth = set_daysInPreviousMonth(currentMonth);
    insertDaysToCalendar();
    // alert(get_Week("week4"));
    var data = [];
    getUsersFromBase().done(function (response) {
        for (var i = 0; i < response.length; i++){
            // alert(response[i].name);
            data[i] = response[i].name;
        }
        // for (var i = 0; i < response.length; i++){
        //     insertPicture("day13", response[i].avatarLink);
        // }
        alert(data);

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

function set_daysInPreviousMonth(month){
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
    daysInMonth = set_daysInPreviousMonth(currentMonth);
    initMonth();
    insertDaysToCalendar();
    getDutys();
}

function buttonRightAction() {
    currentMonth++;
    if (currentMonth === 13) {
        currentMonth = 1;
        currentYear++;
    }
    set_MonthName(currentMonth);
    daysInMonth = set_daysInPreviousMonth(currentMonth);
    initMonth();
    insertDaysToCalendar();
    getDutys();
}

function insertDaysToCalendar() {
    var element = null;
    var temp = daysInMonth + firstMonthDay - 1;
    var dayNumberOfCurrentMonth = 1;
    var dayNumberOfNextMonth = 1;
    var daysInPreviousMonth = set_daysInPreviousMonth(currentMonth - 1);
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
        var daysInPreviousMonth = set_daysInPreviousMonth(month - 1);
        day = daysInPreviousMonth + day;
        --month;
    }
    var dayNumberOfCurrentMonth = set_daysInPreviousMonth(month);
    if (day > dayNumberOfCurrentMonth){
        day -= dayNumberOfCurrentMonth;
        month++;
    }
    if (month < 10) month = "0" + month;
    return (day + "." + month + "." + year);
}

function get_Week(div){
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

function insertPicture(div, imageURL) {
    var element = document.getElementById(div);
    element.innerHTML = "<img src='" + imageURL + "' width='100%' heigth='100%'/>";
}

function addDataToCalendar() {
    
}
