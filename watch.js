/**
 * Created by @kazaff on 2014/4/17.
 */
"use strict";
var FS = require("fs");
var Config = require("./config");
var Cluster = require("cluster");
Cluster.setupMaster({
    exec: Config.entry
    , silent: true
});
var worker = Cluster.fork();

//监控指定目录
FS.watch(Config.target, function(event, filename){
    worker.kill();
    worker = Cluster.fork();
});

