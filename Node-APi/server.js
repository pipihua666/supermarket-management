var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Cache-Control", "privte");
    next();
});
let oftenGoods=[{
        "goodsId": 1,
        "goodsName": "香辣鸡腿堡",
        "price": 18
    },
    {
        "goodsId": 2,
        "goodsName": "田园鸡腿堡",
        "price": 15
    },
    {
        "goodsId": 3,
        "goodsName": "和风汉堡",
        "price": 15
    },
    {
        "goodsId": 4,
        "goodsName": "大包薯条",
        "price": 18
    },
    {
        "goodsId": 5,
        "goodsName": "脆皮炸鸡腿",
        "price": 20
    },
    {
        "goodsId": 6,
        "goodsName": "魔法鸡块",
        "price": 20
    },
    {
        "goodsId": 7,
        "goodsName": "可乐大杯",
        "price": 10
    },
    {
        "goodsId": 8,
        "goodsName": "雪顶咖啡",
        "price": 18
    },
    {
        "goodsId": 9,
        "goodsName": "儿童欢乐套餐",
        "price": 25
    },
    {
        "goodsId": 10,
        "goodsName": "快乐全家桶",
        "price": 99
    }
];
let typeGoods = [
    [{
        "goodsId": 1,
        "goodsImg": "http://localhost:3001/foodImages/1.jpg",
        "goodsName": "香辣鸡腿堡",
        "price": 18
    },
    {
        "goodsId": 2,
        "goodsImg": "http://localhost:3001/foodImages/2.jpg",
        "goodsName": "田园鸡腿堡",
        "price": 15
    },
    {
        "goodsId": 3,
        "goodsImg": "http://localhost:3001/foodImages/3.jpg",
        "goodsName": "和风汉堡",
        "price": 15
    }
    ],
    [{
        "goodsId": 4,
        "goodsImg": "http://localhost:3001/foodImages/4.png",
        "goodsName": "大包薯条",
        "price": 18
    },
    {
        "goodsId": 5,
        "goodsImg": "http://localhost:3001/foodImages/5.jpg",
        "goodsName": "脆皮炸鸡腿",
        "price": 20
    },
    {
        "goodsId": 6,
        "goodsImg": "http://localhost:3001/foodImages/6.jpg",
        "goodsName": "魔法鸡块",
        "price": 20
    }
    ],
    [{
        "goodsId": 7,
        "goodsImg": "http://localhost:3001/foodImages/7.jpg",
        "goodsName": "可乐大杯",
        "price": 10
    },
    {
        "goodsId": 8,
        "goodsImg": "http://localhost:3001/foodImages/8.jpg",
        "goodsName": "雪顶咖啡",
        "price": 18
    }
    ],
    [{
        "goodsId": 9,
        "goodsImg": "http://localhost:3001/foodImages/9.jpg",
        "goodsName": "欢乐套餐",
        "price": 25
    },
    {
        "goodsId": 10,
        "goodsImg": "http://localhost:3001/foodImages/10.jpg",
        "goodsName": "快乐全家桶",
        "price": 99
    }
    ]
];
let reqData=[];
//写两个接口
app.get('/oftenGoods', function (req, res) {
    res.status(200);
    res.json(oftenGoods);
});
app.get('/typeGoods',function(req,res){
    res.status(200);
    res.json(typeGoods);
})
app.get('/foodImages/*',function(req,res){
    res.sendFile(__dirname + "/" + req.url);
})
app.post('/postData',function (req,res){
    reqData=reqData.concat(req.body);
    console.log(reqData);
    res.status(200).json(reqData);
})
//配置服务端口
var server = app.listen(3001, function () {
    var port = server.address().port;
    console.log('Example app listening at http://localhost:%s', port);
})