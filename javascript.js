var response;

$(document).ready(function () {
    loadData(false);
//            addData("x", "y");
});

function loadData(clear) {
    $.get("http://localhost:3000/lol", function (r) {
        response = r;
        for (var i = 0; i < response.length; i++) {
            lastId = response[i].id;
            $("#tbodyy")
                .append("" +
                    "<tr id='" + lastId + "'><td><img class=\"avatars\" src=" + response[i].avatarLink + "></td>" +
                    "<td>" + response[i].name + "</td>" + "<td>" + response[i].surname + "</td></tr>");
        }
        if(! clear) {
            $(document).ready(function () {
                var table = $('#example').dataTable({
                    // ajax: "data.json",
//                        select: true,
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
                    // table.row('.selected').remove().draw( true);
                    // var table = $('#example').dataTable();
                    // $('#example').DataTable().ajax.reload();
                    //

                    // table.reload(true, null);
                });
            });
        }
    })
};
function addData() {
    // $.ajax({
    //     type: 'POST',
    //     url: 'http://localhost:3000/lol',
    //     data:
    //     '{"name":"' +
    //      +
    //     '", "surname":"' +
    //     $('#surnameField').val() +
    //     '", "avatar":"' +
    //     $('#avatarField').val() +
    //     '"}',
    //     // success: function(data) { alert('data: ' + data); },
    //     contentType: "application/json",
    //     dataType: 'json'
    // }).done(function() {
    //     // $("#tbodyy")
    //     //     .append("" +
    //     //         "<tr id='" + lastId + 1 + "'><td><img class=\"avatars\" src=" + response[i].avatarLink + "></td>" +
    //     //         "<td>" + response[i].name + "</td>" + "<td>" + response[i].surname + "</td></tr>");
    // });
    // $.post( "http://localhost:3000/lol/", function( data ) {
    //     alert(data);
    //     // $( ".result" ).html( data );
    // });
    $.post( "http://localhost:3000/lol", {  name: "\"" + $('#nameField').val() + "\"",
                                            surname: "\"" + $('#surnameField').val() + "\"",
                                            avatar: "\"" + $('#avatarField').val() + "\""})
        .done(function( data ) {
            $("#tbodyy")
                .append("" +
                    "<tr id='" + data.id + "'><td><img class=\"avatars\" src=" + $('#avatarField').val() + "></td>" +
                    "<td>" + $('#nameField').val() + "</td>" + "<td>" + $('#surnameField').val() + "</td></tr>");
        });

}
function removeData(id) {
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/lol/' + id,
        // success: function(data) { alert('data: ' + data); },
        // error: function (data) {alert('deleteFail');},
        contentType: "application/json",
        dataType: 'json'
    }).done(function() {
        $('#' + id).remove();
    });
}
