const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pool = require('./db'); // เชื่อมต่อกับไฟล์ db.js
const app = express();

// การตั้งค่า view engine เป็น EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// การตั้งค่า static files
app.use(express.static(path.join(__dirname, 'public')));

// การตั้งค่า body-parser สำหรับการรับข้อมูลจากฟอร์ม
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ฟังก์ชันสำหรับ render หน้าเว็บที่ใช้ layout
function renderWithLayout(res, view, options) {
    options = options || {};
    options.body = view; // ส่งชื่อไฟล์ของ body ไปยัง layout
    res.render('layout', options);
}

// ทดสอบการเชื่อมต่อฐานข้อมูล
app.get('/test-connection', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        res.send('Connection to MySQL database successful!');
        connection.release();
    } catch (err) {
        console.error('Unable to connect to the MySQL database:', err);
        res.status(500).send('Unable to connect to the MySQL database.');
    }
});

// การตั้งค่า route สำหรับ URL เริ่มต้น (default URL)
app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM profile_tb");
        console.log('Query result:', rows); // เพิ่มการ debug
        renderWithLayout(res, 'index', { 
            title: 'Profile Management',
            data: rows,
            cssFiles: ['/css/home.css'],
            jsFiles: ['/js/home.js']
        });
    } catch (err) {
        console.error('Database query error:', err); // เพิ่มการ debug
        res.status(500).send('Database query error');
    }
});

// สร้างข้อมูลใหม่
app.post('/profile', async (req, res) => {
    const { eng_name, thai_name, email } = req.body;
    try {
        await pool.query('INSERT INTO profile_tb (eng_name, thai_name, email) VALUES (?, ?, ?)', [eng_name, thai_name, email]);
        res.redirect('/');
    } catch (err) {
        console.error('Database insert error:', err); // เพิ่มการ debug
        res.status(500).send('Database insert error');
    }
});

// แก้ไขข้อมูล
app.put('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const { eng_name, thai_name, email } = req.body;
    try {
        await pool.query('UPDATE profile_tb SET eng_name = ?, thai_name = ?, email = ? WHERE id = ?', [eng_name, thai_name, email, id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Database update error:', err); // เพิ่มการ debug
        res.status(500).send('Database update error');
    }
});

// ลบข้อมูล
app.delete('/profile/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM profile_tb WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Database delete error:', err); // เพิ่มการ debug
        res.status(500).send('Database delete error');
    }
});

// เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});