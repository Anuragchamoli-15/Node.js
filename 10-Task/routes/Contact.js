const express = require('express')
const path = require('path')
const contactRoute = express.Router()

const rootdir = require('../utils/pathUtil')


const app = express()

contactRoute.get("/user/contact-us",(req,res,next)=>{
    console.log(req.url, req.method)
    res.sendFile(path.join(rootdir, "views", "Contact.html"))
})

contactRoute.post("/user/contact-us",(req,res,next)=>{
    console.log(req.url, req.method)
    res.sendFile(path.join(rootdir, "views", "Succes.html"))
})

module.exports = contactRoute