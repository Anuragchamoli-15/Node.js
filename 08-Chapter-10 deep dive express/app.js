const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use("/",(req,res,next)=>{
    console.log("first", req.url, req.method)
    next()
})

app.use("/",(req,res,next)=>{
    console.log("second", req.url, req.method)
    next()
    // res.send(`<h1>Welcom</h1>
    //     <a href="/contact">contact</a>`)
})

app.get("/contact",(req,res,next)=>{
    console.log("third", req.url, req.method)
    res.send(`<h1>hello</h1>
        <form action="/contact" method="POST">
        <label for="name">Name</label>
        <input type="text" name="name" id="name">
        <label for="email">email</label>
        <input type="email" name="email" id="email">
        <button>Submit</button>
        </form>
        `)
})

app.use(bodyParser.urlencoded())

app.post("/contact",(req,res,next)=>{
    console.log("fourth", req.url, req.method, req.body)
    res.send(`<h1>We will contect you as soon as posibel</h1>`)

})


const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`this is server http://localhost:${PORT}`)
})