var express = require('express');
var app = express();
var db = require('./database/db-connector')
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 8992);

app.get('/', function(req,res){
  res.render('home');
});

app.get('/customers', function(req,res){
  res.render('customers');
});
app.get('/greekhouses', function(req,res){
  res.render('greekhouses');
});
app.get('/orders', function(req,res){
  res.render('orders');
});
app.get('/products_greekhouses', function(req,res){
  res.render('products_greekhouses');
});
app.get('/products_orders', function(req,res){
  res.render('products_orders');
});
app.get('/products', function(req,res){
  res.render('products');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
