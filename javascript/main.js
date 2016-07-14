var itmId;

$(document).ready(function () {
    initLook();
    itmId = 1;    
    initDroppableContainer();
    getUsersFromBase().done(function (response) {
        addUsersToTable(response);
        initDraggableElements();
    });
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


// function buildTable() {
// selectRowAction(table);
// actionRemoveButton();
// actionsAddUserButton(table);
// actionViewButton();
// actionResetButton();
// }
// }