const express = require('express')

const home = require('./routes/Home')
const contact = require('./routes/Contact')
const error = require('./routes/404Page')

const app = express()
app.use(express.urlencoded())
app.use( home)
app.use(contact)
app.use(error)

app.use((req,res)=>{
    res.setHeader()
    res.write()
    res.on("data", chunk())
})

const PORT = 1000
app.listen(PORT, ()=>{
    console.log(`server http://localhost:${PORT}`)
})