const fs = require('fs')
const cheerio = require('cheerio')

const fetch = require('node-fetch');

async function scrapeAsync(){

    //USDCAD

    url = 'https://ca.finance.yahoo.com/quote/CADUSD=X/'
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    yahooprice = $("span[data-reactid='32']")[0]
    usdcad = $(yahooprice).text()

    //SILVER

    url = 'https://www.kitco.com/silver-price-today-canada/index.html'
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    div = $('.table-price--body-table--overview-bid')
    p = $(div).find('p')[1]
    silver = $(p).text()
    
    //CANADAGOLD

    url = 'https://canadagold.ca/what-we-sell/'
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
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
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    vpcol = $('.vpcol02')[0]
    canadianpmx_1oz = cleanCanadianPmx($(vpcol).text()) 

    url = "https://canadianpmx.com/product/silver-bar-10-oz-royal-canadian-mint-9999/"
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    vpcol = $('.vpcol02')[0]
    canadianpmx_10oz = cleanCanadianPmx($(vpcol).text())

    url = "https://canadianpmx.com/product/silver-bar-100-oz-royal-canadian-mint-9999/"
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    vpcol = $('.vpcol02')[0]
    canadianpmx_100oz = cleanCanadianPmx($(vpcol).text())


    //CANADIANBULLION

    url = "https://canadianbullion.ca/silver/coins/1-oz-2016-canadian-maple-leaf-silver-coin.html"
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    regpri = $('.regular-price')[0]
    pri = $(regpri).find('.price')[0]
    canadianbullion_1oz = cleanCanadianBullion($(pri).text())

    url = "https://canadianbullion.ca/silver/10-oz-silver-bar/10-oz-royal-canadian-mint-silver-wafer-bar.html"
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    regpri = $('.regular-price')[0]
    pri = $(regpri).find('.price')[0]
    canadianbullion_10oz = cleanCanadianBullion($(pri).text())

    url = "https://canadianbullion.ca/silver/100-oz-silver-bar/100-oz-rcm-royal-canadian-mint-silver-bar.html"
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    regpri = $('.regular-price')[0]
    pri = $(regpri).find('.price')[0]
    canadianbullion_100oz = cleanCanadianBullion($(pri).text())

    //BULLIONMART

    url = "https://www.bullionmart.ca/product/2020-1-oz-99-99-pure-silver-maple-leaf-bullion-coin/"
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    sumcon = $('.summary-container')[0]
    priam = $(sumcon).find('.woocommerce-Price-amount')[0]
    bullionmart_1oz = cleanBullionMart($(priam).text())


    url = "https://www.bullionmart.ca/product/10-oz-rcm-silver-bar-new-low-serial-numbers/"
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    sumcon = $('.summary-container')[0]
    priam = $(sumcon).find('.woocommerce-Price-amount')[0]
    bullionmart_10oz = cleanBullionMart($(priam).text())


    url = "https://www.bullionmart.ca/product/silver-bar-100-oz-royal-canadian-mint-9999-new/"
    response = await fetch(url)
    body = await response.text();
    $ = cheerio.load(body)
    sumcon = $('.summary-container')[0]
    priam = $(sumcon).find('.woocommerce-Price-amount')[0]
    bullionmart_100oz = cleanBullionMart($(priam).text())


    //KITCO

    url = "https://online.kitco.com/buy/1040/10-oz-Silver-RCM-Bar-9999-1040"
    response = await fetch(url, { headers:{'cookie': "currencyId=CAD;"}})
    body = await response.text();
    $ = cheerio.load(body)
    table = $('.bulk_discount_list')[0]
    tbody = $(table).find('tbody')[0]
    tr = $(tbody).find('tr')[1]
    td = $(tr).find('td')[1]
    kitco_10oz = cleanKitco($(td).text())


    url = "https://online.kitco.com/buy/100710/100-oz-Silver-Royal-Canadian-Mint-Bar-9999-100710"
    response = await fetch(url, { headers:{'cookie': "currencyId=CAD;"}})
    body = await response.text();
    $ = cheerio.load(body)
    table = $('.bulk_discount_list')[0]
    tbody = $(table).find('tbody')[0]
    tr = $(tbody).find('tr')[1]
    td = $(tr).find('td')[1]
    kitco_100oz = cleanKitco($(td).text())

    //APMEX

    url = "https://www.apmex.com/product/1090/1-oz-canadian-silver-maple-leaf-coin-bu-random-year"
    response = await fetch(url, { headers:{'cookie': "a.c=ipp=80; a.r=rvp=1090;"}})
    body = await response.text();
    $ = cheerio.load(body)
    p = $('.price')[4]
    apmex_1oz =  convertToCad(cleanApmex($(p).text()), usdcad)

    url = "https://www.apmex.com/product/83022/10-oz-silver-bar-royal-canadian-mint-9999-fine-new-style"
    response = await fetch(url, { headers:{'cookie': "a.c=ipp=80; a.r=rvp=1090;"}})
    body = await response.text();
    $ = cheerio.load(body)
    p = $('.price')[4]
    apmex_10oz =  convertToCad(cleanApmex($(p).text()), usdcad)

    url = "https://www.apmex.com/product/97758/100-oz-silver-bar-royal-canadian-mint-9999-fine-pressed"
    response = await fetch(url, { headers:{'cookie': "a.c=ipp=80; a.r=rvp=1090;"}})
    body = await response.text();
    $ = cheerio.load(body)
    p = $('.price')[4]
    apmex_100oz = convertToCad(cleanApmex($(p).text()), usdcad)


    //https://cbmint.com/shipping
    //https://sdbullion.com/sd-bullion-shipping-policies
    //https://www.goldenstatemint.com/faq/Shipping
    //silvergoldbull api

    data =  {
        silver:silver,
        retailers: [
        //{name: "Canada Gold", shipping:"Local Pickup Only, Multiple Locations", dealer_url: "https://canadagold.ca/what-we-sell/", logo_url: "images/canadagold.png", _1oz: canadagold_1oz,_10oz:canadagold_10oz, _100oz: canadagold_100oz},
        {name: "Canadian PMX", shipping:"Flat Rate of $16.95", dealer_url: "https://canadianpmx.com", logo_url: "images/canadianpmx.png", _1oz:canadianpmx_1oz, _10oz:canadianpmx_10oz, _100oz:canadianpmx_100oz},
        {name: "Canadian Bullion", shipping:"Free Shipping over $2500", dealer_url: "https://canadianbullion.ca", logo_url: "images/canadianbullion.png", _1oz:canadianbullion_1oz, _10oz:canadianbullion_10oz, _100oz:canadianbullion_100oz},
        {name: "Bullion Mart", shipping:"Free Shipping over $500", dealer_url: "https://www.bullionmart.ca", logo_url: "images/bullionmart.png", _1oz: bullionmart_1oz, _10oz:bullionmart_10oz, _100oz:bullionmart_100oz},
        {name: "Kitco", shipping:"Ships to Canada", dealer_url: "https://online.kitco.com", logo_url: "images/kitco.png", _1oz: 0, _10oz: kitco_10oz, _100oz: kitco_100oz},
        {name: "Apmex", shipping:"Free Shipping over $US 100", dealer_url: "https://www.apmex.com", logo_url: "images/apmex.png", _1oz: apmex_1oz, _10oz: apmex_10oz, _100oz: apmex_100oz}
        ]
    }

    data = calculatePremiumsRatios(data)
    data = findLowestPremiums(data)
    return data

}

