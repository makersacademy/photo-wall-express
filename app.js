var cors = require("cors");
var express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");

var apiResponses = require("./helpers/api-response");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
const { default: mongoose } = require("mongoose");
const Post = require("./models/post");

/**
 * Connect to MongoDB
 **/

var mongoDbUrl = process.env.MONGODB_URL || 'mongodb://localhost/photo-wall';
mongoose.connect(mongoDbUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

global.__basedir = __dirname;
var app = express();
app.use(express.json());
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// serve static files
app.use(express.static('public'))

// To Allow Cross-Origin Requests
app.use(cors());

//Route Prefixes
app.use("/api", apiRouter);
app.use("/", indexRouter);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

//throw 404 if URL not found
app.all("*", function (req, res) {
  return apiResponses.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
  if (err.name === "UnauthorizedError") {
    return apiResponses.unauthorizedResponse(res, err.message);
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000");
});
app.maxHttpHeaderSize = 64 * 1024; // 64KB
module.exports = app;
