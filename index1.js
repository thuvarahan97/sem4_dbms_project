var express=require("express");
var session = require('express-session');
var bodyParser=require('body-parser');
var routes = require('./routes')
var user = require('./routes/user')
var http = require('http')
var path = require('path');
var app = express();

var authenticateController = require('./controllers/authenticate-controller');
var registerController = require('./controllers/register-controller');

app.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// app.get('/', function (req, res) {
//     res.sendFile( __dirname + "/public/" + "index.html" );  
// });

// app.get('/public/', function (req, res) {
//     res.sendFile( __dirname + "/public/" + "index.html" );  
// });

// app.get('/login/', function (req, res) {
//     res.sendFile( __dirname + "/public/" + "login.html" );  
// });


// app.get('/login/', function(req, res) {
// 	if (req.session.loggedin) {
// 		res.redirect('/');
// 	} else {
// 		res.sendFile( __dirname + "/public/" + "login.html" ); 
// 	}
// });

app.get('/', routes.login);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.login);//call for login page
app.post('/login', user.login);//call for login post

/* route to handle login and registration */
// app.post('/api/register',registerController.register);
// app.post('/api/authenticate',authenticateController.authenticate);

// app.post('/controllers/register-controller', registerController.register);
// app.post('/controllers/authenticate-controller', authenticateController.authenticate);

app.listen(8000);