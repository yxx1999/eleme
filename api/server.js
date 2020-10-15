const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/db");
const md5 = require("md5");
const tools = require("./module/tools");
const app = express();
app.use(bodyParser.json());
// 登陆接口
app.post("/login",(req,res)=>{
    
    const {adminName,passWord} = req.body;
    console.log(adminName,passWord);
    db.findOne("adminList",{
        adminName,
        passWord:md5(passWord+"***234***{}")
    },function (err,info) {
        if(err) tools.json(res);
        else{
            if(info){
                tools.json(res,1,"登陆成功");
            }else{
                tools.json(res,-1,"账号或密码错误");
            }
        }
    });


});
app.listen(80,function () {
    console.log("success");
})