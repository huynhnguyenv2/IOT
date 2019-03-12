const mongoose = require('mongoose');
const Test = mongoose.Schema;


let Rtdata = new Test({
	time: {type: Date, required: true},
	device: {type: String, required: true},
	temperature: {type: Number, required: true},
	humidity: {type: Number, required: true},
	light: {type: Number, required: true},
});

module.exports = mongoose.model('Runtime', Rtdata);
