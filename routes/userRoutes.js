const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn, isUser } = require('../middleware/authMiddleware');

// Proteksi global untuk seluruh rute user
router.use(isLoggedIn, isUser);

// KODE LAMA: router.get('/user/layanan', ...)
// UBAH MENJADI:
router.get('/layanan', userController.getLayanan);
router.post('/booking', userController.postBooking);
router.get('/proses', userController.getProses);
// Rute Riwayat Transaksi (History)
router.get('/history', userController.getHistory);

module.exports = router;