var itmId;

$(document).ready(function () {
    initLook();
    itmId = 1;    
    initDroppableContainer();
    getUsers(addUsersToTable, initDragableElements);
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



// function buildTable() {
// selectRowAction(table);
// actionRemoveButton();
// actionAddButton(table);
// actionViewButton();
// actionResetButton();
// }
// }