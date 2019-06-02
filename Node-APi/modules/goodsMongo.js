const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const urlencodeParser = bodyParser.urlencoded({ extended: false })

const goodsModel=new mongoose.Schema({
    goodsId:Number,
    goodsName: String,
    goodsNumber: Number,
    goodsPrice: Number,
    goodsCategory: String,
    goodsTime: String
});

module.exports=mongoose.model('goods',goodsModel);