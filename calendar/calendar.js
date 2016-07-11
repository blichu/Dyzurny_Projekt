var currentMonth = 1;
var currentYear = 2016;

function setMonth(){
    switch (currentMonth){
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
}

function buttonRightAction(){
    currentMonth++;
    if(currentMonth === 13) {
        currentMonth = 1;
        currentYear++;
    }
    setMonth();
}

// lol