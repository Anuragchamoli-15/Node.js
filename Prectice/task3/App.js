import http from 'node:http'

const server =  http.createServer( (req, res)=>{
    console.log(req.url , req.method)
    if(req.url === "/"){
        res.setHeader('content-type', 'text/html')
        res.write(`
            <html lang="en">
<head>
    <title>Task3</title>
</head>
<body>
    <form action="/show" method="POST">
        <h1>Task</h1>
        <input type="text" name="Num" id="" placeholder="Num">
        <button>show</button>
    </form>
</body>
</html>
            `)
           return res.end()
    }
        res.setHeader('content-type', 'text/html')
        res.write(`
            <html lang="en">
<head>
    <title>Task3</title>
</head>
<body>
        <h1>404 page not found</h1>
        <a href="/">Go Home</a>
</body>
</html>
            `)

} )

const PORT = 5001
server.listen(PORT , ()=>{
    console.log(`your server on http://localhost:${PORT}`)
})