const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got');



async function scrapeAsync(callback){

    url = 'https://www.kitco.com/charts/livesilver.html';
    response = await got(url)
    $ = cheerio.load(response.body);
    silver = $('#sp-ask').text();

    //CANADAGOLD
    
    url = 'https://canadagold.ca/what-we-sell/';
    response = await got(url)
    $ = cheerio.load(response.body);
    let table = $('.cg-table')[1];
    let tr = $(table).find('tr')[0];
    let td = $(tr).find('td')[2];
    canadagold_1oz = $(td).text()

    tr = $(table).find('tr')[4];
    td = $(tr).find('td')[2];
    canadagold_10oz = $(td).text()

    tr = $(table).find('tr')[5];
    td = $(tr).find('td')[2];
    canadagold_100oz = $(td).text()

    //CANADIANPMX

    url = "https://canadianpmx.com/product/2020-canadian-silver-maple-leaf-1-oz-9999/";
    response = await got(url);
    $ = cheerio.load(response.body);
    vpcol = $('.vpcol02')[0];
    canadianpmx_1oz = $(vpcol).text();

    url = "https://canadianpmx.com/product/silver-bar-10-oz-royal-canadian-mint-9999/";
    response = await got(url)
    $ = cheerio.load(response.body);
    vpcol = $('.vpcol02')[0];
    canadianpmx_10oz = $(vpcol).text();

    url = "https://canadianpmx.com/product/silver-bar-100-oz-royal-canadian-mint-9999/";
    response = await got(url)
    $ = cheerio.load(response.body);
    vpcol = $('.vpcol02')[0];
    canadianpmx_100oz = $(vpcol).text();


    //CANADIANBULLION

    url = "https://canadianbullion.ca/silver/coins/1-oz-2016-canadian-maple-leaf-silver-coin.html";
    response = await got(url)
    $ = cheerio.load(response.body);
    regpri = $('.regular-price')[0];
    pri = $(regpri).find('.price')[0];
    canadianbullion_1oz = $(pri).text();

    url = "https://canadianbullion.ca/silver/10-oz-silver-bar/10-oz-royal-canadian-mint-silver-wafer-bar.html";
    response = await got(url)
    $ = cheerio.load(response.body);
    regpri = $('.regular-price')[0];
    pri = $(regpri).find('.price')[0];
    canadianbullion_10oz = $(pri).text();

    url = "https://canadianbullion.ca/silver/100-oz-silver-bar/100-oz-sunshine-mint-silver-bar.html";
    response = await got(url)
    $ = cheerio.load(response.body);
    regpri = $('.regular-price')[0];
    pri = $(regpri).find('.price')[0];
    canadianbullion_100oz = $(pri).text();

    //BULLIONMART

    url = "https://www.bullionmart.ca/product/2020-1-oz-99-99-pure-silver-maple-leaf-bullion-coin/";
    response = await got(url)
    $ = cheerio.load(response.body);
    sumcon = $('.summary-container')[0];
    priam = $(sumcon).find('.woocommerce-Price-amount')[0];
    bullionmart_1oz = $(priam).text();


    url = "https://www.bullionmart.ca/product/10-oz-rcm-silver-bar-new-low-serial-numbers/";
    response = await got(url)
    $ = cheerio.load(response.body);
    sumcon = $('.summary-container')[0];
    priam = $(sumcon).find('.woocommerce-Price-amount')[0];
    bullionmart_10oz = $(priam).text();


    url = "https://www.bullionmart.ca/product/silver-bar-100-oz-royal-canadian-mint-9999-new/";
    response = await got(url)
    $ = cheerio.load(response.body);
    sumcon = $('.summary-container')[0];
    priam = $(sumcon).find('.woocommerce-Price-amount')[0];
    bullionmart_100oz = $(priam).text();

    


}



