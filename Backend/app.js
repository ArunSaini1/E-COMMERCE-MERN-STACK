const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
const errorMiddleware = require('./middleware/error')
const bobyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bobyParser.urlencoded({extended:true}));
app.use(fileUpload());


// Route Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute');
const bodyParser = require('body-parser');



app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);


// Middleware for error
app.use(errorMiddleware);


module.exports = app;