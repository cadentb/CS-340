module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getGreekhouse(res, mysql, context, complete){
        mysql.pool.query("SELECT houseID, letters, nickname FROM greekHouses", function(error, results, fields){
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
        context.jsscripts = ["deleteGreekhouses.js"];
        var mysql = req.app.get('mysql');
        getGreekhouse(res, mysql, context, complete);
        function complete(){
            callbackCount++; 
            if(callbackCount >= 1){
                res.render('greekhouses', context);
            }

        }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body);
        var sql = "INSERT INTO greekHouses (letters, nickname) VALUES (?,?)";
        var inserts = [req.body.letters, req.body.nickname];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/greekhouses');
            }
        });
        
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE greekHouses SET letters=?, nickname=? WHERE houseID=?";
        var inserts = [req.body.letters, req.body.nickname, req.params.id];
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

        var sql = "DELETE FROM greekHouses WHERE houseID = ?";
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
