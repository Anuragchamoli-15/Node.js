// const http = require('http')

// const server = http.createServer( (req,res)=>{
//       res.setHeader('content-Type', 'text/html')
//       res.write('<html>')
//       res.write('<head><title> anurag </title></head>  ')
//       res.write('<body> <h1>This is my home page </h></body>')
//       res.write('</html>')
//       res.end()
// })

// const PORT = 3000

// server.listen(PORT , ()=>{
//   console.log(`server running at http://localhost:${PORT}`)
// })

const http  = require('http')
 
const server = http.createServer((req,res)=>{
  console.log(req)
})

const PORT = 3000
server.listen(PORT ,()=>{
  console.log(`http://localhost: ${PORT}`)
})