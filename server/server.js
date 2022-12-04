const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ["Test item 1", "Test item 2", "Test item 3"]})
})

app.listen(5000, () => {
    console.log("Server started on port 5000")
})