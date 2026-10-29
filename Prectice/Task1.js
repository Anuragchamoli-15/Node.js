const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

//   if (req.url === "/"|| req.url === "/home") {
//     res.setHeader("content-Type", "text/html");
//     res.write("<html>");
//     res.write("<head><title>Navbar</title></head>");
//     res.write(
//       '<body><a href="/home">Home</a><br><a href="/men">Men</a><br><a href="/women">Women</a><br><a href="/kids">Kids</a><br><a href="/cart">Cart</a></body>',
//     );
//     res.write("</html>");
//     res.end();
//   }
    if (req.url === "/home" ) {
    res.write("<body><h1>This is Home page </h1></body>");
    return res.end();
  } else if (req.url === "/men") {
    res.write("<body><h1>This is Men page </h1></body>");
   return res.end();
  } else if (req.url === "/women") {
    res.write("<body><h1>This is Women page </h1></body>");
  return res.end();
  } else if (req.url === "/kids") {
    res.write("<body><h1>This is Kids page </h1></body>");
   return res.end();
  } else if (req.url === "/cart") {
    res.write("<body><h1>This is Cart page </h1></body>");
  return res.end();
  }  


  res.write(`
    <html lang="en">
<head>
    <title>Myntra</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/men">Men</a></li>
                <li><a href="/women">Women</a></li>
                <li><a href="/kids">Kids</a></li>
                <li><a href="/cart">Cart</a></li>

            </ul>
        </nav>
    </header>
    
</body>
</html>
    `);
    res.end()

  

});
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`server location is http://localhost:${PORT}`);
});
