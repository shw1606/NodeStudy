const http = require("http");
const fs = require("fs").promises;

const users = {};

http
  .createServer(async (req, res) => {
    console.log(req.url, req.method);
    try {
      if (req.method === "GET") {
        if (req.url === "/") {
          const restFront = await fs.readFile("./restFront.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(restFront);
        } else if (req.url === "/about") {
          const aboutPage = await fs.readFile("./about.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(aboutPage);
        } else if (req.url === "/users") {
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }
        try {
          const data = await fs.readFile(`.${req.url}`);
          return res.end(data);
        } catch (err) {}
        res.writeHead(404);
        return res.end("Not Found");
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("POST 본문(body):", body);
            const name = JSON.parse(body).name;
            let key = Date.now();
            users[key] = name;
            res.writeHead(201);
            res.end("등록 성공");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          const id = req.url.split("/")[2];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          req.on("end", () => {
            console.log("POST 본문(body):", body);
            users[id] = JSON.parse(body).name;
            return res.end(JSON.stringify(users));
          });
        }
      } else if (req.method === "DELETE") {
        if (req.url.startsWith("/user/")) {
          const id = req.url.split("/")[2];
          delete users[id];
          return res.end(JSON.stringify(users));
        }
      }
    } catch (e) {
      console.error(e);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(e.message);
    }
  })
  .listen("8082", () => {
    console.log("Listening at Port 8082");
  });
