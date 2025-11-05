const express =require( 'express');
const path = require('path');
const  bodyParser= require ('body-parser');
const mongoose = require ('mongoose');
const {hashPassword,comparePassword,compareDBbusiness,compareDBbusinessv2,compareDB, compareDBadmin}= require ("./passwordmanager.cjs");
require('dotenv').config({path: path.resolve(__dirname, 'process.env')});
const {LocalStorage} = require('node-localstorage');
//const authcheck = require('./API/authchecks.cjs');

const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 3000;
const app = express();





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