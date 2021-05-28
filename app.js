var express = require('express');
var db = require('./database/db-connector')

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8992);

app.get('/', function(req,res){
  res.render('home');
});

app.get('/customers', function(req,res,next){
  //var package = {};
  db.pool.query('SELECT * FROM customers', function(err, fields){
    if(err){
      throw(err);
    }else{
    //package.results = JSON.stringify(rows);
    console.log(fields);
    res.render('customers', {data: fields});
  }
  });
});

app.get('/greekhouses', function(req,res){
  var package = {};
  db.pool.query('SELECT * FROM greekHouses', function(err, rows, fields){
    if(err){
      throw(err);
    }
    package.results = JSON.stringify(rows);
    res.render('greekhouses', {data: fields});
  });
});

app.get('/orders', function(req,res){
  var package = {};
  db.pool.query('SELECT * FROM orders', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    package.results = JSON.stringify(rows);
    res.render('orders', package);
  });
});

app.get('/products_greekhouses', function(req,res){
  res.render('products_greekhouses');

});

app.get('/products_orders', function(req,res){
  res.render('products_orders')

});

app.get('/products', function(req,res,next){
  var package = {};
  db.pool.query('SELECT * FROM products', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    package.results = JSON.stringify(rows);
    res.render('products', package);
  });
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
