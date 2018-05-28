// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');
const binance      = require('./binanceMain');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

// get trades by pair by POST 
router.get('/getTradesByPair', function(req, res) {
	var pair = req.body.pair;
	binance.init();
	binance.getTradesByPair("ICNBTC").then(trades => {
    	res.json(trades); 
	})
	.catch(err => {
		res.json(err); 
	}); 
});

router.get('/balance', function(req, res) {
	
});

// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
