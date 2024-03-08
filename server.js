const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const cheerio = require("cheerio");

//Initialize express
const app = express();

//CORS
app.use(cors());

//Body parser
app.use(express.json());

//Route file
const products = require('./routes/products');

//Define routes
app.use('/api/products', products);

app.get('/', (req, res) => res.send('API RUNNING'));

// Load env variables
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});


