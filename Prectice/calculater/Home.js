// import calculator from "./calculator.js";
import Result from "./Result.js";


const Home = (req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.setHeader("content-type", "text/html");
    res.write(`
            <html lang="en">
<head>
    <title>Calculator</title>
</head>
<body>
     <h1>Welcome to home page </h1> 
     <p>Here is your Caluculator</p>
    <p>Click the button for calculator</p>
    <a href="/calculator">Go to calculator</a>
</body>
</html>
            `);
    return res.end();
  }else if(req.url.toLowerCase() === "/calculator"){
    res.setHeader("content-type", "text/html");
    res.write(`
      <html lang="en">
<head>
    <title>calculator</title>
</head>
<body>
    <form action="/result" method="POST">
        <h1>here is calculator</h1>
        <input type="text" name="First" id="" placeholder="First Num">
        <input type="text" name="Second" id="" placeholder="Second Num">
        <button>Add Numbers</button>
    </form>
</body>
</html>
      `)
    return res.end();
  }else if(req.url.toLowerCase() === "/result" && req.method === "POST"){
     return Result(req,res)
  }
    res.setHeader("content-type", "text/html");
     res.write(`
            <html lang="en">
<head>
    <title>Calculator</title>
</head>
<body>
     <h1>404 page dose note found</h1> 
    <a href="/">Go to Home</a>
</body>
</html>
            `)

  
  
  // else {
  //   calculator(req, res);
  // }
};

export default Home;
