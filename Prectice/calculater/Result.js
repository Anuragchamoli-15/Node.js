const Result = (req, res) => {
  if (req.url.toLowerCase() === "/calculaterresult" && req.method === "POST") {
    res.setHeader("content-Type", "text/html");
    const dataList = []
    req.on('data',(chunk) =>{
        console.log(chunk)
        dataList.push(chunk)
    })

    req.on('end' , ()=>{
        const List = Buffer.concat(dataList).toString()
        const finalList = new URLSearchParams(List)

        const obj =  Object.fromEntries(finalList)
        console.log(obj)

        const value = obj.value1+obj.value2
        console.log(value)

    })
    res.write(`
        <html lang="en">
<head>
    <title>Calculater</title>
</head>
<body>
    <h1>hello here is your result</h1>
</body>
</html>
        `);
  }
};

export default Result;
