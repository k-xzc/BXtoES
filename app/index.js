var express = require('express')
var port  = 9090
var app = express()
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var rp = require('request-promise');
var host ="http://localhost:9200"
var index ="bx"
var type ="currency"
app.use(bodyParser.json());
app.use(require('express-promise')());

app.get('/getcurrency', function (req, res) {
 getBx().then(function(cur){
   var json = getJson(cur[1])
   console.log(json)
   postToEs(json).then(function(a){
   console.log(a)
   })
   json= getJson(cur[21])
          console.log(json)
          postToEs(json).then(function(a){
          console.log(a)
   })
    json= getJson(cur[25])
          console.log(json)
          postToEs(json).then(function(a){
          console.log(a)
   })
   json= getJson(cur[26])
             console.log(json)
             postToEs(json).then(function(a){
             console.log(a)
   })
   json= getJson(cur[27])
             console.log(json)
             postToEs(json).then(function(a){
             console.log(a)
   })
   json= getJson(cur[29])
             console.log(json)
             postToEs(json).then(function(a){
             console.log(a)
   })
 })
res.send("done")
})

function getBx() {
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
  url = host + "/" + index + "/" + type
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

function getJson(a) {
  return {
    "currency_name": a.secondary_currency,
    "last_price": a.last_price,
    "bids":a.orderbook.bids.highbid,
    "asks":a.orderbook.asks.highbid,
    "timestamp": dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM:ss'Z'")
  }
}

app.listen(port, () => console.log(`listening on port ${port}!`))
