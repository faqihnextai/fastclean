const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Panggil controller

// Halaman Login (GET)
router.get('/login', authController.getLogin);

// Proses Logika Login (POST)
router.post('/login', authController.postLogin);

// Halaman Register (GET)
router.get('/register', authController.getRegister);

// Proses Logika Register (POST)
router.post('/register', authController.postRegister);

// Halaman Forgot Password (GET)
router.get('/forgot', (req, res) => {
    res.render('auth/forgot');
});

// Proses Logika Forgot Password (POST)
router.post('/forgot', (req, res) => {
    const { email } = req.body;
    res.send(`Link pemulihan telah dikirim ke ${email}`);
});

// Proses Logout (GET)
router.get('/logout', authController.getLogout);

module.exports = router;