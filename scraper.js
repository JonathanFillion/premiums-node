const fs = require('fs')
const cheerio = require('cheerio')
const got = require('got')

async function scrapeAsync(){

    url = 'https://www.kitco.com/silver-price-today-canada/index.html'
    response = await got(url)
    $ = cheerio.load(response.body)
    div = $('.table-price--body-table--overview-bid')
    p = $(div).find('p')[1]
    silver = $(p).text()
    
    //CANADAGOLD
    url = 'https://canadagold.ca/what-we-sell/'
    response = await got(url)
    $ = cheerio.load(response.body)
    table = $('.cg-table')[1]
    tr = $(table).find('tr')[0]
    td = $(tr).find('td')[2]
    canadagold_1oz = cleanCanadaGold($(td).text())

    tr = $(table).find('tr')[4]
    td = $(tr).find('td')[2]
    canadagold_10oz = cleanCanadaGold($(td).text())

    tr = $(table).find('tr')[5]
    td = $(tr).find('td')[2]
    canadagold_100oz = cleanCanadaGold($(td).text())

    //CANADIANPMX

    url = "https://canadianpmx.com/product/2020-canadian-silver-maple-leaf-1-oz-9999/"
    response = await got(url)
    $ = cheerio.load(response.body)
    vpcol = $('.vpcol02')[0]
    canadianpmx_1oz = cleanCanadianPmx($(vpcol).text()) 

    url = "https://canadianpmx.com/product/silver-bar-10-oz-royal-canadian-mint-9999/"
    response = await got(url)
    $ = cheerio.load(response.body)
    vpcol = $('.vpcol02')[0]
    canadianpmx_10oz = cleanCanadianPmx($(vpcol).text())

    url = "https://canadianpmx.com/product/silver-bar-100-oz-royal-canadian-mint-9999/"
    response = await got(url)
    $ = cheerio.load(response.body)
    vpcol = $('.vpcol02')[0]
    canadianpmx_100oz = cleanCanadianPmx($(vpcol).text())


    //CANADIANBULLION

    url = "https://canadianbullion.ca/silver/coins/1-oz-2016-canadian-maple-leaf-silver-coin.html"
    response = await got(url)
    $ = cheerio.load(response.body)
    regpri = $('.regular-price')[0]
    pri = $(regpri).find('.price')[0]
    canadianbullion_1oz = cleanCanadianBullion($(pri).text())

    url = "https://canadianbullion.ca/silver/10-oz-silver-bar/10-oz-royal-canadian-mint-silver-wafer-bar.html"
    response = await got(url)
    $ = cheerio.load(response.body)
    regpri = $('.regular-price')[0]
    pri = $(regpri).find('.price')[0]
    canadianbullion_10oz = cleanCanadianBullion($(pri).text())

    url = "https://canadianbullion.ca/silver/100-oz-silver-bar/100-oz-sunshine-mint-silver-bar.html"
    response = await got(url)
    $ = cheerio.load(response.body)
    regpri = $('.regular-price')[0]
    pri = $(regpri).find('.price')[0]
    canadianbullion_100oz = cleanCanadianBullion($(pri).text())

    //BULLIONMART

    url = "https://www.bullionmart.ca/product/2020-1-oz-99-99-pure-silver-maple-leaf-bullion-coin/"
    response = await got(url)
    $ = cheerio.load(response.body)
    sumcon = $('.summary-container')[0]
    priam = $(sumcon).find('.woocommerce-Price-amount')[0]
    bullionmart_1oz = cleanBullionMart($(priam).text())


    url = "https://www.bullionmart.ca/product/10-oz-rcm-silver-bar-new-low-serial-numbers/"
    response = await got(url)
    $ = cheerio.load(response.body)
    sumcon = $('.summary-container')[0]
    priam = $(sumcon).find('.woocommerce-Price-amount')[0]
    bullionmart_10oz = cleanBullionMart($(priam).text())


    url = "https://www.bullionmart.ca/product/silver-bar-100-oz-royal-canadian-mint-9999-new/"
    response = await got(url)
    $ = cheerio.load(response.body)
    sumcon = $('.summary-container')[0]
    priam = $(sumcon).find('.woocommerce-Price-amount')[0]
    bullionmart_100oz = cleanBullionMart($(priam).text())

    data =  {
        silver:silver,
        retailers: [
            {name: "Canada Gold", dealer_url: "https://canadagold.ca/what-we-sell/", logo_url: "images/canadagold.png", _1oz: canadagold_1oz,_10oz:canadagold_10oz, _100oz: canadagold_100oz},
            {name: "Canadian PMX", dealer_url: "https://canadianbullion.ca", logo_url: "images/canadianpmx.png", _1oz:canadianpmx_1oz, _10oz:canadianpmx_10oz, _100oz:canadianpmx_100oz},
            {name: "Canadian Bullion", dealer_url: "https://www.bullionmart.ca", logo_url: "images/canadianbullion.png", _1oz:canadianbullion_1oz, _10oz:canadianbullion_10oz, _100oz:canadianbullion_100oz},
            {name: "Bullion Mart", dealer_url: "https://www.bullionmart.ca", logo_url: "images/bullionmart.png", _1oz: bullionmart_1oz, _10oz:bullionmart_10oz, _100oz:bullionmart_100oz}
        ]
    }

    return data

}

function fakeScrape() {
    data =  {
        silver: "35",
        retailers: [
            {name: "Canada Gold", dealer_url: "https://canadagold.ca/what-we-sell/", logo_url: "images/canadagold.png", _1oz: "10",_10oz: "100", _100oz: "1000"},
            {name: "Canadian PMX", dealer_url: "https://canadianbullion.ca", logo_url: "images/canadianpmx.png", _1oz: "10", _10oz: "100", _100oz: "1000"},
            {name: "Canadian Bullion", dealer_url: "https://www.bullionmart.ca", logo_url: "images/canadianbullion.png", _1oz: "10", _10oz: "100", _100oz: "1000"},
            {name: "Bullion Mart", dealer_url: "https://www.bullionmart.ca", logo_url: "images/bullionmart.png", _1oz: "10", _10oz: "100", _100oz: "1000"}
        ]
    }

    return data
}


function cleanCanadaGold(str) {
    str = str.split(" each")[0]
    str = str.split("$")[1]
    str = str.replace(",", "")
    return str
}

function cleanCanadianPmx(str) {
    str = str.replace(",", "")
    str = str.replace("$", "")
    return str
}

function cleanCanadianBullion(str) {
    str = str.replace(",", "")
    str = str.replace("CA$", "")
    return str
}

function cleanBullionMart(str) {
    str = str.replace(",", "")
    str = str.replace("CAD  ", "")
    return str
}


module.exports.scrapeAsync = scrapeAsync
module.exports.fakeScrape = fakeScrape
