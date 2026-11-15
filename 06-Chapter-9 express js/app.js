const express = require('express') //external module
const response = require('./response') // local module

const app = express()

app.use("/", (req,res,next)=>{
   console.log("first", req.url, req.method)
   // res.send("<h1> hello first </h1>")
   next() 
})

app.post("/submit-details",(req,res,next)=>{
   console.log("second", req.url, req.method)
   res.send("<h1> hello </h1>")
}) 

app.get("/", (req,res,next)=>{
   console.log("another", req.url, req.method)
   res.send("<h1> hello another </h1>")

})



const PORT = 5002
app.listen(PORT,()=>{
    console.log(`here is your server http://localhost:${PORT}`)
})