const db = require('../modules/goodsSQL');
const bodyParser = require('body-parser');

module.exports=function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/goodsData', function (req, res) {
        db.query('select * from goodsdata', [], function (results, fields) {
            res.status(200).json(results);
        })
    });

    app.get('/search', function (req, res) {
        let name = req.query.inputName;
        let category = req.query.inputCategory;
        let sql = `select * from goodsdata where (goodsName = ? or goodsCategory = ?)`;
        //存在sql注入
        db.query(sql, [name, category], function (results, fields) {
            res.status(200).json(results);
        });
    });

    app.post('/addForm', function (req, res) {
        let reqParams = req.body.data;
        let goodsId = reqParams.goodsId;
        let goodsName = reqParams.goodsName;
        let goodsCategory = reqParams.goodsCategory;
        let goodsTime = reqParams.goodsTime.split('T')[0];
        let goodsPrice = reqParams.goodsPrice;
        let goodsCount = reqParams.goodsCount;
        let sql = `insert into goodsdata(goodsId,goodsName,goodsCategory,goodsTime,goodsPrice,goodsCount) 
    values (?,?,?,?,?,?)`;
        db.query(sql, [goodsId, goodsName, goodsCategory, goodsTime, goodsPrice, goodsCount], function (results, fields) {
            res.status(200).json(results);
        }
        );
    });

    app.delete('/deleteRow', function (req, res) {
        let id = req.query.id;
        let sql = `delete from goodsdata where goodsId = ?`;
        db.query(sql, [id], function (results, fidlds) {
            res.status(200).json(results);
        });
    });

    app.put('/modifyForm', function (req, res) {
        let reqParams = req.body.data;
        let goodsId = reqParams.goodsId;
        let goodsName = reqParams.goodsName;
        let goodsCategory = reqParams.goodsCategory;
        let goodsTime = reqParams.goodsTime.split('T')[0];
        let goodsPrice = reqParams.goodsPrice;
        let goodsCount = reqParams.goodsCount;
        let sql = `update goodsdata set goodsName = ?,goodsCategory = ?,goodsTime = ?,goodsPrice = ?,goodsCount = ?
    where goodsId = ?`;
        db.query(sql, [goodsName, goodsCategory, goodsTime, goodsPrice, goodsCount, goodsId], function (results, fidles) {
            res.status(200).json(results);
        });
    });

}