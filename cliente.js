var net = require('net');
const rl = require('./readl');

var puerto=7000;

var client = net.connect({ port: puerto }, function () {
    console.log('Bienvenido al sistema LAB 273');
    console.log('Ingrese usuario y contraseña (user/pass)');
});

rl.on('line', function (msg) {
    client.write(msg);
});

client.on('data', function (data) {
    console.log(data.toString());
    //client.end();
});

client.on('end', function () {
    rl.close();
});