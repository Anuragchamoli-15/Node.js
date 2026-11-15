const express = require('express')

const app = express()

app.use((req,res,next)=>{
  console.log('First dummy middleware',req.url, req.method)
  next()
})

app.use((req,res,next)=>{
  console.log('Second dummy middleware',req.url, req.method)
  next()
})

// app.use((req,res,next)=>{
//   console.log('Third middleware',req.url, req.method)
//   res.send("<h1>Welcome to my Page</h1>")
// })

app.get("/",(req,res,next)=>{
  console.log('Handling middleware',req.url, req.method)
  res.send("<h1>Welcome to my Page</h1>")
})

app.get("/contact-us",(req,res,next)=>{
  console.log('Contect middleware',req.url, req.method)
  res.send(`
    <form action="/contact-us" method = "POST">
        <label for="name">Name: </label>
        <input type="text" name="name" id="name">
        <br/>
        <label for="email">Email: </label>
        <input type="email" name="email" id="email">
        <br/>
        <input type = "Submit"/>
    </form>
 
    `)
})

app.post("/contact-us",(req,res,next)=>{
 console.log('Contect middleware for post',req.url, req.method)
 res.send("<h1>We will contect you as soon as posibel</h1>")

})

const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`This is server http://localhost:${PORT}`)
})