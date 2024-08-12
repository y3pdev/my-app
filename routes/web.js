// routes/web.js
const express = require('express');
const router = express.Router();

function renderWithLayout(res, view, options) {
    options = options || {};
    options.body = view;
    res.render('layout', options);
}

// Route for the index page
router.get('/', (req, res) => {
    try {
        renderWithLayout(res, 'index', {
            title: 'Profile Management',
            cssFiles: ['/css/home.css'],
            jsFiles: ['/js/home.js']
        });
    } catch (err) {
        console.error('Error rendering index page:', err);
        res.status(500).send('Error rendering index page');
    }
});

module.exports = router;