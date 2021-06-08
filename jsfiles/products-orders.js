module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProductsOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT orderID, productID, productQty FROM products_orders", function(error, results, fields){
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
        context.jsscripts = ["deleteProductsOrders.js"];
        var mysql = req.app.get('mysql');
        getProductsOrders(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                res.render('products_orders', context);
            }

        }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
            console.log(req.body);
            var sql = "INSERT INTO products_orders (orderID, productID, productQty) VALUES (?,?,?)";
            var inserts = [req.body.orderID, req.body.productID, req.body.productQty];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/products_orders');
                }
            });
        
    });

    router.put('/oid/:oid/pid/:pid', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE products_orders SET orderID=?, productID=?, productQty=? WHERE orderID=? AND productID=?";
        var inserts = [req.body.orderID, req.body.productID, req.params.oid, req.params.pid];
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

    router.delete('/oid/:oid/pid/:pid', function(req, res){
        var mysql = req.app.get('mysql');

        var sql = "DELETE FROM products_orders WHERE orderID=? AND productID=?";
        var inserts = [req.params.oid, req.params.pid];
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
