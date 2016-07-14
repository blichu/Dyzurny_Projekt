var tableRowColor;

function addUsersToTable(response) {
    // itemId = 1;
    for (var i = 0; i < response.length; i++) {
        addUserToTable(response[i].id, response[i].name, response[i].surname, response[i].avatarLink, response);
    }
    function addUserToTable(id, name, surname, avatarLink, assigned){
        $("#selectable").append(
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
            '</li>'
        );
        function setTableRowColor() {
            if(itmId%2 === 0) {
                $('#' + id)
                    .removeClass("lightTableRow")
                    .addClass("darkTableRow");
            } else {
                $('#' + id)
                    .removeClass("darkTableRow")
                    .addClass("lightTableRow");
            }
        }
        setTableRowColor();
        itmId = itmId + 1;
    }
}
