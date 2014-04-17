/**
 * Created by @kazaff on 2014/4/17.
 */
"use strict";
var Rest = require("restify");

//设置跨域的自定义请求头
Rest.CORS.ALLOW_HEADERS.push("auth");

var app = Rest.createServer({name:"Mock"});
app.use(function(req, res, next){
    res.header("Connection", "Close");
    return next();
});

 //开启跨域支持
app.use(Rest.CORS());
app.use(Rest.fullResponse());

app.use(Rest.acceptParser(app.acceptable));
app.use(Rest.bodyParser({mapParams: false}));
app.use(Rest.dateParser(30));

//业务逻辑
app.get("/test/:id", function(req, res, next){
    var demo = [];
    for(var i = 0; i < 10; i++){
        demo.push({id:i + "号"});
    }
    res.send(demo);
    next();
});

app.listen(8888, "127.0.0.1", function(){
    console.log("%s is running at %s", app.name, app.url);
});
