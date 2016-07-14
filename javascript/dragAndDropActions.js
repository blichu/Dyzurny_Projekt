function initDroppableContainer() {
    $('#calendarContainer')
        .on( "drop", function( event, ui ) {
            alert(ui.draggable.attr("id"));
        })
        .droppable({
            drop: function(event, ui) {
                var itemid = $(event.originalEvent.toElement).attr("itemid");
                $('.box-item').each(function() {
                    if ($(this).attr("itemid") === itemid) {
                        $(this).appendTo("#calendarContainer");
                    }
                });
            }
        });
    $("#recycleDragContainer")
        .on( "drop", function( event, ui ) {
            $('#recycleDragContainer').css("visibility", "hidden");
            $('#editDragContainer').css("visibility", "hidden");
            removeUserFromBase(ui.draggable.attr("id"));
            // alert("usuwam: " + ui.draggable.attr("id"));
            // ui.draggable.remove();
        })
        .on( "dropover", function( event, ui ) {

            $('#recycleDragContainer').addClass("hover");
        })
        .on( "dropout", function( event, ui ) {
            $('#recycleDragContainer').removeClass("hover");
        })
        .droppable({
            drop: function(event, ui) {
                var itemid = $(event.originalEvent.toElement).attr("itemid");
                $('.box-item').each(function() {
                    if ($(this).attr("itemid") === itemid) {
                        // $(this).appendTo("#recycleDragContainer");
                    }
                });
            }
        });
    $( "#editDragContainer" )
        .on( "drop", function( event, ui ) {
            var id = ui.draggable.attr("id");
            var name = $(ui.draggable).children("#name").html();
            var surname = $(ui.draggable).children("#surname").html();
            var avatar = $(ui.draggable).children("#avatar").children("img").attr("src");
            editUser(id, name, surname, avatar);
        } )
        .on( "dropover", function( event, ui ) {
            $('#editDragContainer').addClass("hover");
        })
        .on( "dropout", function( event, ui ) {
            $('#editDragContainer').removeClass("hover");
        })
        .droppable({
            drop: function(event, ui) {
                var itemid = $(event.originalEvent.toElement).attr("itemid");
                $('.box-item').each(function() {
                    if ($(this).attr("itemid") === itemid) {
                        // $(this).appendTo("#editDragContainer");
                    }
                });
            }
        });
}
function initDraggableElements() {
    var x = 100;
    $( ".box-item" )
        .on( "dragstart", function( event, ui ) {
            $('#recycleDragContainer').css("visibility", "visible");
            $('#editDragContainer').css("visibility", "visible");
            $(ui.helper).css({width:'10%', 'border-radius': '10em', height:'50px', opacity: '0.6', "background-color": "white"});
            // w2alert($(ui.helper).parent().html());
        })
        .on( "dragstop", function( event, ui ) {
            $('#recycleDragContainer').css("visibility", "hidden");
            $('#editDragContainer').css("visibility", "hidden");
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
