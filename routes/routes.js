let router = require('express').Router();
let storage = require('../storage/priceStorage');

router.get('/', function(request,response) {
	let data = storage.getData()
	response.render('index', {silverPrice: data.silver, retailers: data.retailers });
});


module.exports = router;