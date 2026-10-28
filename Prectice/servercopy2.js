const http = require("http");
const fs = require('fs')
 
const server = http.createServer((req, res)=> {
  console.log(req.url, req.method, req.headers);

  if(req.url=== '/'){
  res.setHeader('content-Type', 'text/html')
      res.write('<html>')
      res.write('<head><title> anurag </title></head>  ')
      res.write('<body> <h1>This is my home page </h></body>')
      res.write('</html>')
      return  res.end()
  }else if(req.url==='/about'){
      res.setHeader('content-Type', 'text/html')
      res.write('<html>')
      res.write('<head><title> anurag </title></head>  ')
      res.write('<body> <h1> hello my name is anurag and i am learning Node.js </h></body>')
      res.write('</html>')
      return  res.end()
  }else if (req.url === 'skaj'){

    fs.writeFileSync('anurag.text' ,'hello')
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()

  }
      res.setHeader('content-Type', 'text/html')
      res.write('<html>')
      res.write('<head><title> anurag </title></head>  ')
      res.write('<body> <h1> hello world 369 </h></body>')
      res.write('</html>')

  
  res.end()
})

const PORT = 3000
server.listen(PORT,()=>{
    console.log(`server http://localhost:${PORT}`)
})