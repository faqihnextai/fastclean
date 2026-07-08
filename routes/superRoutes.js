const express = require('express');
const router = express.Router();
const superController = require('../controllers/superController');
const { isLoggedIn, isSuperAdmin } = require('../middleware/authMiddleware');

// Pasang middleware proteksi ke semua rute di router ini
router.use(isLoggedIn, isSuperAdmin);
// KODE LAMA: router.get('/superadmin/layanan-crud', ...)
// UBAH MENJADI:
router.get('/layanan-crud', superController.getLayananCRUD);
router.post('/layanan/create', superController.postCreateLayanan);
router.post('/layanan/update', superController.postUpdateLayanan);
router.get('/layanan/delete/:id', superController.getDeleteLayanan);

router.get('/admin-crud', superController.getAdminCRUD);
router.post('/admin/create', superController.postCreateAdmin);
router.get('/admin/delete/:id', superController.getDeleteAdmin);

module.exports = router;