//Servidor web en nodeJS para publicar archivos estaticos.
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var app = express();

var varSesion;

var credenciales ={
    user:"root",
    password:"password",
    database:"proyecto",
    host:"localhost",
    port:"3306"  
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  
//Exponer una carpeta como publica, unicamente para archivos estaticos: .html, imagenes, .css, .js
app.use(express.static("public"));
//variable de sesion
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

var dash = express.static("dashboard");
app.use(
    function(peticion,respuesta,next){
        if (peticion.session.correo) {
            dash(peticion,respuesta,next);
        }
        else
            return next();
    }
);

app.post("/login",function(peticion,respuesta){
    var conexion=mysql.createConnection(credenciales);
    var sql= "select id_Tbl_Usuarios, nombre, Email from tbl_usuarios where Email=? and contrasenia=?";
    conexion.query(sql,[peticion.body.correo,peticion.body.contrasena],
    function(err,data,fields){
        if (data.length>0) {
            peticion.session.correo=data[0].Email;
            peticion.session.codigoUsuario=data[0].id_Tbl_Usuarios;
            data[0].estatus=0;
            respuesta.send(data[0]);
            varSesion=peticion.session.correo;
        }
        else{
            respuesta.send({estatus:1,mensale:"login fallido"});
        }
        
    });
});

app.post("/registro", function(peticion,respuesta){
    var conexion=mysql.createConnection(credenciales);
    var sql="insert into tbl_usuarios(nombre, apellido, Email, fecha_nacimiento,contrasenia, Tbl_PlanesDePago_id_Tbl_PlanesDePago) values(?,?,?,?,?,?)";
    conexion.query(sql,[peticion.body.nombre, peticion.body.apellido, peticion.body.password, peticion.body.email, peticion.body.fecha, peticion.body.plan],
    function(err,result){
        if(err) throw err;
        respuesta.send(result);
    }
    );
});

app.post("/guardar-archivo", function(peticion, respuesta){
    var conexion=mysql.createConnection(credenciales);
    var sql="insert into tbl_archivos(nombre,fecha_creacion,mensaje) values(?,NOW(),?)";
    conexion.query(sql,[peticion.body.nombre,peticion.body.mensaje],
    function(err, result){
        if(err) throw err;
        respuesta.send(result);
        //console.log(result);
    }  
    )
});

app.post("/obtener",function(peticion,respuesta){
    respuesta.send(varSesion); 
    console.log(respuesta.send(varSesion));
    //console.log(respuesta.send(peticion.session.correo));
});

app.get("/logout",function(peticion, respuesta){
    peticion.session.destroy();
    respuesta.redirect("index.html");
	//respuesta.send("Sesion eliminada");
});

//////////////////////////////////////login fais
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: '2168531836740582',
    clientSecret: '694fee775e2c5ca85ffc8391b67cafa1',
    callbackURL: '/auth/facebook/callback'
},
function(accesToken, refreshToken,profile, done){
    //profile todos los datos q pueden venir de facebook
    console.log(profile);
    done(null,profile);
}
));
app.get('/auth/facebook/',passport.authenticate('facebook'));
app.get('/auth/facebook/callback/',passport.authenticate('facebook',
                                    {successRedirect:'/',
                                     failureRedirect:'/login'   }));

///////////////////////////////////////////

//Crear y levantar el servidor web.
app.listen(3000);
console.log("Servidor iniciado");
////////////////////////////////////////
//require('./passport/indexPassport');
//require('./passport/facebook');