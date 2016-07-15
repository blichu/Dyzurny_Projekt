function initDroppableContainer() {
    for(i=1; i<=42; i++)
    {
        $('#day' + i)
            .on("drop", function (event, ui) {
                $("#" + ui.draggable.attr("id")).appendTo($(this));
                // editUserInBase(ui.draggable.attr("id"), "", "", "", "assigned");
                // editUserInTable(ui.draggable.attr("id"), "", "", "");
            })
            .droppable({
                // drop: function(event, ui) {
                //     // var itemid = $(event.originalEvent.toElement).attr("itemid");
                //     // $('.box-item').each(function() {
                //     //     if ($(this).attr("itemid") === itemid) {
                //     //         $(this).appendTo("#calendarContainer");
                //     //     }
                //     // });
                // }
            });
    }
    $("#recycleDragContainer")
        .on( "drop", function( event, ui ) {
            $('#recycleDragContainer').css("visibility", "hidden");
            $('#editDragContainer').css("visibility", "hidden");
            $('#userTableFooter').addClass("trueHidden");
            $('#userTable').removeClass("userTableDecrease");
            removeUserFromBase(ui.draggable.attr("id"));
        })
        .on( "dropover", function( event, ui ) {

            $('#recycleDragContainer').addClass("hover");
        })
        .on( "dropout", function( event, ui ) {
            $('#recycleDragContainer').removeClass("hover");
        })
        .droppable({
            // drop: function(event, ui) {
            //     var itemid = $(event.originalEvent.toElement).attr("itemid");
            //     $('.box-item').each(function() {
            //         if ($(this).attr("itemid") === itemid) {
            //             // $(this).appendTo("#recycleDragContainer");
            //         }
            //     });
            // }
        });
    $( "#editDragContainer" )
        .on( "drop", function( event, ui ) {
            var id = ui.draggable.attr("id");
            var ele = $("#" + id).find(".tableElement");
            var oldImageURL = ele;
            var oldName = ele = ele.next();
            var oldSurname = ele.next();
            showEditUserPopUp(id, oldName.html(), oldSurname.html(), oldImageURL.attr("src"));
        } )
        .on( "dropover", function( event, ui ) {
            $('#editDragContainer').addClass("hover");
        })
        .on( "dropout", function( event, ui ) {
            $('#editDragContainer').removeClass("hover");
        })
        .droppable({
            // drop: function(event, ui) {
            //     var itemid = $(event.originalEvent.toElement).attr("itemid");
            //     $('.box-item').each(function() {
            //         if ($(this).attr("itemid") === itemid) {
            //             // $(this).appendTo("#editDragContainer");
            //         }
            //     });
            // }
        });
}
function initDraggableElements() {
    var x = 100;
    $( ".box-item" )
        .on( "dragstart", function( event, ui ) {
            $('#recycleDragContainer').css("visibility", "visible");
            $('#editDragContainer').css("visibility", "visible");
            $('#userTableFooter').removeClass("trueHidden");
            $('#userTable').addClass("userTableDecrease");
            $(ui.helper).css({width:'10%', 'border-radius': '10em', height:'50px', opacity: '0.6', "background-color": "white"});
        })
        .on( "dragstop", function( event, ui ) {
            $('#recycleDragContainer').css("visibility", "hidden");
            $('#editDragContainer').css("visibility", "hidden");
            $('#userTableFooter').addClass("trueHidden");
            $('#userTable').removeClass("userTableDecrease");
        })
        // .draggable({
        //     cursor: 'move',
        //     helper: "clone"
        // });
        .draggable({
            cursorAt:
            {
               left: 100, bottom: 100
            },
            cursor: 'move',
            revert: 'true',
            helper: "clone"
        });
}
