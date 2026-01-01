// create server in Node.js 

let http = require("http");

let server = http.createServer((req, res) => {
    res.write("welcome to ws");
    res.end();
});

server.listen(8000, () => {
    console.log("http://localhost:8000");
});
