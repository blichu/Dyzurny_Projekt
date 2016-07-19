// import * as $ from "../libraries/jquery";
function getUsersFromBase() {
    return $.get("http://localhost:1100/users");
}
function getUserFromBase(userId) {
    return $.get("http://localhost:1100/users/" + userId);
}

function removeUserFromBase(id) {
    return $.ajax({
        type: 'DELETE',
        url: 'http://localhost:1100/users/' + id,
        contentType: "application/json",
        dataType: 'json'
    });
}

function editUserInBase(id, name, surname, avatarLink) {
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
    data += "}";
    alert(data);
    $.ajax({
        type: 'PATCH',
        url: 'http://localhost:1100/users/' + id,
        contentType: "application/json",
        dataType: 'json',
        data: data
    });
}

function addUserToBase(name, surname, avatarLink) {
    return $.post(
        "http://localhost:1100/users",
        {
            name: name,
            surname: surname,
            avatarLink: avatarLink
        }
    );
}
function addOrOverwriteUserInBase(data) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:1100/users/',
        contentType: "application/json",
        dataType: 'json',
        data: data
    });
//            return $.post(
//                "http://localhost:1100/duty",
//                {
//                    userId: userId,
//                    dates: dates
//                }
//            );
}

function addDutyForUser(id, replacement, dates) {
    function getUserFromBase(id) {
        return $.get("http://localhost:1100/users/" + id);
    }
    getUserFromBase(id).done(function (result) {
        if(replacement !== "") {
            result.duty[0].replacement = replacement;
        }
        if(dates[0] !== "") {
            var indexOfNewElement = result.duty.length;
            result.duty[indexOfNewElement] = ''
            for(var i=1; i<=7; i++) {
                result.duty[indexOfNewElement].dates[0]["date" + i] = dates[i-1];
            }
        }
        addOrOverwriteUserInBase(JSON.stringify(result));
    });
}




