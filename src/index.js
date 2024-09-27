/**
 * @module Configuración principal del servidor Express
 * @description API que conecta IA con aplicativos y base de datos
 * @requires multer
 * @requires express
 * @requires morgan
 * @requires router
 * @requires mongoConnect
 * @requires passport
 * @requires initialiazePassport
 * @requires session
 * @requires cors
 * @requires run
 */

const multer = require('multer');
const express = require('express')
const morgan = require('morgan')
const router = require('./router')
const mongoConnect = require('../db/index.js')
const passport = require('passport')
const initialiazePassport = require('./config/passport.config')
const session = require('express-session')
const cors = require('cors');
const run = require("./transcribe");

const app = express()

/**
 * Middlewares de Express.
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Configurar CORS para permitir todas las solicitudes
/**
 * Middleware para configurar CORS y permitir todas las solicitudes.
 */
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Configuración de multer para manejar la carga de archivos
/**
 * Configuración de multer para manejar la carga de archivos.
 * @type {multer.Instance}
 */
const upload = multer({ dest: 'uploads/' });

// Configura express-session
/**
 * Middleware para configurar express-session.
 * @param {Object} sessionConfig - Configuración de la sesión.
 * @param {string} sessionConfig.secret - Cadena secreta para firmar la cookie de la sesión.
 * @param {boolean} sessionConfig.resave - Fuerza a la sesión a ser guardada en la tienda, incluso si no ha sido modificada.
 * @param {boolean} sessionConfig.saveUninitialized - Fuerza a una sesión "no inicializada" a ser guardada en la tienda.
 */
app.use(session({
    secret: 'HarkAI', // Cambia esto a una cadena secreta única y segura
    resave: true,
    saveUninitialized: true
  }));

/**
 * Inicialización de Passport.
 */
initialiazePassport()
app.use(passport.initialize())
app.use(passport.session())

/**
 * Configura las rutas de la aplicación.
 * @param {Object} app - La instancia de la aplicación Express.
 */
router(app)

// Ruta para la transcripción de archivos
/**
 * Ruta para la transcripción de archivos.
 * @name post/transcribe
 * @function
 * @memberof module:routes
 * @inner
 * @param {string} path - Ruta de la API.
 * @param {callback} middleware - Middleware para manejar la carga de archivos y la transcripción.
 */
app.post('/transcribe', upload.single('file'), async (req, res) => {
  try {
      const fileUrl = req.file.path; // Obteniendo la ruta del archivo
      if (!fileUrl) {
          throw new Error('No se ha proporcionado ningún archivo');
      }

      // Aquí puedes llamar a tu función run() pasándole la URL del archivo
      const transcript = await run(fileUrl);

      // Envía la transcripción como respuesta
      res.send(transcript);
  } catch (error) {
      console.error("Error transcribing audio:", error);
      res.status(500).json({ error: "Error transcribing audio" });
  }
});

/**
 * Conexión con MongoDB (Base de datos principal del proyecto)
*/
mongoConnect()

module.exports = app;