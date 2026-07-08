// middleware/authMiddleware.js

module.exports = {
    // Memastikan user sudah login (umum)
    isLoggedIn: (req, res, next) => {
        if (req.session && req.session.user) {
            return next();
        }
        res.redirect('/login');
    },

    // Validasi khusus Role Pelanggan
    isUser: (req, res, next) => {
        if (req.session && req.session.user && req.session.user.role === 'user') {
            return next();
        }
        res.status(403).send('Akses Ditolak: Halaman ini hanya untuk Pelanggan.');
    },

    // Validasi khusus Role Admin (Pekerja)
    isAdmin: (req, res, next) => {
        if (req.session && req.session.user && req.session.user.role === 'admin') {
            return next();
        }
        res.status(403).send('Akses Ditolak: Halaman ini hanya untuk Pekerja/Admin.');
    },

    // Validasi khusus Role Superadmin
    isSuperAdmin: (req, res, next) => {
        if (req.session && req.session.user && req.session.user.role === 'superadmin') {
            return next();
        }
        res.status(403).send('Akses Ditolak: Halaman ini hanya untuk Superadmin.');
    }
};