function removeUserFromBase(id) {
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/lol/' + id,
        contentType: "application/json",
        dataType: 'json'
    }).done(function() {
        $('#' + id).remove();
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
            avatarLink: avatarLink,
            duty: [
                {
                    // "replacement": "0",
                    // "dates": [
                    //     {
                    //         "date1": "27.06.2016",
                    //         "date2": "28.06.2016",
                    //         "date3": "29.06.2016",
                    //         "date4": "30.06.2016",
                    //         "date5": "01.07.2016",
                    //         "date6": "02.07.2016",
                    //         "date7": "03.07.2016"
                    //     }
                    // ]
                }
            ]
        }
    );
}
function getUsersFromBase() {
    return $.get("http://localhost:3000/lol");
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