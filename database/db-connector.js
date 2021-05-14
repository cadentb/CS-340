var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_braytonm',
    password        : '5095',
    database        : 'cs340_braytonm'
})

module.exports.pool = pool;
