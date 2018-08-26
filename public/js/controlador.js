//uso de highlight
//$("sel-lan").change(function () {    
      
//});
///ontener usuario

////////


var myCode;
var editor = ace.edit("editor");
$(document).ready(function () {
    
    $.ajax({
     
        url: "/obtener",  
        method:"post",  
        
        dataType: "json",
        success: function (response) {
           $("#btn-obtener-sesion").append(response);
           console.log(response);
        }
    }); 
    

    $("#editor").hide();
    $("#sel-lan").change(function () {
        $("#editor").show();
       
        var seleccionado=$("#sel-lan").val();
        ace.require("ace/ext/language_tools");
        ace.require("ace/ext/emmet");
        
            editor.setTheme("ace/theme/TextMate");
            editor.session.setMode("ace/mode/"+seleccionado);
            //editor.getSession().setValue("write your code here");
            myCode=editor.getSession().getValue();
            editor.setOption("enableEmmet",true);
            editor.focus();
            
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true
            });
           // $("#editor").focus();

    });
});
$("#btn-guardarArchivo").click(function () { 
    
    var archivo={
        nombre:$("#txt-nombre").val(),
        mensaje:editor.getSession().getValue()
    }
    //console.log(archivo);
    $.ajax({
       
        url: "/guardar-archivo",
        method:"post",
        data: "nombre="+archivo.nombre+"&mensaje="+archivo.mensaje,
        dataType: "json",
        success: function (response) {
            if (response.affectedRows==1){
				console.log(response);
				alert("todo bien");
			}
        }
    });
    
});


//$("btn-obtener-sesion").click(function () { 
  //  $.ajax({
        
    //    url: "/obtener-sesion",
      //  method:"post",
        //data: "data",
        //dataType: "dataType",
        //success: function (response) {
            
       // }
    //});
    
//});






    //function showHTML() {
    //    $('#return').html(editor.getValue());
   // }
    // or use data: url to handle things like doctype
    //function showHTMLInIFrame() {
    //    $('#return').html("<iframe src=" +
     //        "data:text/html," + encodeURIComponent(editor.getValue()) +
       // "></iframe>");
    //}
    //editor.on("input", showHTMLInIFrame)