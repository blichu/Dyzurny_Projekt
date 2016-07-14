function clearForm(){
    $('#nameField').val('');
    $('#surnameField').val('');
    $('#avatarURL').val('');
    $('#imageView').html("<img height='70px' class='avatars' src='../images/noImage.png'>");
}
function actionResetButton(){
    clearForm();
}
function actionsAddUserButton() {
    // $('#addButton').on("click", function(){
    var name = $('#nameField').val();
    var surname = $('#surnameField').val();
    var avatarURL = $('#avatarURL').val();
    addUserToBase(name, surname, avatarURL).done( function (result) {
        addUserToTable(result.id, name, surname, avatarURL);
    });
    w2popup.close();
}
function actionViewButton() {
    // document.getElementById("avatarViewImage").att = "<img height='70px' class='avatars' src='" + $('#avatarURL').val() + "'>";
    $('#avatarViewImage').attr("src", $('#avatarURL').val());
}
function showAddUserPopUp(){
/*    w2popup.open({
        title: "Dodanie użytkownika",
        // url: '../html/addUserPopupHtml.html',
        buttons:
        '<div class="parentOfDynamicSizeElements popupTop">' +
        '<div id="addUserAvatarView" class="rightDynamicSizeElement"> <!--id="imageView"-->' +
        '<img id="avatarViewImage" src="../images/noImage.png">' +
        '</div>' +
        '<div id="addUserForm" class="leftDynamicSizeElement">' +
        '<div style="height: 30%">' +
        '<label for="nameField" class="addUserFormLabel">Name</label>' +
        '<input type="text" id="nameField" class="addUserFormInput"/>' +
        '</div>' +
        '<div style="height: 5%"></div>' +
        '<div style="height: 30%">' +
        '<label for="surnameField" class="addUserFormLabel">Surname</label>' +
        '<input type="text" id="surnameField" class="addUserFormInput"/>' +
        '</div>' +
        '<div style="height: 5%"></div>' +
        '<div style="height: 30%">' +
        '<label for="avatarURLView" class="addUserFormLabel">URL view</label>' +
        '<div class="addUserFormInput" rel="buttons">' +
        '<input type="text" class="addUserFormInputMain" id="avatarURL"/>' +
        '<button id="avatarURLView" class="addUserFormInputShow" onclick="actionViewButton()">View</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="popupBot">' +
            '<div id="addButtonDiv" style="float: left">' +
                '<button onclick="actionsEditUserButton()" id="addButton">Add user</button>' +
            '</div>' +
            '<div id="resetButtonDiv" style="float: left">' +
                '<button onclick="actionResetButton()"  id="resetButton">Reset</button>' +
            '</div>' +
        '</div>'
    });*/
    $.get( "../html/addUserPopupHtml.html", function( data ) {
        // $( ".result" ).html( data );
        w2popup.load({ url: '../html/addUserPopupHtml.html#popup' });
    });

}