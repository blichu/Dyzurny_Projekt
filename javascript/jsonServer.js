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
function editUserInBase(name) {
    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/lol/' + id,
        contentType: "application/json",
        dataType: 'json',
        data : JSON.stringify({name: name})
    })
}
function addUserToBase(name, surname, avatarLink) {
    $.post( "http://localhost:3000/lol", {
        name: name,
        surname: surname,
        avatarLink: avatarLink,
        assigned: "noAssigned"
    })
}
function getUsersFromBase(whatDoAfter, whatDoAfter2) {
    $.get("http://localhost:3000/lol", function (r) {
        whatDoAfter(r);
        whatDoAfter2();
    });
}