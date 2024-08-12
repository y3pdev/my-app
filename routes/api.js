// routes/api.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET: Fetch all news
router.get('/news', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM profile_tb');
        res.json({ data: rows });
    } catch (err) {
        console.error('Database query error:', err.message, err.stack);
        res.status(500).send('Database query error: ' + err.message);
    }
});

// POST: Add a new news entry
router.post('/news', async (req, res) => {
    const { eng_name, thai_name, email } = req.body;

    if (!eng_name || !thai_name || !email) {
        console.error('Bad Request: Missing fields');
        return res.status(400).send('All fields are required');
    }

    try {
        const result = await pool.query(
            'INSERT INTO profile_tb (eng_name, thai_name, email) VALUES (?, ?, ?)',
            [eng_name, thai_name, email]
        );
        res.status(201).json({ message: 'Data added successfully', id: result.insertId });
    } catch (err) {
        console.error('Database insert error:', err.message, err.stack);
        res.status(500).send('Database insert error');
    }
});

// DELETE: Delete a news entry by ID
router.delete('/news/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('ID is required');
    }

    try {
        const result = await pool.query('DELETE FROM profile_tb WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('No record found with the provided ID');
        }

        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (err) {
        console.error('Database delete error:', err.message, err.stack);
        res.status(500).send('Database delete error');
    }
});

module.exports = router;