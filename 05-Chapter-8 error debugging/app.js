const http = require('http')
const syntax = require('./syntex')

const server = http.createServer((req,res )=>{
    console.log(req.url, req.method)
    syntax()
})

const PORT= 5001
server.listen(PORT , ()=>{
    console.log(`here is your server http://localhost:${PORT}`)
})



