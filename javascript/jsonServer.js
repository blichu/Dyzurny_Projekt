function removeUserFromBase(id) {
    return $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/lol/' + id,
        contentType: "application/json",
        dataType: 'json'
    });
}
function editUserInBase(id, name, surname, avatarLink, replacement, dates) {
    var data = "{";
    var isOne = false;
    if(name !== "") {
        if(isOne) {
            data += ",";
        }
        data += '"name": "' + name + '"';
        isOne = true;
    }
    if(surname !== "") {
        if(isOne) {
            data += ",";
        }
        data += '"surname": "' + surname + '",';
        isOne = true;
    }
    if(avatarLink !== "") {
        if(isOne) {
            data += ",";
        }
        data += '"avatarLink": "' + avatarLink + '",';
        isOne = true;
    }
    if(replacement !== "") {
        if(isOne) {
            data += ",";
        }
        data += '"assigned": "' + assigned + '"';
    }
    data += "}";
    alert(data);
    $.ajax({
        type: 'PATCH',
        url: 'http://localhost:3000/lol/' + id,
        contentType: "application/json",
        dataType: 'json',
        data: data
    });
}
function addUserToBase(name, surname, avatarLink) {
    return $.post(
        "http://localhost:3000/lol",
        {
            name: name,
            surname: surname,
            avatarLink: avatarLink
        }
    );
}
function addUserToBaseWithId(id, name, surname, avatarLink, dutysDates) {
    // var cos =
    //     '{' +
    //     '"replacement": "0",' +
    //     '"dates": [' +
    //     '{' +
    //     '"date1": "04.07.2016",' +
    //     '"date2": "05.07.2016",' +
    //     '"date3": "06.07.2016",' +
    //     '"date4": "07.07.2016",' +
    //     '"date5": "08.07.2016",' +
    //     '"date6": "09.07.2016",' +
    //     '"date7": "10.07.2016"' +
    //     '}' +
    //     ']' +
    //     '}';
    var json =
        '{' +
        '"name": "Zbigniew",' +
        '"id": 6,' +
        '"surname": "Suraj",' +
        '"avatarLink": "http://ii.univ.rzeszow.pl/images/zdjeciapracownikow/zsuraj.jpg",' +
        '"dutys": [' +
        '{' +
        '"replacement": "0",' +
        '"dates": [' +
        '{' +
        '"date1": "27.06.2016",' +
        '"date2": "28.06.2016",' +
        '"date3": "29.06.2016",' +
        '"date4": "30.06.2016",' +
        '"date5": "01.07.2016",' +
        '"date6": "02.07.2016",' +
        '"date7": "03.07.2016"' +
        '}' +
        ']' +
        '}' +
        ']' +
        '}';
    alert(json);
    return $.post(
        "http://localhost:3000/lol", JSON.stringify(json));

}
function getUsersFromBase() {
    return $.get("http://localhost:3000/lol");
}
function getUserFromBase(userId) {
    return $.get("http://localhost:3000/lol/" + userId);
}
function addDutysForUser(userId, dutysDates) {
    getUserFromBase(userId).done(function (result) {
        removeUserFromBase(userId).done(function () {
            addUserToBaseWithId(userId, result.name, result.surname, result.avatarLink, dutysDates);
        });
        // addUserToBaseWithId(userId, result.name, result.surname, result.avatarLink);
    });
    // alert(userId + ": " + dates);

}


// function getDutys(){
//     var data = new Array();
//     $
//         .get("http://localhost:3000/lol")
//         .done(function (response) {
//             for (var i = 0; i < response.length; i++){
//                 // alert(response[i].name);
//                 data[i] = response[i].name;
//             }
//             for (var i = 0; i < response.length; i++){
//                 insertPicture("day13", response[i].avatarLink);
//             }
//             alert(data);
//         });
// }





//TODO: addDuty