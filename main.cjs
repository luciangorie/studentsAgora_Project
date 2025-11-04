const express =require( 'express');
const path = require('path');
const  bodyParser= require ('body-parser');
const mongoose = require ('mongoose');
const Cliente = require( "./classes/Cliente.cjs");
const Imprenditore = require('./classes/Imprenditore.cjs');
const Venditore = require( "./classes/Venditore.cjs");
const {hashPassword,comparePassword,compareDBbusiness,compareDBbusinessv2,compareDB, compareDBadmin}= require ("./passwordmanager.cjs");
require('dotenv').config({ path: 'process.env' });
const {LocalStorage} = require('node-localstorage');
const authcheck = require('./API/authchecks.cjs');

const dbUrl = process.env.DB_URL;





mongoose.connect(dbUrl).then( ()=> {
    console.log("Connected!")
})
.catch(err => {
    console.log("Errore di connessione " ,err)
}).then(()=> {


// Avvio del server
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
});