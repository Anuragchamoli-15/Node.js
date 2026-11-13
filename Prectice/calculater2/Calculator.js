import Result from "./Result.js";

const calculator = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/calculator" && req.method === "POST") {
    res.setHeader("content-type", "text.html");
    res.write(`
<body>
     <form action="/calculatorresult" method="POST">

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
            `);
    return res.end();
  }
  
  else {
    Result(req, res);
    return res.end();
  }
};

export default calculator;
