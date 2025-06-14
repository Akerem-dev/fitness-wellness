
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false 
  }
});

if (process.env.NODE_ENV !== "test") {
  pool.getConnection()
    .then(conn => {
      console.log(`✅ MySQL bağlantısı başarılı (user: ${process.env.DB_USER})`);
      conn.release();
    })
    .catch(err => {
      console.error('❌ MySQL bağlantı hatası:', err);
    });
}

module.exports = pool;
