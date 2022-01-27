require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const passport = require("passport");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const fileUpload = require("express-fileupload");

// Import routes
const allRoute = require("./routes/allRoute");


//Set body parser for HTTP post operation
app.use(express.json()); // support json encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
); // support encoded bodies


// Security
const fs = require("fs");
const path = require("path");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const morgan = require("morgan");

// const orderRoutes = require("./routes/orderRoute")

// Prevent XSS attact
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {
      flags: "a",
    }
  );

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}

// Import associations
require("./utils/associations");

// Use Route
app.use("/", allRoute);


const PORT = 3000 || process.env.PORT;
// if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`Server berjalan di : http://localhost:${PORT}`)
  );
// }

module.exports = app;
