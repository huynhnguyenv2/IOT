const express = require('express');
const bodyParser = require('body-parser');;
const mqtt = require('mqtt');
const runtime = require('./routes/runtime.route');
const Rt = require('./models/runtime.model');
// Set up mongoose connection
const mongoose = require('mongoose');
var dev_db_url = "mongodb://admin:admin123@localhost:27017/mydb?authSource=admin";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Set up connect mqtt
const client = mqtt.connect("mqtt://m11.cloudmqtt.com", {
	username: "ikkwucnu",
	password: "UN9O6syezakc",
	port: 16524,
	clientId: "WebUI"
})
client.on("connect", () => {
	client.subscribe("test")
	client.subscribe("Status")
	console.log("connected!")
})
client.on("error", (e) => {
	console.log(e)
})
client.on("close", (e) => {
	client.reconnect()
})
client.on("message", (topic, message) => {
	addData(message)
})

const addData = (data) => {
    try{
        let array  = data.toString().split(",");
        let device = array[0]
        let temp   = parseFloat(array[1])
        let humi   = parseFloat(array[2])
        let light  = parseFloat(array[3]) // Get float data
        let now    = new Date()
        let key = (now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
        let myobj  = {
            time: key,
            device: device,
            temperature: temp,
            humidity: humi,
            light: light
        }
        
        let item   = new Rt(myobj)

        item.save(function (err) {
        	if (err) {
        		console.log(err)
        	}
        	console.log('Product Created successfully')
        })

    } catch (error) {
        console.log(error)
    }
}


const server = express();
//using bodyParser
server.use(express.static("views"));
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/runtimes', runtime);

let port = 3000; 
server.listen(port, () =>{ console.log('Server is running' + port); })
