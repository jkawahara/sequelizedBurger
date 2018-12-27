// *** Include Modules: express, handlebars, method-override, body-parser
var express = require('express');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

// Assign Express to app
var app = express();
// Assign Heroku port or 8080 to PORT
var PORT = process.env.PORT || 8080;
// Assign burgers_controller.js to routes
var routes = require('./controllers/burgers_controller');

// *** Express configuration
// Static content served from /public directory
app.use(express.static('public'));
// Body parsing for URL encoded and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routing
app.use(routes);
// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// *** Listener
app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});