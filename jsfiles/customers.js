module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCustomer(res, mysql, context, complete){
        mysql.pool.query("SELECT customerID, firstName, lastName, email FROM customers", function(error, results, fields){
            if(error){
                console.log("ERROR");
                res.write(JSON.stringify(error));
                res.end();
            }
            context.results = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.err = false;
        context.jsscripts = ["deleteCustomer.js"];
        var mysql = req.app.get('mysql');
        getCustomer(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                res.render('customers', context);
            }

        }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
            console.log(req.body);
            var sql = "INSERT INTO customers (firstName, lastName, email) VALUES (?,?,?)";
            var inserts = [req.body.firstName, req.body.lastName, req.body.email];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/customers');
                }
            });
        
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE customers SET firstName=?, lastName=?, email=? WHERE customerID=?";
        var inserts = [req.body.firstName, req.body.lastName, req.body.email, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    router.delete('/:id', function(req, res){
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
    return router;
}();
