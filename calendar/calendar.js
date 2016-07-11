const daysInCalendar = 42;

var currentDay;
var currentDayOfTheWeek;
var currentMonth = 1;
var currentYear = 2016;
var daysInMonth = 0;
var firstMonthDay;
var actualMonth;

var weekDay = new Array(7);

var dt = new Date();

$(document).ready(function (){
    currentDay = dt.getDate();
    currentDayOfTheWeek = dt.getDay();
    currentMonth = dt.getMonth() + 1;
    actualMonth = currentMonth;
    currentYear = dt.getFullYear();
    initMonth();
    weekDay[0] = "Niedziela";
    weekDay[1] = "Poniedziałek";
    weekDay[2] = "Wtorek";
    weekDay[3] = "Środa";
    weekDay[4] = "Czwartek";
    weekDay[5] = "Piątek";
    weekDay[6] = "Sobota";
    setMonth();
    insertDaysToCalendar();
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

function insertDaysToCalendar(){
    var element;
    var x = daysInMonth + firstMonthDay - 1;
    for (var index = 0; index < daysInCalendar; index++){
        if (index < firstMonthDay - 1){
            element = document.getElementById('day' + (index + 1));
            element.style.backgroundColor = "red";
        }
        else {
            if ((index % 7) == 0){

            }
            if ((index - firstMonthDay + 2) == currentDay && currentMonth == actualMonth){
                element = document.getElementById('day' + (index + 1));
                element.style.backgroundColor = "blue";
            }
            else {
                element = document.getElementById('day' + (index + 1));
                element.style.backgroundColor = "cyan";
            }
            if (index >= x){
                element = document.getElementById('day' + (index + 1));
                element.style.backgroundColor = "red";
            }
        }
    }
}