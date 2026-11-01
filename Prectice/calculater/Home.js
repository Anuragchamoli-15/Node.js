import Calculater from "./Calculater.js";

const Home = (req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.setHeader("content-type", "text/html");
    res.write(`
            <html lang="en">
<head>
    <title>Calculater</title>
</head>
<body>
     <h1>Welcome to home page </h1> 
     <p>Here is your Caluculater</p>
    <p>Click the button for Calculater</p>
    <form action="/calculater" method="POST"><button>Calculater</button></form>
</body>
</html>
            `);
    return res.end();
  } else {
    Calculater(req, res);
  }
};

export default Home;
