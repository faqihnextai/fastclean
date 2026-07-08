const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isLoggedIn, isAdmin } = require('../middleware/authMiddleware');

// Proteksi global untuk semua rute di dalam router ini
router.use(isLoggedIn, isAdmin);

// Rute Utama Dashboard & Aksi Orderan
router.get('/dashboard', adminController.getDashboard);
router.get('/take-order/:order_id', adminController.takeOrder);
router.get('/complete-order/:order_id', adminController.completeOrder);

// Rute Riwayat Pekerjaan Selesai
router.get('/riwayat', adminController.getRiwayat);

module.exports = router;