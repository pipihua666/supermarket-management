const bodyParser = require('body-parser');
const db = require('../modules/goodsSQL');


module.exports=function(app){
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    app.get('/oftenGoods', function (req,res) {
        let sql=`select * from  goodsdata `;
        db.query(sql,[],function(results,fields){
            res.status(200).json(results);
        });
    });
    app.get('/typeGoods', function (req, res) {
        let resultArr = [];
        let { snakes, lifeGoods, drinks, specialOffer}=req.query;
        let sql = `select * from goodsdata where goodsCategory = ?`;
        db.query(sql,[snakes],function(results,fields){
            resultArr.push(results);
        });
        db.query(sql,[lifeGoods],function(results,fields){
            resultArr.push(results);
        });
        db.query(sql, [drinks],function(results,fields){
            resultArr.push(results);
        });
        db.query(sql, [specialOffer],function(results,fields){
            resultArr.push(results);
            res.status(200).json(resultArr);
        });
        // res.status(200).json(resultArr);//mysql查询是异步的，放在这只会在查询之前触发，所以会返回undefined
    })
    app.get('/*', function (req, res) {
        res.sendFile(process.cwd()+req.url);
    })
    app.put('/checkout', function (req, res) {
        let goods =req.body.data;
        let sql = '';
        // let selectSql = `select goodsCount from goodsdata where goodsId = ?`

        if(goods.length>0){
            for(let i=0,len=goods.length;i<len;i++){
                sql += `update goodsdata set goodsCount = goodsCount - ${goods[i].goodsCount} where goodsId = ${goods[i].goodsId};`; 
            }
        }
        db.query(sql, [], function (results, fields) {
            res.status(200).json(results);
        });
    })
}


//设置跨域访问
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-length,Authorrization,Accept,X-Requested-With,yourHeaderFeild");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Content-Type", "application/json;charset=utf-8");
//     res.header("Cache-Control", "privte");
//     next();
// });
