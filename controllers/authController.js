const db = require('../config/db');
const bcrypt = require('bcryptjs'); // Menyimpan ke variabel 'bcrypt'

module.exports = {
    getLogin: (req, res) => {
        res.render('auth/login');
    },

    // 1. LOGIKA LOGIN (Menggunakan variabel 'bcrypt')
    postLogin: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Cek tabel Users
            const [userRows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (userRows.length > 0) {
                const user = userRows[0];
                const match = await bcrypt.compare(password, user.password); // DIUBAH
                if (match) {
                    req.session.user = { id: user.id, nama: user.nama, role: 'user' };
                    return res.redirect('/user/dashboard');
                }
            }

            // Cek tabel Admins
            const [adminRows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
            if (adminRows.length > 0) {
                const admin = adminRows[0];
                const match = await bcrypt.compare(password, admin.password); // DIUBAH
                if (match) {
                    req.session.user = { id: admin.id, nama: admin.nama, role: 'admin' };
                    return res.redirect('/admin/dashboard');
                }
            }

            // Cek tabel Superadmins
            const [superRows] = await db.query('SELECT * FROM superadmins WHERE email = ?', [email]);
            if (superRows.length > 0) {
                const superadmin = superRows[0];
                const match = await bcrypt.compare(password, superadmin.password); // DIUBAH
                if (match) {
                    req.session.user = { id: superadmin.id, nama: superadmin.nama, role: 'superadmin' };
                    return res.redirect('/superadmin/dashboard');
                }
            }

            res.send('Email atau password salah!');
        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan pada server.');
        }
    },

    getRegister: (req, res) => {
        res.render('auth/register');
    },

    // 2. LOGIKA REGISTER USER
    postRegister: async (req, res) => {
        const { nama, email, telepon, password } = req.body;

        try {
            const [existingUser] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.send('Email sudah terdaftar!');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await db.query(
                'INSERT INTO users (nama, email, telepon, password) VALUES (?, ?, ?, ?)',
                [nama, email, telepon, hashedPassword]
            );

            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal melakukan registrasi.');
        }
    },

    getLogout: (req, res) => {
        req.session.destroy((err) => {
            if (err) console.log(err);
            res.redirect('/');
        });
    }
};