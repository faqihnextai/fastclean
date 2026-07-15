const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');
const { isLoggedIn, isAdmin } = require('../middleware/authMiddleware');
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// Proteksi global untuk semua rute di dalam router ini
router.use(isLoggedIn, isAdmin);

// Rute Utama Dashboard & Aksi Orderan
router.get('/dashboard', adminController.getDashboard);
// Ubah rute take & complete menjadi POST yang menerima upload file
router.post('/take-order/:order_id', upload.single('foto_before'), adminController.takeOrder);
router.post('/complete-order/:order_id', upload.single('foto_after'), adminController.completeOrder);

// Rute Riwayat Pekerjaan Selesai
router.get('/riwayat', adminController.getRiwayat);

module.exports = router;