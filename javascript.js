var response;
var itmId;

$(document).ready(function () {
    $("#header").load("header.html");
    // $("#content").load("content.html");
    $('body').css('font-size', ($(window).width() * 0.01) + 'px');
    $('button').css('font-size', ($(window).width() * 0.01) + 'px');
    $(window).resize(function() {
        $('body').css('font-size', ($(window).width() * 0.01) + 'px');
        $('button').css('font-size', ($(window).width() * 0.01) + 'px');
    });
    itmId = 7;
    window.onscroll = function () {
        window.scrollTo(0,0);
    }
    initLoadData();
    // $( "#selectable" ).selectable();
    // $( ".box-item" ).on( "dragstop", function( event, ui ) {
    //     // alert("stop");
    //     alert(ui.helper.html());
    // });

    $( "#container1" ).on( "drop", function( event, ui ) {
        alert(ui.draggable.attr("id"));
    } );
    $("#container1").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#container1");
                }
            });
        }
    });
    $( "#recycleDragContainer" ).on( "drop", function( event, ui ) {
        // TODO: tutaj usnięcie z bazy
        ui.draggable.remove();
    } );
    $("#recycleDragContainer").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#recycleDragContainer");
                }
            });
        }
    });
    $( "#editDragContainer" ).on( "drop", function( event, ui ) {
        alert("edytuj: " + ui.draggable.attr("itemid"));
    } );
    $("#editDragContainer").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#editDragContainer");
                }
            });
        }
    });
});
function initLoadData() {
    $.get("http://localhost:3000/lol", function (r) {
        response = r;
        for (var i = 0; i < response.length; i++) {
            addRowToTable(response[i].id, response[i].avatarLink, response[i].name, response[i].surname);
        }
        $( ".box-item" ).on( "dragstart", function( event, ui ) {
            $('#recycleDragContainer').css("visibility", "visible");
            $('#editDragContainer').css("visibility", "visible");
        });
        $( ".box-item" ).on( "dragstop", function( event, ui ) {
            $('#recycleDragContainer').css("visibility", "hidden");
            $('#editDragContainer').css("visibility", "hidden");
        });
        $('.box-item').draggable({
            cursor: 'move',
            helper: "clone"
        });
        buildTable();
    });

}
function clearForm(formName){
    if(formName == "addForm"){
        $('#nameField').val('');
        $('#surnameField').val('');
        $('#avatarURL').val('');
        $('#imageView').html("<img height='70px' class='avatars' src='images/noImage.png'>");
        // document.getElementById("imageView").innerHTML = "<img height='70px' class='avatars' src='noImage.png'>";
    }
}
function resetButtonAction(){
    $('#resetButton').click(function(){
       clearForm("addForm");
    });
}
function addRowToTable(id, avatarLink, name, surname){
    var tableRowColorR = 170;
    var tableRowColorG = 170;
    var tableRowColorB = 170;
    var roznica = 25;
    if(itmId%2 === 0) {
        tableRowColor = "rgb(" + tableRowColorR + "," + tableRowColorG + "," + tableRowColorB + ")";
    } else {
        tableRowColor = "rgb(" + (tableRowColorR + roznica) + "," + (tableRowColorG  + roznica) + "," + (tableRowColorB + roznica) + ")";
    }
    $("#selectable").append('' +
        '<li id="' + id + '" itemid=itm-' + itmId + ' class="ui-state-default drag btn btn-default box-item" style="background-color: ' + tableRowColor + '">\n    ' +
            '<div class="tableElement"; style="float: left; width: 33%">\n' +
                '<img width="70px" style="align-self: center" class="avatars" src="' + avatarLink + '"/>' +
            '</div>' +
            '<div class="tableElement"; style="float: left; width: 33%">' +
                name +
            '</div>' +
            '<div class="tableElement"; style="float: left; width: 33%">' +
                surname +
            '</div>' +
        '</li>');
    itmId = itmId + 1;
}

function buildTable() {
    var table = $('#tableee').dataTable({
        "paging": false,
        "columnDefs": [
            // {"width": "5%", "targets": 0}
            {
                "width": "5%",
                "targets": 1
            },
            {
                "visible": false,
                "targets": 0
            }
        ]
    });
    // selectRowAction(table);
    removeButtonAction();
    addButtonAction(table);
    viewButtonAction();
    resetButtonAction();
    // }
}
function removeButtonAction() {
    $('#removeButton').click(function () {
        removeData($('.ui-selected').attr('id'));
        $('.ui-selected').remove();
    });
}
function addButtonAction() {
    $('#addButton').click(function () {
        $.post( "http://localhost:3000/lol", {
            name: $('#nameField').val(),
            surname: $('#surnameField').val(),
            avatarLink: $('#avatarURL').val()
        })
        .done(function( data ) {
            // addRowToTable(data.id, $('#avatarURL').val(), $('#nameField').val(), $('#surnameField').val());
            // selectRowAction(tableGlobal);
            // removeButtonAction(tableGlobal);
            addRowToTable(data.id, $('#avatarURL').val(), $('#nameField').val(), $('#surnameField').val());
            clearForm("addForm");
        });
    });
    // $('#addButton').click();
}
function viewButtonAction() {
    $("#viewButton").click(function () {
        document.getElementById("imageView").innerHTML = "<img height='70px' class='avatars' src='" + $('#avatarURL').val() + "'>";
    });
}
function removeData(id) {
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/lol/' + id,
        contentType: "application/json",
        dataType: 'json'
    }).done(function() {
        $('#' + id).remove();

    });
}

function editData(id){
    
}
