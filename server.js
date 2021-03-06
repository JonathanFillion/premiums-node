let express = require('express');
let mustacheExpress = require('mustache-express');
let bodyParser = require('body-parser');
let path = require('path');

let routes = require('./routes/routes');
let scraper = require('./scraper');
let storage = require('./storage/priceStorage');

let app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use(bodyParser.urlencoded( {extended : true} ) );
app.use(express.static(path.join(__dirname,'public')));

app.use('/', routes);

app.get('/sitemap.xml', function(request,response) {
	response.sendFile('/public/xml/sitemap.xml', {root: __dirname});
})


//update()
//data = scraper.fakeScrape()
//storage.setData(data)
setInterval(update, 60000)

function update() {
	scraper.scrapeAsync().then((data) => {
		storage.setData(data)
	})
}




app.listen(3000,function() {
	console.log("Server started");
});