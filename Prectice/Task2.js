import fs from "node:fs"

const reqHandler = (req, res) => {
  console.log(req.method, req.url);

  if (req.url === "/") {
    res.setHeader("content-type", "text/html");
    res.write(`
      <html lang="en">
<head>
    <title>SignUp</title>
</head>
<body>
   <form action="/details" method="POST">
    <h1>sign up for new account</h1>
    <label for="username">Name</label>
    <input type="text" placeholder="Enter your name" name="username" id="username">
    <br>

    <label for="email">Email</label>
    <input type="email" placeholder="Enter your email" name="email" id="email">
    <br>


    <label for="contect">Contect</label>
    <input type="tel" placeholder="Contect Number" name="tel" id="contect">
    <br>

    <label for="password">password</label>
    <input type="password" name="password" id="password">
    <button>submit</button>

</form>

</body>
</html>

      `);
    return res.end();
  } else if (req.url.toLowerCase() === "/details" && req.method === "POST") {

    const data = []
    req.on('data',(chunk)=>{
      console.log(chunk)
      data.push(chunk)
    })

    req.on('end',()=>{
      const strData = Buffer.concat(data).toString()
      const finalData = new URLSearchParams(strData)
      // const obj = {}
      // for(const [key,value] of finalData.entries()){
      //   obj[key] = value
      // }

      const dataObj = Object.fromEntries(finalData)
      fs.writeFileSync("userInfo.txt", JSON.stringify(dataObj))
    })


    res.write(`
      <h1>Your account has been creatid successfully</h1>
      <p>Thank you for come here</p>`);
      return res.end()
  }
};

module.exports = reqHandler

 
