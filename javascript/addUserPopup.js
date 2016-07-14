function clearForm(){
    $('#nameField').val('');
    $('#surnameField').val('');
    $('#avatarURL').val('');
    $('#imageView').html("<img height='70px' class='avatars' src='../images/noImage.png'>");
}
function actionResetButton(){
    // $('#resetButton').click(function(){
        alert("sfsdf");
        clearForm();
    // });
}
function actionsAddUserButton() {
    // $('#addButton').on("click", function(){
    var name = $('#nameField').val();
    var surname = $('#surnameField').val();
    var avatarURL = $('#avatarURL').val();
    addUserToBase(name, surname, avatarURL).done( function (result) {
        addUsersToTable(result.id, name, surname, avatarURL);
    });
}
function actionViewButton() {
    $("#viewButton").click(function () {
        document.getElementById("imageView").innerHTML = "<img height='70px' class='avatars' src='" + $('#avatarURL').val() + "'>";
    });
}
function addUserPopupInit(){
    w2popup.load({
        title: "Edycja użytkownika",
        url: '../html/addUserPopupHtml.html',
        buttons :
        '<div id="addUserButtons">' +
            '<div id="addButtonDiv" style="float: left">' +
                '<button onclick="actionsAddUserButton()" id="addButton">Add user</button>' +
            '</div>' +
            '<div id="resetButtonDiv" style="float: left">' +
                '<button onclick="actionResetButton()"  id="resetButton">Reset</button>' +
            '</div>' +
        '</div>'
    });
}