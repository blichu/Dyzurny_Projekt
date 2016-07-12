const daysInCalendar = 42;

var currentDay;
var currentDayOfTheWeek;
var currentMonth;
var currentYear;
var daysInMonth;
var firstMonthDay;
var actualMonth;

var weekDays = new Array(7);

var dt = new Date();

$(document).ready(function (){
    currentDay = dt.getDate();
    currentDayOfTheWeek = dt.getDay();
    currentMonth = dt.getMonth() + 1;
    actualMonth = currentMonth;
    currentYear = dt.getFullYear();
    weekDays[1] = "Poniedziałek";
    weekDays[2] = "Wtorek";
    weekDays[3] = "Środa";
    weekDays[4] = "Czwartek";
    weekDays[5] = "Piątek";
    weekDays[6] = "Sobota";
    weekDays[7] = "Niedziela";
    initMonth();
    setMonth();
    insertDaysToCalendar();
    alert(getDropppedDate("week3"));
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

function setMonth(){
    switch (currentMonth){
        case 1:
            changeMonthName("Styczeń " + currentYear);
            daysInMonth = 31;
            break;
        case 2:
            changeMonthName("Luty " + currentYear);
            daysInMonth = isLeapYear(currentYear)?29:28;
            break;
        case 3:
            changeMonthName("Marzec " + currentYear);
            daysInMonth = 31;
            break;
        case 4:
            changeMonthName("Kwiecień " + currentYear);
            daysInMonth = 30;
            break;
        case 5:
            changeMonthName("Maj " + currentYear);
            daysInMonth = 31;
            break;
        case 6:
            changeMonthName("Czerwiec " + currentYear);
            daysInMonth = 30;
            break;
        case 7:
            changeMonthName("Lipiec " + currentYear);
            daysInMonth = 31;
            break;
        case 8:
            changeMonthName("Sierpień " + currentYear);
            daysInMonth = 31;
            break;
        case 9:
            changeMonthName("Wrzesień " + currentYear);
            daysInMonth = 30;
            break;
        case 10:
            changeMonthName("Październik " + currentYear);
            daysInMonth = 31;
            break;
        case 11:
            changeMonthName("Listopad " + currentYear);
            daysInMonth = 30;
            break;
        case 12:
            changeMonthName("Grudzień " + currentYear);
            daysInMonth = 31;
            break;
    }
}

function set_daysInPreviousMonth(month){
    switch (month){
        case 1:
            month = 31;
            break;
        case 2:
            month = isLeapYear(currentYear)?29:28;
            break;
        case 3:
            month = 31;
            break;
        case 4:
            month = 30;
            break;
        case 5:
            month = 31;
            break;
        case 6:
            month = 30;
            break;
        case 7:
            month = 31;
            break;
        case 8:
            month = 31;
            break;
        case 9:
            month = 30;
            break;
        case 10:
            month = 31;
            break;
        case 11:
            month = 30;
            break;
        case 12:
            month = 31;
            break;
    }
    return month;
}

function changeMonthName(name){
    var monthName = document.getElementById('monthNameText');
    monthName.innerHTML = name;
}

function buttonLeftAction(){
    --currentMonth;
    if(currentMonth === 0) {
        currentMonth = 12;
        --currentYear;
    }
    setMonth();
    initMonth();
    insertDaysToCalendar();
}

function buttonRightAction() {
    currentMonth++;
    if (currentMonth === 13) {
        currentMonth = 1;
        currentYear++;
    }
    setMonth();
    initMonth();
    insertDaysToCalendar();
}

function insertDaysToCalendar() {
    var element = null;
    var x = daysInMonth + firstMonthDay - 1;
    var dayNumberOfCurrentMonth = 1;
    var dayNumberOfNextMonth = 1;
    var daysInPreviousMonth = set_daysInPreviousMonth(currentMonth - 1);
    var daysOfPreviousMonthInCalendar = firstMonthDay - 2; //<--- Nie wiem czemu, ale ma tu być -2 XD
    for (var index = 0; index < daysInCalendar; index++) {
        if (index < firstMonthDay - 1) {
            element = document.getElementById('day' + (index + 1));
            element.style.backgroundColor = "red";
            element = document.getElementById('day' + (index + 1) + 'text');
            element.innerHTML = daysInPreviousMonth - daysOfPreviousMonthInCalendar;
            --daysOfPreviousMonthInCalendar;
        }
        else {
            if ((index % 7) == 0) {

            }
            if ((index - firstMonthDay + 2) == currentDay && currentMonth == actualMonth) {
                element = document.getElementById('day' + (index + 1));
                element.style.backgroundColor = "blue";
                element = document.getElementById('day' + (index + 1) + 'text');
                element.innerHTML = dayNumberOfCurrentMonth;
                --daysInMonth;
                dayNumberOfCurrentMonth++;
            }
            else {
                if (daysInMonth > 0) {
                    element = document.getElementById('day' + (index + 1));
                    element.style.backgroundColor = "cyan";
                    element = document.getElementById('day' + (index + 1) + 'text');
                    element.innerHTML = dayNumberOfCurrentMonth;
                    --daysInMonth;
                    dayNumberOfCurrentMonth++;
                }
            }
            if (index >= x) {
                element = document.getElementById('day' + (index + 1));
                element.style.backgroundColor = "red";
                element = document.getElementById('day' + (index + 1) + 'text');
                element.innerHTML = dayNumberOfNextMonth;
                dayNumberOfNextMonth++;
            }
        }
    }
}

function getDropppedDate(div){
    if (div.substring(0, 3) == "day"){
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
    if (div.substring(0, 4) == "week"){
        if (div.substring(4, 5) == "1") return getDropppedDate("day1");
        if (div.substring(4, 5) == "2") return getDropppedDate("day8");
        if (div.substring(4, 5) == "3") return getDropppedDate("day15");
        if (div.substring(4, 5) == "4") return getDropppedDate("day22");
        if (div.substring(4, 5) == "5") return getDropppedDate("day29");
        if (div.substring(4, 5) == "6") return getDropppedDate("day36");
    }
}