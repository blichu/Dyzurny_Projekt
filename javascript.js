var response;
var tableGlobal;

$(document).ready(function () {
    initLoadData();
    $( "#selectable" ).selectable();
    $('.box-item').draggable({
        cursor: 'move',
        helper: "clone"
    });
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
    $("#container2").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#container2");
                }
            });
        }
    });
    $("#container3").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#container3");
                }
            });
        }
    });
    $("#container4").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#container4");
                }
            });
        }
    }); $("#container5").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    $(this).appendTo("#container5");
                }
            });
        }
    });
});

function clearForm(formName){
    if(formName == "addForm"){
        $('#nameField').val('');
        $('#surnameField').val('');
        $('#avatarURL').val('');
        $('#imageView').html("<img height='70px' class='avatars' src='noImage.png'>");
        // document.getElementById("imageView").innerHTML = "<img height='70px' class='avatars' src='noImage.png'>";
    }
    //TODO: Dodać kolejne formy, jeśli się nowe pojawią :)
}

function resetButtonAction(){
    $('#resetButton').click(function(){
       clearForm("addForm");
    });
}

function addRowToTable(id, avatarLink, name, surname){
    // $("#tbodyy")
// .append("" +
//         "<tr id=\"" + id + "\">" +
//         // "<td>" +
//         //     id +
//         // "</td>" +
//         "<td width='10%'>" +
//         "<img class=\"avatars\" src=" + avatarLink + ">" +
//         "</td>" +
//         "<td>" +
//         name +
//         "</td>" +
//         "<td>" +
//         surname +
//         "</td>" +
//         "</tr>");
    $("#selectable").append("" +
    '<li id=' + id + ' width="100%" class="ui-state-default">' +
        '<table width="100%">' +
            '<tr>' +
                '<td style="width: 10%">' +
                    '<img class=\"avatars\" src="' + avatarLink + '"/>' +
                '</td>' +
                '<td style="width: 45%" style="text-align: center">' +
                    name +
                '</td>' +
                '<td style="width: 45%" style="text-align: center">' +
                    surname +
                '</td>' +
            '</tr>' +
        '</table>' +
    '</li>');
}
function initLoadData() {
    $.get("http://localhost:3000/lol", function (r) {
        response = r;
        for (var i = 0; i < response.length; i++) {
            lastId = response[i].id;
            addRowToTable(lastId, response[i].avatarLink, response[i].name, response[i].surname);
        }
        buildTable();
    })
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
// function selectRowAction(table) {
//     $('#selectable').on('click', 'li', function () {
//         if ($(this).hasClass('selected')) {
//             $(this).removeClass('selected');
//         }
//         else {
//             table.$('tr.selected').removeClass('selected');
//             $(this).addClass('selected');
//         }
//     });
// }

function removeButtonAction() {
    $('#deleteButton').click(function () {
        removeData($('.ui-selected').attr('id'));
        $('.ui-selected').remove();
    });
}
function addButtonAction(table) {
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


// function initializeResize() {
//     $('#drag').resizable()
// }
// function initializeDrop() {
//     $(".daysdivs").droppable({
//         drop: handleDropEvent
//     });
// }
// function handleDropEvent(event, ui) {
//     var dropped = ui.draggable;
//     var droppedOn = $(this);
//     $(dropped).detach().css({
//         top:0,
//         left: 0,
//         bottom: 0,
//     }).appendTo(droppedOn);
// }
//
// $(init);
// function init() {
//     initializeResize();
//     initializeDrag();
//     initializeDrop();
// }

