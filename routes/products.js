const express = require('express');
const router = express.Router();

const {
    createWordCloud
} = require('../controllers/products');

router.post('/wordcloud', createWordCloud);
module.exports = router;