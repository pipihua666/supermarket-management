const bodyParser = require('body-parser');

module.exports=function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/login',function(req,res){
        const username = req.body.username;
        const password = req.body.password;

        if(username=='pipihua666'&&password=='123456'){
            if(req.body.remenber){
                res.cookie('user', username, { expires: new Date(Date.now() + 900000) });
                res.cookie('password', password, { expires: new Date(Date.now() + 900000) });
            }else{
                res.cookie('user', username, { expires: new Date(Date.now()+900000) });
                res.cookie('password', password, { expires: new Date(Date.now())});
            }
            res.status(200).send('欢迎参观超有爱超市');
        }else{
            res.status(409).send('密码或者账号错误');
        }
    });
}