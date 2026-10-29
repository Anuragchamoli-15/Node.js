import http from 'node:http'

const server = http.createServer((req,res)=>{
    console.log(req.url, req.method)


    if(req.url === '/'){
        res.setHeader('Content-Type' , 'application/json')
        res.end(JSON.stringify({name: "anurag chamoli"}))
    }
})

const PORT = 4000
server.listen(PORT, ()=>{
console.log(`server on this addres http://localhost:${PORT}`)
})