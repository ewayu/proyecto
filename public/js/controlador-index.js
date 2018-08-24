$("#btn-login").click(function () { 
    $.ajax({
        
        url: "/login",
        data: "correo="+$("#email").val()+"&contrasena="+$("#pwd").val(),
        method:"POST",
        dataType: "json",
        success: function (response) {
            if (response.estatus==0) {
                //alert("todo bien, todo correcto y yo que me alegro");
                console.log(response);
                window.location.href ="dashboard.html";
            } 
            else {
                alert("credenciales incorrectas");
                console.log(response)
            }
        }
    });
    
});

//registrarse    
$("#btn-registro").click(function () { 
    $.ajax({
        
        url: "/registro",
        data: "nombre="+$("#reg-usuario").val()+"&apellido="+$("#reg-apell").val()+
              "&email="+$("#reg-email").val()+"&fecha="+$("#reg-fecha").val()+
              "&password="+$("#reg-pass").val()+"&plan="+$("#reg-plan").val(),
        method:"POST",
        dataType: "json",
        success: function (response) {
            if (response.affectedRows==1){
				console.log(response);
				alert("todo bien");
			}
        }
    });
    
});