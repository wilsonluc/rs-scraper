const express = require('express')
const app = express()
const fetch = require('node-fetch-commonjs')

let itemPricesUrl = 'https://prices.runescape.wiki/api/v1/osrs/latest';

app.get("/api", (req, res) => {
    res.json({"users": ["Test item 1", "Test item 2", "Test item 3"]})
})

// Get high, highTime, low, lowTime attributes from itemPricesUrl
app.get("/getItems", (req, res) => {
    fetch(itemPricesUrl, {method: "Get"})
    .then(res => res.json())
    .then((json) => {
        var rawItems = {}
        var keys = Object.keys(json.data)

        for (i = 0; i < keys.length; i++) {
            var id = keys[i]
            var item = json.data[id]
            rawItems[id] = {
                id: id,
                high: item.high,
                highTime: item.highTime,
                low: item.low,
                lowTime: item.lowTime
            }
        }
        
        processedItems = Object.keys(rawItems).map(function(k) {
            return rawItems[k];
        })

        res.json({"items": processedItems})
    })
})

app.listen(5000, () => {
    console.log("Server started on port 5000")
})