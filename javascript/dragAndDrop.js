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
            // alert("edytuj: " + ui.draggable.attr("itemid"));
            var id = ui.draggable.attr("id");
            editUserInBase(id);
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
function initDragableElements() {
    $( ".box-item" )
        .on( "dragstart", function( event, ui ) {
            $('#recycleDragContainer').css("visibility", "visible");
            $('#editDragContainer').css("visibility", "visible");
            $(ui.helper).css({width:'30%',height:'10%'});
        })
        .on( "dragstop", function( event, ui ) {
            $('#recycleDragContainer').css("visibility", "hidden");
            $('#editDragContainer').css("visibility", "hidden");
        })
        .draggable({
            cursor: 'move',
            helper: "clone"
        });
}