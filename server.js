let express = require('express');
let mustacheExpress = require('mustache-express');
let bodyParser = require('body-parser');

let enterNameRoute = require('./routes/enterName');
let displayNameRoute = require('./routes/displayName');
let scraper = require('./scraper');

let app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use (bodyParser.urlencoded( {extended : true} ) );


app.use ('/', enterNameRoute);
app.use ('/', displayNameRoute);

scraper.scrapeAsync().then((prices) => {
	console.log(prices)
})

app.listen(3000,function() {
    console.log("Server started");
});