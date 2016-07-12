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

    $( "#calendarContainer").on( "drop", function( event, ui ) {
        alert(ui.draggable.attr("id"));
    } );
    $("#calendarContainer").droppable({
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
        $('#recycleDragContainer').css("visibility", "hidden");
        $('#editDragContainer').css("visibility", "hidden");
        removeData(ui.draggable.attr("id"));
        // alert("usuwam: " + ui.draggable.attr("id"));
        // ui.draggable.remove();
    } );
    $("#recycleDragContainer").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    // $(this).appendTo("#recycleDragContainer");
                }
            });
        }
    });
    $( "#editDragContainer" ).on( "drop", function( event, ui ) {
        var id = ui.draggable.attr("id");
        var name = $(ui.draggable).children("#name").html();
        var surname = $(ui.draggable).children("#surname").html();
        var avatar = $(ui.draggable).children("#avatar").children("img").attr("src");
        editData(id, name, surname, avatar);
    } );
    $("#editDragContainer").droppable({
        drop: function(event, ui) {
            var itemid = $(event.originalEvent.toElement).attr("itemid");
            $('.box-item').each(function() {
                if ($(this).attr("itemid") === itemid) {
                    // $(this).appendTo("#editDragContainer");
                }
            });
        }
    });
});
function initLoadData() {
    $.get("http://localhost:3000/lol", function (r) {
        response = r;
        for (var i = 0; i < response.length; i++) {
            addRowToTable(response[i].id, response[i].avatarLink, response[i].name, response[i].surname, response);
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
function addRowToTable(id, avatarLink, name, surname, assigned){
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
        '<li id="' + id + '" assigned "' + assigned + '" itemid=itm-' + itmId + ' class="ui-state-default drag btn btn-default box-item" style="background-color: ' + tableRowColor + '">\n    ' +
            '<div class="tableElement"; id="avatar" style="float: left; width: 33%">\n' +
                '<img width="70px" style="align-self: center" class="avatars" src="' + avatarLink + '"/>' +
            '</div>' +
            '<div class="tableElement"; id="name" style="float: left; width: 33%">' +
                name +
            '</div>' +
            '<div class="tableElement"; id="surname" style="float: left; width: 33%">' +
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
    // removeButtonAction();
    // addButtonAction(table);
    // resetButtonAction();
    // }
}
function removeButtonAction() {
    // $('#removeButton').click(function () {
    //     removeData($('.ui-selected').attr('id'));
    //     $('.ui-selected').remove();
    // });
}
function addButtonAction() {
    $('#addButton').click(function () {
        $.post( "http://localhost:3000/lol", {
            name: $('#nameField').val(),
            surname: $('#surnameField').val(),
            avatarLink: $('#avatarURL').val(),
            assigned: "noAssigned"
        })
        .done(function( data ) {
            // addRowToTable(data.id, $('#avatarURL').val(), $('#nameField').val(), $('#surnameField').val());
            // selectRowAction(tableGlobal);
            // removeButtonAction(tableGlobal);
            addRowToTable(data.id, $('#avatarURL').val(), $('#nameField').val(), $('#surnameField').val(), "noAssigned");
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

function editData(id, tableName, tableSurname, tableAvatar){
    alert(id);
    alert(tableName);
    alert(tableSurname);
    alert(tableAvatar);
    w2popup.open({
        title: 'Popup Title',
        body: '<div style="height: 80%" class="parentOfDynamicSizeElements">' +
              '<div id="addUserAvatarView" class="rightDynamicSizeElement"> <!--id="imageView"-->' +
              '<img id="avatarViewImage" src="../images/noImage.png">' +
              '</div>' +
              '<div id="addUserForm" class="leftDynamicSizeElement">' +
              '<div style="height: 30%;">' +
              '<label for="nameField" class="addUserFormLabel">Name</label>' +
              '<input type="text" id="nameField" class="addUserFormInput"/>' +
              '</div>' +
              '<div style="height: 5%"></div>' +
              '<div style="height: 30%;">' +
              '<label for="surnameField" class="addUserFormLabel">Surname</label>' +

              '<div  class="addUserFormInput" style="width: 30%; float: left">' +
              '<input type="text" id="surnameField"/>' +
              '<button id="viewButton" type="button">View</button>' +
              '</div>' +

              '</div>' +
              '<div style="height: 5%"></div>' +
              '<div style="height: 30%;">' +
              '<label for="avatarURL" class="addUserFormLabel">Avatar URL</label>' +
              '<input type="text" class="addUserFormInput" id="avatarURL"/>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '<div style="height: 2%"></div>' +
              '<div id="addUserButtons">' +
              '<div id="addButtonDiv" style="float: left">' +
              '<button id="addButton">Edit</button>' +
              '</div>' +
              '<div id="resetButtonDiv" style="float: left">' +
              '<button id="resetButton">Reset</button>' +
              '</div>' +
              '</div>'
    });
    viewButtonAction();

    $('#addButton').on("click", function(){
        var name = $('#nameField').val();
        var surname = $('#surnameField').val();
        var avatar = $('#avatarURL').val();

       /*if(name !== "") {
            alert(name);
            $.ajax({
                type: 'UPDATE',
                url: 'http://localhost:3000/lol/' + id,
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify({name: name})
            })
        }
        if(surname !== ""){
            alert(surname);
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:3000/lol/' + id,
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify({name: tableName, surname: surname, avatarLink: tableAvatar})
            })
        }
        if(avatar !== ""){
            alert(avatar);
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:3000/lol/' + id,
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify({name: tableName, surname: tableSurname, avatarLink: avatar})
            })
        }*/
    })
}
