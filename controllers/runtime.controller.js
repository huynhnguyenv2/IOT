const Runtime = require('../models/runtime.model');

exports.test = function(req, res){
	res.send("Greetings from the Test controller!");
	let item = new Runtime(
        {      
            time: 1,
            device: 1,
            temperature: 1,
            humidity: 1,
            light: 1,
        }
    );

    item.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })

};
