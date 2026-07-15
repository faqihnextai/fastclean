const db = require('../config/db');
const bcrypt = require('bcryptjs'); // DIUBAH: Menggunakan bcryptjs agar lancar di hosting

module.exports = {
    // --- MANAJEMEN LAYANAN (CRUD) ---
    getLayananCRUD: async (req, res) => {
        try {
            const [services] = await db.query('SELECT * FROM services ORDER BY created_at DESC');
            res.render('superadmin/layanan-crud', { user: req.session.user, services });
        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan saat mengambil data layanan.');
        }
    },

    postCreateLayanan: async (req, res) => {
        const { nama_layanan, deskripsi, harga } = req.body;
        try {
            await db.query('INSERT INTO services (nama_layanan, deskripsi, harga) VALUES (?, ?, ?)', 
                [nama_layanan, deskripsi, harga]);
            res.redirect('/superadmin/layanan-crud');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal menambahkan layanan.');
        }
    },

    postUpdateLayanan: async (req, res) => {
        const { id, nama_layanan, deskripsi, harga } = req.body;
        try {
            await db.query('UPDATE services SET nama_layanan = ?, deskripsi = ?, harga = ? WHERE id = ?', 
                [nama_layanan, deskripsi, harga, id]);
            res.redirect('/superadmin/layanan-crud');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal memperbarui layanan.');
        }
    },

    getDeleteLayanan: async (req, res) => {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM services WHERE id = ?', [id]);
            res.redirect('/superadmin/layanan-crud');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal menghapus layanan.');
        }
    },

    // --- MANAJEMEN ADMIN/PEKERJA ---
    getAdminCRUD: async (req, res) => {
        try {
            const [admins] = await db.query('SELECT id, nama, email, status, created_at FROM admins ORDER BY created_at DESC');
            res.render('superadmin/admin-crud', { user: req.session.user, admins });
        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan saat mengambil data admin.');
        }
    },

    postCreateAdmin: async (req, res) => {
        const { nama, email, password } = req.body;
        try {
            const [existingAdmin] = await db.query('SELECT email FROM admins WHERE email = ?', [email]);
            if (existingAdmin.length > 0) {
                return res.send('Email admin tersebut sudah terdaftar!');
            }
            // Tetap menggunakan variabel bcrypt karena di atas namanya sudah disamakan
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('INSERT INTO admins (nama, email, password) VALUES (?, ?, ?)', 
                [nama, email, hashedPassword]);
            res.redirect('/superadmin/admin-crud');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal menambahkan admin baru.');
        }
    },

    getDeleteAdmin: async (req, res) => {
        const { id } = req.params;
        try {
            await db.query('DELETE FROM admins WHERE id = ?', [id]);
            res.redirect('/superadmin/admin-crud');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal menghapus data admin.');
        }
    }
};