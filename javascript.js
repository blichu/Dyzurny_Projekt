var response;
var tableGlobal;

$(document).ready(function () {
    initLoadData();
});

function clearForm(formName){
    if(formName == "addForm"){
        $('#nameField').val('');
        $('#surnameField').val('');
        $('#avatarURL').val('');
        document.getElementById("imageView").innerHTML = "<img height='70px' class='avatars' src='noImage.png'>";
    }
    //TODO: Dodać kolejne formy, jeśli się nowe pojawią :)
}

function resetButtonAction(){
    $('#resetButton').click(function(){
       clearForm("addForm");
    });
}

function addRowToTable(id, avatarLink, name, surname){
    $("#tbodyy")
        .append("" +
            "<tr id=\"" + id + "\">" +
                "<td>" +
                    id +
                "</td>" +
                "<td>" +
                    "<img class=\"avatars\" src=" + avatarLink + ">" +
                "</td>" +
                "<td>" +
                    name +
                "</td>" +
                "<td>" +
                    surname +
                "</td>" +
            "</tr>");
}
function correctAddRowToTable(id, avatarLink, name, surname) {
    // alert("add");
    $('#example').DataTable().row.add( [
        id,
        avatarLink,
        name,
        surname
    ] ).draw( true );
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
    var table = $('#example').dataTable({
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
    selectRowAction(table);
    removeButtonAction(table);
    addButtonAction(table);
    viewButtonAction();
    resetButtonAction();
    // }
}
function selectRowAction(table) {
    $('#example tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
}

function addData() {
    $.post("http://localhost:3000/lol", {
        name: $('#nameField').val(),
        surname: $('#surnameField').val(),
        avatar: $('#avatarURL').val()
    })
}
function removeButtonAction(table) {
    $('#deleteButton').click(function () {
        removeData(table.$('tr.selected').attr('id'));
        // table.$('tr.selected')
        // var row = $(this).closest("tr").get(id);
        table.fnDeleteRow(table.$('tr.selected'));
    });
}
function addButtonAction(table) {
    $('#addButton').click(function () {
        $.post( "http://localhost:3000/lol", {
            name: $('#nameField').val(),
            surname: $('#surnameField').val(),
            avatar: $('#avatarField').val()
        })
        .done(function( data ) {
            // addRowToTable(data.id, $('#avatarURL').val(), $('#nameField').val(), $('#surnameField').val());;
            // selectRowAction(tableGlobal);
            // removeButtonAction(tableGlobal);
            correctAddRowToTable(data.id, "<img class='avatars' src='" + $('#avatarURL').val() + "'>", $('#nameField').val(), $('#surnameField').val());
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
        // $('#' + id).remove();

    });
}
