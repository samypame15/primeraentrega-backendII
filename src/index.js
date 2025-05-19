
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import passport from 'passport'; 
import { initializePassport } from './config/passport.js'; 
import sessionRouter from './routes/sessions.router.js';
import { engine } from 'express-handlebars';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Inicializar Passport antes de usarlo en middlewares
initializePassport();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.resolve(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// Rutas para sesiones (login, logout, current, etc)
app.use('/api/sessions', sessionRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
