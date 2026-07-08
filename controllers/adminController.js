const db = require('../config/db');

module.exports = {
    // Menampilkan Dashboard Pekerja (Orderan masuk & total pendapatan)
    getDashboard: async (req, res) => {
        const admin_id = req.session.user.id;
        try {
            // 1. Ambil semua orderan yang masih PENDING (bisa diambil oleh admin mana saja)
            const [pendingOrders] = await db.query(
                `SELECT o.*, s.nama_layanan, u.nama as nama_pelanggan, u.telepon 
                 FROM orders o
                 JOIN services s ON o.service_id = s.id
                 JOIN users u ON o.user_id = u.id
                 WHERE o.status = 'pending'
                 ORDER BY o.created_at DESC`
            );

            // 2. Ambil orderan yang sedang diproses OLEH ADMIN INI
            const [myProgressOrders] = await db.query(
                `SELECT o.*, s.nama_layanan, u.nama as nama_pelanggan, u.telepon 
                 FROM orders o
                 JOIN services s ON o.service_id = s.id
                 JOIN users u ON o.user_id = u.id
                 WHERE o.admin_id = ? AND o.status = 'proses'
                 ORDER BY o.created_at DESC`,
                [admin_id]
            );

            // 3. Hitung total pendapatan admin ini (dari orderan berstatus 'selesai')
            const [incomeResult] = await db.query(
                `SELECT SUM(total_harga) as total_pendapatan 
                 FROM orders 
                 WHERE admin_id = ? AND status = 'selesai'`,
                [admin_id]
            );
            const pendapatan = incomeResult[0].total_pendapatan || 0;

            res.render('admin/dashboard', { 
                user: req.session.user, 
                pendingOrders, 
                myProgressOrders, 
                pendapatan 
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan pada server admin.');
        }
    },

    // Aksi ketika pekerja mengambil orderan pending
    takeOrder: async (req, res) => {
        const { order_id } = req.params;
        const admin_id = req.session.user.id;
        try {
            // Ubah status jadi 'proses' dan pasang admin_id pekerja ini
            await db.query(
                'UPDATE orders SET admin_id = ?, status = "proses" WHERE id = ? AND status = "pending"',
                [admin_id, order_id]
            );
            res.redirect('/admin/dashboard');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal mengambil orderan.');
        }
    },

    // Aksi ketika pekerja menyelesaikan tugas pembersihan
    completeOrder: async (req, res) => {
        const { order_id } = req.params;
        const admin_id = req.session.user.id;
        try {
            // Pastikan hanya admin yang memproses yang bisa menyelesaikan
            await db.query(
                'UPDATE orders SET status = "selesai" WHERE id = ? AND admin_id = ? AND status = "proses"',
                [order_id, admin_id]
            );
            res.redirect('/admin/riwayat');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal menyelesaikan orderan.');
        }
    },

    // Menampilkan riwayat pekerjaan selesai khusus untuk admin ini
    getRiwayat: async (req, res) => {
        const admin_id = req.session.user.id;
        try {
            const [completedOrders] = await db.query(
                `SELECT o.*, s.nama_layanan, u.nama as nama_pelanggan 
                 FROM orders o
                 JOIN services s ON o.service_id = s.id
                 JOIN users u ON o.user_id = u.id
                 WHERE o.admin_id = ? AND o.status = 'selesai'
                 ORDER BY o.created_at DESC`,
                [admin_id]
            );
            res.render('admin/riwayat', { user: req.session.user, completedOrders });
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal memuat riwayat pekerjaan.');
        }
    }
};