const express = require('express')
const path = require('path')

const app = express()

app.get("/",(req,res,next)=>{
    res.sendFile(path.join( __dirname, "../", "views", "Home.html"))
    
})

module.exports = app