function calculatePremiumsRatios(data){
    for(let i = 0 ;i < data.retailers.length; i++) {
        data.retailers[i]._1oz_ratio = data.retailers[i]._1oz ? ((((data.retailers[i]._1oz / data.silver) - 1) * 100)).toFixed(2) : 0
        data.retailers[i]._10oz_ratio = data.retailers[i]._10oz ? ((((data.retailers[i]._10oz / (data.silver * 10)) - 1) * 100)).toFixed(2) : 0
        data.retailers[i]._100oz_ratio = data.retailers[i]._100oz ? ((((data.retailers[i]._100oz / (data.silver * 100)) - 1) * 100)).toFixed(2) : 0
    }

    return data
}

function findLowestPremiums(data) {
    let array = data.retailers
    let _1ozs = array.map(el => { if(el._1oz){ return  parseFloat(el._1oz, 10) } else { return 1000000}})
    let _10ozs = array.map(el => {if(el._10oz){ return  parseFloat(el._10oz, 10)} else {return 1000000}})
    let _100ozs = array.map(el => {if(el._100oz){ return  parseFloat(el._100oz, 10)} else {return 1000000}})

    let i1oz = _1ozs.indexOf(Math.min(..._1ozs));
    let i10oz = _10ozs.indexOf(Math.min(..._10ozs));
    let i100oz = _100ozs.indexOf(Math.min(..._100ozs));

    data.retailers[i1oz].min1oz = true
    data.retailers[i10oz].min10oz = true
    data.retailers[i100oz].min100oz = true

    return data;
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

function convertToCad(usd,rate) {
    cad = usd/rate
    cad = cad.toFixed(2)
    return cad
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

function cleanKitco(str) {
    str = str.replace('$',"")
    str = str.replace(',',"")
    str = str.replace(' ',"")
    str = str.replace(/\n/g, "")
    str = str.replace(/\t/g, "")
    return str
}

function cleanApmex(str) {
    str = str.replace("$", "")
    str = str.replace(",", "")
    return str
}

module.exports.scrapeAsync = scrapeAsync
module.exports.fakeScrape = fakeScrape
