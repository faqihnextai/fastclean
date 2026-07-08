const express = require('express');
const app = express();
const session = require('express-session'); 
require('dotenv').config();

// Hubungkan konfigurasi database
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

// Set EJS sebagai template engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Konfigurasi Express Session
app.use(session({
    secret: 'fastclean_secret_key', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));

// PANGGIL ROUTER
const authRoutes = require('./routes/authRoutes');
const superRoutes = require('./routes/superRoutes'); 
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Route Landing Page Utama
app.get('/', (req, res) => {
    res.render('landing');
});

// PANGGIL MIDDELWARE SATPAM (Untuk rute dashboard utama di bawah)
const { isLoggedIn, isUser, isSuperAdmin, isAdmin } = require('./middleware/authMiddleware');

// ROUTE DASHBOARD MANUAL (Harus ditaruh SEBELUM app.use router ber-prefix agar tidak terjebak middleware)
app.get('/user/dashboard', isLoggedIn, isUser, (req, res) => {
    res.render('user/dashboard', { user: req.session.user });
});

app.get('/superadmin/dashboard', isLoggedIn, isSuperAdmin, (req, res) => {
    res.render('superadmin/dashboard', { user: req.session.user });
});

// app.get('/admin/dashboard', isLoggedIn, isAdmin, (req, res) => {
//    res.redirect('/admin/dashboard'); 
// });


// GUNAKAN ROUTER DENGAN PREFIX (AWALAN URL) AGAR TIDAK SALING TABRAKAN
app.use('/', authRoutes);
app.use('/superadmin', superRoutes); // Sekarang semua isi superRoutes otomatis diawali /superadmin
app.use('/user', userRoutes);         // Sekarang semua isi userRoutes otomatis diawali /user
app.use('/admin', adminRoutes);

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server FastClean berjalan di http://localhost:${PORT}`);
});