const express = require('express');
const goodsAPI = require('./controller/goodsAPI');
const posAPI = require('./controller/posAPI');

const app = express();

goodsAPI(app);
posAPI(app);

app.listen(3001,function(){
    console.log('server is listening to port 3001');
});