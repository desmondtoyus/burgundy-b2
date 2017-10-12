
// my new commet
var cookie = require('cookie-parser');
var express = require("express");
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var path = require('path');
// Sets up the Express App
var app = express();

var port = process.env.PORT || 3000;
app.use(methodOverride("_method"));
app.use(fileUpload());
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

// Sets up Sequelize
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("views"));

// Routes
// =============================================================
// require("./routes/chat-api-routes.js")(app);
var io = require('socket.io').listen(app.listen(port));
var routes =require("./routes/html-routes.js");
app.use("/", routes);
require('./config')(app, io);

require("./routes/chat-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);
// Starting our Express app
// =============================================================
db.sequelize.sync({ force: false});
// .then(function() {
//   app.listen(port, function () {
    
    console.log("Listening on port %s", port);
//   });
// });
