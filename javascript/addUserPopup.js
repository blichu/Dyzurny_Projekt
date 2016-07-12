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
    $('#addButton').on("click", function(){
        var name = $('#nameField').val();
        var surname = $('#surnameField').val();
        var avatar = $('#avatarURL').val();

        /*if(name !== "") {
         alert(name);
         $.ajax({
         type: 'UPDATE',
         url: 'http://localhost:3000/lol/' + id,
         contentType: "application/json",
         dataType: 'json',
         data: JSON.stringify({name: name})
         })
         }
         if(surname !== ""){
         alert(surname);
         $.ajax({
         type: 'PUT',
         url: 'http://localhost:3000/lol/' + id,
         contentType: "application/json",
         dataType: 'json',
         data: JSON.stringify({name: tableName, surname: surname, avatarLink: tableAvatar})
         })
         }
         if(avatar !== ""){
         alert(avatar);
         $.ajax({
         type: 'PUT',
         url: 'http://localhost:3000/lol/' + id,
         contentType: "application/json",
         dataType: 'json',
         data: JSON.stringify({name: tableName, surname: tableSurname, avatarLink: avatar})
         })
         }*/
    })
}
function actionViewButton() {
    $("#viewButton").click(function () {
        document.getElementById("imageView").innerHTML = "<img height='70px' class='avatars' src='" + $('#avatarURL').val() + "'>";
    });
}
function editUser(id, tableName, tableSurname, tableAvatar){
    // alert(id);
    // alert(tableName);
    // alert(tableSurname);
    // alert(tableAvatar);
    w2popup.open({
        title: 'Popup Title',
        body:
        '<div style="height: 80%" class="parentOfDynamicSizeElements">' +
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
                    '<input type="text" id="surnameField" class="addUserFormInput"/>' +
                '</div>' +
                '<div style="height: 5%"></div>' +
                '<div style="height: 30%;">' +
                    '<label for="surnameField" class="addUserFormLabel">Surname</label>' +
                    '<div class="addUserFormInput">' +
                        '<input type="text" class="addUserFormInputMain" id="avatarURL"/>' +
                        '<button id="avatarURLView" class="addUserFormInputShow" type="button">View</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div style="height: 2%"></div>' +
        '<div id="addUserButtons">' +
            '<div id="addButtonDiv" style="float: left">' +
                '<button id="addButton">Edit</button>' +
            '</div>' +
            '<div id="resetButtonDiv" style="float: left">' +
                '<button id="resetButton">Reset</button>' +
            '</div>' +
        '</div>'
    });
    actionViewButton();
}