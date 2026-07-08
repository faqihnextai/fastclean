const db = require('../config/db');
const bcrypt = require('bcrypt');

async function seedSuperadmin() {
    const nama = 'Super Admin FastClean';
    const email = 'superadmin@mail.com';
    const passwordTeksBiasa = '12345678';

    try {
        console.log('Memulai proses pembuatan akun Superadmin...');

        // 1. Cek apakah email superadmin sudah ada di database
        const [existingAdmin] = await db.query('SELECT id FROM superadmins WHERE email = ?', [email]);
        
        if (existingAdmin.length > 0) {
            console.log(`[INFO] Email ${email} sudah terdaftar di tabel superadmins. Proses dibatalkan.`);
            process.exit(0);
        }

        // 2. Hash password menggunakan bcrypt (salt rounds: 10)
        const hashedPassword = await bcrypt.hash(passwordTeksBiasa, 10);
        console.log('Password berhasil di-hash secara aman.');

        // 3. Masukkan data ke tabel superadmins
        await db.query(
            'INSERT INTO superadmins (nama, email, password) VALUES (?, ?, ?)',
            [nama, email, hashedPassword]
        );

        console.log('==================================================');
        console.log('SUCCESS: Akun Superadmin Berhasil Ditambahkan!');
        console.log(`Email    : ${email}`);
        console.log(`Password : ${passwordTeksBiasa} (Tersimpan dalam bentuk hash)`);
        console.log('==================================================');

    } catch (error) {
        console.error('Gagal memasukkan Superadmin:', error.message);
    } finally {
        // Keluar dari proses node setelah selesai
        process.exit(0);
    }
}

// Jalankan fungsi
seedSuperadmin();