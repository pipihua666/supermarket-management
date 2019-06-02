let mysql = require('mysql');
let db={};
db.query=function sqlback(sqllan,fn){
    let connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123456',
        database:'my_goodsdb',
        port:'3306'
    });
    connection.connect(function(error){
        if(error){
            console.log(error);
            return ;
        }
    });
    let sql=sqllan;
    if(!sql) return ;
    connection.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return;
        }
        fn(rows);
    });
}

module.exports = db;