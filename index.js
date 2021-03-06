var init    = require('./lib/init');
var build   = require('./lib/build');
var watch   = require('./lib/watch');
var server  = require('./lib/server');
var file    = require('./lib/file');
var clean   = require('./lib/clean');
var deploy  = require('./lib/deploy');
var color   = require('colorful');
var path    = require('path');

module.exports = function(commander){
    var pkgurl = path.resolve('package.json');

    if (commander.init) init(commander);

    // 判断是否初始化
    if(!commander.init){
        if(!file.exists(pkgurl)) {
            return console.log( color.red('\n In the project root directory to initialize, '+
            'run the "idoc init" command. \n') );   
        }
        // 载入配置文件
        var pkg = require(pkgurl);

        if(file.exists(pkgurl)&&!pkg.idoc){
            return console.log( color.red('\n This is not the "idoc" project. \n') );  
        }
    }
    if(commander.build){
        build(commander);
    }
    if(commander.watch){
        watch(commander,build);
    }
    if(commander.server){
        server(commander);
        watch(commander,build);
    }
    if(commander.clean){
        clean(commander);
    }
    if(commander.deploy){
        deploy(commander);
    }
}