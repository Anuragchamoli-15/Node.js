import http from 'node:http'
import Home from './Home.js'

const server = http.createServer(Home)

const PORT= 5000
server.listen(PORT , ()=>{
    console.log(`here is your server http://localhost:${PORT}`)
})

