import http from 'node:http'


const server = http.createServer((req,res)=>{
    console.log(req.method, req.url)

    if(req.url === '/'){
        res.setHeader('content-type', 'text/html')
        res.write(`
            <html lang="en">
    <head>
        <title>anurag</title>
    </head>
    
    <body>
        <h1>hello my name is anurag </h1>
        <span>Go to next page </span>
        <a href="/nextpage">click here</a>
    </body>
    </html>
            `)
            return res.end()
    }
    else if (req.url.toLowerCase() === '/nextpagee' ){
        res.setHeader('content-type', 'text/html')
        res.write(`
          <html lang="en">
<head>
    <title>anurag</title>
</head>
<body>
   
    <h1>Hello here is your next page </h1>
     
</body>
</html>  
            `)
             return res.end()
    }
        res.setHeader('content-type', 'text/html')
        res.write(`
         <html lang="en">
<head>
    <title>anurag</title>
</head>
<body>
   
    <h1> 404 Page not found </h1>
     
</body>
</html>   
            `)
           return res.end()

})




const PORT = 6001
 server.listen(PORT , ()=>{
    console.log(`here is your server http://localhost:${PORT}`)
 })