function scrape(callback){

    let silver = "";

    let canadagold_1oz = ""
    let canadagold_10oz = ""
    let canadagold_100oz = ""

    let canadianpmx_1oz = ""
    let canadianpmx_10oz = ""
    let canadianpmx_100oz = ""

    let canadianbullion_1oz = ""
    let canadianbullion_10oz = ""
    let canadianbullion_100oz = ""

    let bullionmart_1oz = ""
    let bullionmart_10oz = ""
    let bullionmart_100oz = ""
   	//SILVER
       url = 'https://www.kitco.com/charts/livesilver.html';

       got(url).then(response => {
           let $ = cheerio.load(response.body);
           console.log($('#sp-ask').text());
       }).catch(err => {
           console.log(err);
       });

    	//CANADAGOLD
    	url = 'https://canadagold.ca/what-we-sell/';

    	got(url).then(response => {
    		let $ = cheerio.load(response.body);
    		let table = $('.cg-table')[1];
            let tr = $(table).find('tr')[0];
            let td = $(tr).find('td')[2];
            canadagold_1oz = $(td).text()

            tr = $(table).find('tr')[4];
            td = $(tr).find('td')[2];
            canadagold_10oz = $(td).text()
            
            tr = $(table).find('tr')[5];
            td = $(tr).find('td')[2];
            canadagold_100oz = $(td).text()

           /* console.log(canadagold_1oz)
            console.log(canadagold_10oz)
            console.log(canadagold_100oz)*/

        }).catch(err => {
            console.log(err);
        });


        //CANADIANPMX

        url = "https://canadianpmx.com/product/2020-canadian-silver-maple-leaf-1-oz-9999/";
        got(url).then(response => {
            let $ = cheerio.load(response.body);
            vpcol = $('.vpcol02')[0];
            canadianpmx_1oz = $(vpcol).text();

        }).catch(err => {
            console.log(err);
        });

        url = "https://canadianpmx.com/product/silver-bar-10-oz-royal-canadian-mint-9999/";
        got(url).then(response => {
            let $ = cheerio.load(response.body);
            vpcol = $('.vpcol02')[0];
            canadianpmx_10oz = $(vpcol).text();

        }).catch(err => {
            console.log(err);
        });

        url = "https://canadianpmx.com/product/silver-bar-100-oz-royal-canadian-mint-9999/";
        got(url).then(response => {
            let $ = cheerio.load(response.body);
            vpcol = $('.vpcol02')[0];
            canadianpmx_100oz = $(vpcol).text();

        }).catch(err => {
            console.log(err);
        });


        //CANADIANBULLION

        url = "https://canadianbullion.ca/silver/coins/1-oz-2016-canadian-maple-leaf-silver-coin.html";
        got(url).then(response => {
            let $ = cheerio.load(response.body);
            let regpri = $('.regular-price')[0];
            let pri = $(regpri).find('.price')[0];
            canadianbullion_1oz = $(pri).text();

        }).catch(err => {
            console.log(err);
        });

        url = "https://canadianbullion.ca/silver/10-oz-silver-bar/10-oz-royal-canadian-mint-silver-wafer-bar.html";
        got(url).then(response => {
            let $ = cheerio.load(response.body);
            let regpri = $('.regular-price')[0];
            let pri = $(regpri).find('.price')[0];
            canadianbullion_10oz = $(pri).text();

        }).catch(err => {
            console.log(err);
        });

        url = "https://canadianbullion.ca/silver/100-oz-silver-bar/100-oz-sunshine-mint-silver-bar.html";
        got(url).then(response => {
            let $ = cheerio.load(response.body);
            let regpri = $('.regular-price')[0];
            let pri = $(regpri).find('.price')[0];
            canadianbullion_100oz = $(pri).text();

        }).catch(err => {
            console.log(err);
        });

        //BULLIONMART

        url = "https://www.bullionmart.ca/product/2020-1-oz-99-99-pure-silver-maple-leaf-bullion-coin/";
        got(url).then(response => {
            let $ = cheerio.load(response.body);
            let sumcon = $('.summary-container')[0];
            let priam = $(sumcon).find('.woocommerce-Price-amount')[0];
            bullionmart_1oz = $(priam).text();
        }).catch(err => {
            console.log(err);
        });

        url = "https://www.bullionmart.ca/product/10-oz-rcm-silver-bar-new-low-serial-numbers/";
        got(url).then(response => {
            let $ = cheerio.load(response.body);
            let sumcon = $('.summary-container')[0];
            let priam = $(sumcon).find('.woocommerce-Price-amount')[0];
            bullionmart_10oz = $(priam).text();

        }).catch(err => {
            console.log(err);
        });

        url = "https://www.bullionmart.ca/product/silver-bar-100-oz-royal-canadian-mint-9999-new/";
        got(url).then(response => {
            let $ = cheerio.load(response.body);
            let sumcon = $('.summary-container')[0];
            let priam = $(sumcon).find('.woocommerce-Price-amount')[0];
            bullionmart_100oz = $(priam).text();

        }).catch(err => {
            console.log(err);
        });


    }

    module.exports.scrape = scrape;
    module.exports.scrapeAsync = scrapeAsync;

