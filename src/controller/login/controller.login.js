const express = require('express');
const router = express.Router();
const {generateToken} = require('../../utils/utils');
const passport = require('passport');



// Ruta para el inicio de sesión
router.post('/login', passport.authenticate('login', { failureRedirect: '/login/error' }), (req, res) => {
  if(!req.user) return res.status(400).json({ message: 'Error al iniciar sesión' });
  req.session.user = req.user;
  req.session.business = req.business;

  const token = generateToken(req.user);
  const business = {
    Name: req.business.Name,
    _id: req.business._id,
    info: req.business.InfoCompany
  }
  return res.status(200).json({ message: 'Sesión iniciada exitosamente', user: req.user, business: business, token: token });
});

//ruta en caso de error al iniciar sesión
router.post('/login/error', (req, res) => {
  return res.status(400).json({ message: 'Error al iniciar sesión' });
});

// Ruta para el cierre de sesión
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Sesión cerrada exitosamente' });
});


// Ruta para registrar un nuevo usuario
router.post('/register', passport.authenticate('register' , {failureRedirect: '/register/error'}), (req, res) => {
  if(!req.user) return res.status(400).json({ message: 'Error al registrar usuario y negocio' });
  req.session.user = req.user;
  req.session.business = req.business;

  const token = generateToken(req.user);

  return res.status(200).json({ message: 'Usuario y negocio registrados exitosamente', user: req.user, business: req.business, token: token });
});

//ruta en caso de error al registrar un usuario
router.post('/register/error', (req, res) => {
  return res.status(400).json({ message: 'Error al registrar usuario y negocio' });
});

module.exports = router;
