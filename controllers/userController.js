const db = require('../config/db');

module.exports = {
    // Menampilkan daftar layanan & data keranjang belanja
    getLayanan: async (req, res) => {
        try {
            const [services] = await db.query('SELECT * FROM services ORDER BY nama_layanan ASC');
            
            // Inisialisasi keranjang di session jika belum ada
            if (!req.session.cart) {
                req.session.cart = [];
            }

            // Hitung ringkasan total harga keranjang
            let totalKeranjang = 0;
            req.session.cart.forEach(item => {
                totalKeranjang += Number(item.harga);
            });

            // Alamat bawaan sesuai permintaan user
            const defaultAddress = "Jl. Pansus No.1-3, RT.002/RW.016, Gebang Raya, Kec. Periuk, Kota Tangerang, Banten 15132";

            res.render('user/layanan', { 
                user: req.session.user, 
                services,
                cart: req.session.cart,
                totalKeranjang,
                defaultAddress
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal memuat data layanan.');
        }
    },

    // Menambahkan item ke dalam keranjang belanja session
    addCart: async (req, res) => {
        const { service_id } = req.body;
        if (!req.session.cart) req.session.cart = [];

        try {
            // Ambil detail layanan dari database
            const [services] = await db.query('SELECT * FROM services WHERE id = ?', [service_id]);
            if (services.length > 0) {
                const service = services[0];
                
                // Cek apakah layanan sudah ada di keranjang agar tidak duplikat
                const exists = req.session.cart.find(item => item.id === service.id);
                if (!exists) {
                    req.session.cart.push({
                        id: service.id,
                        nama_layanan: service.nama_layanan,
                        harga: service.harga
                    });
                }
            }
            res.redirect('/user/layanan');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal menambahkan ke keranjang.');
        }
    },

    // Menghapus item dari keranjang belanja session
    removeCart: (req, res) => {
        const { service_id } = req.params;
        if (req.session.cart) {
            req.session.cart = req.session.cart.filter(item => item.id !== parseInt(service_id));
        }
        res.redirect('/user/layanan');
    },

    // Mengirim & memproses check-out isi keranjang belanja ke database orders
    postBooking: async (req, res) => {
        const { tanggal_booking, alamat, gedung, metode_pembayaran } = req.body;
        const user_id = req.session.user.id;
        const cart = req.session.cart || [];

        if (cart.length === 0) {
            return res.status(400).send('Keranjang belanja Anda kosong.');
        }

        try {
            // Karena satu order di database terikat pada satu service_id, 
            // kita lakukan perulangan (loop) untuk setiap layanan yang ada di keranjang.
            for (const item of cart) {
                // Informasi alamat, gedung, dan metode pembayaran disatukan ke dalam sistem pesanan
                // Harga disesuaikan per jenis item layanan yang di-checkout
                await db.query(
                    'INSERT INTO orders (user_id, service_id, tanggal_booking, total_harga, status) VALUES (?, ?, ?, ?, "pending")',
                    [user_id, item.id, tanggal_booking, item.harga]
                );
            }

            // Kosongkan keranjang setelah berhasil disimpan ke database
            req.session.cart = [];
            res.redirect('/user/proses');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal melakukan pemesanan checkout keranjang.');
        }
    },

    // Menampilkan layanan berjalan
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

    // Menampilkan riwayat transaksi
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