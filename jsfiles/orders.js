module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCustomer(res, mysql, context, complete){
        mysql.pool.query("SELECT orderID, customerID, shipStreet, shipCity, shipState, shipZip FROM orders", function(error, results, fields){
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
        context.jsscripts = ["deleteOrders.js"];
        var mysql = req.app.get('mysql');
        getCustomer(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                res.render('orders', context);
            }

        }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
            console.log(req.body);
            var sql = "INSERT INTO orders (customerID, shipStreet, shipCity, shipState, shipZip) VALUES (?,?,?,?,?)";
            var inserts = [req.body.customerID, req.body.shipStreet, req.body.shipCity, req.body.shipState, req.body.shipZip];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/orders');
                }
            });
        
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE orders SET customerID=?, shipStreet=?, shipCity=?, shipState=?, shipZip=? WHERE orderID=?";
        var inserts = [req.body.customerID, req.body.shipStreet, req.body.shipCity, req.body.shipState, req.body.shipZip, req.params.id];
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

        var sql = "DELETE FROM orders WHERE orderID = ?";
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
