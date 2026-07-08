const mysql = require('mysql2');
require('dotenv').config();

// Membuat pool koneksi ke MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 3, // Perkecil untuk serverless
    queueLimit: 0,
    connectTimeout: 10000 // Batas waktu tunggu koneksi 10 detik
});

// Mengubah pool menjadi format promise agar kita bisa menggunakan async/await nanti
const db = pool.promise();

// Cek koneksi ke database saat aplikasi pertama kali dijalankan
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database FastClean Gagal Terhubung:', err.message);
    } else {
        console.log('Database FastClean Berhasil Terhubung ke MySQL!');
        connection.release(); // Kembalikan koneksi ke pool
    }
});

module.exports = db;
