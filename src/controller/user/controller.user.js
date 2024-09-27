const express = require('express');
const router = express.Router();
const UserDAO = require('../../dao/class/dao.users');

const User = new UserDAO;

// Obtener todos los usuarios de una compañía
router.get('/:companyId/users', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const users = await User.getUsersByCompanyId(companyId);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un usuario por su ID
router.get('/:companyId/users/:userId', async (req, res) => {
  const companyId = req.params.companyId;
  const userId = req.params.userId;
  try {
    const user = await User.getUserByCompanyId(companyId, userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar un nuevo usuario a una compañía
router.post('/:companyId/users', async (req, res) => {
  const companyId = req.params.companyId;
  const userData = req.body;

  try {
    const newUser = await User.addUser(companyId, userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un usuario existente
router.put('/:companyId/users/:userId', async (req, res) => {
  const companyId = req.params.companyId;
  const userId = req.params.userId;
  const newData = req.body;

  try {
    const updatedUser = await User.updateUser(companyId, userId, newData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualiza solo los campos dados de un usuario
router.patch('/:companyId/users/:userId', async (req, res) => {
  const companyId = req.params.companyId;
  const userId = req.params.userId;
  const newData = req.body;

  try {
    const updatedUser = await User.patchUser(companyId, userId, newData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un usuario por su ID
router.delete('/:companyId/users/:userId', async (req, res) => {
  const companyId = req.params.companyId;
  const userId = req.params.userId;

  try {
    const deletedUser = await User.deleteUser(companyId, userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Recuperar contraseña de un usuario por email
router.post('/forgot-password', async (req, res) => {
  const email = req.body.email;
  try {
    const message = await User.getPasswordByEmail(email);
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;