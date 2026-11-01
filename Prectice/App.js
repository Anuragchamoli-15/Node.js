import http from "node:http";
import reqHandler from ".Task2.js"

const server = http.createServer(reqHandler)

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
