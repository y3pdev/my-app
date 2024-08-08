const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1', // ใช้ environment variable สำหรับความยืดหยุ่น
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'P@ssw0rd',
    database: process.env.DB_NAME || 'my-db'
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connection to MySQL database successful!');
        connection.release();
    } catch (err) {
        console.error('Unable to connect to the MySQL database:', err);
    }
}

testConnection();

module.exports = pool;