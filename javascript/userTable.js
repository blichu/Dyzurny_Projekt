var tableRowColor;
function addUserToTable(id, avatarLink, name, surname, assigned){
    var tableRowColorR = 170;
    var tableRowColorG = 170;
    var tableRowColorB = 170;
    var roznica = 25;
    $("#selectable").append('' +
        '<li id="' + id + '" assigned="' + assigned + '" itemid=itm-' + itmId + ' class="tableRow ui-state-default drag btn btn-default box-item">' +
            '<div class="tableElement">' +
                '<img class="avatars" src="' + avatarLink + '"/>' +
            '</div>' +
            '<div class="tableElement center">' +
                name +
            '</div>' +
            '<div class="tableElement center">' +
                surname +
            '</div>' +
        '</li>');
    if(itmId%2 === 0) {
        tableRowColor = "rgb(" + tableRowColorR + "," + tableRowColorG + "," + tableRowColorB + ")";
    } else {
        tableRowColor = "rgb(" + (tableRowColorR + roznica) + "," + (tableRowColorG  + roznica) + "," + (tableRowColorB + roznica) + ")";
        $('#' + id).css("background-color", tableRowColor);
    }
    itmId = itmId + 1;
}
function addUsersToTable(response) {
    for (var i = 0; i < response.length; i++) {
        addUserToTable(response[i].id, response[i].avatarLink, response[i].name, response[i].surname, response);
    }
}