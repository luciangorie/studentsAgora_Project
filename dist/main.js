"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const passwordmanager_1 = require("./passwordmanager");
const tokenchecker_1 = require("./tokenchecker");
const accounts_1 = __importDefault(require("./API/accounts"));
const student_1 = __importDefault(require("./API/student"));
const posts_1 = __importDefault(require("./API/posts"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../process.env') });
const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/api/v1/accounts', accounts_1.default);
app.use('/api/v1/students', student_1.default);
app.use('/api/v1/posts', posts_1.default);
app.get('/', (_req, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, '../public', 'login.html'));
});
app.post('/login', async (req, res) => {
    const { usermail, password } = req.body;
    const usermail1 = usermail.toLowerCase();
    const au = await (0, passwordmanager_1.compareDBStudent)(usermail1, password);
    if (au) {
        const token = (0, tokenchecker_1.TokenGen)(usermail1);
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
        res.status(401).send(`<h1 style="color:#008000;">Accesso non effettuato!</h1>`);
    }
});
app.post('/registrazione', async (_req, res) => {
    res.status(501).json({ error: 'Not implemented' });
});
app.post('/loginadmin', async (req, res) => {
    const { usermail, password } = req.body;
    const usermail1 = usermail.toLowerCase();
    const au = await (0, passwordmanager_1.compareDBAdmin)(usermail1, password);
    if (au) {
        const token = (0, tokenchecker_1.TokenGenAdmin)(usermail1);
        (0, tokenchecker_1.st)(token);
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
    }
    else {
        res.status(401).send(`<h1 style="color:#008000;">Accesso non effettuato!</h1>`);
    }
});
app.get('/homev1', (_req, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, '../public', 'business.html'));
});
mongoose_1.default.connect(dbUrl, {
    serverSelectionTimeoutMS: 5000,
}).then(() => {
    console.log('Connesso con successo al database MongoDB!');
}).catch((error) => {
    console.error('Errore di connessione al database MongoDB:', error);
});
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
