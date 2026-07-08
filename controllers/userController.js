const db = require('../config/db');

module.exports = {
    // Menampilkan daftar layanan yang di-input oleh Superadmin
    getLayanan: async (req, res) => {
        try {
            const [services] = await db.query('SELECT * FROM services ORDER BY nama_layanan ASC');
            res.render('user/layanan', { user: req.session.user, services });
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal memuat data layanan.');
        }
    },

    // Proses melakukan booking/pembelian layanan
    postBooking: async (req, res) => {
        const { service_id, tanggal_booking, total_harga } = req.body;
        const user_id = req.session.user.id;

        try {
            await db.query(
                'INSERT INTO orders (user_id, service_id, tanggal_booking, total_harga, status) VALUES (?, ?, ?, ?, "pending")',
                [user_id, service_id, tanggal_booking, total_harga]
            );
            res.redirect('/user/proses');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal melakukan pemesanan.');
        }
    },

    // Menampilkan layanan yang sedang berjalan ('pending' dan 'proses')
    getProses: async (req, res) => {
        const user_id = req.session.user.id;
        try {
            const [orders] = await db.query(
                `SELECT o.*, s.nama_layanan, s.deskripsi, a.nama as nama_pekerja 
                 FROM orders o 
                 JOIN services s ON o.service_id = s.id 
                 LEFT JOIN admins a ON o.admin_id = a.id 
                 WHERE o.user_id = ? AND o.status IN ('pending', 'proses') 
                 ORDER BY o.created_at DESC`,
                [user_id]
            );
            res.render('user/proses', { user: req.session.user, orders });
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal memuat data proses layanan.');
        }
    },

    // Menampilkan riwayat pembelian yang sudah selesai ('selesai')
    getHistory: async (req, res) => {
        const user_id = req.session.user.id;
        try {
            const [orders] = await db.query(
                `SELECT o.*, s.nama_layanan, a.nama as nama_pekerja 
                 FROM orders o 
                 JOIN services s ON o.service_id = s.id 
                 LEFT JOIN admins a ON o.admin_id = a.id 
                 WHERE o.user_id = ? AND o.status = 'selesai' 
                 ORDER BY o.created_at DESC`,
                [user_id]
            );
            res.render('user/history', { user: req.session.user, orders });
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal memuat riwayat transaksi.');
        }
    }
};