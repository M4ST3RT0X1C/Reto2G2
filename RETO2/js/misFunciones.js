
$(document).ready(function () {

});


function ejecutarws() {
    $.ajax({
        url: "https://g81a1d3ed743aba-db202110261624.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/costume/costume",
        type: "GET",
        dataType: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta.items);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        },
        complete: function (xhr, status) {
            alert('Ejecutando peticion');
        }      
    });
}



function pintarRespuesta(items) {
    let myTable = "<table>";
    
    for (i=0; i < items.length; i++) {

        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].brand+"</td>";
        myTable+="<td>"+items[i].model+"</td>";
        myTable+="<td>"+items[i].category_id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td> <button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";;
    }
    myTable +="</table>";
    $("#resultado").append(myTable);
}


function guardarInformacion() {
    let myData={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
        
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g81a1d3ed743aba-db202110261624.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/costume/costume",
        type: "POST",
        data:myData,
        dataType: "JSON",
        success: function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#model").val("");
            $("#category_id").val("");
            $("#name").val("");
            ejecutarws();
            alert("se ha guardado el dato")
        }
    });
}


function editarInformacion() {
    let myData={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),      
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g81a1d3ed743aba-db202110261624.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/costume/costume",
        type: "PUT",
        data:dataToSend,
        contentType:"application/JSON",
        dataType: "JSON",
        success: function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#model").val("");
            $("#category_id").val("");
            $("#name").val("");
            ejecutarws();
            alert("Se ha Actualizado")
        }
    });
}


function borrarElemento(idElemento) {
    let myData={
        id:idElemento
        
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g81a1d3ed743aba-db202110261624.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/costume/costume",
        type: "DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType: "JSON",
        success: function(respuesta){
            $("#resultado").empty();
            ejecutarws();
            alert("Se ha eliminado.")
        }
   });
}       