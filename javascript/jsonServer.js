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
function editUserInBase(id, name, surname, avatarLink, assigned) {
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
        data += '"surname": "' + surname + '"';
        isOne = true;
    }
    if(avatarLink !== "") {
        if(isOne) {
            data += ",";
        }
        data += '"avatarLink": "' + avatarLink + '"';
        isOne = true;
    }
    if(assigned !== "") {
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
            assigned: "noAssigned"
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