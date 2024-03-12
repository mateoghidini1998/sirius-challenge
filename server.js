const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');


//Initialize express
const app = express();

//CORS
app.use(cors());

//Body parser
app.use(express.json());

//Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 100
});

app.use(limiter);

//Use helmet, hide X-Powered-By header, and set new security headers
app.use(helmet());

//Use xss sanitizer
app._router.use(xss());

//Use hpp for preventing param pollution
app.use(hpp());

app.use(express.urlencoded({ extended: true }))

//Route file
const products = require('./routes/products');

//Define routes
app.use('/api/products', products);

app.get('/', (req, res) => res.send('API RUNNING'));

// Load env variables
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
};


module.exports = app;