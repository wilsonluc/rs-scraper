const { json } = require('express');
const express = require('express')
const app = express()
const fetch = require('node-fetch-commonjs')

let itemPrices = 'https://prices.runescape.wiki/api/v1/osrs/latest';
let itemDescriptions = 'https://prices.runescape.wiki/api/v1/osrs/mapping'

app.get("/api", (req, res) => {
    res.json({"users": ["Test item 1", "Test item 2", "Test item 3"]})
})

// Get high, highTime, low, lowTime attributes from itemPricesUrl
app.get("/getItems", (req, res) => {
    var rawItems = {}
    var keys = null
    processedItems = null

    // Get tradeable item IDs and current low / high prices
    partOne = fetch(itemPrices, {method: "Get"})
    .then(res => res.json())
    .then((json) => {
        keys = Object.keys(json.data)

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
    })
    // Get name of item, isMember, alch values & buy limit / 4hr
    .then(() => {
        fetch(itemDescriptions, {method: "Get"})
        .then(res => res.json())
        .then((json) => {
            var keys = Object.keys(json)
            for (i = 0; i < keys.length; i++) {
                var item = json[i]
                var id = item.id;
                if (rawItems[id] !== undefined) {
                    rawItems[id].name = item.name;
                    rawItems[id].isMember = item.members.toString();
                    rawItems[id].lowAlch = item.lowalch;
                    rawItems[id].highAlch = item.highalch;
                    rawItems[id].limit = item.limit;
                }
            }
    
            processedItems = Object.keys(rawItems).map(function(k) {
                return rawItems[k];
            })
            
            res.json({"items": processedItems})
        })
    })   
})

app.listen(5000, () => {
    console.log("Server started on port 5000")
})