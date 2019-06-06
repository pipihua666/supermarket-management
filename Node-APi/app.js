const express = require('express');
const goodsAPI = require('./controller/goodsAPI');
const posAPI = require('./controller/posAPI');
const loginAPI = require('./controller/loginAPI');

const app = express();

loginAPI(app);//登陆页面
goodsAPI(app);//商品管理
posAPI(app);//pos界面



app.listen(3001,function(){
    console.log('server is listening to port 3001');
});