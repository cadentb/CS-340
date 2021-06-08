var express = require('express');
var mysql = require('./database/db-connector.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'handlebars');
app.set('port', 8988);
app.use(express.static('public'));
app.set('mysql', mysql);

app.get('/', function(req,res){
  res.render('home');
});

app.use('/customers', require('./jsfiles/customers.js'));
app.use('/greekhouses', require('./jsfiles/greekhouses.js'));
app.use('/orders', require('./jsfiles/orders.js'));
app.use('/products', require('./jsfiles/products.js'));

app.use('/products_greekhouses', require('./jsfiles/products-greekhouses.js'));
app.use('/products_orders', require('./jsfiles/products-orders.js'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});

//______________________________________


/*{{#each data}}
  <tr>
    <td>{{this.customerID}}</td>
    <td>{{this.firstName}}</td>
    <td>{{this.lastName}}</td>
    <td>{{this.email}}</td>
  </tr>


  {{#each data}}
    <tr>
      <td>{{customerID}}</td>
      <td>{{firstName}}</td>
      <td>{{lastName}}</td>
      <td>{{email}}</td>
    </tr>
  </table>*/
