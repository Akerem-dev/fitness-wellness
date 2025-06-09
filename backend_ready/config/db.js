// backend_ready/config/db.js
const mysql = require('mysql2/promise');

// Hata anında server'ın direkt kapanmaması için burada sadece pool döndürülür
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Uygulama başlatıldığında bağlantı test etmek için (isteğe bağlı)
if (process.env.NODE_ENV !== "test") {
  pool.getConnection()
    .then(conn => {
      console.log(`✅ MySQL bağlantısı başarılı (user: ${process.env.DB_USER})`);
      conn.release();
    })
    .catch(err => {
      console.error('❌ MySQL bağlantı hatası:', err);
      // process.exit(1); // Test ortamında server'ı öldürmemek için yoruma alınabilir
    });
}

module.exports = pool;
