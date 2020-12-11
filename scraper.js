const fs = require('fs')
const cheerio = require('cheerio')
const got = require('got')



async function scrapeAsync(){

    url = 'https://www.kitco.com/charts/livesilver.html'
    response = await got(url)
    $ = cheerio.load(response.body)
    silver = $('#sp-ask').text()

    //CANADAGOLD
    
    url = 'https://canadagold.ca/what-we-sell/'
    response = await got(url)
    $ = cheerio.load(response.body)
    let table = $('.cg-table')[1]
    let tr = $(table).find('tr')[0]
    let td = $(tr).find('td')[2]
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

    prices =  {
        silver:silver,
        canadagold_1oz: canadagold_1oz, canadagold_10oz:canadagold_10oz, canadagold_100oz: canadagold_100oz,
        canadianpmx_1oz:canadianpmx_1oz, canadianpmx_10oz:canadianpmx_10oz, canadianpmx_100oz:canadianpmx_100oz,
        canadianbullion_1oz:canadianbullion_1oz, canadianbullion_10oz:canadianbullion_10oz, canadianbullion_100oz:canadianbullion_100oz,
        bullionmart_1oz: bullionmart_1oz, bullionmart_10oz:bullionmart_10oz, bullionmart_100oz:bullionmart_100oz
    }

    return prices

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

