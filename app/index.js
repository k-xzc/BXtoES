var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var rp = require('request-promise');
var es_host = process.env.es_host
var es_port = process.env.es_port
var es_index = process.env.es_index
var es_type = process.env.es_type
var secondary_cur = ["BTC","ETH","XRP","BSV","BCH","OMG"]
var cron = require('node-cron');

cron.schedule('*/10 * * * * *', function(){
 getCurrencyFromBx().then(function(currency_json){
  for(var i in currency_json){
   for(var j in secondary_cur){
    if(currency_json[i].secondary_currency == secondary_cur[j] && currency_json[i].primary_currency == "THB"){
           postToEs(generateNewJson(currency_json[i]))
    }
   }
  }
 })
console.log("done")
})

function getCurrencyFromBx() {
  url = "https://bx.in.th/api/"
  return rp({
        uri: url,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET",
        json: true
    })
}

function postToEs(json) {
  url = `http://${es_host}:${es_port}/${es_index}/${es_type}`
  return rp({
        uri: url,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: json,
        json: true
    })
}

function generateNewJson(currency_json) {
  return {
    "currency_name": currency_json.secondary_currency,
    "last_price": currency_json.last_price,
    "bids":currency_json.orderbook.bids.highbid,
    "asks":currency_json.orderbook.asks.highbid,
    "timestamp": dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM:ss'Z'")
  }
}
