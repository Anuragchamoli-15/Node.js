const express = require('express')
const path = require('path')

const app = express()

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname, "../", "views", "404Page.html"))
})

module.exports = app