const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const xssClean =require('xss-clean');
const rateLimit =require('express-rate-limit');
const userRouter = require('./routers/userRouter');

const app = express();

const rateLimiter = rateLimit({
    windowMs: 1*60*1000, //1 minute,
    max: 10,
    message: 'Too many requests from this IP. Please try again later.',
});

app.use(rateLimiter);
app.use(morgan('dev'));
app.use(xssClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/users', userRouter);



app.get("/test", (req, res)=>{
    res.status(200).send({
        message: 'get: api is working fine after using nodemon',
    });
});



app.post("/test", (req, res)=>{
    res.status(200).send({
        message: 'post: api is working fine after using nodemon',
    });
});

app.put("/test", (req, res)=>{
    res.status(200).send({
        message: 'put: api is working fine after using nodemon',
    });
});

app.delete("/test", (req, res)=>{
    res.status(200).send({
        message: 'delete: api is working fine after using nodemon',
    });
});
// error handling
app.use((req,res,next)=>{
    createError(404, 'Route not found');
    next();
});

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });    
});

module.exports = app;

