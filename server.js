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

scraper.scrapeAsync().then((data) => {
	storage.setData(data)
})



/*data = scraper.fakeScrape()
storage.setData(data)
*/
app.listen(3000,function() {
    console.log("Server started");
});