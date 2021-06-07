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
app.set('port', 8988);

app.get('/', function(req,res){
  res.render('home');
});

app.get('/customers', function(req,res,next){
  var package = {};
  package.jsscripts = ["deleteCustomer.js"]
  db.pool.query('SELECT * FROM customers', function(err, rows, fields){
    if(err){
      throw(err);
    }
    package.results = rows;
    console.log(package.results);
    res.render('customers', package);
  });

});

app.delete('/:id', function(req, res){
  console.log("in delete");
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM customers WHERE customerID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

app.get('/greekhouses', function(req,res){
  var package = {};
  db.pool.query('SELECT * FROM greekHouses', function(err, rows, fields){
    if(err){
      throw(err);
    }
    package.results = rows;
    res.render('greekhouses', package);
  });
});

app.get('/orders', function(req,res){
  var package = {};
  db.pool.query('SELECT * FROM orders', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    package.results = rows;
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
    package.results = rows;
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

app.post("/customers", (req, res) => {
  console.log("made it");
    let sql = "INSERT INTO Customers (firstName, lastName, email) VALUES (?, ?, ?, ?)";
    let { firstName, lastName, email } = req.body;

    let query = db.pool.query(sql, [firstName, lastName, email], (err, results) => {
        let context = {};
        if (err) throw err;

        console.log(results);
        context.results = true;
        res.send(context);
    });
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
