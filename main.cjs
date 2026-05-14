const express =require( 'express');
const path = require('path');
const fs = require('fs');
const  bodyParser= require ('body-parser');
const mongoose = require ('mongoose');
const {hashPassword,comparePassword,compareDBAdmin,compareDBStudent}= require ("./passwordmanager.cjs");
const {tokenChecker,TokenGen,TokenGenEnt,TokenGenVend,TokenGenAdmin,st}= require ("./tokenchecker.cjs");
const jwt = require('jsonwebtoken');
require('dotenv').config({path: path.resolve(__dirname, 'process.env')});
const {LocalStorage} = require('node-localstorage');
const PersonalDetailsService = require('./services/detailsService.cjs');

const accounts = require('./API/accounts.cjs');
const students = require('./API/student.cjs');
const posts = require('./API/posts.cjs');




const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 3000;
const app = express();

// Middleware per il parsing del body
app.use(express.urlencoded({ extended: true })); // Per form HTML
app.use(express.json());

// Servi i file statici dalla cartella `public`
app.use(express.static(path.join(__dirname, 'public')));

// Crea la cartella uploads se non esiste e servila come statica
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

app.use('/api/v1/accounts', accounts);
app.use('/api/v1/students', students);
app.use('/api/v1/posts', posts);


app.get('/', (req, res) => {
    
    res.status(200).sendFile(path.join(__dirname, 'public', `/login.html`));
});

//login stuff
app.post('/login', async (req, res) => {
    const { usermail, password } = req.body;
    var usermail1 = usermail.toLowerCase();
    var au = await compareDBStudent(usermail1, password);
    if (au) {
    const token = TokenGen(usermail1);
    res.send(`
        <html>
        <head><title>Login</title></head>
        <body>
            <script>
                localStorage.setItem('token', '${token}');
                window.location.href = '/caricamento.html';
            </script>
        </body>
        </html>
    `);
}
    else {
        res.status(401).send(`<h1 style="color: #008000;">Accesso non effettuato!</h1>`);
    }
});

app.post('/registrazione', async (req, res) => {
   
});


app.post('/loginadmin', async (req, res) => {
    const { usermail, password } = req.body;
    var usermail1 = usermail.toLowerCase();
    var au= await compareDBAdmin(usermail1, password);

    if (au) {
        const token = TokenGenAdmin(usermail1);
        st(token);
        res.send(`
        <html>
        <head><title>Login</title></head>
        <body>
            <script>
                localStorage.setItem('token', '${token}');
                window.location.href = '/caricamento-business.html';
            </script>
        </body>
        </html>
    `);
    } else res.status(401).send(`<h1 style="color: #008000;">Accesso non effettuato!</h1>`)
});



app.get('/homev1', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', `/business.html`));
});




mongoose.connect(dbUrl, {
    
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("Connesso con successo al database MongoDB!");
    
}).catch((error) => {
    console.error("Errore di connessione al database MongoDB:", error);
});


// Avvio del server
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
