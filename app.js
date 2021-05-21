var express = require('express');
var mysql = require('./database/db-connector.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 8992);
app.set('mysql', mysql);
app.use('/customers', require('./customers.js'));
//app.use('/greekhouses', require('./greekhouses.js'));
//app.use('/orders', require('./orders.js'));
//app.use('/products_greekhouses', require('./products_greekhouses.js'));
//app.use('/products_orders', require('./products_orders.js'));
//app.use('/products', require('./products.js'));
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  console.error("works tho");
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
