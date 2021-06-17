const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xss = require('xss-clean')

const app = express();

app.use(helmet());
app.use(xss())


const usersRoutes = require("./routes/users");
const messagesRoutes = require("./routes/messages");


const path = require("path");


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

