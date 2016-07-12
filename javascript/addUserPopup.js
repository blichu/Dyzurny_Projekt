function clearForm(){
    $('#nameField').val('');
    $('#surnameField').val('');
    $('#avatarURL').val('');
    $('#imageView').html("<img height='70px' class='avatars' src='../images/noImage.png'>");
}
function actionResetButton(){
    $('#resetButton').click(function(){
        clearForm();
    });
}
function actionRemoveButton() {
    // $('#removeButton').click(function () {
    //     removeUserFromBase($('.ui-selected').attr('id'));
    //     $('.ui-selected').remove();
    // });
}
function actionAddButton() {
    $('#addButton').click(function () {
        var name = $('#nameField').val();
        var surname = $('#surnameField').val();
        var avatarURL = $('#avatarURL').val();
        addUserToBase(name, surname, avatarURL)
        // .done(function( data ) {
        // addUserToTable(data.id, $('#avatarURL').val(), $('#nameField').val(), $('#surnameField').val());
        // selectRowAction(tableGlobal);
        // actionRemoveButton(tableGlobal);
        addUserToTable(data.id, avatarURL, name, surname, "noAssigned");
        clearForm();
        // });
    });
}
function actionViewButton() {
    $("#viewButton").click(function () {
        document.getElementById("imageView").innerHTML = "<img height='70px' class='avatars' src='" + $('#avatarURL').val() + "'>";
    });
}
function editUser(id){
    w2popup.open({
        title: 'Popup Title',
        body: '<div style="height: 80%" class="parentOfDynamicSizeElements">' +
        '<div id="addUserAvatarView" class="rightDynamicSizeElement"> <!--id="imageView"-->' +
        '<img id="avatarViewImage" src="../images/noImage.png">' +
        '</div>' +
        '<div id="addUserForm" class="leftDynamicSizeElement">' +
        '<div style="height: 30%;">' +
        '<label for="nameField" class="addUserFormLabel">Name</label>' +
        '<input type="text" id="nameField" class="addUserFormInput"/>' +
        '</div>' +
        '<div style="height: 5%"></div>' +
        '<div style="height: 30%;">' +
        '<label for="surnameField" class="addUserFormLabel">Surname</label>' +

        '<div  class="addUserFormInput" style="width: 30%; float: left">' +
        '<input type="text" id="surnameField"/>' +
        '<button id="viewButton" type="button">View</button>' +
        '</div>' +

        '</div>' +
        '<div style="height: 5%"></div>' +
        '<div style="height: 30%;">' +
        '<label for="avatarURL" class="addUserFormLabel">Avatar URL</label>' +
        '<input type="text" class="addUserFormInput" id="avatarURL"/>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="height: 2%"></div>' +
        '<div id="addUserButtons">' +
        '<div id="addButtonDiv" style="float: left">' +
        '<button id="addButton">Add person</button>' +
        '</div>' +
        '<div id="resetButtonDiv" style="float: left">' +
        '<button id="resetButton">Reset</button>' +
        '</div>' +
        '</div>'
    });
    actionViewButton();

    $('#addButton').on("click", function(){
        var name = $('#nameField').val();
        editUser(name);
    })
}