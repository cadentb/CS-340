module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProduct(res, mysql, context, complete){
        mysql.pool.query("SELECT productID, category, price, name, quantityInStock FROM products", function(error, results, fields){
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
        context.jsscripts = ["deleteProducts.js"];
        var mysql = req.app.get('mysql');
        getProduct(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                res.render('products', context);
            }

        }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
            console.log(req.body);
            var sql = "INSERT INTO products (category, price, name, quantityInStock) VALUES (?,?,?,?)";
            var inserts = [req.body.category, req.body.price, req.body.name, req.body.quantityInStock];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/products');
                }
            });
        
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE products SET category=?, price=?, name=?, quantityInStock=? WHERE productID=?";
        var inserts = [req.body.category, req.body.price, req.body.name, req.body.quantityInStock, req.params.id];
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

        var sql = "DELETE FROM products WHERE productID = ?";
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
