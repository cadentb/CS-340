module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProductGreekhouse(res, mysql, context, complete){
        mysql.pool.query("SELECT productID, houseID FROM products_greekHouses", function(error, results, fields){
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
        context.jsscripts = ["deleteProductsGreekhouses.js"];
        var mysql = req.app.get('mysql');
        getProductGreekhouse(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                res.render('products_greekhouses', context);
            }

        }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body);
        var sql = "INSERT INTO products_greekHouses (productID, houseID) VALUES (?,?)";
        var inserts = [req.body.productID, req.body.houseID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/products_greekhouses');
            }
        });
        
    });

    router.put('/pid/:pid/gid/:gid', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE products_greekHouses SET productID=?, houseID=? WHERE productID=? AND houseID=?";
        var inserts = [req.body.productID, req.body.houseID, req.params.pid, req.params.gid];
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

    router.delete('/pid/:pid/gid/:gid', function(req, res){
        var mysql = req.app.get('mysql');

        var sql = "DELETE FROM products_greekHouses WHERE productID = ? AND houseID = ?";
        var inserts = [req.params.pid, req.params.gid];
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
