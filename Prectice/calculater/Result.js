const Result = (req, res) => {
    const dataList = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      dataList.push(chunk);
    });

    req.on("end", () => {
      const List = Buffer.concat(dataList).toString();
      const finalList = new URLSearchParams(List);
      const obj = Object.fromEntries(finalList);
      const value = Number(obj.First) + Number(obj.Second);
      console.log(value);
       res.setHeader("content-type", "text/html");
    res.write(`
        <html lang="en">
<head>
    <title>calculator</title>
</head>
<body>
    <h1>hello here is your result</h1>
    <h2>your sum is ${value}</h2>
</body>
</html>
        `)
        res.end()
    });
    
  }

export default Result;
