const http = require("http");
const app = require("./app");

// config file
const config = require("./config");

// Db connect
const connectDB = require("./db");

app.set("PORT", config.PORT);
const server = http.createServer(app);

(async () => {
  try {
    await connectDB(config.MONGO_URL);
    server.listen(
      app.get("PORT"),
      console.log(`Server running at http://localhost:${app.get("PORT")}`)
    );
  } catch (error) {
    console.log("Failed to connect to DB", error.message);
    process.exit(1);
  }
})();



