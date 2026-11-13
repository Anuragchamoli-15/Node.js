const Result = (req, res) => {
  console.log("1")
    const dataList = [];
    let result;
    req.on("data", (chunk) => {
      console.log("2")
      console.log(chunk);
      dataList.push(chunk);
    });

    req.on("end", () => {
      console.log("3")
      const List = Buffer.concat(dataList).toString();
      const finalList = new URLSearchParams(List);
      const obj = Object.fromEntries(finalList);
      result = Number(obj.First) + Number(obj.Second);
      console.log(result);
       });

       console.log("4")
       res.setHeader("content-type", "text/html");
    res.write(`
        <html lang="en">
<head>
    <title>calculator</title>
</head>
<body>
    <h1>hello here is your result</h1>
    <h2>your sum is ${result}</h2>
</body>
</html>
        `)
        res.end()
   
    
  }

export default Result;
