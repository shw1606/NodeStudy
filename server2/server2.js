const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    try {
      const Html = await fs.readFile("./server2.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(Html);
    } catch (e) {
      console.error(e);
      res.writeHead(500, "Temporary Error");
      res.end();
    }
  })
  .listen("8080", () => {
    console.log("Listening At Port 8080");
  });
