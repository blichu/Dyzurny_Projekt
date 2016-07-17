var itmId;

$(document).ready(function () {
    initLook();
    itmId = 1;    
    initDroppableContainer();
    getUsersFromBase().done(function (response) {
        addUsersToTable(response);
        // addDutyToCalendar(response);
        initDraggableElements();
    });
    loadCalendar();
});
function initLook() {
    $('body').css('font-size', ($(window).width() * 0.01) + 'px');
    $('button').css('font-size', ($(window).width() * 0.01) + 'px');
    $(window).resize(function() {
        $('body').css('font-size', ($(window).width() * 0.01) + 'px');
        $('button').css('font-size', ($(window).width() * 0.01) + 'px');
    });
    window.onscroll = function () {
        window.scrollTo(0,0);
    };
}
function actionRemoveButton() {
    // $('#removeButton').click(function () {
    //     removeUserFromBase($('.ui-selected').attr('id'));
    //     $('.ui-selected').remove();
    // });
}
function addUsersToTable(response) {
    // itemId = 1;
    for (var i = 0; i < response.length; i++) {
        // if(response[i].assigned === "assigned") {
        //     addUserToCalendar(response[i].id, response[i].name, response[i].surname, response[i].avatarLink);
        // }
        // else {
            addUserToTable(response[i].id, response[i].name, response[i].surname, response[i].avatarLink);
        // }
    }
    // function addUserToCalendar(id, name, surname, avatarLink){
    //     $("#calendarContainer").append(
    //         '<li id="' + id + '" class="tableRow ui-state-default drag btn btn-default box-item">' +
    //         '<div class="tableElement">' +
    //         '<img class="avatars" src="' + avatarLink + '"/>' +
    //         '</div>' +
    //         '<div class="tableElement center">' +
    //         name +
    //         '</div>' +
    //         '<div class="tableElement center">' +
    //         surname +
    //         '</div>' +
    //         '</li>'
    //     );
    // }
}





// function buildTable() {
// selectRowAction(table);
// actionRemoveButton();
// actionsEditUserButton(table);
// actionViewButton();
// actionResetButton();
// }
// }