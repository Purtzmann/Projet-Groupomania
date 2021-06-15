const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xss = require('xss-clean')
const rateLimit = require("express-rate-limit");

const app = express();

app.use(helmet());
app.use(xss())


const usersRoutes = require("./routes/users");
const messagesRoutes = require("./routes/messages");


const path = require("path");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
//app.use(limiter);

app.use(cors());


/* BODY PARSER */
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

/*MULTER*/
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/imagesProfil", express.static(path.join(__dirname, "imagesProfil")));

// routes
app.use("/api/users/", usersRoutes);
app.use("/api/messages/", messagesRoutes);

app.get("/", (req, res) => {
   res.json({ message: "Welcome to fn2m application." });
 });


module.exports = app;

