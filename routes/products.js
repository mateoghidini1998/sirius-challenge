const express = require('express');
const router = express.Router();

const {
    getData
} = require('../controllers/products');

router.post('/wordcloud', getData);
module.exports = router;