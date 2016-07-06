var response;

$(document).ready(function () {
    loadData(false);
});

function addRowToTable(id, avatarLink, name, surname){
    $("#tbodyy")
                .append("" +
                    "<tr id='" + id + "'><td><img class=\"avatars\" src=" + avatarLink + "></td>" +
                    "<td>" + name + "</td>" + "<td>" + surname + "</td></tr>");
}

function loadData(clear) {
    $.get("http://localhost:3000/lol", function (r) {
        response = r;
        for (var i = 0; i < response.length; i++) {
            lastId = response[i].id;
            addRowToTable(lastId, response[i].avatarLink, response[i].name, response[i].surname);
        }
        if(! clear) {
            $(document).ready(function () {
                var table = $('#example').dataTable({
                    "columnDefs": [
                        {"width": "5%", "targets": 0}
                    ]
                });
                $('#example tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                $('#deleteButton').click(function () {
                    removeData(table.$('tr.selected').attr('id'));
                    table.$('tr.selected')
                });
            });
        }
    })
};
function addData() {
    $.post( "http://localhost:3000/lol", {  name: "\"" + $('#nameField').val() + "\"",
                                            surname: "\"" + $('#surnameField').val() + "\"",
                                            avatar: "\"" + $('#avatarField').val() + "\""})
        .done(function( data ) {
            // $("#tbodyy")
            //     .append("" +
            //         "<tr id='" + data.id + "'><td><img class=\"avatars\" src=" + $('#avatarField').val() + "></td>" +
            //         "<td>" + $('#nameField').val() + "</td>" + "<td>" + $('#surnameField').val() + "</td></tr>");
            addRowToTable(data.id, $('#avatarField').val(), $('#nameField').val(), $('#surnameField').val());
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
