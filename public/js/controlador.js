//uso de highlight
//$("sel-lan").change(function () {    
        
//});
var myCode;
var editor = ace.edit("editor");
$(document).ready(function () {
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
    console.log(archivo);
    
});






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