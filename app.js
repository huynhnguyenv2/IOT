const express = require('express');
const bodyParser = require('body-parser');

// Set up mongoose connection
const mongoose = require('mongoose');
var dev_db_url = "mongodb://admin:admin123@localhost:27017/mydb?authSource=admin";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const runtime = require('./routes/runtime.route');

const server = express();

//using bodyParser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/runtimes', runtime);


//
let port = 3000; 
server.listen(port, () =>{     console.log('Server is running' + port); })
