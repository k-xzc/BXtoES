var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var rp = require('request-promise');
var es_host = "localhost" //process.env.es_host
var es_port = "9200"//process.env.es_port
var es_index = "test-t"//process.env.es_index
//var es_type = "abc"//process.env.es_type
var secondary_cur = ["BTCUSDT","ETHUSDT","SOLUSDT"]
var cron = require('node-cron');

cron.schedule('*/10 * * * * *', function(){
 getCurrencyFromBinance().then(function(currency_json){
  for(var i in currency_json){
   for(var j in secondary_cur){
    if(currency_json[i].symbol == secondary_cur[j]){
      postToEs(generateNewJson(currency_json[i]))
      //console.log(generateNewJson(currency_json[i]))
    }
   }
  }
 })
console.log("done")
})

function getCurrencyFromBinance() {
  url = "https://api.binance.com/api/v3/ticker/price"
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
  url = `http://${es_host}:${es_port}/${es_index}/_doc/`
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
    "currency_name": currency_json.symbol,
    "last_price": currency_json.price,
    "timestamp": dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM:ss'Z'")
  }
}
