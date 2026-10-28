const http = require("http");
const fs = require('fs')
 
const server = http.createServer((req, res)=> {
  console.log(req.url, req.method, req.headers);

  if(req.url=== '/'){
  res.setHeader('content-Type', 'text/html')
      res.write('<html>')
      res.write('<head><title> anurag </title></head>  ') 
      res.write('<body> <h1>Enter your details </h>')
      res.write('<form action = "/submit-details" method = "POST">') //form start

      res.write('<input type="text" name="username" placeholder="Enter your Name" ><br>')
      res.write('<label for= "male">Male </label> ')
      res.write('<input type="radio" id="male" name="gender" value="male">')
       res.write('<label for= "female"> Female </label>')
      res.write('<input type="radio" id="female" name="gender" value="female"><br>')
      res.write('<input type="submit" value="Submit">')

      res.write('</form>')//form end
      res.write('</body>')
      res.write('</html>')
      return  res.end()
  }else if (req.url.toLocaleLowerCase() === '/submit-details'&& req.method === 'POST'){
    fs.writeFileSync('user.txt', 'Anurag chamoli')
    res.statusCode = 302
    res.setHeader('Location','/')
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