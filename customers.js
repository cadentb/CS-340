var express = require('express');
var router = express.Router();


/*Display all people. Requires web based javascript to delete users with AJAX*/

router.get('/', function(req, res){
    var mysql = req.app.get('mysql');
    mysql.pool.query("SELECT * FROM customers", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        res.render('customers', results);
    });
});

router.post('/', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO customers (firstname, lastname, email) VALUES (?,?,?,?)";
    var inserts = [req.body.firstname, req.body.lastname, req.body.email];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(JSON.stringify(error));
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/customers');
        }
    });
});

module.exports = router;