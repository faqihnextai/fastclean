const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn, isUser } = require('../middleware/authMiddleware');

// Proteksi global untuk seluruh rute user
router.use(isLoggedIn, isUser);

router.get('/layanan', userController.getLayanan);
router.post('/booking', userController.postBooking);
router.get('/proses', userController.getProses);
router.get('/history', userController.getHistory);

// Rute Baru Manajemen Sistem Keranjang (Cart System)
router.post('/cart/add', userController.addCart);
router.get('/cart/remove/:service_id', userController.removeCart);

module.exports = router;