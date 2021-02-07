const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');
const SHA256 = require("crypto-js/sha256");

mongoose.connect('mongodb://localhost:27017/ProdAsturianosV3');

Usuario.collection.drop();

let usu1 = new Usuario({
    login: 'correoMay',
    password: SHA256('12345678')
});

usu1.save();

let usu2 = new Usuario({
    login: 'correoNacho',
    password: SHA256('12345678')
});

usu2.save();