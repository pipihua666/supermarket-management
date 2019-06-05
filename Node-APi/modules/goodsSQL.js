const mysql = require('mysql');

module.exports={
    query:function(sql,params,callback){
        //使用的时候创建链接，数据操作完成了就销毁链接
        let connection=mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'my_goodsdb',
            multipleStatements: true//使其可执行多条语句
        });
        connection.connect(function(err){
            if(err){
                console.log('数据库连接失败');
                return;
            }else{
                console.log('数据库连接成功');
            }
        })

        let querySql = sql;
        let queryParams = params;
        //开始数据操作
        //传入三个参数，第一个参数是sql数据，第二个参数是sql数据中需要的参数,第三个参数是回调函数
        connection.query(querySql, queryParams, function (err, results, fields){
            if(err){
                console.log('数据操作失败'+err.stack);
            }
            //将查询出来的数据返回给回调函数
            //results作为数据操作后的结果，fields作为数据库连接的一些字段
            callback&&callback(results,fields);

            //查询完数据后通知数据库连接
            connection.end(function (err) {
                if (err) {
                    console.log('关闭数据库连接失败' + err);
                }else{
                    console.log('关闭数据库成功');
                }
            })
        })
    }
}