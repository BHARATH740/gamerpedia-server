const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 6000;
const apiRoutes = require("./routes/apiRoutes");
const allowedOrigins = ["http://localhost:4200"];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  // Set other CORS headers as needed (e.g., methods, headers)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Configure morgan to log requests
app.use(morgan("combined"));

app.use("/", apiRoutes);

app.listen(PORT, (error) => {
  if (!error) console.log("Server is listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
