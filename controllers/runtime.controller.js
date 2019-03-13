const Runtime = require('../models/runtime.model');

exports.test = function(req, res){
	res.send("Greetings from the Test controller!");
	let item = new Runtime();

    item.save(function (err) {
        if (err) return next(err);
        res.send('Product Created successfully');
    });
};

exports.runtime_details = function (req, res){
	res.sendFile('chart.html' ,  {root: './views'});
}

exports.details = function (req, res){
	let key = []
    let temp = []
    let humi = []
    let light = []
	res.setHeader('Content-Type', 'application/json');
	Runtime.find({device: req.params.id}, function (err, item) {

		for (i = 0; i < item.length; i++) {
			let info = item[i]
			key.push(info.time)
			temp.push(info.temperature)
			humi.push(info.humidity)
			light.push(info.light)
		}

		item = {
			key: key,
			temperature: temp,
			humidity: humi,
			light: light,
		}			
        if (err) return next(err);
        res.send(JSON.stringify(item));
    });
}