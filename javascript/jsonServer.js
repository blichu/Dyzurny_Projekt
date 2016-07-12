function removeUser(id) {
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/lol/' + id,
        contentType: "application/json",
        dataType: 'json'
    }).done(function() {
        $('#' + id).remove();
    });
}
function editUser(name) {
    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/lol/' + id,
        contentType: "application/json",
        dataType: 'json',
        data : JSON.stringify({name: name})
    })
}
function addUser(name, surname, avatarLink) {
    $.post( "http://localhost:3000/lol", {
        name: name,
        surname: surname,
        avatarLink: avatarLink,
        assigned: "noAssigned"
    })
}
function getUsers(whatDoAfter, whatDoAfter2) {
    $.get("http://localhost:3000/lol", function (r) {
        whatDoAfter(r);
        whatDoAfter2();
    });
}