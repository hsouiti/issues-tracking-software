const http = require("http");
const config = require("./config");

const PORT = config.PORT;

const server = http.createServer(require("./app"));

server.listen(PORT, console.log(`Server running at http://localhost:${PORT}`));
