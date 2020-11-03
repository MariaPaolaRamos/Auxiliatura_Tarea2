const net = require('net');

var mysql = require('mysql');

var puerto=7000;

var con = mysql.createConnection({
  host: "localhost",
  user: "estudiante",
  password: "123456",
  database: "practica2"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

});


const server = net.createServer(function (connection) {
  
  
  connection.on('data', function(data){
    
      
        var position= data.indexOf("/");
        if(position<0)
        {
          connection.write("Ingrese un usuario y contraseña con formato valido."); 
        }else{
          var usr=data.subarray(0,position);
          var psw=data.subarray(position+1,data.length);
          


          con.query("SELECT nombre FROM practica2 WHERE usuario="+"'"+usr+"'", function (err, result, fields) {
            if (err) throw err;
            if(result=="")
            {
                connection.write("No existe el usuario : "+usr);        
            }else{
                con.query("SELECT apellido FROM practica2 WHERE password="+"'"+psw+"'", function (err, result1, fields) {
                    if (err) throw err;
                    if(result1=="")
                    {
                      connection.write("La contraseña para "+usr+" es incorrecta.");
                    }else
                    {
                        connection.write("Bienvenido "+result[0].nombre+" "+result1[0].apellido+"!!!!!");
                        console.log(data+" Se conecto exitosamente.");
                        connection.end();
                    }
                });
            }
          });
          


          
          //connection.write('Hola cliente '+usr+" "+psw+ ' te saluda el server');
        }
       
    });

    connection.on('end', function (data) {
    });
});

server.listen(puerto, function () {
    console.log('servidor esta corriendo en el puerto : '+puerto);
});