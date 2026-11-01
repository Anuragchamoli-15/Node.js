const Calculater = (req,res)=>{
    if(req.url === '/calculater' && req.method === 'POST'){
        res.setHeader('content-type', 'text.html')
        res.write(`
<body>
     <form action="/calculaterresult" method="POST">

        <label for="value1">value1</label>
        <input type="text" name="value1"  id="value1">
        <br>
        <label for="value1">value2</label>
        <input type="text" name="value2"  id="value2">
        <br>
        <button>Add</button>
     </form>
</body>
</html>
            `)
            res.end()
    }else if (req.url.toLowerCase() === '/calculaterresult' && req.method === 'POST'){
        req.on('data', (chunk)=>{
            console.log(chunk)
        })
    }
    // res.end()

    
}

module.exports = Calculater